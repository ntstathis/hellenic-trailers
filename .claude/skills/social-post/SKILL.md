---
name: social-post
description: Write a social media post (Facebook + Instagram, plus paste-ready LinkedIn and Google Business text) from photos or a video and a few notes, show it to the owner, and publish it only after the owner's explicit OK. For posts that do NOT go on the website's news page or the newsletter (for those use /publish-news). Use when the owner says e.g. "φτιάξε ποστ", "ανάρτηση για…", "ανέβασε στα social", "ποστ στο facebook/instagram", "make a post".
---

# Social post: draft → owner's OK → publish

One run turns 1–20 photos **or** one video + the owner's notes into a Facebook
post and an Instagram post (single photo, carousel or Reel), and prepares
LinkedIn and Google Business text to paste by hand.

**Nothing is posted before the owner has seen the final texts and media and
answered with an explicit OK for this specific post (step 4).** «ΟΚ», «ναι»,
«ανέβασέ το», «προχώρα» count; comments, edits or silence do not — after any
edit, show the changed version and ask again.

Website news item or newsletter wanted as well? → use `/publish-news` instead.

## 0. Configuration

Same channels and credentials as `/publish-news` §0 (read it):
env `META_PAGE_ACCESS_TOKEN` (secret — never print it), `FB_PAGE_ID`,
`IG_USER_ID`; Graph API base `https://graph.facebook.com`. The Page token is
derived on every Facebook call exactly as in `/publish-news` §1.3; Instagram
calls use `META_PAGE_ACCESS_TOKEN` directly. Token problems (code 190): see
`MARKETING.md` §A.

**Meta cannot receive uploads from this sandbox** (its upload hosts are
unreachable), so every photo/video is first hosted on hellenictrailers.gr and
Meta fetches it from there — see step 5.

## 1. Inputs and preflight

1. Needed: the media (attached, or a Dropbox folder the owner names) and what the
   post is about (who / what / where / when). If a fact is missing, **ask —
   never invent customer names, models, specs, dates or claims.** No prices, no
   quotation details, no customer data beyond what the owner says may be named
   publicly (a delivered customer is named only if the owner says so).
2. Preflight (read-only): the three env vars are set; the Page-token
   derivation returns a token and `GET /{FB_PAGE_ID}/posts?limit=1` works.
   If Meta is not usable, say so now — the run can still produce the texts
   and the owner posts by hand.
3. `git fetch origin main dev`; working tree clean.

## 2. Media

Folder: `images/social/<YYYY-MM-DD>-<slug>/` for photos, `videos/<slug>.mp4`
for video (lowercase latin, dashes). Nothing on the site links to them.

**Photos** (ImageMagick `convert` or Pillow):
- JPEG, longest side ≤ 2000 px, each < 500 KB, files numbered in post order
  `01-….jpg`, `02-….jpg`. Convert PNG/HEIC to JPEG.
- Instagram accepts aspect ratios 4:5 (0.8) to 1.91:1 only, and a carousel shows
  every item in the **first** item's ratio. If any photo is outside the range,
  or a carousel mixes ratios, make centre-cropped `-ig.jpg` variants (usually
  all 4:5 portrait) used **only** for Instagram, and say so in step 4.
- Instagram carousel: max 10 items here (keep to 10 even though the API may
  allow more); Facebook can take all of them. If more than 10, ask the owner
  which 10 go to Instagram (default: the first 10).
- Skip / flag photos showing number plates, people's faces close up, or a
  previous owner's markings — ask before using them.

**Video** (`ffmpeg`): MP4, H.264 + AAC, `-movflags +faststart`, ≤ 1080 px wide,
video bitrate ≲ 5 Mbps (Instagram limit 25 Mbps), 3–90 s for a Reel, vertical
9:16 or 3:4 preferred. Also extract a cover frame JPEG for the preview.

## 3. Texts

Greek, formal plural (πληθυντικός ευγενείας), factual B2B tone like earlier
posts — concrete model, application, place; no exclamation-mark chains, no
superlatives that cannot be backed up. English only if the owner asks.

- **Facebook**: 2–5 sentences; at most 1–2 hashtags; may end with a link
  (`https://hellenictrailers.gr` or a specific page) if relevant.
- **Instagram**: shorter caption (1–3 sentences) + hashtag block on its own:
  base `#HellenicTrailers #Lamberet #ψυκτικάοχήματα #coldchain` + 2–4 specific
  ones. No links (dead in IG captions); «Περισσότερα στο link του προφίλ» is fine.
- **LinkedIn**: 3–5 sentences, slightly more technical/business, Greek.
- **Google Business**: ≤ 1500 characters, plain factual summary.
- Facebook @mentions go out as plain text through the API — if a Page should be
  tagged, tell the owner to add the tag by hand after posting.

## 4. Preview and approval (mandatory gate)

Send the owner the processed media (SendUserFile; for a video the cover frame +
the file) and **one message** with:
- post type per channel (FB: photo / multi-photo / video; IG: photo /
  carousel of N / Reel) and any IG crop note;
