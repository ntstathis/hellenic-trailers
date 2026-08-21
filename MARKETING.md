# Marketing playbook

This document is the owner's guide to the marketing channels of hellenictrailers.gr:
what is connected, what each channel needs one time, and where every credential
lives. The day-to-day publishing itself is automated — see
[`.claude/skills/publish-news/SKILL.md`](.claude/skills/publish-news/SKILL.md)
(in a Claude Code chat on this repo, type `/publish-news`, attach a photo, paste
the news text).

**No secrets are ever stored in this repository.** The repository is public, so
tokens and API keys live only in the Claude Code environment variables (see
"Where credentials live" below — note that these are readable by anyone using
that environment, so keep it personal and scope tokens narrowly).

---

## Channel status

| Channel | How it publishes | One-time setup |
|---|---|---|
| Website (hellenictrailers.gr) | Push to `main` → GitHub Pages, live in ~2 min | ✅ done |
| Facebook | Claude posts via the Meta Graph API | ⬜ steps A + B below |
| Instagram | Claude posts via the Meta Graph API | ⬜ steps A + B below (IG Business account required) |
| Newsletter | Claude creates + sends campaigns via the MailerLite connector | 🔶 account, connector + group done — signup page & sender verification pending (step C) |
| LinkedIn | Claude prepares the post text, you paste it (≈30 sec) | ✅ done (2026-08-21) — page live, profile filled, linked from the site |
| Google Business Profile | Claude prepares the post text, you paste it | ✅ created + verified (2026-08-21), linked from the site |
| Site analytics | Cloudflare Web Analytics (cookieless, no cookie banner needed) | ✅ beacon on all pages + Claude can read the numbers via the API (2026-08-21) |
| WhatsApp | Visitors tap a button on the site and message +30 695 704 5716 | ✅ live on the site — set up WhatsApp Business, step G |
| Contact form | Formspree (the site's JS already supports it) | ⬜ step D below |

---

## To do next

In the order that gives the most back for the effort. **Who** is whoever
actually has to sit down and do it:

| # | Task | Who | Time |
|---|---|---|---|
| 1 | **WhatsApp Business** on +30 695 704 5716 (step G) — the button is already live on the site, so enquiries can arrive now | Iosif | ~10 min |
| 2 | **Meta app + Page token** (steps A + B) — the last piece before `/publish-news` posts to Facebook and Instagram by itself; the fiddliest item here, and needs a computer | Stathis | ~45 min |
| 3 | **GitHub account** so Iosif can edit the site too (step H) | Iosif creates it, Stathis approves | ~10 min |
| 4 | **MailerLite signup page + sender verification** (step C items 3, 4, 7) — until the signup page exists, nobody new can join the list | Iosif | ~15 min |
| 5 | **Formspree form id** (step D) — the contact form still falls back to opening the visitor's own mail program | either | ~15 min |

Send Claude any URL, id or token as you get it and it wires it into the site.

## Asked for, not started

Two things the owner has asked to be reminded about. Neither is site setup —
both are new capabilities, and both need a decision about **where the data
lives** before any work starts.

### 1. Import the existing customers into the mailing list

The owner sends Claude the current customer list (a spreadsheet, an export,
even a photographed sheet) and Claude loads it into the MailerLite group
`Hellenic Trailers Newsletter`.

Blocked on two things:

- **Consent (GDPR).** A list of people you have done business with is not
  automatically a list you may email marketing to. In the EU the usual lawful
  basis for an existing customer is the *soft opt-in*: they bought something
  comparable from you, you tell them clearly how to unsubscribe, and every
  message carries that link. That covers most of a B2B customer list, but it
  is a judgement per contact, not a blanket yes — and contacts who only ever
  asked for a quote are **not** covered. Tag every import with where the
  consent came from, so the record exists if it is ever questioned.
- **Step C must be finished first** (sender verification), otherwise the first
  campaign to a real list lands in spam and burns the domain's reputation.

### 2. An `/offer` skill, and a customer/potential database

The owner wants a skill that prepares a quotation, and — every time an offer
goes out — records the customer and an estimate of their potential, building
up a picture of the pipeline over time.

**Before any of this is built, decide where that database lives.** It must not
be this repository: **this repo is public**, so customer names, contacts, what
they were quoted and what they might be worth would be visible to anyone. That
is a commercial leak and, for named individuals, a personal-data breach.

Workable homes, roughly in order of least new machinery:

| Where | Good | Less good |
|---|---|---|
| MailerLite fields on each subscriber | already connected, no new account | built for email, not for deal values |
| A spreadsheet in the company's Dropbox / SharePoint | familiar, private, Claude can already reach both | no structure enforced; easy to end up with three versions |
| A **private** GitHub repository | versioned, same tooling as the site | one more repo to manage |

Whichever is chosen, the skill should write to it automatically at the moment
an offer is sent, rather than relying on anyone to update it afterwards — a
record kept by hand stops being kept within a month.

### Iosif's list

Three of the six are his. In the order to do them:

1. **WhatsApp Business** on **+30 695 704 5716** (step G). The button is
   already live on all 7 pages of the site, so a customer can message that
   number today — right now it arrives in a personal WhatsApp with no business
   profile, no opening hours and no away message behind it. This is the one
   worth doing first.
2. **GitHub account** (step H): sign up at <https://github.com/signup> with
   `ikaragiotis@hellenictrailers.gr`, turn on two-factor authentication, and
   send Stathis the username — Stathis then adds him to the repository and he
   accepts the emailed invitation. After that he can edit the website himself
   following [`EDITING.md`](EDITING.md).
3. **MailerLite** (step C): build the public signup landing page with double
   opt-in, then verify `ikaragiotis@hellenictrailers.gr` as the sender address
   — the confirmation email lands in his inbox, so only he can click it.

   ⚠️ **Check access first.** The MailerLite account is registered to
   `stathis@stathis.com.gr`. Iosif needs to get into that account to build the
   landing page — either Stathis shares the login, or Iosif is invited as a
   second user (MailerLite's free plan may not allow extra users; if it does
   not, either share the login or Stathis does this step instead).

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
the app already exists) and update the `META_PAGE_ACCESS_TOKEN` variable.

