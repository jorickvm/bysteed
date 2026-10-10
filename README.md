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
- Google Search Console has the domain property `bysteed.com`, verified by DNS.

## Content rules

- Name on the page: "Jorick", never the full or last name.
- No em-dashes in user-facing copy.
- Each app's one-liner is approved by Jorick; do not reword it without asking.
- Icons in `assets/icons/` are 192px exports of each app's App Store icon, with a `-dark` variant where the app has one. Do not commit 1024px originals.

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
