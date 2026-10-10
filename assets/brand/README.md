# Steed visual mark

The approved mark is **High summit**: a wide, asymmetric mountain with an S-shaped trail that narrows toward the summit. Jorick approved this geometry and the monochrome and Bitcoin orange colour options on 2026-10-10.

## Assets

| File | Use |
| --- | --- |
| `steed-high-summit.svg` | Adaptive monochrome: near-black in light mode, off-white in dark mode. Suitable for the heading and SVG favicon. |
| `steed-high-summit-black.svg` | Fixed near-black (`#111112`) for light surfaces. |
| `steed-high-summit-white.svg` | Fixed off-white (`#fafaf8`) for dark surfaces. |
| `steed-high-summit-bitcoin-orange.svg` | Fixed Bitcoin orange (`#F7931A`) in both appearances. |
| `preview.svg` | Comparison on the site's light and dark backgrounds, including heading placement and 16, 24 and 32px specimens. Not a production logo asset. |

All marks have the same `0 0 32 32` viewBox, transparent backgrounds, and the approved geometry. The trail is a transparent cutout, so the surface underneath shows through. There are no fonts, external dependencies or raster elements in the marks.

## Integration

Use the SVGs as external images. For a mark alongside the visible brand name, leave the image alternative text empty to avoid repeating the name:

```html
<img src="/assets/brand/steed-high-summit.svg" width="28" height="28" alt="">
```

For the monochrome favicon:

```html
<link rel="icon" type="image/svg+xml" href="/assets/brand/steed-high-summit.svg">
```

Use `steed-high-summit-bitcoin-orange.svg` in either example for the orange treatment. The adaptive file follows `prefers-color-scheme`; use the fixed black or white files when the page surface does not follow system appearance. The black and white values match the approved near-black/off-white preview rather than pure `#000000`/`#FFFFFF`.

Preserve the square viewBox, aspect ratio and path geometry. If inlining instead of using an external image, give each instance unique title and mask IDs and update its references. Keep this maker mark separate from the app icons in `assets/icons/`.

## Where it is used

The adaptive monochrome mark is the favicon of the root pages (`index.html`, `404.html`) and sits before the homepage heading at 36px. The app pages under `shift/` and `stallion/` keep their own app icons.
