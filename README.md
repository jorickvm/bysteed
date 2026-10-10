# bysteed.com

Jorick's personal maker site: a landing page for his apps, later a blog. "Steed" is Jorick's nickname and the name of the site; it is not an app name.

## How it works

- Hand-written HTML and CSS. No build step, no framework.
- GitHub Pages serves `main` from the repo root. **A push is live immediately.**
- `CNAME` holds `bysteed.com`. The domain is verified on Jorick's GitHub account.
- Preview locally with any static server from the repo root (links are root-relative), for example `python3 -m http.server 8898`.

## Content rules

- Name on the page: "Jorick", never the full or last name.
- No em-dashes in user-facing copy.
- Each app's one-liner is approved by Jorick; do not reword it without asking.
- Icons in `assets/icons/` are 192px exports of each app's App Store icon, with a `-dark` variant where the app has one. Do not commit 1024px originals.

## URL layout

Per-app pages live under paths: `/<app>/`, `/<app>/privacy/`, `/<app>/support/`. Each app folder may carry its own styling; Shift's pages must look like Shift, never like AtlasDays or this landing page.

## DNS

At Porkbun, on Porkbun's nameservers.

- Apex `A` and `AAAA`: GitHub Pages' addresses
- `www` `CNAME` to `jorickvm.github.io`
- TXT `_github-pages-challenge-jorickvm`: GitHub's domain verification. Keep it.
- `MX` and SPF TXT: Porkbun email forwarding (no forwards set up yet)
