<#
    Export-Outlook.ps1
    Βγάζει από το κλασικό Outlook (Windows) όλες τις διευθύνσεις email με τις
    οποίες έχεις αλληλογραφήσει, σε ένα CSV:

      addresses.csv  μία γραμμή ανά διεύθυνση:
                     Email, Name, Domain, FromCount (πόσα σου έστειλε),
                     ToCount (πόσα του έστειλες), Total, FirstContact, LastContact

    Η στήλη ToCount είναι η σημαντική: δείχνει σε ποιους έχεις στείλει ΕΣΥ.
    Μια διεύθυνση με ToCount > 0 είναι πραγματική επαφή· μια με ToCount = 0
    απλώς σου έστειλε κάτι κάποτε (newsletter, spam, αυτόματο μήνυμα).
    Το αρχείο βγαίνει ταξινομημένο κατά ToCount, οπότε οι πιο σημαντικές
    επαφές είναι στην κορυφή.

    Με -WithMessages βγάζει και messages.csv, μία γραμμή ανά μήνυμα.

    ΧΡΗΣΗ (PowerShell, στον υπολογιστή με το Outlook ανοιχτό):

        powershell -ExecutionPolicy Bypass -File .\Export-Outlook.ps1

    Προαιρετικά:
        -SinceYears 3        μόνο τα τελευταία 3 χρόνια (προεπιλογή 5)
        -OutDir "C:\temp"    πού να γράψει (προεπιλογή: Επιφάνεια εργασίας)

    ΠΡΟΣΟΧΗ: ΜΗΝ το τρέξεις σε PowerShell «ως Διαχειριστής». Το Outlook τρέχει
    ως κανονικός χρήστης, και τα Windows δεν επιτρέπουν σε ανυψωμένη διεργασία
    να συνδεθεί σε μη ανυψωμένη — η σύνδεση θα αποτύχει ή θα ανοίξει δεύτερο,
    άδειο Outlook. Χρησιμοποίησε απλό PowerShell.
        -IncludeJunk         να μπουν και τα ανεπιθύμητα/διαγραμμένα
        -WithMessages        να βγει και το messages.csv (μία γραμμή ανά μήνυμα)

    Απαιτεί: κλασικό Outlook desktop. Στο «νέο Outlook» δεν δουλεύει.
#>

param(
    [int]$SinceYears = 5,
    [string]$OutDir = (Join-Path ([Environment]::GetFolderPath('Desktop')) 'outlook-export'),
    [switch]$IncludeJunk,
    [switch]$WithMessages
)

$ErrorActionPreference = 'Stop'

# MAPI property που δίνει την πραγματική SMTP διεύθυνση. Χρειάζεται γιατί για
# εσωτερικούς αποστολείς το Outlook επιστρέφει Exchange DN (/O=...) και όχι email.
$PR_SMTP = 'http://schemas.microsoft.com/mapi/proptag/0x39FE001E'

# Φάκελοι που παραλείπονται. Τα ονόματα είναι και στα ελληνικά και στα αγγλικά.
# Δευτερεύον δίχτυ, για φακέλους που δεν είναι «προεπιλεγμένοι» — όπως το
# spambucket των IMAP λογαριασμών. Ο κύριος έλεγχος γίνεται με EntryID.
$skipNames = @(
    'Trash','Deleted Items','Διαγραμμένα','Διαγραμμένα στοιχεία',
    'Junk','Junk Email','spambucket','Ανεπιθύμητα','Ανεπιθύμητη αλληλογραφία',
    'Drafts','Πρόχειρα','Templates','Outbox','Εξερχόμενα',
    'RSS Feeds','Τροφοδοσίες RSS','Sync Issues','Conflicts','Conversation History'
)

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
$cutoff = (Get-Date).AddYears(-$SinceYears)