## B. Claude environment configuration (once, ~5 min)

**Use a computer for this step.** The Claude mobile app only *displays* the
environment name; creating and editing environments exists in the web
interface, and it relies on hovering, which touch screens do not do.

**How to open it** (there is no settings page or direct URL for this — docs:
<https://code.claude.com/docs/en/cloud-environments>):

1. Go to <https://claude.ai/code> in a desktop browser.
2. In the row **above the message box**, click the **cloud icon showing the
   environment's name** (usually `Default`).
3. Click **Add cloud environment** and name it `Hellenic Trailers`. (Editing
   the existing `Default` also works — hover over it and click the gear icon
   that appears on the right — but this account has *two* environments named
   `Default`, so a distinctly named one avoids editing the wrong one.)
4. Select that environment in the same menu before starting a session that
   needs these credentials.

**What to fill in:**

1. **Environment variables** — `.env` format, one `KEY=value` per line:
   ```
   META_PAGE_ACCESS_TOKEN=<the Page token from step A>
   FB_PAGE_ID=<numeric id>
   IG_USER_ID=<numeric id>
   CLOUDFLARE_API_TOKEN=<only if you want Claude to read analytics, step D>
   CLOUDFLARE_ACCOUNT_ID=<goes with the token above, see step D>
   ```
   Claude looks up the two numeric IDs for you once the token works.
2. **Network access** — choose **Custom**, then list one domain per line in
   **Allowed domains**:
   ```
   graph.facebook.com
   api.cloudflare.com
   hellenictrailers.gr
   ```
   Tick **"Also include default list of common package managers"**, otherwise
   only these three domains remain reachable and ordinary tooling breaks.
   Add `connect.mailerlite.com` only if the API fallback in step C is needed —
   the MailerLite *connector* does not need any domain here, because connector
   traffic goes through Anthropic's servers rather than the session's network.

> **About storing tokens here.** Cloud environments have **no dedicated secrets
> store**: environment variables are readable by anyone who uses that
> environment, and the dialog says so. For a personal environment that means
> only you — acceptable for these tokens — but scope every token as narrowly as
> possible (the Cloudflare one needs *Account Analytics: Read* and nothing
> else), never put them in this repository, and roll any token that has been
> pasted somewhere else.

**Changes apply to sessions you start afterwards.** A session that is already
running keeps the values it started with, so open a new Claude Code session
after saving the dialog.

## C. Newsletter: MailerLite (once, ~15 min) — **Iosif**

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
(Integrations → API), store it as env var `MAILERLITE_API_KEY`, and allow
`connect.mailerlite.com` in the environment network settings — Claude then uses
the REST API directly.

## D. Analytics, Search Console + contact form (once, ~15 min)

- **Google Search Console** — ✅ done: property verified and `sitemap.xml`
  submitted successfully (2026-08-21). It shows how the site appears in Google
  search (queries, clicks, indexing); data starts appearing within a few days.
  Optional hardening: add a second verification method (Settings → Ownership
  verification → *HTML file* shows a `googleXXXX.html` filename — give it to
  Claude to commit) so verification survives DNS changes.

- **Cloudflare Web Analytics** — ✅ done: site added and the beacon snippet is
  wired on all 7 pages (2026-08-21). Visitor numbers, top pages and referrers
  appear at <https://dash.cloudflare.com> → Web Analytics, from the first
  visit after deployment.

  *Optional — let Claude read the numbers instead of visiting the dashboard:*
  1. Cloudflare → **My Profile → API Tokens → Create Token → Custom token**,
     with the single permission **Account → Account Analytics → Read**, scoped
     to your account. Copy the token (it is shown only once).
  2. Add it as `CLOUDFLARE_API_TOKEN` and allow `api.cloudflare.com`, both in
     the environment dialog described in step B.
  3. Add `CLOUDFLARE_ACCOUNT_ID` as well. **This is required**: a token limited
     to *Account Analytics: Read* cannot list the account it belongs to
     (`/accounts` comes back empty), and every analytics query needs the id in
     its filter. Find it in the dashboard URL — open
     <https://dash.cloudflare.com>, and the address bar reads
     `dash.cloudflare.com/<32-character-account-id>/...`. It is an identifier,
     not a secret, but it stays out of this public repository all the same.

  Status 2026-08-21: ✅ **working end to end.** The token verifies, the
  `api.cloudflare.com` domain is allowed in the `Hellenic Trailers`
  environment, and a session successfully read the Web Analytics data through
  the GraphQL API. Just ask for the numbers in a chat — see "Asking for the
  numbers later" below.

  How Claude reads them, for reference: `POST https://api.cloudflare.com/client/v4/graphql`
  with the `rumPageloadEventsAdaptiveGroups` dataset inside
  `viewer { accounts(filter: {accountTag: <CLOUDFLARE_ACCOUNT_ID>}) }`, filtered
  on **`siteTag: "5829fd18257a47818306f7746413f7fd"`**. `count` is page views,
  `sum { visits }` is visits; useful dimensions are `requestPath`,
  `requestHost`, `countryName`, `refererHost`, `userAgentBrowser` and
  `datetimeMinute`.

  > ⚠️ **The site tag is not the beacon token.** Cloudflare Web Analytics uses
  > two different identifiers for the same site, and mixing them up makes every
  > query return an empty result with no error at all — it looks exactly like
  > "no visitors yet":
  >
  > | Identifier | Value | Where it is used |
  > |---|---|---|
  > | Beacon **token** | `32787cacf1cb44068e51c728ad9a984d` | the `data-cf-beacon` attribute in the pages (public, write-only) |
  > | Site **tag** | `5829fd18257a47818306f7746413f7fd` | the `siteTag` filter in the GraphQL API |
  >
  > The REST endpoint that lists both, `/rum/site_info/list`, returns 403 with a
  > token scoped to *Account Analytics: Read* only. To recover the site tag
  > without widening the token: query the dataset with **no** `siteTag` filter
  > and group by `dimensions { siteTag requestHost }` — the tag serving
  > `hellenictrailers.gr` is the right one.

  Steps 1–3 are yours to do — Claude cannot edit environment settings or the
  network policy, and until the domain is allowed every request to Cloudflare
  is refused by the gateway. Never paste the token into a chat message or any
  file in this repository; if it ever is exposed, roll it in the same API
  Tokens screen.
- **Formspree** (makes the contact form actually submit instead of opening the
  visitor's mail program): <https://formspree.io> → free account → *New form*
  (send submissions to `ikaragiotis@hellenictrailers.gr`) → copy the form's ID
  (the part after `/f/` in its endpoint URL) → Wiring checklist #6. The site's
  JavaScript already detects a real ID and switches from the mail-client
  fallback automatically.

## E. LinkedIn company page — ✅ done

The strongest channel for your actual buyers (fleet operators, logistics
managers). LinkedIn's posting API requires a lengthy partner approval, so
posting stays a 30-second manual paste: `/publish-news` hands you the finished
post text each time.

Status 2026-08-21: ✅ the page exists at
<https://www.linkedin.com/company/hellenic-trailers/> (company id `111771053`),
the profile is filled in, and it is wired into the footer of all 7 pages and
into the `sameAs` structured data. Nothing is outstanding — item 4 below is
ongoing audience-building, not setup.

1. ~~Create the page~~ — **done**.
2. ~~Fill in the profile~~ — **done**: logo, tagline, website, industry and
   location are all in.
3. ~~Give the page a readable address~~ — **done**:
   `linkedin.com/company/hellenic-trailers`. If it is ever changed again, send
   Claude the new one; LinkedIn keeps redirecting the old address, but the
   site should show the current one.
4. Invite the founding companies' employees and your customers' fleet managers
   to follow the page; repost each news item there.

## F. Google Business Profile — ✅ done

The biggest free local-search lever: it puts Hellenic Trailers on Google Maps
and in the results panel for searches like «ψυκτικά ημιρυμουλκούμενα»,
«σέρβις ψυγείων μεταφορών», «Lamberet Ελλάδα».

Status 2026-08-21: ✅ the profile is created, **verified**, and its website
field points at `https://hellenictrailers.gr`. Public listing:
<https://maps.app.goo.gl/2Cxz6ZVHtbEEnouh6>. On the site it is wired into the
`hasMap` structured data on the homepage, and the contact-page map now shows
the listing itself rather than a plain address pin.

Everything here is wired: the listing is embedded on the contact page, its
coordinates and `hasMap` are in the homepage structured data, and the review
link is in item 5 below.

1. ~~Create the profile~~ — **done**.
2. Primary category: *Trailer dealer* (Αντιπροσωπεία τρέιλερ); add secondary
   categories *Trailer repair shop* and *Truck accessories store* if offered.
3. Fill everything: phone `+30 210 3471032`, website, hours Δευ–Παρ 09:00–17:00,
   description (use the first paragraph of the site's «Η Εταιρεία» page),
   services (Πωλήσεις ψυκτικών οχημάτων, Συντήρηση & Επισκευές, Γνήσια
   Ανταλλακτικά Lamberet), photos of the facilities and deliveries.
4. Complete Google's verification (postcard/phone/video — whatever it offers).
5. After each delivery, ask the satisfied customer for a review. The review
   link is **<https://g.page/r/CXUUZGTpL2iSEBM/review>** — it opens the review
   box directly, so the customer does not have to search for you. Ready to send
   as it is, by WhatsApp or email:

   > Καλησπέρα σας! Σας ευχαριστούμε για την εμπιστοσύνη σας στη Hellenic
   > Trailers. Αν μείνατε ικανοποιημένοι από την παράδοση και την εξυπηρέτηση,
   > θα μας βοηθούσε πολύ μια σύντομη αξιολόγηση στο Google:
   > https://g.page/r/CXUUZGTpL2iSEBM/review
   > Ευχαριστούμε θερμά!

   Reviews are the single strongest factor in local ranking, so it is worth
   asking every time rather than occasionally.

6. `/publish-news` also hands you a short version of each news item formatted
   as a Google post («Ενημερώσεις») — paste it from the profile dashboard.

### The listing's details, for reference

- ~~The review link~~ — **done**, in item 5 above.
- ~~The geo coordinates~~ — **done**: `38.0724313, 23.5185569`, now in the
  homepage structured data.

The listing's own details, for reference: it is registered as **Hellenic
Trailers IKE - Lamberet Official Partner**, Plus Code `3GF9+2G`.

The postal address stays **Θέση Κάτω Πάτημα, Μάνδρα 196 00, Αττική** — on the
site, in the structured data and on the Google listing. Google's Plus Code
labels the locality nearest the map pin, which reads «Μαγούλα»; that is a map
artefact, not the address, and nothing on the site should be changed to match
it.

## G. WhatsApp click-to-chat (live on the site — set up the app, ~10 min) — **Iosif**

Every page carries a WhatsApp button that opens a chat to **+30 695 704 5716**
with the enquiry already typed, so a visitor only has to press send:

- **Desktop:** a green floating button, bottom right.
- **Phone:** a green icon in the bottom bar, between «Κλήση» and «Ζητήστε
  Προσφορά».
- **Contact page:** a WhatsApp card next to address, phone, email and hours.

The pre-filled message depends on the page — the products page mentions the
Lamberet range, the services page mentions service and spare parts — and it is
rewritten in English when a visitor switches the site to EN. These are plain
`wa.me` links: no third-party script, no cookies, nothing is requested from
Meta until someone actually taps, so there are no consent-banner implications.

**What is left for you:** install **WhatsApp Business** (free, from the app
store) on the phone holding that number, and fill in the business profile —
name Hellenic Trailers, address in Μάνδρα, hours Δευ–Παρ 09:00–17:00, website,
plus a greeting message and an away message for outside working hours.
Otherwise enquiries land in a personal WhatsApp with no business context.

To change the number or the wording later, ask Claude — the number lives in
`WHATSAPP_URL` in `js/translations.js` and in the `href` of each button, and
the messages are the `wa.msg.*` keys in the same file.

## H. Give Iosif access to the website (~10 min) — **Iosif signs up, Stathis approves**

The website lives in the GitHub repository, so Iosif
(`ikaragiotis@hellenictrailers.gr`) needs a GitHub account before he can edit
content or approve changes.

1. He creates a free account at <https://github.com/signup> using
   `ikaragiotis@hellenictrailers.gr`, and turns on two-factor authentication
   (GitHub requires it for contributors).
2. He sends you his GitHub username.
3. You add him at
   <https://github.com/ntstathis/hellenic-trailers/settings/access> →
   **Add people** → his username → role **Write** (can edit content and merge;
   choose **Admin** only if he should also manage settings and access).
4. He accepts the invitation by email.

Once he is in, he can edit the site through the GitHub website following
[`EDITING.md`](EDITING.md), review and merge pull requests, and — with his own
claude.ai account — run `/publish-news` on this repository himself. Note the
publishing credentials are per-person: the Meta token and the environment
variables described in step B live in *your* Claude environment, so he would
either set up his own or leave publishing to you.

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
| 3 | LinkedIn page URL | ✅ wired (2026-08-21) | footer of all 7 `*.html` |
| 4 | MailerLite hosted signup URL | `REPLACE-WITH-MAILERLITE-SIGNUP-URL` | footer of all 7 `*.html` + signup section in `news.html` |
| 5 | Cloudflare Analytics token | ✅ wired (2026-08-21) | before `</body>` in all 7 `*.html` |
| 6 | Formspree form ID | `YOUR_FORM_ID` | `contact.html` form `action` |
| 7 | Social URLs in structured data | 🔶 `sameAs` array added with LinkedIn — add FB + IG when they exist | JSON-LD block in `index.html` |
| 8 | Meta IDs + MailerLite group in the skill | `TO-BE-FILLED` markers | `.claude/skills/publish-news/SKILL.md` |
| 9 | WhatsApp number +30 695 704 5716 | ✅ wired (2026-08-21) | `WHATSAPP_URL` in `js/translations.js` + button `href` on all 7 `*.html` |

## Where credentials live

| Credential | Location | In the repo? |
|---|---|---|
| Meta Page access token | environment variable `META_PAGE_ACCESS_TOKEN` | **never** |
| Facebook Page ID / IG account ID | env vars `FB_PAGE_ID` / `IG_USER_ID` (public identifiers, also recorded in the skill) | IDs only |
| MailerLite access | claude.ai connector authorization (OAuth) — no token anywhere | never |
| MailerLite API key (fallback only) | environment variable `MAILERLITE_API_KEY` | **never** |
| Cloudflare beacon token | pasted in the HTML pages (public, write-only — safe by design) | yes |
| Cloudflare API token (optional, for reading stats) | environment variable `CLOUDFLARE_API_TOKEN` | **never** |
| Cloudflare account id | environment variable `CLOUDFLARE_ACCOUNT_ID` (an identifier, not a secret, but kept out of the public repo) | **never** |
| Formspree form ID | pasted in `contact.html` (public by design) | yes |
| WhatsApp number | in the page links (public by design — it is a contact number) | yes |

Environment variables are **not** a secrets vault: everyone who uses that
environment can read them. Keep the environment personal, give every token the
narrowest permission that works, and roll a token if it leaks.

## Asking for the numbers later

Once channels are live, ask in a Claude Code chat on this repo, for example:

- «Πώς πήγε το τελευταίο newsletter;» — opens/clicks from MailerLite.
- «Πόσους έφτασε το post για τη Φάρμα Μητσόπουλος;» — reach/impressions of the
  Facebook and Instagram posts via the Meta API.
- «Πόση επισκεψιμότητα είχε το site αυτόν τον μήνα;» — from Cloudflare.
- «Ποιες αναζητήσεις μας εμφανίζουν στο Google;» — Search Console has no
  connector here, so that one you read yourself at
  <https://search.google.com/search-console>.

WhatsApp conversations are not measurable from here either: they arrive in the
WhatsApp Business app, which keeps its own statistics on the phone.

Every published item is recorded in `.claude/news-log.json` (date, titles, image,
post links, campaign ID), so Claude can match a news item to its posts and
campaign without hunting.
