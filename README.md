# uxed.me — portfolio site

Static site for Ed Guillen's portfolio, built on the **Atomic Age** design system. No build step required to deploy — every `.html` file in this repo is served as-is.

## Structure

- `*.html` — every page, flat at the repo root (matches the original site's URLs, e.g. `cards-pattern.html` serves `/cards-pattern`)
- `protected/` — NDA-gated case studies, sit behind Cloudflare Access (configured in Cloudflare, not in this code)
- `assets/atomic-age/` — vendored copy of the Atomic Age `bundle.css` / `bundle.js`, plus a generated `tokens.css` (see below)
- `assets/css/site.css` — this site's layer on top of Atomic Age: the free-standing type scale, article/hub page layout, and the mobile nav sheet (the design system ships desktop-only nav)
- `assets/js/site.js` — mobile nav open/close + calls `AtomicAge.enhance()`
- `assets/img/<slug>/` — self-hosted, optimized WebP images (see the image pipeline below)
- `_redirects` — Cloudflare Pages redirects for renamed URLs

## Authoring model

Pages are **generated once by local Node scripts and the output is committed as plain HTML** — Cloudflare Pages never runs a build. This keeps deploys exactly as simple as before while avoiding hand-duplicating the header/nav/footer across 15 files during authoring.

- `scripts/layout.mjs` — shared page chrome (nav, footer, article header, figure/gallery helpers)
- `scripts/build-*.mjs` — one script per page (or small page group) that supplies the content and calls `page()` from `layout.mjs`
- `scripts/img.mjs` + `scripts/image-manifest.json` — looks up the optimized path/width/height for a source image by its original crawl filename

To edit a page's copy or structure, edit its `scripts/build-*.mjs` and re-run it (`node scripts/build-cards-pattern.mjs`, etc.), or edit the committed `.html` directly for a one-off tweak — the scripts aren't a source of truth Cloudflare depends on, just how this content was authored.

### Regenerating everything

```
node scripts/build-tokens.mjs   # only if atomic-age/tokens.json changes
node scripts/build-images.mjs   # only if uxed-crawl/images changes
for f in scripts/build-*.mjs; do node "$f"; done
```

## Image pipeline

`scripts/build-images.mjs` reads `../uxed-crawl/images/<slug>/*`, detects each file's *real* format (Squarespace served most of these as WebP under `.png`/`.jpg` filenames), resizes to a max width of 1600px (no upscaling), and writes WebP-only output to `assets/img/<slug>/`. It also writes `scripts/image-manifest.json`, mapping each original filename to `{src, width, height}` so pages can set explicit `<img width height>` and avoid layout shift.

## Deploy

Connected to Cloudflare Pages. Every push to `main` auto-deploys to uxed.me. No build command is configured — static file serving only.
