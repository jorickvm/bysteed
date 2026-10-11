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
  - `atlasdays-dark.png` is the app's dark icon cropped 32px per side at 1024px, because the source has its own light rim and corners baked in.
  - `stallion-dark.png` is the app's dark icon composited on Stallion's dark card colour (`#1A2333`), preserving its position in the light icon. The Stallion repository's `scripts/export_brand_assets.py --web-output <directory>` exports both icons, transparent light/dark page logos and the product link preview. Both Stallion appearances use the same brighter horse. Header variants remain selected through `.light-only` and `.dark-only` so the visitor's theme choice is respected.
  - Jorick asked for both variants on 2026-10-10.

## URL layout

Per-app pages live under paths: `/<app>/`, `/<app>/privacy/`, `/<app>/support/`. Translated pages go inside the app's folder, `/<app>/<code>/`, `/<app>/<code>/privacy/` and `/<app>/<code>/support/`, never in a language folder at the root. The app's own repo documents its pages (Shift: `Shift/AGENTS.md`). Each app folder may carry its own styling; Shift's pages must look like Shift, never like AtlasDays or this landing page.

## DNS

At Porkbun, on Porkbun's nameservers.

- Apex `A` and `AAAA`: GitHub Pages' addresses
- `www` `CNAME` to `jorickvm.github.io`
- TXT `_github-pages-challenge-jorickvm`: GitHub's domain verification. Keep it.
- Apex TXT `google-site-verification=…`: Google Search Console's domain verification. Keep it.
- `MX`, SPF TXT, three DKIM `CNAME`s (`protonmail*._domainkey`), `_dmarc` TXT and the `protonmail-verification` TXT: email on Proton Mail. Values come from Proton's domain settings.

## Email

`apps@bysteed.com` on Proton Mail, with catch-all on, so any other name at the domain lands in the same inbox. Each app publishes its own name (`shift@`, `stallion@`). Replies always go out from `apps@`.
