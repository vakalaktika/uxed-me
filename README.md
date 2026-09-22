# uxed.me — portfolio site

Static site for Ed Guillen's portfolio. No build step required.

## Structure
- `index.html` — homepage
- `styles.css` — shared styles
- `work/` — public case studies
- `protected/` — pages meant to sit behind Cloudflare Access (password/login gate configured in Cloudflare, not in this code)

## Deploy
Connected to Cloudflare Pages. Every push to `main` auto-deploys to uxed.me.
