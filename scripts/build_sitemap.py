#!/usr/bin/env python3
"""Write sitemap.xml from the pages themselves.

Every HTML page that search may index is listed under its canonical URL. A page
is left out when it is the 404 page or carries a robots noindex. A listed page
must have a canonical URL that matches where the file is served.

Run from the repository root after adding, moving or removing a page:

    python3 scripts/build_sitemap.py          # write sitemap.xml
    python3 scripts/build_sitemap.py --check  # fail if sitemap.xml is stale
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://bysteed.com"
SKIP_DIRS = {".git", "scripts", "assets"}


def served_url(path: Path) -> str:
    relative = path.relative_to(ROOT).as_posix()
    if relative == "index.html":
        return f"{SITE}/"
    if relative.endswith("/index.html"):
        return f"{SITE}/{relative[: -len('index.html')]}"
    return f"{SITE}/{relative}"


def urls() -> list[str]:
    found, problems = [], []
    for path in sorted(ROOT.rglob("*.html")):
        if SKIP_DIRS & set(path.relative_to(ROOT).parts) or path.name == "404.html":
            continue
        source = path.read_text(encoding="utf-8")
        if re.search(r'<meta name="robots" content="[^"]*noindex', source):
            continue
        canonical = re.search(r'<link rel="canonical" href="([^"]+)"', source)
        if not canonical:
            problems.append(f"{path.relative_to(ROOT)}: no canonical URL")
        elif canonical.group(1) != served_url(path):
            problems.append(f"{path.relative_to(ROOT)}: canonical {canonical.group(1)} is not {served_url(path)}")
        else:
            found.append(canonical.group(1))
    if problems:
        raise SystemExit("\n".join(problems))
    return sorted(found, key=lambda url: (url.count("/"), url))


def render(listed: list[str]) -> str:
    entries = "\n".join(f"  <url><loc>{url}</loc></url>" for url in listed)
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{entries}\n"
        "</urlset>\n"
    )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--check", action="store_true", help="fail if sitemap.xml is stale")
    args = parser.parse_args()

    output = render(urls())
    target = ROOT / "sitemap.xml"
    if target.is_file() and target.read_text(encoding="utf-8") == output:
        return 0
    if args.check:
        print("sitemap.xml is out of date: run python3 scripts/build_sitemap.py", file=sys.stderr)
        return 1
    target.write_text(output, encoding="utf-8")
    print(f"wrote sitemap.xml with {output.count('<url>')} pages")
    return 0


if __name__ == "__main__":
    sys.exit(main())
