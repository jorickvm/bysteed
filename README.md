# bysteed.com

Jorick's personal maker site: a landing page for his apps, later a blog. "Steed" is Jorick's nickname and the name of the site; it is not an app name.

## How it works

- Hand-written HTML and CSS, no framework. The one exception is Shift's product pages (`shift/index.html`, `shift/<code>/index.html`): the Shift repository generates them from its App Store metadata (`scripts/build_product_pages.py` there), and the output is committed here. Do not edit them by hand.
- No build step at deploy time. `404.html` at the root serves every missing path.
- GitHub Pages serves `main` from the repo root. **A push is live immediately.**
- `CNAME` holds `bysteed.com`. The domain is verified on Jorick's GitHub account.
- Preview locally with any static server from the repo root (links are root-relative), for example `python3 -m http.server 8898`.

## Search

- Every page search may index has a canonical URL that matches its address. Only `404.html` is excluded.
- `sitemap.xml` is built from the pages by `python3 scripts/build_sitemap.py`: rerun it after adding, moving or removing a page; `--check` fails when it is stale. It skips any page with a robots `noindex`, and stops on a page whose canonical URL does not match its address.
- `robots.txt` allows everything and names the sitemap. `llms.txt` is a hand-written summary of the site for language models; update it when an app's pages or status change.
- Product pages carry Open Graph tags for link previews, with a 512px app icon from `assets/og/`.
- The homepage preview is `assets/og/home.png` (1200×630), drawn from the icons in `assets/icons/` by `swift scripts/build_og_home.swift . assets/og/home.png`. Redraw it when an app is added or an icon changes; the app list and order are in the script.
- Google Search Console has the domain property `bysteed.com`, verified by DNS.

## Analytics

- Cloudflare Web Analytics counts page loads: no cookies, no fingerprinting, no IP addresses kept. The site is `bysteed.com` in Jorick's Cloudflare account; atlasdays.app is a separate site there.
- `assets/analytics.js` holds the site token and loads Cloudflare's beacon. Every page loads it with `<script defer src="/assets/analytics.js"></script>` in its `<head>`, except the privacy pages: they state that the apps have no analytics, and must not trigger an analytics request themselves. Add the tag to every new page that is not a privacy page. Shift's product pages get it from the Shift generator.
- `?notrack` on any page stops counting that browser; `?notrack=off` turns it back on. Jorick uses it on his own devices.
- Localhost visits are never counted: Cloudflare only accepts reports from `bysteed.com`.

## Light and dark

- `assets/theme.js` sets `<html data-theme="light|dark">` from the system, or from the visitor's choice, which is kept for the whole site in `localStorage` (`bysteed-theme`). Choosing what the system already shows clears the choice. Every page loads it in its `<head>` without `defer`: `<script src="/assets/theme.js"></script>`.
- Stylesheets key their dark colours on `:root[data-theme="dark"]`, never on `prefers-color-scheme`. The same goes for images: the root stylesheet's `.light-only` and `.dark-only` classes swap them, because a `<picture>` source with a colour-scheme media query ignores the visitor's choice.
- Every page has a switch in its footer: one word naming the other theme ("Dark" in light mode, "Light" in dark mode), in the page's language. The markup is in `assets/theme.js`'s header comment. Shift's words per language live in `THEME_WORD` in the Shift repository's `scripts/build_product_pages.py`; its hand-written privacy and support pages use the same words.
- `?theme=light` or `?theme=dark` shows a page in that theme without saving it.

## Content rules

- Name on the page: "Jorick", never the full or last name.
- No em-dashes in user-facing copy.
- Each app's one-liner is approved by Jorick; do not reword it without asking.
- Icons in `assets/icons/` are 192px exports of each app's App Store icon, square and full-bleed (the page rounds the corners), each with a `-dark` variant for dark mode. Do not commit 1024px originals.
  - `atlasdays-dark.png` is the app's dark icon, resized like the light one: since AtlasDays 2.7 the source has clean dark corners, so it needs no crop.
  - `stallion-dark.png` is the app's dark icon composited on Stallion's dark card colour (`#1A2333`), preserving its position in the light icon. The Stallion repository's `scripts/export_brand_assets.py --web-output <directory>` exports both icons, transparent light/dark page logos and the product link preview. Both Stallion appearances use the same brighter horse. Header variants remain selected through `.light-only` and `.dark-only` so the visitor's theme choice is respected.
  - Jorick asked for both variants on 2026-10-10.
