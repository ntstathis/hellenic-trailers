<#
    Export-Outlook.ps1

    Exports every email address you have corresponded with, from classic
    Outlook on Windows, into a CSV.

    Output: addresses.csv
        Email, Name, Domain,
        FromCount     how many messages that address sent to you
        ToCount       how many messages YOU sent to that address
        Total, FirstContact, LastContact

    ToCount is the column that matters. An address with ToCount > 0 is a real
    contact - you wrote to them. An address with ToCount = 0 only ever wrote
    in: a newsletter, an invoice, or spam. Rows are sorted by ToCount, so the
    genuine contacts are at the top.

    USAGE - in a NORMAL PowerShell window, with Outlook open:

        powershell -ExecutionPolicy Bypass -File .\Export-Outlook.ps1

    Options:
        -SinceYears 3       only the last 3 years (default 5)
        -OutDir "C:\temp"   where to write (default: Desktop\outlook-export)
        -IncludeJunk        also scan junk and deleted folders
        -WithMessages       also write messages.csv, one row per message

    NOTE: do NOT run this in an elevated ("Run as administrator") PowerShell.
    Outlook runs unelevated and Windows will not let an elevated process
    attach to it. The script checks and refuses.

    This file is deliberately plain ASCII. Windows PowerShell 5.1 reads .ps1
    files as ANSI unless they carry a UTF-8 BOM, and non-ASCII text in the
    source is the one thing guaranteed to break it. Greek folder names are no
    longer needed: folders are identified by type, not by name.
#>

param(
    [int]$SinceYears = 5,
    [string]$OutDir = (Join-Path ([Environment]::GetFolderPath('Desktop')) 'outlook-export'),
    [switch]$IncludeJunk,
    [switch]$WithMessages
)

$ErrorActionPreference = 'Stop'

# MAPI property for the real SMTP address. Needed because for internal
# senders Outlook returns an Exchange DN (/O=...) instead of an email.
$PR_SMTP = 'http://schemas.microsoft.com/mapi/proptag/0x39FE001E'

# Second net, for folders that are nobody's default - such as the
# "spambucket" that IMAP accounts carry. ASCII only, on purpose.
$skipNames = @(
    'Trash', 'Deleted Items', 'Junk', 'Junk Email', 'spambucket',
    'Drafts', 'Templates', 'Outbox', 'RSS Feeds', 'RSS Subscriptions',
    'Sync Issues', 'Conflicts', 'Local Failures', 'Server Failures',
    'Conversation History', 'Clutter'
)

