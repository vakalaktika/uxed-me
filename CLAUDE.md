# Working agreements for this repo

## Always preview locally

After adding, creating, or changing any code, boot the local preview server
and give Ed the link — every time, without being asked:

```
npm start        # → http://127.0.0.1:8765
```

Then put the link at the end of the reply, on every message, whether or not
the server was (re)started that turn. `scripts/serve.mjs` has no dependencies
and mirrors Cloudflare Pages: static files from the repo root, extensionless
URLs resolving to `<name>.html`, and `_redirects` applied. `PORT=… npm start`
picks a different port.

Note for cloud sessions: the server runs inside the session container, so the
link is only reachable from there. Still provide it — and offer screenshots
(Chromium is preinstalled at `/opt/pw-browsers/chromium`) since those are what
Ed can actually see.

## Editing pages

Pages are generated: edit `scripts/build-<page>.mjs` and re-run it rather than
hand-editing the committed `.html`, or the next regeneration reverts the edit.
See README.md for the full authoring model.