- Shift's product-page heading uses `shift/wordmark.png`, the transparent
  lettering from the app's shared `ShiftBrandWordmark` asset. The shared product
  stylesheet applies it as a mask in the current text colour, keeping the
  accessible heading text and the three dots' existing layout in every locale.
  Export Shift's icons from the app's light/dark AppIcon assets at 192px, its
  product link preview at 512px, and redraw the homepage preview when they change.

## Shift pages

Shift's repository owns the Store copy and the privacy claims; this repository owns how the pages look and behave.

- **Inventory:** `shift/privacy/` and `shift/support/` in English, and the same pair under `shift/<code>/` for each language with an App Store listing. The folders under `shift/` are the inventory.
- **Privacy and support pages** are hand-written; edit them in place. They are indexable (Jorick, 2026-10-10), carry a self-canonical URL and no `hreflang` alternates, and all use `shift/privacy/styles.css`. Bump the `?v=` on that stylesheet link in every page when it changes.
- **Privacy page look:** mirror the app's `PrivacyPolicyView` sheet: plain system background, one narrow text column, rounded typography, primary and secondary label colours, light or dark by the system unless the visitor chose. No hero, brand header, cards, pills, numbered sections, gradients or workout colours. The claims come from `Shift/Views/PrivacyPolicyView.swift` in the Shift repository.
- **Footer on privacy and support pages** (Jorick, 2026-10-10): centred, a "Shift" link to the language's product page (the English one where the language has none) and the light and dark switch.
- **The dots at the top of privacy and support pages** link to the same product page as the footer's "Shift" link (Jorick, 2026-10-27).
- **Product pages** are generated (see How it works). Their hand-written strings are `STORE_BUTTON`, `LANGUAGE_NAME`, `MORE_APPS` and `THEME_WORD` in the generator. They share `shift/style.css`, are indexable and carry `hreflang` alternates. They may use the workout colours (the setup screen's work and rest glows).
  - The heading's lockup, dots and wordmark together, links to the page's own address, as a site's logo does (Jorick, 2026-10-27).
  - Footer: one row of links: Privacy, Support, More apps, the language link and the theme word. A translated page links to English; the English page shows the visitor's browser language when it has a page, nothing otherwise, and never redirects.
  - The App Store button carries the campaign `web`. The listing's marketing URL ends in `?from=appstore`, which switches it to `appstore` (`STORE_SCRIPT` in the generator), so `web` counts only web visitors.
  - After a screenshot upload, the Shift repository reruns the generator with `--fetch-screenshots`, which fills `shift/screenshots/<code>/`.
- **Support email** is `shift@bysteed.com` (see Email). Builds up to 2.5 still show `shift@atlasdays.app`, which keeps working as a catch-all.

## URL layout

Per-app pages live under paths: `/<app>/`, `/<app>/privacy/`, `/<app>/support/`. Translated pages go inside the app's folder, `/<app>/<code>/`, `/<app>/<code>/privacy/` and `/<app>/<code>/support/`, never in a language folder at the root. Each app's page rules live here (Shift: Shift pages above; Stallion: below). Each app folder may carry its own styling; Shift's pages must look like Shift, never like AtlasDays or this landing page.

## Stallion pages

Hand-written, in Stallion's own look (`stallion/style.css`). Every Stallion page has the App Store button, with the campaign `web`. On `stallion/`, `?from=appstore` switches it to `appstore`, as on Shift's product pages; that only matters once the listing's marketing URL points at `https://bysteed.com/stallion/?from=appstore`. The screenshots in `stallion/screenshots/` are the App Store set, exported by the Stallion repository's `scripts/compose_store_screenshots.swift --web-output <this repository>`; their `alt` text is each shot's caption.

## DNS

At Porkbun, on Porkbun's nameservers.

- Apex `A` and `AAAA`: GitHub Pages' addresses
- `www` `CNAME` to `jorickvm.github.io`
- TXT `_github-pages-challenge-jorickvm`: GitHub's domain verification. Keep it.
- Apex TXT `google-site-verification=…`: Google Search Console's domain verification. Keep it.
- `MX`, SPF TXT, three DKIM `CNAME`s (`protonmail*._domainkey`), `_dmarc` TXT and the `protonmail-verification` TXT: email on Proton Mail. Values come from Proton's domain settings.

## Email

`apps@bysteed.com` on Proton Mail, with catch-all on, so any other name at the domain lands in the same inbox. Each app publishes its own name (`shift@`, `stallion@`). Replies always go out from `apps@`.
