# Editing the Hellenic Trailers website

This guide is for anyone who needs to update the content of
**hellenictrailers.gr** without being a developer.

Everything here is done in a web browser. You do not need to install anything,
and you do not need to know how to code.

---

## The one thing to understand first

**Almost all the text you see on the website is NOT stored in the page files.
It lives in a single file: `js/translations.js`.**

This surprises people, so it is worth being clear about it:

Each page (`index.html`, `about.html`, ...) contains lines that look like this:

```html
<h1 data-i18n="hero.title">Λύσεις Ψυκτικής Μεταφοράς για την Ελλάδα</h1>
```

The `data-i18n="hero.title"` part is a **label**. When a visitor opens the page,
the website looks up that label in `js/translations.js` and **replaces** the
text with whatever it finds there.

So if you edit the Greek text inside `index.html` and save it, **nothing will
change on the live site** — it gets overwritten a fraction of a second after
the page loads. This is the single most common mistake.

> **Rule: to change text, edit `js/translations.js`.**

---

## Where things live

| What you want to change | File to edit |
|---|---|
| Any text on any page (headings, paragraphs, buttons, menu) | `js/translations.js` |
| Photos — adding, replacing | `images/` folder + the page's `.html` |
| Adding a whole new news item or product card | `js/translations.js` **and** the page's `.html` |
| Phone number, email, address | Many files — **ask for help** (see below) |
| Colours, fonts, layout, spacing | `css/style.css` — **don't**, ask for help |

The pages themselves:

| Page on the site | File |
|---|---|
| Home | `index.html` |
| The Company | `about.html` |
| Products | `products.html` |
| Services | `services.html` |
| News | `news.html` |
| Gallery | `gallery.html` |
| Contact | `contact.html` |

---

## How to make an edit

1. Go to https://github.com/ntstathis/hellenic-trailers
2. Click the file you need — for text, that is `js` then `translations.js`
3. Click the **pencil icon** (top right of the file) to start editing
4. Find the line you want (see below for how to find it fast)
5. Make your change
6. Click the green **Commit changes...** button
7. In the box that appears, write a short note of what you did
   (e.g. `Update opening hours`), then confirm

The live site updates itself about **1–2 minutes** later. Refresh
hellenictrailers.gr to see it. If you don't see the change, do a hard refresh
(`Ctrl+Shift+R`, or `Cmd+Shift+R` on a Mac) — your browser may be showing you a
saved copy.

### Finding the right line quickly

`js/translations.js` is long (about 200 entries). Don't scroll through it.

- While editing, press `Ctrl+F` (`Cmd+F` on a Mac) and search for a few words of
  the text you want to change, exactly as it appears on the website.
- Or: on the live site, look at the page, then search this file for a
  distinctive word from the sentence you want to change.

---

## Understanding a translation line

Every entry looks like this:

```js
'topbar.hours': { en: 'Mon-Fri: 09:00 - 17:00', el: 'Δευ-Παρ: 09:00 - 17:00' },
```

It has three parts:

- `'topbar.hours'` — the **label**. **Never change this.** The pages use it to
  find the text. Change it and that text disappears from the site.
- `en: '...'` — the **English** version, shown when a visitor clicks **EN**
- `el: '...'` — the **Greek** version, shown when a visitor clicks **GR**

**Greek is what visitors see by default**, so `el:` is the important one — but
please update **both**, or the site will be inconsistent when someone switches
language.

### The four rules that keep the site working

The file is code, so a few characters matter. If you follow these four rules
you cannot really go wrong:

**1. Only change text between the quote marks.**

```js
'news.1.title': { en: 'CHANGE ONLY THIS', el: 'ΚΑΙ ΜΟΝΟ ΑΥΤΟ' },
```

**2. Keep every quote, comma, and brace exactly where it is.**
The `{`, `}`, `:` and the comma at the end of the line all have to stay.

**3. An apostrophe inside the text must be written as `\'`.**

The text is wrapped in single quotes, so a plain apostrophe would end it early
and break the page. Correct:

```js
en: 'Europe\'s leading manufacturer',
```

Wrong — this breaks the site:

```js
en: 'Europe's leading manufacturer',
```

Greek text rarely needs this. English text often does (`don't`, `Europe's`,
`world's`). If in doubt, rewrite the sentence to avoid the apostrophe.

**4. Don't press Enter to make a new line inside the text.**
If you want a line break in the middle of a paragraph, type `\n` instead.

---

## Common tasks

### Change a sentence, heading, or button label

1. Open `js/translations.js`
2. Search for the current wording
3. Replace the text inside `en: '...'` and `el: '...'`
4. Commit

That's the whole job for the large majority of updates.

### Add a photo to the site

Photos live in the `images/` folder.

**Step 1 — upload the photo**

1. Go to the `images` folder on GitHub
2. **Add file → Upload files**
3. Drag the photo in, then **Commit changes**

Before you upload, please:
- Use a **lowercase filename with dashes, no spaces and no Greek letters** —
  `lamberet-sr2-delivery.jpg`, not `Φωτο 1.JPG`
- Keep the file **under about 500 KB**. Photos straight from a phone or camera
  are often 5–10 MB and will make the site slow. Resize to roughly 2000 pixels
  wide first.

**Step 2 — put it on a page**