- the Facebook text, the Instagram caption + hashtags, the LinkedIn text, the
  Google Business text;
- what happens on OK: *the media files are pushed to hellenictrailers.gr (not
  linked from any page), then the Facebook and Instagram posts go live and
  cannot be unsent; LinkedIn and Google Business you paste yourself.*

Ask: «Να το ανεβάσω;». Apply edits and re-show until an explicit OK.
If the owner wants it posted later, note the time and do it then (no scheduling
API is used).

## 5. Host the media (only after the OK)

The media must be on the live site for Meta to fetch it:
1. `git checkout -B main origin/main`, add only the media files, commit
   (`Host the photos for the <topic> Facebook and Instagram post`), push `main`
   (retry network errors 4× with backoff 2/4/8/16 s). Then
   `git checkout -B dev origin/dev && git merge --no-edit origin/main` and push
   `dev`, so the two stay in step.
   Do **not** merge `dev` into `main` for this — only the media go to main.
2. Wait for GitHub Pages: the `pages build and deployment` run for that commit
   completes successfully (GitHub MCP `actions_list` / `actions_get`, poll
   ~30 s, up to 10 min). If `hellenictrailers.gr` is reachable, also check
   each file URL returns 200 (`?cb=<epoch>` to skip caches). HTTP `000` means the
   network policy blocks the domain, not a failed deploy. Timeout → stop, report,
   nothing posted yet.

Media URL = `https://hellenictrailers.gr/<path>`.

## 6. Facebook

Always derive the Page token in the same Bash call:
```bash
PAGE_TOKEN=$(curl -sS "https://graph.facebook.com/${FB_PAGE_ID}?fields=access_token&access_token=${META_PAGE_ACCESS_TOKEN}" \
  | python3 -c 'import json,sys;print(json.load(sys.stdin).get("access_token",""))')
```
- **One photo**: `POST /{FB_PAGE_ID}/photos` with `url=<media URL>`,
  `message=<FB text>`.
- **Several photos**: for each, `POST /{FB_PAGE_ID}/photos` with
  `url=…`, `published=false` → collect ids; then `POST /{FB_PAGE_ID}/feed` with
  `message=<FB text>` and `attached_media[i]={"media_fbid":"<id>"}` in order.
- **Video**: `POST /{FB_PAGE_ID}/videos` with `file_url=<video URL>`,
  `description=<FB text>`.

Use `--data-urlencode` for every field. Post URL: `https://www.facebook.com/<post_id or id>`.
Never echo either token.

## 7. Instagram

- **One photo**: `POST /{IG_USER_ID}/media` (`image_url`, `caption`) → creation id
  → `POST /{IG_USER_ID}/media_publish` (`creation_id`).
- **Carousel**: per item `POST /{IG_USER_ID}/media` with `image_url` and
  `is_carousel_item=true` → child ids; then `POST /{IG_USER_ID}/media` with
  `media_type=CAROUSEL`, `children=<id1,id2,…>`, `caption` → publish it.
- **Reel**: `POST /{IG_USER_ID}/media` with `media_type=REELS`, `video_url`,
  `caption`, `share_to_feed=true` → poll `GET /<creation_id>?fields=status_code`
  every ~10 s until `FINISHED` (max ~5 min; `ERROR` → report) → publish.

All with `access_token=${META_PAGE_ACCESS_TOKEN}`. If publish says the media is
not ready, wait ~10 s and retry (3×). Then `GET /<media_id>?fields=permalink`.

## 8. LinkedIn + Google Business

Repeat the two approved texts, each under its link: LinkedIn
`https://www.linkedin.com/company/hellenic-trailers/` (post from the admin
view, attach the same media); Google Business `https://business.google.com` →
Ενημερώσεις / Posts.

## 9. Log and report

Append to `.claude/social-log.json` (create it with
`{"comment": "Publication log written by /social-post.", "items": []}` if
missing):
```json
{ "date": "<ISO date>", "topic": "…", "media": ["images/social/…"],
  "facebook": "<url>", "instagram": "<permalink>",
  "linkedin": "paste by owner", "google_business": "paste by owner",
  "skipped": [] }
```
Commit on `dev` (`Log social post: <topic>`) and push `dev`.
Report to the owner: Facebook link, Instagram link, the two paste-ready
texts, and exactly what failed or was skipped and why.

## Failure handling

| Failure | Behaviour |
|---|---|
| Owner hasn't said OK | Post nothing. Ever. |
| Meta token invalid (code 190) | Skip FB + IG, give the texts and media for manual posting, point to `MARKETING.md` §A |
| Pages deploy not done in 10 min | Stop before posting; report; resumable |
| Facebook fails, Instagram not yet tried | Report the exact API error; ask before continuing with Instagram alone |
| Instagram fails after Facebook succeeded | Report; offer to retry or hand the caption for manual posting |
| Wrong content after posting | Tell the owner; delete only if they ask (`DELETE /<post_id>` with the Page token for FB, IG posts are deleted in the app) |
