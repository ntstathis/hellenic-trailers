# Marketing playbook

This document is the owner's guide to the marketing channels of hellenictrailers.gr:
what is connected, what each channel needs one time, and where every credential
lives. The day-to-day publishing itself is automated — see
[`.claude/skills/publish-news/SKILL.md`](.claude/skills/publish-news/SKILL.md)
(in a Claude Code chat on this repo, type `/publish-news`, attach a photo, paste
the news text).

**No secrets are ever stored in this repository.** The repository is public, so
tokens and API keys live only in the Claude Code environment settings (see
"Where credentials live" below).

---

## Channel status

| Channel | How it publishes | One-time setup |
|---|---|---|
| Website (hellenictrailers.gr) | Push to `main` → GitHub Pages, live in ~2 min | ✅ done |
| Facebook | Claude posts via the Meta Graph API | ⬜ steps A + B below |
| Instagram | Claude posts via the Meta Graph API | ⬜ steps A + B below (IG Business account required) |
| Newsletter | Claude creates + sends campaigns via the MailerLite connector | 🔶 account, connector + group done — signup page & sender verification pending (step C) |
| LinkedIn | Claude prepares the post text, you paste it (≈30 sec) | ⬜ step E below |
| Google Business Profile | Claude prepares the post text, you paste it | ⬜ step F below |
| Site analytics | Cloudflare Web Analytics (cookieless, no cookie banner needed) | ⬜ step D below |
| Contact form | Formspree (the site's JS already supports it) | ⬜ step D below |

---

## A. Facebook + Instagram: create the Meta app and Page token (once, ~30–45 min)

Prerequisites: you are an **admin of the Hellenic Trailers Facebook Page**, and
the company Instagram account is a **Business (Professional) account linked to
that Page**. To convert/link Instagram (~5 min): Instagram app → Settings →
Account → *Switch to professional account* → Business; then link it to the Page
in Meta Business Suite (business.facebook.com) → Settings → *Linked accounts*
(or Page Settings → Instagram).

1. Go to <https://developers.facebook.com> and log in with the personal Facebook
   account that administers the Page. Accept the developer terms if asked.
2. **My Apps → Create App**. If asked for a use case choose **Other**, app type
   **Business**. Name it e.g. `Hellenic Trailers Publisher`. The app can stay in
   *Development mode* forever — that is enough for posting to your own Page and
   Instagram account and never requires Meta review.
3. Open the **Graph API Explorer**: <https://developers.facebook.com/tools/explorer>.
   - *Meta App*: select `Hellenic Trailers Publisher`.
   - Under *Permissions* add: `pages_show_list`, `pages_manage_posts`,
     `pages_read_engagement`, `instagram_basic`, `instagram_content_publish`,
     `business_management`.
   - Click **Generate Access Token** and, in the login dialog, select the
     Hellenic Trailers Page and the linked Instagram account, and allow all the
     requested permissions.
4. That token expires in ~1 hour — extend it: open the **Access Token Debugger**
   (<https://developers.facebook.com/tools/debug/accesstoken/>), paste the token,
   click **Extend Access Token** (bottom). Copy the extended (~60-day) token.
5. Get the **permanent Page token**: back in Graph API Explorer, paste the
   extended token into the token field, set the query to `me/accounts`, and
   Submit. In the response, find the Hellenic Trailers Page entry and copy its
   `access_token` — a Page token derived from a long-lived user token **does not
   expire**. (Verify in the Token Debugger: *Expires: Never*.)
6. Store it per "Where credentials live" below, then tell Claude "the Meta token
   is configured" — Claude verifies it with read-only calls, looks up and records
   the numeric Page ID and Instagram account ID, and runs a safe dry-run (an
   unpublished draft post that is deleted immediately; nothing appears publicly).

### If posting ever fails with "Error validating access token" (code 190)

The Page token was invalidated — this happens after a Facebook password change,
a security checkup, or removing the app. Fix: repeat steps 3–5 above (5 minutes,
the app already exists) and update the `META_PAGE_ACCESS_TOKEN` secret.

## B. Claude environment configuration (once, ~5 min)

In <https://claude.ai/code> → your environment's settings (docs:
<https://code.claude.com/docs/en/claude-code-on-the-web>):

1. **Environment variables** — add:
   - `META_PAGE_ACCESS_TOKEN` = the Page token from step A (mark it as a secret)
   - `FB_PAGE_ID` and `IG_USER_ID` — numeric IDs; Claude computes and gives you
     both when you finish step A, or ask Claude "look up my page IDs".
2. **Network access** — allow the domain `graph.facebook.com` (the sandbox
   blocks it by default; without this Claude cannot reach the Meta API), and
   ideally also `hellenictrailers.gr` (lets Claude check the live site
   directly; without it Claude falls back to GitHub's Pages build status).
   Only add `connect.mailerlite.com` too if the fallback in step C is needed.

## C. Newsletter: MailerLite (once, ~15 min)

MailerLite was chosen because it has a native Claude connector (no middleman),
a free tier of 1,000 subscribers / 12,000 emails per month, campaign statistics
Claude can read back for analysis, and it handles the EU-required consent,
double opt-in and unsubscribe automatically.

Status 2026-08-21: the account exists (stathis@stathis.com.gr), the Claude
connector is authorized, the group `Hellenic Trailers Newsletter`
(id `196439632318039915`) is created, and the owner is subscribed to it as a
built-in QA recipient. Remaining: steps 3, 4, 5 and 7 below.

1. ~~Create a free account at mailerlite.com~~ — **done**.
2. ~~Create one group named `Hellenic Trailers Newsletter`~~ — **done**
   (id `196439632318039915`).
3. Create the public signup page: in MailerLite go to **Sites → Landing
   pages**, create a simple signup page connected to that group — Greek text,
   **double opt-in on** — publish it and copy its URL. This goes into the
   site's signup links (Wiring checklist #4). The free plan includes landing
   pages (with MailerLite branding).
4. Verify the sender address so campaigns can come from
   `ikaragiotis@hellenictrailers.gr`: MailerLite → Account settings →
   *Senders* → add it and click the link in the confirmation email it
   receives. (Step 7 domain authentication also covers this.)
5. Import existing contacts **only if they have agreed to receive email from
   you** (GDPR); tag the import with where the consent came from.
6. ~~Authorize the MailerLite connector in claude.ai~~ — **done**.
7. Optional but recommended for deliverability: authenticate the
   `hellenictrailers.gr` domain in MailerLite (two DNS records — do this if you
   have access to the domain's DNS; emails then stop showing "via mailerlite").

Fallback if the connector ever proves insufficient: create a MailerLite API key
(Integrations → API), store it as env secret `MAILERLITE_API_KEY`, and allow
`connect.mailerlite.com` in the environment network settings — Claude then uses
the REST API directly.

## D. Analytics, Search Console + contact form (once, ~15 min)

- **Google Search Console** — ✅ property created and verified by the owner
  (2026-08-21). It shows how the site appears in Google search (queries,
  clicks, indexing). One follow-up: once the sitemap is live on the site,
  open Search Console → *Sitemaps* (Χάρτες ιστότοπου), enter `sitemap.xml`
  and Submit. Optional hardening: add a second verification method (Settings →
  Ownership verification → *HTML file* shows a `googleXXXX.html` filename —
  give it to Claude to commit) so verification survives DNS changes.

- **Cloudflare Web Analytics** (free, cookieless — no cookie banner needed):
  <https://dash.cloudflare.com> → Web Analytics → *Add a site* →
  `hellenictrailers.gr` (choose the JS-snippet option; the DNS does not move).
  From the snippet, copy the `token` value → Wiring checklist #5.
- **Formspree** (makes the contact form actually submit instead of opening the
  visitor's mail program): <https://formspree.io> → free account → *New form*
  (send submissions to `ikaragiotis@hellenictrailers.gr`) → copy the form's ID
  (the part after `/f/` in its endpoint URL) → Wiring checklist #6. The site's
  JavaScript already detects a real ID and switches from the mail-client
  fallback automatically.

## E. LinkedIn company page (once, ~15 min)

The strongest channel for your actual buyers (fleet operators, logistics
managers). LinkedIn's posting API requires a lengthy partner approval, so
posting stays a 30-second manual paste: `/publish-news` hands you the finished
post text each time.

1. <https://www.linkedin.com/company/setup/new/> — create **Hellenic Trailers**.
2. Logo (`images/logo-mark.svg` exported as PNG), tagline «Επίσημος
   Αντιπρόσωπος Lamberet στην Ελλάδα», website `https://hellenictrailers.gr`,
   industry *Truck Transportation*, location Μάνδρα Αττικής.
3. Copy the page URL (`https://www.linkedin.com/company/...`) → Wiring
   checklist #3.
4. Invite the founding companies' employees and your customers' fleet managers
   to follow the page; repost each news item there.

## F. Google Business Profile (once, ~30 min + verification wait)

The biggest free local-search lever: it puts Hellenic Trailers on Google Maps
and in the results panel for searches like «ψυκτικά ημιρυμουλκούμενα»,
«σέρβις ψυγείων μεταφορών», «Lamberet Ελλάδα».

1. <https://business.google.com> → *Add business* → **Hellenic Trailers**,
   address Θέση Κάτω Πάτημα, Μάνδρα 196 00, Αττική.
2. Primary category: *Trailer dealer* (Αντιπροσωπεία τρέιλερ); add secondary
   categories *Trailer repair shop* and *Truck accessories store* if offered.
3. Fill everything: phone `+30 210 3471032`, website, hours Δευ–Παρ 09:00–17:00,
   description (use the first paragraph of the site's «Η Εταιρεία» page),
   services (Πωλήσεις ψυκτικών οχημάτων, Συντήρηση & Επισκευές, Γνήσια
   Ανταλλακτικά Lamberet), photos of the facilities and deliveries.
4. Complete Google's verification (postcard/phone/video — whatever it offers).
5. After each delivery, ask the satisfied customer for a review. Template:

   > Καλησπέρα σας! Σας ευχαριστούμε για την εμπιστοσύνη σας στη Hellenic
   > Trailers. Αν μείνατε ικανοποιημένοι από την παράδοση και την εξυπηρέτηση,
   > θα μας βοηθούσε πολύ μια σύντομη αξιολόγηση στο Google: [σύνδεσμος από το
   > προφίλ σας]. Ευχαριστούμε θερμά!

6. `/publish-news` also hands you a short version of each news item formatted
   as a Google post («Ενημερώσεις») — paste it from the profile dashboard.

---

## Wiring checklist

The site already contains prepared, **commented-out** blocks for everything
above — they are invisible on the live site until activated, so nothing looks
broken while accounts are still being created. Each block is marked with a
`SETUP(...)` comment. To activate one, replace its placeholder with the real
value and remove the surrounding `<!-- ... -->` comment markers.

**Easiest way: paste the values into a Claude Code chat** («the Facebook page is
https://facebook.com/..., the MailerLite form is https://...») and ask Claude to
wire them in — it will also bump the `?v=` cache version and update the JSON-LD.

| # | Value | Placeholder to replace | Where it lives |
|---|---|---|---|
| 1 | Facebook Page URL | `REPLACE-WITH-FACEBOOK-PAGE-URL` | footer of all 7 `*.html` |
| 2 | Instagram profile URL | `REPLACE-WITH-INSTAGRAM-URL` | footer of all 7 `*.html` |
| 3 | LinkedIn page URL | `REPLACE-WITH-LINKEDIN-URL` | footer of all 7 `*.html` |
| 4 | MailerLite hosted signup URL | `REPLACE-WITH-MAILERLITE-SIGNUP-URL` | footer of all 7 `*.html` + signup section in `news.html` |
| 5 | Cloudflare Analytics token | `REPLACE-WITH-CF-TOKEN` | before `</body>` in all 7 `*.html` |
| 6 | Formspree form ID | `YOUR_FORM_ID` | `contact.html` form `action` |
| 7 | Social URLs in structured data | add a `"sameAs": [FB, IG, LinkedIn]` array | JSON-LD block in `index.html` |
| 8 | Meta IDs + MailerLite group in the skill | `TO-BE-FILLED` markers | `.claude/skills/publish-news/SKILL.md` |

## Where credentials live

| Credential | Location | In the repo? |
|---|---|---|
| Meta Page access token | Claude environment secret `META_PAGE_ACCESS_TOKEN` | **never** |
| Facebook Page ID / IG account ID | env vars `FB_PAGE_ID` / `IG_USER_ID` (public identifiers, also recorded in the skill) | IDs only |
| MailerLite access | claude.ai connector authorization (OAuth) | never |
| MailerLite API key (fallback only) | env secret `MAILERLITE_API_KEY` | **never** |
| Cloudflare Analytics token | pasted in the HTML pages (it is a public, write-only beacon token — safe) | yes |
| Formspree form ID | pasted in `contact.html` (public by design) | yes |

## Asking for the numbers later

Once channels are live, ask in a Claude Code chat on this repo, for example:

- «Πώς πήγε το τελευταίο newsletter;» — opens/clicks from MailerLite.
- «Πόσους έφτασε το post για τη Φάρμα Μητσόπουλος;» — reach/impressions of the
  Facebook and Instagram posts via the Meta API.
- «Πόση επισκεψιμότητα είχε το site αυτόν τον μήνα;» — from Cloudflare.

Every published item is recorded in `.claude/news-log.json` (date, titles, image,
post links, campaign ID), so Claude can match a news item to its posts and
campaign without hunting.