Uploading alone does not show the photo anywhere. Find a similar `<img ...>`
line on the page you want, copy it, and change the filename and the description.
For example, in `news.html`:

```html
<img src="images/mitsopoulos-super-beef.jpeg"
     alt="Παράδοση Super Beef θαλάμου στη Φάρμα Μητσόπουλος"
     loading="lazy" decoding="async" width="2000" height="1500">
```

- `src=` — the filename you just uploaded, with `images/` in front
- `alt=` — a short description of what the photo shows, in Greek. This is read
  out to blind visitors and used by Google, so please write a real description
- `width=` and `height=` — the real pixel size of your photo. Getting these
  wrong makes the page jump around while loading

If you are not comfortable with this step, upload the photo and ask for help
placing it — that is a normal request.

### Add a news item

A news item is two pieces: the **text** and the **card** that displays it.

**Step 1 — add the text** in `js/translations.js`. Find the existing news lines
and copy the pattern, using the next free number (there are already `news.1`
and `news.4`, so use `news.5`):

```js
'news.5.date': { en: 'June 2026', el: 'Ιούνιος 2026' },
'news.5.title': { en: 'English headline', el: 'Ελληνικός τίτλος' },
'news.5.text': { en: 'English paragraph.', el: 'Ελληνική παράγραφος.' },
```

**Step 2 — add the card** in `news.html`. Copy an existing block that starts
with `<div class="news-card">` and ends with its matching `</div>`, paste it
directly **above** the others (newest first), and change the three `data-i18n`
labels to your new numbers:

```html
<div class="news-card">
  <div class="news-image">&#x1F389;</div>
  <div class="news-content">
    <div class="news-date" data-i18n="news.5.date">Ιούνιος 2026</div>
    <h3 data-i18n="news.5.title">Ελληνικός τίτλος</h3>
    <p data-i18n="news.5.text">Ελληνική παράγραφος.</p>
  </div>
</div>
```

The text you type between the tags is only a fallback — the real text comes from
`translations.js` — but keep it roughly the same so the page looks right for the
split second before the script runs.

### Replace a gallery placeholder with a real photo

The Gallery page currently shows **emoji placeholders**, not real photos:

```html
<div class="gallery-item">
  <div class="gallery-placeholder">&#x1F69B;</div>
  <div class="gallery-overlay">SR2 Green Liner</div>
</div>
```

To use a real photo, upload it to `images/` first, then replace the
`gallery-placeholder` line with an `<img>`:

```html
<div class="gallery-item">
  <img src="images/your-photo.jpg" alt="Περιγραφή" loading="lazy" decoding="async">
  <div class="gallery-overlay">SR2 Green Liner</div>
</div>
```

---

## Please ask before changing these

These look simple but are spread across many files, so a partial change leaves
the site inconsistent or broken:

- **Phone number, email address, or postal address.** The phone number alone
  appears about 25 times across 8 files, including a hidden block that Google
  reads for the business listing. Ask — it takes a minute to do properly.
- **Anything in `css/style.css`** — colours, fonts, sizes, spacing.
- **Anything in the `<head>` section** at the top of a page — the page title,
  the description Google shows in search results, the preview image used when
  someone shares a link.
- **The `CNAME` file.** This one file is what points hellenictrailers.gr at the
  site. Changing or deleting it takes the whole website offline.
- **The bottom half of `js/translations.js`** (roughly from the line
  `// Initialization` and the surrounding functions). The top part is text; the
  bottom part is the machinery that runs the site.
- **The contact form** in `contact.html`.

---

## If something goes wrong

Nothing you do is permanent, and nothing is ever really lost. Every change is
saved with a full history, so any mistake can be undone in under a minute.

**If something looks wrong after your change**, the symptom tells you what you
did. There are two, and both come from `js/translations.js`:

**Symptom 1 — you see labels like `hero.title` or `news.5.text` on the page**
instead of real text.

That label doesn't exist in `js/translations.js`. Either it is spelled
differently in the page than in the translations file, or you added the card in
the `.html` but not the matching text lines. Check the spelling of the label in
both places — they must match character for character.

**Symptom 2 — the GR / EN buttons stop working, and on a phone the menu button
does nothing.**

The file has a broken character somewhere and the site can no longer read it —
usually a missing quote, a missing comma at the end of a line, or an apostrophe
written as `'` instead of `\'`. The page still shows Greek text, so it can look
almost normal at a glance; the language switch is how you notice.

In both cases:

1. Don't try to fix it under pressure, and don't make more edits on top
2. Tell Nikos straight away, saying what file you edited and roughly what you
   changed
3. It can be rolled back to the previous working version immediately

A quick way to catch Symptom 2 yourself, before anyone else sees it: after
committing, open the site and click **EN** then **GR**. If the text switches
language, the file is fine.

To look at what changed: open the repository, click **Commits**, and click your
entry. It shows exactly what was added and removed.

---

## Good habits

- **One change at a time.** Edit, commit, check the live site, then move on. If
  something breaks, you know exactly what caused it.
- **Write a real commit message.** `Update May news item` is useful in six
  months. `Update` is not.
- **Always check the live site** a couple of minutes after committing.
- **Check both languages** — click GR and EN in the top bar.
- **Check on a phone.** Most visitors are on mobile.
- **When unsure, ask first.** A question costs a minute. A broken site on a
  working day costs a lot more.
