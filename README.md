# bysteed.com

Source for [bysteed.com](https://bysteed.com), the home of Apps by Steed: a landing page for the apps, with product, privacy and support pages for Shift and Stallion in every language they ship in.

Static HTML and CSS published with GitHub Pages. There is no build step.

## Layout

```
index.html   landing page
shift/       Shift product, privacy and support pages, per language
stallion/    Stallion product, privacy and support pages, per language
assets/      shared scripts, app icons, brand marks and link previews
scripts/     sitemap and link-preview tooling
```

Shift's product pages are generated from its App Store metadata and committed here; the other pages are written by hand.

## Local preview

```bash
python3 -m http.server 8898
```

## Sitemap

```bash
python3 scripts/build_sitemap.py           # rewrite sitemap.xml
python3 scripts/build_sitemap.py --check   # fail if sitemap.xml is out of date
```

## License

Copyright © 2026 Apps by Steed. All rights reserved. The Quicksand and Nunito typefaces in `stallion/` are licensed under the SIL Open Font License (`stallion/OFL.txt`, `stallion/Nunito-OFL.txt`).