$elevated = ([Security.Principal.WindowsPrincipal] `
    [Security.Principal.WindowsIdentity]::GetCurrent()
    ).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if ($elevated) {
    Write-Host ""
    Write-Host "ΣΤΑΜΑΤΑ: αυτό το PowerShell τρέχει ως Διαχειριστής." -ForegroundColor Red
    Write-Host "Το Outlook τρέχει ως κανονικός χρήστης και δεν θα συνδεθεί." -ForegroundColor Red
    Write-Host "Κλείσε αυτό το παράθυρο και άνοιξε απλό PowerShell (χωρίς 'Εκτέλεση ως διαχειριστής')." -ForegroundColor Yellow
    exit 1
}

Write-Host "Σύνδεση στο Outlook..." -ForegroundColor Cyan
try {
    $outlook = New-Object -ComObject Outlook.Application
    $mapi    = $outlook.GetNamespace('MAPI')
} catch {
    Write-Host ""
    Write-Host "Δεν βρήκα το Outlook." -ForegroundColor Red
    Write-Host "Έλεγξε ότι: (1) είναι ανοιχτό, (2) είναι το κλασικό Outlook και όχι το «νέο Outlook»." -ForegroundColor Yellow
    throw
}

# Οι δικές σου διευθύνσεις — για να ξεχωρίζει τι έστειλες από τι έλαβες.
$mine = New-Object 'System.Collections.Generic.HashSet[string]' ([StringComparer]::OrdinalIgnoreCase)
foreach ($acct in $mapi.Accounts) {
    if ($acct.SmtpAddress) { [void]$mine.Add($acct.SmtpAddress.Trim().ToLower()) }
}
Write-Host ("Λογαριασμοί: " + ($mine -join ', ')) -ForegroundColor Cyan

# Οι φάκελοι που δεν θέλουμε, εντοπισμένοι από τον τύπο τους και όχι από το
# όνομα: 3=Διαγραμμένα, 4=Εξερχόμενα, 16=Πρόχειρα, 19=Conflicts,
# 20=Sync Issues, 23=Ανεπιθύμητα. (Το 5=Απεσταλμένα ΔΕΝ παραλείπεται.)
$skipIds = New-Object 'System.Collections.Generic.HashSet[string]'
foreach ($store in $mapi.Stores) {
    foreach ($t in @(3, 4, 16, 19, 20, 23)) {
        try {
            $df = $store.GetDefaultFolder($t)
            if ($df) { [void]$skipIds.Add($df.EntryID) }
        } catch {}
    }
}
Write-Host "Φάκελοι προς παράλειψη: $($skipIds.Count)" -ForegroundColor DarkGray

$messages = New-Object System.Collections.ArrayList
$people   = @{}
$scanned  = 0

function Get-Smtp($entry) {
    # Επιστρέφει SMTP διεύθυνση από AddressEntry, με fallback.
    if (-not $entry) { return $null }
    try {
        $ex = $entry.GetExchangeUser()
        if ($ex -and $ex.PrimarySmtpAddress) { return $ex.PrimarySmtpAddress }
    } catch {}
    try { return $entry.PropertyAccessor.GetProperty($PR_SMTP) } catch {}
    try { return $entry.Address } catch {}
    return $null
}

function Add-Person($addr, $name, $when, $direction) {
    if ([string]::IsNullOrWhiteSpace($addr)) { return }
    $addr = $addr.Trim().ToLower()
    if ($addr -notmatch '^[^@\s]+@[^@\s]+\.[a-z]{2,}$') { return }   # μόνο έγκυρα
    if ($mine.Contains($addr)) { return }                             # όχι ο εαυτός σου

    if (-not $people.ContainsKey($addr)) {
        $people[$addr] = [ordered]@{
            Email = $addr; Name = $name; Domain = $addr.Split('@')[1]
            FromCount = 0; ToCount = 0; First = $when; Last = $when
        }
    }
    $p = $people[$addr]
    if ($name -and -not $p['Name']) { $p['Name'] = $name }
    if ($direction -eq 'received') { $p['FromCount'] = $p['FromCount'] + 1 }
    else                          { $p['ToCount']   = $p['ToCount']   + 1 }
    if ($when -and $p['First'] -and $when -lt $p['First']) { $p['First'] = $when }
    if ($when -and $p['Last']  -and $when -gt $p['Last'])  { $p['Last']  = $when }
}

function Walk-Folder($folder, $path) {
    $isSkipped = $false
    try { $isSkipped = $skipIds.Contains($folder.EntryID) } catch {}
    if (-not $isSkipped) { $isSkipped = $folder.Name -in $skipNames }
    if ($isSkipped -and -not $IncludeJunk) {
        Write-Host "  (παράλειψη: $path)" -ForegroundColor DarkGray
        return
    }

    if ($folder.DefaultItemType -eq 0) {          # 0 = olMailItem
        $items = $folder.Items
        $count = $items.Count
        if ($count -gt 0) {
            Write-Host ("  {0} — {1} μηνύματα" -f $path, $count) -ForegroundColor Gray
            for ($i = 1; $i -le $count; $i++) {
                try { $item = $items.Item($i) } catch { continue }
                try {
                    if ($item.Class -ne 43) { continue }   # 43 = MailItem

                    $when = $null
                    try { $when = $item.ReceivedTime } catch {}
                    if (-not $when) { try { $when = $item.SentOn } catch {} }
                    if ($when -and $when -lt $cutoff) { continue }   # παλιότερο από το cutoff

                    $senderAddr = $null; $senderName = $null
                    try { $senderName = $item.SenderName } catch {}
                    try { $senderAddr = Get-Smtp $item.Sender } catch {}
                    if (-not $senderAddr) { try { $senderAddr = $item.SenderEmailAddress } catch {} }
                    if ($senderAddr -and $senderAddr -like '/O=*') { $senderAddr = $null }

                    $isMine = $senderAddr -and $mine.Contains($senderAddr.Trim().ToLower())
                    $direction = if ($isMine) { 'sent' } else { 'received' }

                    # Παραλήπτες
                    $recips = @()
                    try {
                        foreach ($r in $item.Recipients) {
                            $a = $null
                            try { $a = Get-Smtp $r.AddressEntry } catch {}
                            if (-not $a) { try { $a = $r.Address } catch {} }
                            if ($a -and $a -notlike '/O=*') {
                                $recips += $a
                                if ($direction -eq 'sent') { Add-Person $a $r.Name $when 'sent' }
                            }
                        }
                    } catch {}

                    if ($direction -eq 'received') { Add-Person $senderAddr $senderName $when 'received' }

                    if ($WithMessages) { [void]$messages.Add([pscustomobject]@{
                        Date      = if ($when) { $when.ToString('yyyy-MM-dd HH:mm') } else { '' }
                        Direction = $direction
                        Folder    = $path
                        FromName  = $senderName
                        FromEmail = $senderAddr
                        To        = ($recips -join '; ')
                        Subject   = $item.Subject
                    }) }

                    $scanned++
                    if ($scanned % 500 -eq 0) { Write-Host "    ...$scanned" -ForegroundColor DarkGray }
                } catch {} finally {
                    if ($item) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($item) }
                }
            }
        }
    }

    foreach ($sub in $folder.Folders) { Walk-Folder $sub ("$path/" + $sub.Name) }
}

Write-Host "`nΣάρωση φακέλων (από $($cutoff.ToString('yyyy-MM-dd')) και μετά)..." -ForegroundColor Cyan
foreach ($store in $mapi.Folders) {
    Write-Host "`n[$($store.Name)]" -ForegroundColor Yellow
    foreach ($f in $store.Folders) { Walk-Folder $f ("$($store.Name)/" + $f.Name) }
}

$addrPath = Join-Path $OutDir 'addresses.csv'
if ($WithMessages) {
    $msgPath = Join-Path $OutDir 'messages.csv'
    $messages | Export-Csv -Path $msgPath -NoTypeInformation -Encoding UTF8
}

$people.Values |
    ForEach-Object { [pscustomobject]$_ } |
    Select-Object Email, Name, Domain, FromCount, ToCount,
        @{n='Total';       e={ $_.FromCount + $_.ToCount }},
        @{n='FirstContact';e={ if ($_.First) { $_.First.ToString('yyyy-MM-dd') } }},
        @{n='LastContact'; e={ if ($_.Last)  { $_.Last.ToString('yyyy-MM-dd') } }} |
    Sort-Object -Property @{Expression='ToCount';Descending=$true},
                          @{Expression='Total';Descending=$true} |
    Export-Csv -Path $addrPath -NoTypeInformation -Encoding UTF8

Write-Host "`n== Τέλος ==" -ForegroundColor Green
Write-Host "Μηνύματα σαρωμένα : $scanned"
Write-Host "Μοναδικές διευθύνσεις: $($people.Count)"
Write-Host "  $msgPath"
Write-Host "  $addrPath"
Write-Host "`nΓια λίστα newsletter, ξεκίνα από το addresses.csv και κοίτα τη στήλη ToCount." -ForegroundColor Cyan