if (([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host ''
    Write-Host 'STOP: this PowerShell is running as Administrator.' -ForegroundColor Red
    Write-Host 'Outlook runs as a normal user and will not connect.' -ForegroundColor Red
    Write-Host 'Close this window and open a plain PowerShell instead.' -ForegroundColor Yellow
    exit 1
}

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
$cutoff = (Get-Date).AddYears(-$SinceYears)

Write-Host 'Connecting to Outlook...' -ForegroundColor Cyan
try {
    $outlook = New-Object -ComObject Outlook.Application
    $mapi = $outlook.GetNamespace('MAPI')
} catch {
    Write-Host ''
    Write-Host 'Could not find Outlook.' -ForegroundColor Red
    Write-Host 'Check that it is open, and that it is classic Outlook, not "new Outlook".' -ForegroundColor Yellow
    throw
}

# Your own addresses, so sent can be told from received.
$mine = New-Object 'System.Collections.Generic.HashSet[string]' ([StringComparer]::OrdinalIgnoreCase)
foreach ($acct in $mapi.Accounts) {
    if ($acct.SmtpAddress) { [void]$mine.Add($acct.SmtpAddress.Trim().ToLower()) }
}
Write-Host ('Accounts: ' + ($mine -join ', ')) -ForegroundColor Cyan

# Folders to leave alone, identified by TYPE so language never matters:
# 3=Deleted, 4=Outbox, 16=Drafts, 19=Conflicts, 20=Sync Issues, 23=Junk.
# 5=Sent Items is deliberately absent - sent mail is where ToCount comes from.
$skipIds = New-Object 'System.Collections.Generic.HashSet[string]'
foreach ($store in $mapi.Stores) {
    foreach ($t in @(3, 4, 16, 19, 20, 23)) {
        try {
            $df = $store.GetDefaultFolder($t)
            if ($df) { [void]$skipIds.Add($df.EntryID) }
        } catch {}
    }
}
Write-Host "Folders excluded by type: $($skipIds.Count)" -ForegroundColor DarkGray

$messages = New-Object System.Collections.ArrayList
$people = @{}
$script:scanned = 0

function Get-Smtp($entry) {
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
    if ($addr -notmatch '^[^@\s]+@[^@\s]+\.[a-z]{2,}$') { return }
    if ($mine.Contains($addr)) { return }

    if (-not $people.ContainsKey($addr)) {
        $people[$addr] = @{
            Email = $addr
            Name = $name
            Domain = $addr.Split('@')[1]
            FromCount = 0
            ToCount = 0
            First = $when
            Last = $when
        }
    }
    $p = $people[$addr]
    if ($name -and -not $p['Name']) { $p['Name'] = $name }
    if ($direction -eq 'received') { $p['FromCount'] = $p['FromCount'] + 1 }
    else { $p['ToCount'] = $p['ToCount'] + 1 }
    if ($when) {
        if (-not $p['First'] -or $when -lt $p['First']) { $p['First'] = $when }
        if (-not $p['Last'] -or $when -gt $p['Last']) { $p['Last'] = $when }
    }
}

function Walk-Folder($folder, $path) {
    $isSkipped = $false
    try { $isSkipped = $skipIds.Contains($folder.EntryID) } catch {}
    if (-not $isSkipped) { $isSkipped = ($skipNames -contains $folder.Name) }

    if ($isSkipped -and -not $IncludeJunk) {
        Write-Host "  (skipped: $path)" -ForegroundColor DarkGray
    } elseif ($folder.DefaultItemType -eq 0) {
        $items = $folder.Items
        $count = 0
        try { $count = $items.Count } catch {}
        if ($count -gt 0) {
            Write-Host "  $path - $count messages" -ForegroundColor Gray
            for ($i = 1; $i -le $count; $i++) {
                $item = $null
                try { $item = $items.Item($i) } catch { continue }
                try {
                    if ($item.Class -ne 43) { continue }

                    $when = $null
                    try { $when = $item.ReceivedTime } catch {}
                    if (-not $when) { try { $when = $item.SentOn } catch {} }
                    if ($when -and $when -lt $cutoff) { continue }

                    $senderAddr = $null
                    $senderName = $null
                    try { $senderName = $item.SenderName } catch {}
                    try { $senderAddr = Get-Smtp $item.Sender } catch {}
                    if (-not $senderAddr) { try { $senderAddr = $item.SenderEmailAddress } catch {} }
                    if ($senderAddr -and $senderAddr -like '/O=*') { $senderAddr = $null }

                    $isMine = $false
                    if ($senderAddr) { $isMine = $mine.Contains($senderAddr.Trim().ToLower()) }
                    $direction = 'received'
                    if ($isMine) { $direction = 'sent' }

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

                    if ($WithMessages) {
                        [void]$messages.Add([pscustomobject]@{
                            Date = if ($when) { $when.ToString('yyyy-MM-dd HH:mm') } else { '' }
                            Direction = $direction
                            Folder = $path
                            FromName = $senderName
                            FromEmail = $senderAddr
                            To = ($recips -join '; ')
                            Subject = $item.Subject
                        })
                    }

                    $script:scanned = $script:scanned + 1
                    if ($script:scanned % 500 -eq 0) {
                        Write-Host "    ...$script:scanned" -ForegroundColor DarkGray
                    }
                } catch {} finally {
                    if ($item) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($item) }
                }
            }
        }
    }

    foreach ($sub in $folder.Folders) { Walk-Folder $sub ($path + '/' + $sub.Name) }
}

Write-Host ''
Write-Host ("Scanning from " + $cutoff.ToString('yyyy-MM-dd') + " onwards...") -ForegroundColor Cyan
foreach ($root in $mapi.Folders) {
    Write-Host ''
    Write-Host "[$($root.Name)]" -ForegroundColor Yellow
    foreach ($f in $root.Folders) { Walk-Folder $f ($root.Name + '/' + $f.Name) }
}

$addrPath = Join-Path $OutDir 'addresses.csv'

$rows = foreach ($key in $people.Keys) {
    $p = $people[$key]
    [pscustomobject]@{
        Email = $p['Email']
        Name = $p['Name']
        Domain = $p['Domain']
        FromCount = $p['FromCount']
        ToCount = $p['ToCount']
        Total = $p['FromCount'] + $p['ToCount']
        FirstContact = if ($p['First']) { $p['First'].ToString('yyyy-MM-dd') } else { '' }
        LastContact = if ($p['Last']) { $p['Last'].ToString('yyyy-MM-dd') } else { '' }
    }
}

$rows |
    Sort-Object -Property @{Expression = 'ToCount'; Descending = $true}, @{Expression = 'Total'; Descending = $true} |
    Export-Csv -Path $addrPath -NoTypeInformation -Encoding UTF8

if ($WithMessages) {
    $msgPath = Join-Path $OutDir 'messages.csv'
    $messages | Export-Csv -Path $msgPath -NoTypeInformation -Encoding UTF8
}

Write-Host ''
Write-Host '== Done ==' -ForegroundColor Green
Write-Host "Messages scanned  : $script:scanned"
Write-Host "Unique addresses  : $($people.Count)"
Write-Host "  $addrPath"
if ($WithMessages) { Write-Host "  $msgPath" }
Write-Host ''
Write-Host 'Start from the ToCount column: that is where the real contacts are.' -ForegroundColor Cyan
