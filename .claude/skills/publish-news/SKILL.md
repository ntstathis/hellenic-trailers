---
name: publish-news
description: Publish a news item to hellenictrailers.gr, Facebook, Instagram and the MailerLite newsletter from one photo + news text, plus ready-to-paste LinkedIn and Google Business posts. Use when the owner wants to announce news, a delivery, or an event (e.g. "publish this news", "ανέβασε αυτό το νέο", "νέα παράδοση").
---

# Publish a news item everywhere

One run takes a photo (or two) + news text and publishes: the website news page,
a Facebook Page post, an Instagram post, and a newsletter campaign — in that
order, because Facebook/Instagram fetch the image from its live
hellenictrailers.gr URL. LinkedIn and Google Business Profile posts are prepared
as paste-ready text (their APIs are not automated).

**The only irreversible actions are the social posts and the email send. Nothing
is pushed, posted, or sent before the owner explicitly approves the drafts in
step 5.**

## 0. Configuration

| Key | Value |
|---|---|
| Repo | the checkout of `ntstathis/hellenic-trailers` (paths below are repo-relative) |
| Site base URL | `https://hellenictrailers.gr` |
| Meta API | `https://graph.facebook.com` (unversioned paths — the app's default Graph version applies) |
| Env vars (set in the Claude environment, never in the repo) | `META_PAGE_ACCESS_TOKEN` (secret), `FB_PAGE_ID`, `IG_USER_ID` |
| Facebook Page URL | `TO-BE-FILLED` |
| Instagram profile URL | `TO-BE-FILLED` |
| LinkedIn page URL | `TO-BE-FILLED` |
| Newsletter | MailerLite connector (claude.ai, authorized 2026-08-21 as stathis@stathis.com.gr); group `Hellenic Trailers Newsletter` (id `196439632318039915`); sender Hellenic Trailers `<ikaragiotis@hellenictrailers.gr>`; hosted signup URL `TO-BE-FILLED` |
| WhatsApp | +30 695 704 5716, reached from buttons on every page (`WHATSAPP_URL` in `js/translations.js`); nothing to publish there — it is an inbound channel |
| Owner setup guide | `MARKETING.md` (token creation/regeneration, connector authorization, the current to-do list) |

When a `TO-BE-FILLED` value becomes known during a run, update this file and
commit it together with the news item.

## 1. Preflight

1. Inputs required: 1–2 photos and the news text (Greek and/or English). If the
   photo or the facts are missing, ask — **never invent names, models, dates or
   technical claims**.
2. `git fetch origin main` and make sure the working tree is clean and up to
   date with `origin/main`.
3. Channel availability (do all checks read-only, and never print the token):
   - Meta: `META_PAGE_ACCESS_TOKEN`, `FB_PAGE_ID`, `IG_USER_ID` set, and
     `curl -sS "https://graph.facebook.com/me?fields=id,name&access_token=$META_PAGE_ACCESS_TOKEN"`
     returns the Page. An OAuth error with `"code": 190` means the token was
     invalidated → tell the owner to follow the 5-minute regeneration guide in
     `MARKETING.md` §A.
   - MailerLite: locate its connector tools with ToolSearch (query
     `mailerlite`). If absent, the connector isn't authorized in claude.ai.
   - A channel that isn't ready is **skipped, stated plainly in the step-5
     summary, and its content still drafted** so the owner can post manually.
4. Next news number: `grep -o 'news\.[0-9]*\.title' js/translations.js` →
   max N + 1 (numbering has gaps by convention; never renumber old items).

## 2. Image processing

Targets: JPEG, longest side ≤ 2000 px, file < 500 KB, name lowercase-latin-dashes
(e.g. `lamberet-sr2-delivery-farma.jpg`), saved flat in `images/`.

- Tooling, in order of preference: ImageMagick (`magick`/`convert`) → Python
  Pillow → `pip install Pillow` → last resort: if `file <img>` already reports
  ≤ ~2000 px and the size is < 500 KB, use as-is; otherwise ask the owner for a
  smaller JPEG. Convert PNG/HEIC to JPEG (Instagram only accepts JPEG); if HEIC
  cannot be decoded, ask for a JPEG export.
- Record the final real pixel dimensions (from `file` output or Pillow) — they
  go verbatim into the `<img>` `width`/`height` attributes.
- **Instagram aspect-ratio gate**: the feed accepts width/height ratios from
  0.8 (4:5) to 1.91 only. If the primary photo is outside that range, produce an
  additional 4:5 (portrait) or 1.91:1 (landscape) **center-crop** variant named
  `<name>-ig.jpg`, commit it alongside, and use it **only** for the Instagram
  step. Tell the owner in step 5 that Instagram will show a cropped version.

## 3. Content authoring

- Site text: whichever of Greek/English is missing gets translated. Greek in
  the formal plural (πληθυντικός ευγενείας), factual B2B register matching the
  existing items — customer name, model designation, technical specifics, no
  marketing exclamations. Date keys are month + year:
  `{ en: 'August 2026', el: 'Αύγουστος 2026' }`.
- **Escaping rules for `js/translations.js` (one bad character breaks every page
  of the site):** strings are single-quoted; every apostrophe inside must be
  escaped as `\'`; line breaks inside a string only as `\n`; never a raw
  newline inside quotes.
- Channel variants (drafted now, shown in step 5):
  - **Facebook**: 2–4 Greek sentences, at most 1–2 hashtags, ends with
    `https://hellenictrailers.gr/news.html`.
  - **Instagram**: shorter Greek caption + hashtag block — base set
    `#HellenicTrailers #Lamberet #ψυκτικάοχήματα #coldchain` plus 2–3
    item-specific tags. No link (links are dead in IG captions).
  - **Newsletter**: subject < 60 chars, Greek; HTML body per step 9.
  - **LinkedIn**: 3–5 sentences, slightly more professional/technical, Greek
    (or bilingual if the owner asks), link to the news page.
  - **Google Business post**: ≤ 1500 chars, Greek, plain factual summary +
    link.

## 4. Site edit (two files + version bump)

1. `js/translations.js`: add the three keys directly after the last existing
   `news.N.*` line inside the `// News` block:
   ```js
   'news.N.date':  { en: '...', el: '...' },
   'news.N.title': { en: '...', el: '...' },
   'news.N.text':  { en: '...', el: '...' },
   ```
2. `news.html`: insert a new card as the **first** child of `.news-grid`
   (newest first). Single photo:
   ```html
   <div class="news-card">
     <div class="news-image">
       <img src="images/<file>" alt="<Greek description of the photo>" loading="lazy" decoding="async" width="<W>" height="<H>">
     </div>
     <div class="news-content">
       <div class="news-date" data-i18n="news.N.date">…Greek fallback…</div>
       <h3 data-i18n="news.N.title">…Greek fallback…</h3>
       <p data-i18n="news.N.text">…Greek fallback…</p>
     </div>
   </div>
   ```
   Two photos: wrap **exactly two** `<img>` in `<div class="news-gallery">`
   inside `.news-image` (see the news.4 card for the shape). The fallback text
   between the tags mirrors the Greek strings.
3. Update `og:image` in the `<head>` of `news.html` to the new image's absolute
   URL.
4. Cache-bust: read the current version from news.html's
   `css/style.css?v=N` and replace `?v=N` with `?v=N+1` for **both** the CSS and
   JS references in **all 7** root HTML pages (index, about, products, services,
   news, gallery, contact).
5. **Validation gates — all must pass before anything is committed:**
   - `node --check js/translations.js` exits 0;
   - the three `news.N.` keys exist in both `js/translations.js` and
     `news.html`;
   - each new translations line contains both `en:` and `el:`;
   - all 7 pages carry the same new `?v=` number (2 references each).
   If any gate fails, fix it; never push broken JS.

## 5. Confirmation checkpoint (mandatory)

Present **one message** with: the site text (EL and EN), the image filename +
dimensions (+ the IG crop note if one was made), the Facebook caption, the
Instagram caption + hashtags, the newsletter subject + body text, the LinkedIn
text, the Google Business text, and the list of channels that will be skipped
as not-yet-connected. State explicitly: *on approval this goes to the live
website, Facebook, Instagram and all newsletter subscribers — the social posts
and the email cannot be unsent.* Apply any requested edits and re-confirm.
**No push, no post, no send before an explicit yes.**

## 6. Publish the website

1. Commit both files + image(s) with a message like
   `Add news item: <Greek title> (news.N)` and `git push origin main`
   (retry network failures up to 4× with 2/4/8/16 s backoff).
   If pushing `main` is rejected (branch-restricted session): push a
   `news/<slug>` branch and open + merge a PR to `main` with the GitHub MCP
   tools (`create_pull_request`, `merge_pull_request`), then continue.
2. **Deploy verification loop** (GitHub Pages usually deploys in ~2 min): poll
   every 20–30 s, up to 10 min. Primary check — works even when the sandbox
   network policy blocks the site's own domain: the **`pages build and
   deployment` workflow run** for the pushed commit on
   `ntstathis/hellenic-trailers` completed successfully (GitHub MCP
   `actions_list` / `actions_get`). If `hellenictrailers.gr` is allowed in the
   environment network policy, additionally confirm directly, until **both**:
   - `curl -s -o /dev/null -w '%{http_code}' "https://hellenictrailers.gr/images/<file>?cb=<epoch>"` → `200`;
   - `curl -s "https://hellenictrailers.gr/news.html?cb=<epoch>"` contains
     `news.N.title`.
   A curl result of HTTP code `000` (CONNECT tunnel failed) means the domain is
   blocked by the network policy — **not** a failed deploy; rely on the Pages
   build check. On timeout: stop **before** any social step, report, and offer
   to resume — the run is cleanly resumable because the site half is done.

## 7. Facebook post

```bash
curl -sS -X POST "https://graph.facebook.com/${FB_PAGE_ID}/photos" \
  --data-urlencode "url=https://hellenictrailers.gr/images/<file>" \
  --data-urlencode "message=<FB caption>" \
  --data-urlencode "access_token=${META_PAGE_ACCESS_TOKEN}"
```
Success returns `{"id": "...", "post_id": "<PAGEID_POSTID>"}` → post URL is
`https://www.facebook.com/<post_id>`. Never echo the token in output or logs.

## 8. Instagram post

Two calls (use the `-ig.jpg` crop variant's URL if one was made):
```bash
curl -sS -X POST "https://graph.facebook.com/${IG_USER_ID}/media" \
  --data-urlencode "image_url=https://hellenictrailers.gr/images/<file>" \
  --data-urlencode "caption=<IG caption>" \
  --data-urlencode "access_token=${META_PAGE_ACCESS_TOKEN}"
# → {"id": "<creation_id>"}
curl -sS -X POST "https://graph.facebook.com/${IG_USER_ID}/media_publish" \
  --data-urlencode "creation_id=<creation_id>" \
  --data-urlencode "access_token=${META_PAGE_ACCESS_TOKEN}"
# → {"id": "<media_id>"}
```
Then `GET /<media_id>?fields=permalink` for the post link. If `media` returns a
"media not ready" style error, wait ~10 s and retry `media_publish` (up to 3×).

## 9. Newsletter (MailerLite connector)

Two separate steps — **never** a combined create-and-send, so a failure in
between leaves a reviewable draft, which is the correct failure state:

1. Create a campaign: group `Hellenic Trailers Newsletter`, the approved
   subject, sender Hellenic Trailers `<ikaragiotis@hellenictrailers.gr>`.
   Body: simple single-column HTML — the image (via its live
   hellenictrailers.gr URL), the Greek title as heading, the Greek text, a
   button link to `https://hellenictrailers.gr/news.html`. MailerLite injects
   the mandatory unsubscribe footer itself.
2. Send it. Record the campaign id and (if returned) the web/archive URL.

Fallback without the connector (requires env `MAILERLITE_API_KEY` and network
access to `connect.mailerlite.com`): `POST /api/campaigns` then
`POST /api/campaigns/{id}/schedule` with `"delivery": "instant"` — same
two-step rule.

## 10. LinkedIn + Google Business (manual paste)

Output the two approved text blocks again, each under a direct link:
- LinkedIn: the company page URL from §0 (post from the *Admin view*).
- Google Business: `https://business.google.com` → Ενημερώσεις/Posts.

## 11. Log and report

1. Append to `.claude/news-log.json`:
   ```json
   { "id": "news.N", "date": "<ISO date>", "title_el": "…", "title_en": "…",
     "image": "images/<file>", "facebook_post": "<url>",
     "instagram_post": "<url>", "mailerlite_campaign_id": "<id>",
     "skipped_channels": [] }
   ```
   Commit it (`Log news.N publication`) and push the same way as step 6.
2. Report to the owner: live news URL, Facebook post URL, Instagram permalink,
   campaign id/archive link, and the two paste-ready blocks — plus exactly what
   was skipped or failed and why.

## Failure handling

| Failure | Behavior |
|---|---|
| A validation gate in §4 fails | Fix or ask; **never** commit/push broken JS |
| Deploy not live after 10 min | Stop before social; report; resumable |
| FB / IG / MailerLite call fails | Continue the remaining channels; report the exact API error and hand the owner the drafted caption as paste-ready manual fallback |
| Meta token invalid (code 190) | Skip FB+IG, point to `MARKETING.md` §A regeneration guide |
| MailerLite connector missing | Skip newsletter, point to `MARKETING.md` §C step 5 |
| Wrong content discovered after publishing | Site: revert commit + push. FB/IG: the owner deletes the post in-app (or use the API `DELETE` on the post id if asked). Email: **cannot be recalled** — that is why step 5 exists |
