// Shared page chrome, used only by the page-build scripts in scripts/*.mjs
// at authoring time. The output each script writes to the repo root is
// plain static HTML — Cloudflare Pages deploys it as-is, no build step.

const NAV_LINKS = [
  { href: "/", label: "Work", key: "work" },
  { href: "/resume", label: "Resume", key: "resume" },
  { href: "/about", label: "About", key: "about" },
];

/* 24px: the art fills 22.7 of the 24-unit viewBox, so it renders ~22.7px
   of ink — deliberately larger than the wordmark's 15px ascender, so the
   mark reads as a logo beside the name rather than as a letter in it.
   Scaled uniformly from the 16px version, so the orbits keep the density
   that stops the three crossings reading as a blob. */
const ATOM_MARK = `<svg class="atom-mark" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="1.6" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle class="atom-mark__electron" r="1.2" fill="currentColor" stroke="none" opacity="0"><animateMotion dur="1.5s" begin="indefinite" fill="remove" calcMode="spline" keyTimes="0;1" keySplines="0.45 0.05 0.55 0.95" path="M 2 12 a 10 4 0 1 0 20 0 a 10 4 0 1 0 -20 0"/><animate attributeName="opacity" dur="1.5s" begin="indefinite" fill="remove" values="0;1;1;0" keyTimes="0;0.18;0.82;1"/></circle></svg>`;

function nav(activeKey) {
  const links = NAV_LINKS.map(
    (l) =>
      `<a class="atm-topnav__link${l.key === activeKey ? " is-active" : ""}" href="${l.href}"${l.key === activeKey ? ' aria-current="page"' : ""}>${l.label}</a>`
  ).join("");

  return `
<nav class="atm-topnav">
  <a class="atm-topnav__brand" href="/">${ATOM_MARK} Ed Guillen</a>
  <div class="atm-topnav__links">${links}</div>
  <a class="atm-btn atm-btn--sm atm-btn--secondary" href="/contact">Contact</a>
  <button class="atm-iconbtn nav-toggle" data-nav-toggle aria-expanded="false" aria-controls="nav-sheet" aria-label="Open menu">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
  </button>
</nav>
<div class="nav-sheet" id="nav-sheet" data-nav-sheet hidden>
  <div class="nav-sheet__top">
    <a class="atm-topnav__brand" href="/">${ATOM_MARK} Ed Guillen</a>
    <button class="atm-iconbtn" data-nav-close aria-label="Close menu">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
  </div>
  <div class="nav-sheet__links">
    ${NAV_LINKS.map((l) => `<a href="${l.href}">${l.label}</a>`).join("\n    ")}
    <a href="/contact">Contact</a>
  </div>
</div>`;
}

const FOOTER = `
<footer class="page-footer">
  <div class="atm-container">
    <p class="t-body-sm" style="color:var(--ink-muted)">&copy; ${new Date().getFullYear()} Ed Guillen</p>
  </div>
</footer>`;

export function page({ title, description, activeNav, bodyHtml, path = "/" }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="https://www.uxed.me${path}">
<link rel="stylesheet" href="/assets/atomic-age/tokens.css">
<link rel="stylesheet" href="/assets/atomic-age/bundle.css">
<link rel="stylesheet" href="/assets/css/site.css">
</head>
<body class="atm-scope">
<a class="skip-link" href="#main">Skip to content</a>
<header>${nav(activeNav)}</header>
<main id="main">
${bodyHtml}
</main>
${FOOTER}
<script src="/assets/atomic-age/bundle.js"></script>
<script src="/assets/js/site.js"></script>
</body>
</html>
`;
}

export function articleHeader({ eyebrow, title, lede, meta }) {
  const metaRows = (meta || [])
    .map((m) => `<div><dt>${m[0]}</dt><dd>${m[1]}</dd></div>`)
    .join("\n    ");
  return `<div class="atm-container article-header">
  ${eyebrow ? `<p class="atm-eyebrow">${eyebrow}</p>` : ""}
  <h1>${title}</h1>
  ${lede ? `<p class="t-body-lg lede" style="color:var(--ink-secondary)">${lede}</p>` : ""}
  ${meta && meta.length ? `<dl class="meta-panel">\n    ${metaRows}\n  </dl>` : ""}
</div>`;
}

export function heroFigure(img, alt) {
  if (!img) return "";
  return `<div class="atm-container">
  <figure class="hero-figure">
    <img src="${img.src}" width="${img.width}" height="${img.height}" alt="${alt}" loading="eager">
  </figure>
</div>`;
}

export function figure(img, alt, { wide = false } = {}) {
  return `<figure class="${wide ? "figure--wide" : ""}">
      <img src="${img.src}" width="${img.width}" height="${img.height}" alt="${alt}" loading="lazy">
    </figure>`;
}

export function gallery(items) {
  // items: [{img, alt}], rendered as a responsive image grid
  return `<div class="hub-grid" style="margin:var(--space-8) 0">
      ${items
        .map(
          (it) =>
            `<figure style="margin:0"><img src="${it.img.src}" width="${it.img.width}" height="${it.img.height}" alt="${it.alt}" loading="lazy" style="border-radius:var(--radius-md);border:1.5px solid var(--border-strong)"></figure>`
        )
        .join("\n      ")}
    </div>`;
}

export function articleNav({ backHref = "/", backLabel = "← All work" } = {}) {
  return `<div class="atm-container">
  <div class="article-nav">
    <a class="atm-link t-body-sm" href="${backHref}">${backLabel}</a>
  </div>
</div>`;
}

export function caseCard({ href, img, alt, eyebrow, title, body }) {
  return `<a class="case-card atm-card" href="${href}">
  <div class="case-card__media"><img src="${img.src}" width="${img.width}" height="${img.height}" alt="${alt}" loading="lazy"></div>
  ${eyebrow ? `<p class="atm-card__eyebrow">${eyebrow}</p>` : ""}
  <h3 class="t-h4">${title}</h3>
  ${body ? `<p class="t-body-sm" style="color:var(--ink-secondary)">${body}</p>` : ""}
</a>`;
}

export function socialLinks() {
  return `<div class="social-row">
  <a class="atm-btn atm-btn--sm atm-btn--secondary" href="https://www.linkedin.com/in/eduardoguillenux" target="_blank" rel="noopener noreferrer">LinkedIn</a>
  <a class="atm-btn atm-btn--sm atm-btn--secondary" href="https://read.cv/uxed" target="_blank" rel="noopener noreferrer">read.cv</a>
  <a class="atm-btn atm-btn--sm atm-btn--secondary" href="https://www.instagram.com/edmakesbread/" target="_blank" rel="noopener noreferrer">Instagram</a>
</div>`;
}
