/* Homepage design explorations: six mockups on a spectrum between the
   production Atomic Age site (light, cream, bold Fraunces, image cards) and
   the friend's proposal (warm dark, huge light serif, coral, orbit lines,
   list-style work index). Writes mockups/1.html … 6.html + mockups/index.html.
   Standalone pages — they don't use layout.mjs or the Atomic Age bundle. */
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { img } from "./img.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "mockups");
mkdirSync(OUT, { recursive: true });

const photo = img("home", "9e8ac426-621a-44eb-abfd-1e0b8f384e92-Ed1.png").src;
const illo = "/mockups/img/ed-illustration.webp";

const work = [
  { href: "/cards-pattern", img: img("home", "e577fd47-4d5e-446d-9df1-3d7ab5fa4de5-cards-case-study.png").src, client: "EVERFI", eyebrow: "Design systems", title: "Unifying EVERFI’s card component", body: "Designing a cohesive and scalable card pattern across the EVERFI product ecosystem.", tags: ["Design system", "UX"] },
  { href: "/simulation-based-learning", img: img("home", "ca94c176-0cee-465d-8ccf-277354a4b764-simulation-based-learning.png").src, client: "EVERFI", eyebrow: "UX · Interaction design", title: "Simulation-based learning", body: "Immersive and engaging learning through realistic scenario-based experiences.", tags: ["UX", "Interaction", "Learning"] },
  { href: "/course-building-process", img: img("home", "be21c4ec-a4b0-4a65-bc79-606aa1e37515-process-case-study.png").src, client: "EVERFI", eyebrow: "IA · Process design", title: "Course building process design", body: "How EVERFI creates impactful learning experiences.", tags: ["Process", "IA", "Learning"] },
  { href: "/elements", img: img("home", "51b0f96e-13a8-43d8-bb5a-807f2c3eb7e4-elements-case-study.png").src, client: "EVERFI", eyebrow: "Design systems · IA", title: "Cohesive documentation design", body: "Creating a documentation toolkit to help new and current team members.", tags: ["Design system", "IA", "Docs"] },
  { href: "/solo-app-case-studies", img: img("home", "af9f4514-12f1-4065-bc6a-296cd6898ea0-image-asset.jpg").src, client: "3DR", eyebrow: "Product design", title: "3DR Solo App", body: "Mobile companion app for the Solo smart drone: flight controls, camera, and autonomous shot modes.", tags: ["Mobile", "Hardware"], other: true },
  { href: "/site-scan", img: img("home", "9ef89ff3-e8bc-49ae-a1c4-dceba0191a21-image-asset.jpg").src, client: "3DR", eyebrow: "Product design", title: "SiteScan App", body: "Tablet app for planning and capturing aerial site surveys for construction and engineering teams.", tags: ["Tablet", "Hardware"], other: true },
  { href: "/atat-attack", img: img("home", "84f0ef93-4ae9-4eae-8446-136ee59b6141-at-at-concept.jpg").src, client: "Side project", eyebrow: "Game design", title: "AT-AT Attack", body: "An augmented reality drone game, built for fun and for practising motion and interaction design.", tags: ["Game", "AR"], other: true },
];
const featured = work.filter((w) => !w.other);
const other = work.filter((w) => w.other);

const LEDE = "I bring systems thinking, empathy, and strategic clarity to help teams design smarter, build with purpose, and stay aligned. Also, I bake sourdough.";
const socials = [["Email", "/contact"], ["LinkedIn", "https://www.linkedin.com/in/edguillen"], ["Read.cv", "https://read.cv"], ["Instagram", "https://instagram.com"]];

// ---------- shared bits ----------
const atom = (size = 24, extra = "") => `<svg class="atom" ${extra} viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>`;

// The friend's signature: big, slowly turning orbits with electrons.
const orbits = (cls = "orbits") => `<svg class="${cls}" viewBox="-60 -60 120 120" fill="none" aria-hidden="true">
  <g class="orb orb--a"><ellipse rx="54" ry="20"/><circle class="e" cx="54" cy="0" r=".8"/></g>
  <g class="orb orb--b"><g transform="rotate(60)"><ellipse rx="54" ry="20"/><circle class="e" cx="-54" cy="0" r=".8"/></g></g>
  <g class="orb orb--c"><g transform="rotate(120)"><ellipse rx="54" ry="20"/><circle class="e" cx="0" cy="20" r=".65"/></g></g>
</svg>`;
const orbitCss = (stroke, sw = 0.25, e = "var(--accent)") => `
.orbits ellipse{stroke:${stroke};stroke-width:${sw};vector-effect:non-scaling-stroke}
.orbits .e{fill:${e};stroke:none}
.orb{transform-origin:0 0;animation:spin 90s linear infinite}
.orb--b{animation-duration:120s;animation-direction:reverse}.orb--c{animation-duration:150s}
@keyframes spin{to{transform:rotate(360deg)}}`;

const arrow = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
const themeBtn = `<button class="theme" type="button" aria-label="Toggle light and dark theme" onclick="var r=document.documentElement,t=r.dataset.theme==='dark'?'light':'dark';r.dataset.theme=t;try{localStorage.setItem('uxed-theme',t)}catch(e){}"><svg class="t-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg class="t-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button>`;

const nav = ({ toggle = false } = {}) => `<header class="nav"><div class="nav__in">
  <a class="brand" href="/">${atom(24)}<span>Ed Guillen</span></a>
  <nav class="links" aria-label="Primary"><a href="/" aria-current="page">Work</a><a href="/resume">Resume</a><a href="/about">About</a></nav>
  <div class="nav__end">${toggle ? themeBtn : ""}<a class="btn btn--ghost btn--sm" href="/contact">Contact</a><button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav-sheet" aria-label="Menu" onclick="var o=this.getAttribute('aria-expanded')==='true';this.setAttribute('aria-expanded',!o);document.getElementById('nav-sheet').hidden=o"><span></span><span></span></button></div>
</div><nav class="sheet" id="nav-sheet" aria-label="Primary" hidden><a href="/" aria-current="page">Work</a><a href="/resume">Resume</a><a href="/about">About</a><a href="/contact">Contact</a></nav></header>`;

const footer = () => `<footer class="foot"><div class="wrap foot__in"><span>© 2026 Ed Guillen</span><nav aria-label="Social">${socials.map(([l, h]) => `<a href="${h}">${l}</a>`).join("")}</nav></div></footer>`;

const tags = (t) => `<ul class="tags">${t.map((x) => `<li>${x}</li>`).join("")}</ul>`;

const BASE = `*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--body);font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:clip;transition:background .35s,color .35s}
img{display:block;max-width:100%;height:auto}
a{color:inherit;text-decoration:none}
h1,h2,h3,p{margin:0}
ul{margin:0;padding:0;list-style:none}
.wrap{width:min(1200px,100% - 32px);margin-inline:auto}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:4px}
.eyebrow{font-family:var(--ui);font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--accent)}
.btn{display:inline-flex;align-items:center;gap:10px;font-family:var(--ui);font-weight:600;font-size:14px;letter-spacing:.12em;text-transform:uppercase;padding:16px 30px;border-radius:999px;border:1px solid transparent;transition:background .2s,color .2s,border-color .2s,transform .2s}
.btn--cta{background:var(--accent);color:var(--on-accent)}.btn--cta:hover{background:var(--accent-hover)}
.btn--ghost{border-color:currentColor}.btn--ghost:hover{color:var(--accent)}
.btn--sm{padding:9px 18px;font-size:12px;border-radius:8px;min-height:44px}
.nav{position:sticky;top:0;z-index:20}
.nav__in{display:flex;align-items:center;justify-content:space-between;gap:16px;height:64px}
.brand{display:flex;align-items:center;gap:10px;font-family:var(--display);font-weight:700;font-size:20px}
.brand .atom{color:var(--accent);flex:none}
.links{display:flex;gap:28px;font-family:var(--ui);font-size:15px}
.links a{opacity:.75;padding:6px 0;border-bottom:2px solid transparent}.links a:hover{opacity:1}
.links a[aria-current]{opacity:1;border-color:var(--accent)}
.nav__end{display:flex;align-items:center;gap:10px}
.theme{width:44px;height:44px;border-radius:50%;border:1px solid currentColor;background:none;color:inherit;display:grid;place-items:center;cursor:pointer}
.theme:hover{color:var(--accent)}
.t-sun{display:none}.t-moon{display:block}[data-theme=dark] .t-sun{display:block}[data-theme=dark] .t-moon{display:none}
.tags{display:flex;flex-wrap:wrap;gap:6px}
.tags li{font-family:var(--ui);font-size:12px;padding:3px 11px;border:1px solid var(--line);border-radius:999px;color:var(--ink-2)}
.foot{border-top:1px solid var(--line);margin-top:96px}
.foot__in{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;padding-block:36px;font-family:var(--ui);font-size:13px;color:var(--ink-2)}
.foot nav{display:flex;gap:26px;flex-wrap:wrap}
.foot nav a{letter-spacing:.14em;text-transform:uppercase;font-weight:600;font-size:12px}.foot nav a:hover{color:var(--accent)}
.menu-btn{display:none;width:44px;height:44px;border:1px solid currentColor;border-radius:999px;background:none;color:inherit;cursor:pointer;flex-direction:column;justify-content:center;align-items:center;gap:6px}
.menu-btn span{display:block;width:18px;height:1.5px;background:currentColor;transition:transform .2s}
.menu-btn[aria-expanded=true] span:first-child{transform:translateY(3.75px) rotate(45deg)}.menu-btn[aria-expanded=true] span:last-child{transform:translateY(-3.75px) rotate(-45deg)}
.sheet{display:grid;padding:8px 16px 24px;background:var(--bg);color:var(--ink);border-bottom:1px solid var(--line)}
.sheet[hidden]{display:none}
.sheet a{font-family:var(--display);font-size:34px;line-height:1.2;padding:8px 0}.sheet a[aria-current]{color:var(--accent)}
@media (max-width:760px){.links,.nav__end .btn--sm{display:none}.menu-btn{display:flex}body{font-size:16px}}
@media (min-width:761px){.sheet{display:none!important}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}`;

const FONTS = {
  prod: "family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Jost:wght@400;500;600&family=Work+Sans:wght@400;500",
  friend: "family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;600",
  mix: "family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=DM+Sans:wght@400;500;600",
  gtl: "family=Jost:ital,wght@0,400..700;1,400..700&family=Space+Mono:wght@400;700",
  mix2: "family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Fraunces:ital,opsz,wght@0,9..144,600..700;1,9..144,400&family=Jost:wght@400;500;600&family=Work+Sans:wght@400;500",
};

const doc = ({ n, title, fonts, css, body, theme }) => `<!doctype html>
<html lang="en"${theme && theme !== "auto" ? ` data-theme="${theme}"` : ""}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Mockup ${n} · ${title}</title>
${theme === "auto" ? `<script>try{var t=localStorage.getItem("uxed-theme")}catch(e){}document.documentElement.dataset.theme=t||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")</script>` : ""}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${FONTS[fonts]}&display=swap">
<style>
${BASE}
${css}
.mock-badge{position:fixed;left:12px;bottom:12px;z-index:50;font:600 11px/1 system-ui,sans-serif;letter-spacing:.06em;background:#111;color:#fff;padding:8px 10px;border-radius:6px;opacity:.85}
.mock-badge a{color:#fff;text-decoration:underline}
</style>
</head>
<body>
${body}
<div class="mock-badge">Mockup ${n}/6 · ${title} · <a href="/mockups/">all</a></div>
</body>
</html>
`;

// Production-style image card
const card = (w, { showTags = false, showBody = true } = {}) => `<a class="card" href="${w.href}">
  <div class="card__img"><img src="${w.img}" alt="" loading="lazy"></div>
  <div class="card__txt"><p class="eyebrow">${w.eyebrow}</p><h3>${w.title}</h3>${showBody && w.body ? `<p class="card__body">${w.body}</p>` : ""}${showTags ? tags(w.tags) : ""}</div>
  <span class="card__go" aria-hidden="true">${arrow}</span>
</a>`;

// Friend-style index row
const row = (w, { thumb = false } = {}) => `<li><a class="row" href="${w.href}">
  ${thumb ? `<span class="row__thumb"><img src="${w.img}" alt="" loading="lazy"></span>` : ""}
  <span class="row__client"><b>${w.client[0]}</b>${w.client}</span>
  <span class="row__title"><span class="row__h">${w.title}</span><span class="eyebrow">${w.eyebrow}</span></span>
  <span class="row__desc">${w.body}${tags(w.tags)}</span>
  <span class="row__go" aria-hidden="true">${arrow}</span>
</a></li>`;

const PROD_TOKENS = `--bg:#f1ede7;--card:#faf7f4;--ink:#2a241d;--ink-2:#5a4f40;--line:rgba(42,36,29,.16);--accent:#c33a26;--accent-hover:#a52f1e;--on-accent:#fbf7f0;--navy:#16283a;--teal:#4bc2b0`;
const FRIEND_DARK = `--bg:#151312;--card:#211e1c;--ink:#f3ece0;--ink-2:#b8b0a4;--line:rgba(243,236,224,.14);--accent:#e8674a;--accent-hover:#f07d61;--on-accent:#151312;--navy:#16283a;--teal:#4bc2b0`;
const FRIEND_LIGHT = `--bg:#f7f4ee;--card:#fffdf9;--ink:#151312;--ink-2:#5c554d;--line:rgba(21,19,18,.14);--accent:#d4553a;--accent-hover:#b9452c;--on-accent:#fff;--navy:#16283a;--teal:#1f8a7d`;

const CARD_CSS = `
.card{position:relative;display:flex;flex-direction:column;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px;transition:transform .25s,box-shadow .25s,border-color .25s}
.card:hover{transform:translateY(-4px);box-shadow:0 18px 40px -24px rgba(0,0,0,.35);border-color:var(--accent)}
.card__img{border-radius:8px;overflow:hidden;aspect-ratio:4/3;background:var(--line)}
.card__img img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.card:hover .card__img img{transform:scale(1.04)}
.card__txt{padding-top:18px;display:grid;gap:6px;padding-right:44px}
.card h3{font-family:var(--display);font-size:21px;line-height:1.25;font-weight:600}
.card__body{font-size:15px;color:var(--ink-2)}
.card .tags{margin-top:6px}
.card__go{position:absolute;right:18px;bottom:18px;width:38px;height:38px;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center;transition:background .2s,color .2s,border-color .2s}
.card:hover .card__go{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:28px}`;

const ROW_CSS = `
.rows{border-top:1px solid var(--line)}
.rows li{border-bottom:1px solid var(--line)}
.row{display:grid;grid-template-columns:150px minmax(0,1.1fr) minmax(0,1.3fr) 48px;gap:28px;align-items:start;padding:34px 0;transition:padding .3s}
.row:hover{padding-left:12px}
.row__client{display:flex;align-items:center;gap:10px;font-family:var(--ui);font-size:13px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;padding-top:6px}
.row__client b{display:grid;place-items:center;width:26px;height:26px;border-radius:6px;background:var(--ink);color:var(--bg);font-size:12px}
.row__title{display:grid;gap:8px}
.row__h{font-family:var(--display);font-size:clamp(24px,2.4vw,30px);line-height:1.15;transition:color .2s}
.row:hover .row__h{color:var(--accent)}
.row__desc{display:grid;gap:12px;color:var(--ink-2);font-size:15px}
.row__go{width:48px;height:48px;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center;transition:background .2s,color .2s,border-color .2s}
.row:hover .row__go{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
@media (max-width:860px){.row{grid-template-columns:1fr 48px;gap:12px}.row__client{grid-column:1/-1}.row__desc{grid-column:1}.row__go{grid-row:2;grid-column:2}}`;

const filterChips = `<div class="chips" role="group" aria-label="Filter work">${["All", "Design system", "UX", "IA", "Learning", "Mobile", "Hardware", "Game"].map((c, i) => `<button type="button"${i === 0 ? ' aria-pressed="true"' : ""}>${c}</button>`).join("")}</div>`;
const CHIP_CSS = `.chips{display:flex;flex-wrap:wrap;gap:8px}
.chips button{font:500 14px var(--ui);color:inherit;background:none;border:1px solid var(--line);border-radius:999px;padding:8px 18px;min-height:44px;cursor:pointer}
.chips button:hover{border-color:var(--accent)}
.chips button[aria-pressed=true]{background:var(--ink);color:var(--bg);border-color:var(--ink)}`;
const chipJs = `<script>
document.querySelectorAll('.chips').forEach(g=>g.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));const f=b.textContent;
document.querySelectorAll('[data-tags]').forEach(li=>{li.hidden=f!=='All'&&!li.dataset.tags.split('|').includes(f)})}));
</script>`;
const tagged = (html, w) => html.replace("<li>", `<li data-tags="${w.tags.join("|")}">`);

// ---------- the six ----------
const variants = [];

// 1 — Production, polished. ~85% production.
variants.push({
  title: "Polished production",
  skew: 10,
  pitch: "Today’s site with a few of your friend’s moves: eyebrow-led hero, the coral full-stop, arrow affordances on cards, tags, and a social footer. Lowest risk.",
  fonts: "prod",
  css: `:root{${PROD_TOKENS};--display:"Fraunces",Georgia,serif;--ui:"Jost",system-ui,sans-serif;--body:"Work Sans",system-ui,sans-serif}
.nav{background:color-mix(in srgb,var(--card) 88%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.nav__in{width:min(1376px,100% - 32px);margin-inline:auto}
.hero{display:grid;grid-template-columns:1.1fr 1fr;gap:48px;align-items:center;padding-block:56px 32px}
.hero h1{font-family:var(--display);font-weight:700;font-size:clamp(52px,6.4vw,84px);line-height:1;letter-spacing:-.02em;margin-top:14px}
.dot{color:var(--accent)}
.hero__lede{font-size:19px;color:var(--ink-2);max-width:34ch;margin-top:22px}
.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:34px}
.panel{position:relative;background:var(--navy);aspect-ratio:1/0.95;display:grid;place-items:center;overflow:hidden;border-radius:4px}
.panel .atom-big{position:absolute;width:88%;color:#2e4a63}
.panel .atom-big ellipse{stroke-width:.5}
.panel .atom-big circle{display:none}
.portrait{position:relative;width:52%;aspect-ratio:1;border-radius:50%;overflow:hidden;border:3px solid var(--teal)}
.portrait img{width:100%;height:100%;object-fit:cover}
.sec{padding-top:96px}
.sec__head{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:36px;flex-wrap:wrap}
.sec h2{font-family:var(--display);font-weight:600;font-size:clamp(30px,3.2vw,40px);margin-top:10px}
.count{font-family:var(--ui);font-size:14px;color:var(--ink-2)}
${CARD_CSS}
.grid--4{grid-template-columns:repeat(4,1fr);gap:20px}.grid--4 .card{padding:16px}.grid--4 .card h3{font-size:19px}
@media (max-width:1100px){.grid--4{grid-template-columns:repeat(2,1fr)}}
@media (max-width:860px){.hero{grid-template-columns:1fr}.panel{order:-1;aspect-ratio:16/10}.grid--4{grid-template-columns:1fr}}`,
  body: () => `${nav()}
<main class="wrap">
<section class="hero">
  <div><p class="eyebrow">Senior product designer</p><h1>Hi, I’m Ed<span class="dot">.</span></h1><p class="hero__lede">${LEDE}</p>
  <div class="actions"><a class="btn btn--cta" href="#work">See the work</a><a class="btn btn--ghost" href="/about">About me</a></div></div>
  <div class="panel">${atom(24, 'style="width:88%;height:auto"').replace('class="atom"', 'class="atom-big"')}<div class="portrait"><img src="${photo}" alt="Portrait of Ed Guillen"></div></div>
</section>
<section class="sec" id="work"><div class="sec__head"><div><p class="eyebrow">Selected work</p><h2>EVERFI case studies</h2></div><span class="count">04 projects</span></div>
<div class="grid grid--4">${featured.map((w) => card(w, { showTags: true })).join("")}</div></section>
<section class="sec"><div class="sec__head"><div><p class="eyebrow">Other work</p><h2>Drones, games, and side projects</h2></div><a class="btn btn--ghost btn--sm" href="/other-work">Explore all</a></div>
<div class="grid">${other.map((w) => card(w, { showBody: false })).join("")}</div></section>
</main>${footer()}`,
});

// 2 — Light orbit. ~65% production.
variants.push({
  title: "Light orbit",
  skew: 30,
  pitch: "Keeps the cream palette, Fraunces and photo, but borrows the friend’s big airy type, floating pill nav and slowly turning orbit lines. Cards get bigger, two-up.",
  fonts: "prod",
  css: `:root{${PROD_TOKENS};--display:"Fraunces",Georgia,serif;--ui:"Jost",system-ui,sans-serif;--body:"Work Sans",system-ui,sans-serif}
.nav{top:12px;padding-inline:16px}
.nav__in{width:min(1200px,100%);margin-inline:auto;background:color-mix(in srgb,var(--card) 80%,transparent);backdrop-filter:blur(12px);border:1px solid var(--line);border-radius:16px;padding:0 12px 0 20px}
.hero{position:relative;overflow-x:clip;display:grid;grid-template-columns:1.2fr .8fr;align-items:center;min-height:calc(100vh - 90px);max-height:860px;padding-block:40px}
.hero h1{font-family:var(--display);font-weight:350;font-variation-settings:"opsz" 144;font-size:clamp(64px,9vw,138px);line-height:.92;letter-spacing:-.035em;margin-top:18px}
.hero h1 em{font-style:italic;color:var(--accent)}
.hero__lede{font-size:19px;color:var(--ink-2);max-width:40ch;margin-top:28px}
.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:34px}
.figure{position:relative;aspect-ratio:1;display:grid;place-items:center}
.figure .orbits{position:absolute;inset:-35%;width:170%;height:170%;overflow:visible}
.portrait{position:relative;width:62%;aspect-ratio:1;border-radius:50%;overflow:hidden;border:3px solid var(--teal);box-shadow:0 30px 60px -30px rgba(22,40,58,.6)}
.portrait img{width:100%;height:100%;object-fit:cover}
${orbitCss("var(--navy)", 0.9)}
.orbits ellipse{opacity:.35}
.sec{padding-top:110px}
.sec h2{font-family:var(--display);font-weight:350;font-size:clamp(36px,4.6vw,60px);letter-spacing:-.02em;line-height:1.05;margin:12px 0 44px}
.sec h2 em{color:var(--accent)}
${CARD_CSS}
.grid{grid-template-columns:repeat(2,1fr);gap:32px}
.card{padding:24px;border-radius:20px}.card h3{font-size:26px;font-weight:500}.card__img{aspect-ratio:16/10;border-radius:12px}
.grid--3{grid-template-columns:repeat(3,1fr)}
@media (max-width:860px){.hero{grid-template-columns:1fr;min-height:0}.figure{width:70%;margin:40px auto 0}.grid,.grid--3{grid-template-columns:1fr}}`,
  body: () => `${nav()}
<main class="wrap">
<section class="hero">
  <div><p class="eyebrow">Senior product designer</p><h1>Hi, I’m <br><em>Ed.</em></h1><p class="hero__lede">${LEDE}</p>
  <div class="actions"><a class="btn btn--cta" href="#work">See the work</a><a class="btn btn--ghost" href="/about">About me</a></div></div>
  <div class="figure">${orbits()}<div class="portrait"><img src="${photo}" alt="Portrait of Ed Guillen"></div></div>
</section>
<section class="sec" id="work"><p class="eyebrow">Selected work · EVERFI</p><h2>Systems that help <em>learning</em> scale.</h2>
<div class="grid">${featured.map((w) => card(w, { showTags: true })).join("")}</div></section>
<section class="sec"><p class="eyebrow">Other work</p><h2>Drones, games &amp; side projects.</h2>
<div class="grid grid--3">${other.map((w) => card(w, { showBody: false })).join("")}</div></section>
</main>${footer()}`,
});

// 3 — Editorial index on cream. ~50/50.
variants.push({
  title: "Editorial index",
  skew: 50,
  pitch: "Dead centre. Production’s light palette and photography; the friend’s giant light serif, italic accent, filter chips and list-style index — each row now carries a thumbnail so the work still leads.",
  fonts: "mix",
  theme: "auto",
  css: `:root{${FRIEND_LIGHT};--bg:#f1ede7;--card:#faf7f4;--accent:#b4432a;--accent-hover:#9a3822;--display:"Fraunces",Georgia,serif;--ui:"DM Sans",system-ui,sans-serif;--body:"DM Sans",system-ui,sans-serif;color-scheme:light}
[data-theme=dark]{--bg:#151312;--card:#211e1c;--ink:#f3ece0;--ink-2:#b8b0a4;--line:rgba(243,236,224,.14);--accent:#e8674a;--accent-hover:#f07d61;--on-accent:#151312;--teal:#4bc2b0;color-scheme:dark}
[data-theme=dark] .row__thumb{background:#2a2521}
[data-theme=dark] .row__thumb img{filter:brightness(.88)}[data-theme=dark] .row:hover .row__thumb img{filter:none}
.nav{background:color-mix(in srgb,var(--bg) 85%,transparent);backdrop-filter:blur(10px)}
.nav__in{width:min(1200px,100% - 32px);margin-inline:auto;border-bottom:1px solid var(--line)}
.hero{display:grid;grid-template-columns:auto 1fr;gap:clamp(24px,5vw,72px);align-items:end;padding-block:90px 70px;border-bottom:1px solid var(--line)}
.hero h1{font-family:var(--display);font-weight:300;font-variation-settings:"opsz" 144;font-size:clamp(68px,11vw,176px);line-height:.85;letter-spacing:-.045em}
.hero h1 em{font-style:italic;font-weight:400;color:var(--accent)}
.hero__side{display:grid;gap:22px;max-width:420px;padding-bottom:12px}
.hero__me{display:flex;align-items:center;gap:14px;font-family:var(--ui);font-size:14px;color:var(--ink-2)}
.hero__me img{width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid var(--teal)}
.hero__me b{display:block;color:var(--ink);font-weight:600}
.hero__lede{font-size:18px;color:var(--ink-2)}
.actions{display:flex;gap:12px;flex-wrap:wrap}
.sec{padding-top:80px}
.sec__head{display:flex;justify-content:space-between;align-items:end;gap:24px;flex-wrap:wrap;margin-bottom:34px}
.sec h2{font-family:var(--display);font-weight:300;font-size:clamp(40px,5vw,68px);letter-spacing:-.03em;line-height:1}
.sec h2 em{color:var(--accent)}
${CHIP_CSS}
${ROW_CSS}
.row{grid-template-columns:200px 130px minmax(0,1fr) minmax(0,1.1fr) 48px;align-items:center;padding:22px 0}
.row__thumb{aspect-ratio:4/3;border-radius:8px;overflow:hidden;border:1px solid var(--line);background:var(--card)}
.row__thumb img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.row:hover .row__thumb img{transform:scale(1.06)}
.row__client{padding-top:0}
@media (max-width:1000px){.row__client{display:none}.row{grid-template-columns:160px 1fr 48px}.row__desc{display:none}}
@media (max-width:860px){.hero{grid-template-columns:1fr}.row{grid-template-columns:110px 1fr 40px;gap:16px}.row__go{grid-row:auto;grid-column:auto;width:40px;height:40px}}`,
  body: () => `${nav({ toggle: true })}
<main class="wrap">
<section class="hero">
  <h1>Hi, I’m <br><em>Ed.</em></h1>
  <div class="hero__side"><div class="hero__me"><img src="${photo}" alt=""><span><b>Ed Guillen</b>Senior product designer</span></div><p class="hero__lede">${LEDE}</p>
  <div class="actions"><a class="btn btn--cta" href="#work">See the work</a><a class="btn btn--ghost" href="/about">About me</a></div></div>
</section>
<section class="sec" id="work"><div class="sec__head"><div><p class="eyebrow">Index</p><h2>Selected <em>work</em></h2></div>${filterChips}</div>
<ul class="rows">${work.map((w) => tagged(row(w, { thumb: true }), w)).join("")}</ul></section>
</main>${footer()}${chipJs}`,
});

// 4 — Navy night hero, cream body. ~45 production / 55 friend.
variants.push({
  title: "Night hero, day body",
  skew: 60,
  pitch: "The friend’s dramatic first impression — full-bleed dark hero, orbit lines, illustrated portrait, huge serif — but in production’s deep ink-blue. Scroll and you land back on the familiar cream case-study cards.",
  fonts: "mix2",
  css: `:root{${PROD_TOKENS};--display:"Libre Caslon Text",Georgia,serif;--ui:"Jost",system-ui,sans-serif;--body:"Work Sans",system-ui,sans-serif}
.nav{position:absolute;inset:0 0 auto;color:#f6efe3}
.nav__in{width:min(1200px,100% - 32px);margin-inline:auto;height:80px}
.nav .brand{font-family:"Fraunces",serif}
.hero{position:relative;background:var(--navy);color:#f6efe3;overflow:hidden}
.hero .orbits{position:absolute;right:-18%;top:50%;width:min(1100px,95vw);height:auto;transform:translateY(-50%);opacity:.9}
${orbitCss("rgba(246,239,227,.22)", 1, "#e56a4e")}
.hero__in{position:relative;display:grid;grid-template-columns:1.15fr .85fr;align-items:end;gap:40px;min-height:min(100vh,880px);padding-top:120px}
.hero__txt{padding-bottom:90px}
.hero .eyebrow{color:#e56a4e}
.hero h1{font-family:var(--display);font-weight:400;font-size:clamp(64px,9.5vw,148px);line-height:.95;letter-spacing:-.03em;margin-top:18px}
.hero h1 .dot{color:#e56a4e}
.hero__lede{font-size:19px;color:#cbbda6;max-width:42ch;margin-top:26px}
.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:34px}
.hero .btn--cta{background:#e56a4e;color:#16283a}
.hero__illo{align-self:end;max-width:520px;justify-self:end;filter:drop-shadow(0 30px 40px rgba(0,0,0,.35))}
.sec{padding-top:100px}
.sec h2{font-family:"Fraunces",serif;font-weight:600;font-size:clamp(30px,3.2vw,40px);margin:10px 0 36px}
${CARD_CSS}
.card h3{font-family:"Fraunces",serif}
.sec .grid{grid-template-columns:repeat(2,1fr);gap:32px}.sec .card__img{aspect-ratio:16/10}
@media (max-width:860px){.sec .grid{grid-template-columns:1fr}}
.band{margin-top:100px;background:var(--surface,#e5e0d6);padding:70px 0}
.band .grid{grid-template-columns:repeat(3,1fr)}
@media (max-width:860px){.hero__in{grid-template-columns:1fr}.hero__txt{padding-bottom:0}.hero__illo{max-width:300px;justify-self:center}.band .grid{grid-template-columns:1fr}}`,
  body: () => `${nav()}
<section class="hero">${orbits()}<div class="wrap hero__in">
  <div class="hero__txt"><p class="eyebrow">Senior product designer</p><h1>Hi, I’m Ed<span class="dot">.</span></h1><p class="hero__lede">${LEDE}</p>
  <div class="actions"><a class="btn btn--cta" href="#work">See the work</a><a class="btn btn--ghost" href="/about">About me</a></div></div>
  <img class="hero__illo" src="${illo}" alt="Illustrated portrait of Ed Guillen" width="900" height="900">
</div></section>
<main>
<section class="sec wrap" id="work"><p class="eyebrow">Selected work</p><h2>EVERFI case studies</h2>
<div class="grid">${featured.map((w) => card(w, { showTags: true })).join("")}</div></section>
<section class="band"><div class="wrap"><p class="eyebrow">Other work</p><h2 style="font-family:'Fraunces',serif;font-weight:600;font-size:clamp(30px,3.2vw,40px);margin:10px 0 36px">Drones, games, and side projects</h2>
<div class="grid">${other.map((w) => card(w, { showBody: false })).join("")}</div></div></section>
</main>${footer().replace('class="foot"', 'class="foot" style="margin-top:0"')}`,
});

// 5 — Warm dark, image-led. ~30 production / 70 friend.
variants.push({
  title: "Warm dark, image-led",
  skew: 75,
  pitch: "The friend’s warm-dark world (Caslon, DM Sans, coral, orbits, pill nav, theme toggle) — with production’s real photo in its teal ring and big image-first case-study cards so the homepage still shows the work.",
  fonts: "friend",
  theme: "dark",
  css: `:root,[data-theme=dark]{${FRIEND_DARK};--display:"Libre Caslon Text",Georgia,serif;--ui:"DM Sans",system-ui,sans-serif;--body:"DM Sans",system-ui,sans-serif}
[data-theme=light]{${FRIEND_LIGHT}}
.nav{top:12px;padding-inline:16px}
.nav__in{width:min(1280px,100%);margin-inline:auto;background:color-mix(in srgb,var(--bg) 70%,transparent);backdrop-filter:blur(14px);border:1px solid var(--line);border-radius:18px;padding:0 12px 0 20px;height:66px}
.links{position:absolute;left:50%;transform:translateX(-50%)}
.nav__in{position:relative}
.nav .btn--sm{border-radius:999px;padding:11px 20px}
.hero{position:relative;min-height:min(100vh,900px);display:grid;align-items:center;overflow:hidden;margin-top:-78px;padding-top:78px}
.hero .orbits{position:absolute;right:-12%;top:50%;width:min(1200px,110vw);transform:translateY(-50%)}
${orbitCss("var(--ink)", 1)}
.orbits ellipse{opacity:.28}
.hero__in{position:relative;display:grid;grid-template-columns:1.3fr .7fr;align-items:center;gap:40px}
.hero h1{font-family:var(--display);font-weight:400;font-size:clamp(68px,10vw,150px);line-height:.92;letter-spacing:-.03em;margin-top:16px}
.dot{color:var(--accent)}
.hero__lede{font-size:19px;color:var(--ink-2);max-width:40ch;margin-top:26px}
.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:34px}
.portrait{justify-self:center;width:min(340px,80%);aspect-ratio:1;border-radius:50%;overflow:hidden;border:3px solid var(--teal);box-shadow:0 0 0 14px color-mix(in srgb,var(--teal) 12%,transparent)}
.portrait img{width:100%;height:100%;object-fit:cover}
.sec{padding-top:110px}
.sec__head{display:flex;justify-content:space-between;align-items:end;flex-wrap:wrap;gap:20px;margin-bottom:40px}
.sec h2{font-family:var(--display);font-weight:400;font-size:clamp(44px,6vw,84px);letter-spacing:-.03em;line-height:1}
.sec h2 em{color:var(--accent)}
${CARD_CSS}
.card{background:transparent;border:0;padding:0;border-radius:0}
.card:hover{box-shadow:none;transform:none}
.card__img{border-radius:14px;aspect-ratio:16/10;border:1px solid var(--line)}
.card h3{font-family:var(--display);font-weight:400;font-size:28px}
.card__go{top:auto;bottom:auto;right:0;margin-top:0;position:absolute;top:calc(100% - 52px)}
.grid{grid-template-columns:repeat(2,1fr);gap:56px 40px}
.grid--3{grid-template-columns:repeat(3,1fr);gap:32px}
.grid--3 .card h3{font-size:22px}
@media (max-width:860px){.hero__in{grid-template-columns:1fr}.portrait{order:-1;width:180px}.grid,.grid--3{grid-template-columns:1fr}.links{position:static;transform:none}}`,
  body: () => `${nav({ toggle: true })}
<section class="hero">${orbits()}<div class="wrap hero__in">
  <div><p class="eyebrow">Senior product designer</p><h1>Hi, I’m <br>Ed<span class="dot">.</span></h1><p class="hero__lede">${LEDE}</p>
  <div class="actions"><a class="btn btn--cta" href="#work">See the work</a><a class="btn btn--ghost" href="/about">About me</a></div></div>
  <div class="portrait"><img src="${photo}" alt="Portrait of Ed Guillen"></div>
</div></section>
<main class="wrap">
<section class="sec" id="work"><div class="sec__head"><div><p class="eyebrow">Selected work · EVERFI</p></div></div>
<div class="grid">${featured.map((w) => card(w, { showTags: true })).join("")}</div></section>
<section class="sec"><div class="sec__head"><h2>Drones, games<br>&amp; <em>side projects.</em></h2><a class="btn btn--ghost" href="/other-work">Explore other work</a></div>
<div class="grid grid--3">${other.map((w) => card(w, { showBody: false })).join("")}</div></section>
</main>${footer()}`,
});

// 6 — Friend’s design, tuned. ~10% production.
variants.push({
  title: "Friend’s, tuned",
  skew: 90,
  pitch: "Essentially your friend’s design — dark, full-screen orbits, oversized Caslon, list index with filters — but the work index moves onto the homepage, a hover-preview shows each project’s image, and production’s teal/ink-blue return as quiet accents.",
  fonts: "friend",
  theme: "dark",
  css: `:root,[data-theme=dark]{${FRIEND_DARK};--display:"Libre Caslon Text",Georgia,serif;--ui:"DM Sans",system-ui,sans-serif;--body:"DM Sans",system-ui,sans-serif}
[data-theme=light]{${FRIEND_LIGHT}}
.nav{top:12px;padding-inline:16px}
.nav__in{position:relative;width:min(1280px,100%);margin-inline:auto;background:color-mix(in srgb,var(--bg) 70%,transparent);backdrop-filter:blur(14px);border:1px solid var(--line);border-radius:18px;padding:0 12px 0 20px;height:66px}
.links{position:absolute;left:50%;transform:translateX(-50%)}
.nav .btn--sm{border-radius:999px;padding:11px 20px}
.hero{position:relative;height:100vh;max-height:960px;min-height:640px;display:grid;align-items:end;overflow:hidden;margin-top:-78px}
.hero .orbits{position:absolute;left:20%;top:-10%;width:max(1300px,110vw);overflow:visible}
${orbitCss("var(--ink)", 1.3)}
.orbits ellipse{opacity:.32}
.orbits .e{fill:var(--teal)}
.hero__in{position:relative;padding-bottom:90px}
.hero h1{font-family:var(--display);font-weight:400;font-size:clamp(76px,12vw,180px);line-height:.9;letter-spacing:-.035em;margin-top:18px}
.dot{color:var(--accent)}
.hero__lede{font-size:20px;color:var(--ink-2);max-width:44ch;margin-top:28px}
.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:34px}
.sec{padding-top:120px}
.sec__head{display:grid;gap:30px;margin-bottom:46px}
.sec h2{font-family:var(--display);font-weight:400;font-size:clamp(52px,8vw,120px);line-height:.95;letter-spacing:-.035em}
.sec h2 em{color:var(--accent)}
${CHIP_CSS}
${ROW_CSS}
.row__client b{background:var(--teal);color:#0d1b1a}
.preview{position:fixed;left:0;top:0;width:320px;aspect-ratio:4/3;border-radius:12px;overflow:hidden;pointer-events:none;opacity:0;transform:translate(-50%,-50%) scale(.9);transition:opacity .2s,transform .2s;z-index:30;box-shadow:0 30px 60px -20px rgba(0,0,0,.6)}
.preview.on{opacity:1;transform:translate(-50%,-50%) scale(1)}
.preview img{width:100%;height:100%;object-fit:cover}
@media (max-width:860px){.links{position:static;transform:none}.preview{display:none}}`,
  body: () => `${nav({ toggle: true })}
<section class="hero">${orbits()}<div class="wrap hero__in">
  <p class="eyebrow">Senior product designer</p><h1>Hi, I’m <br>Ed<span class="dot">.</span></h1><p class="hero__lede">${LEDE}</p>
  <div class="actions"><a class="btn btn--cta" href="#work">See the work</a><a class="btn btn--ghost" href="/about">About me</a></div>
</div></section>
<main class="wrap">
<section class="sec" id="work"><div class="sec__head"><p class="eyebrow">Work</p><h2>Check out<br>some of <em>my work</em>.</h2>${filterChips}</div>
<ul class="rows">${work.map((w) => tagged(row(w).replace('class="row"', `class="row" data-img="${w.img}"`), w)).join("")}</ul></section>
</main>${footer()}
<div class="preview" aria-hidden="true"><img alt=""></div>
<script>
(()=>{const p=document.querySelector('.preview'),i=p.querySelector('img');
document.querySelectorAll('.row[data-img]').forEach(r=>{r.addEventListener('mouseenter',()=>{i.src=r.dataset.img;p.classList.add('on')});r.addEventListener('mouseleave',()=>p.classList.remove('on'))});
addEventListener('mousemove',e=>{p.style.left=e.clientX+180+'px';p.style.top=e.clientY+'px'})})();
</script>${chipJs}`,
});

variants.forEach((v, i) => {
  const n = i + 1;
  writeFileSync(path.join(OUT, `${n}.html`), doc({ n, title: v.title, fonts: v.fonts, css: v.css, body: v.body(), theme: v.theme }));
  console.log(`Wrote mockups/${n}.html`);
});


// ---------- 3 in the Good Times Lab design system ----------
// Tokens, type, shapes and voice from the Good Times Lab system
// (claude.ai design-system artifact): cream/ink/rust/seaglass/mustard, Jost in
// tracked caps, Space Mono numerals, hexagons + pills + straight edges, flat
// "print" offset shadows, no gradients or blur.
const hex = (cls, fill) => `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,2 93,26 93,74 50,98 7,74 7,26" fill="${fill}"/></svg>`;
const starburst = (cls) => `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true"><polygon fill="var(--mustard)" points="${Array.from({ length: 24 }, (_, i) => { const a = (i * Math.PI) / 12, r = i % 2 ? 30 : 50; return `${(50 + r * Math.sin(a)).toFixed(1)},${(50 - r * Math.cos(a)).toFixed(1)}`; }).join(" ")}"/></svg>`;
const clientBadge = { EVERFI: "rust", "3DR": "seaglass", "Side project": "mustard" };
const gtlRow = (w, i) => `<li data-tags="${w.tags.join("|")}"><a class="row" href="${w.href}">
  <span class="row__no">No. ${String(i + 1).padStart(2, "0")}</span>
  <span class="row__thumb"><img src="${w.img}" alt="" loading="lazy" width="400" height="300"></span>
  <span class="row__title"><span class="badge badge--${clientBadge[w.client]}">${w.client}</span><span class="row__h">${w.title}</span><span class="row__eyebrow">${w.eyebrow}</span></span>
  <span class="row__desc">${w.body}<ul class="tags">${w.tags.map((t) => `<li>${t}</li>`).join("")}</ul></span>
  <span class="row__go" aria-hidden="true">${arrow}</span>
</a></li>`;

const gtlCss = `:root{--cream:#F5E7CF;--seaglass:#B7CDCE;--rust:#CC522F;--mustard:#E0A63A;--avocado:#8C9A4B;--ink-0:#060809;
--bg:#F5E7CF;--card:#FCF6EA;--sunken:#EBDABD;--ink:#060809;--ink-2:#4A4F52;--line:#D6C3A3;--line-strong:#060809;
--accent:#A8401F;--rust-text:#A8401F;--rust-soft:#F4D9C6;--seaglass-text:#365E60;--seaglass-soft:#DCE7E5;--mustard-text:#79500F;--mustard-soft:#F7E1B0;
--on-accent:#060809;--accent-hover:#CC522F;--display:"Jost","Futura","Century Gothic",sans-serif;--ui:var(--display);--body:var(--display);--mono:"Space Mono",ui-monospace,Menlo,monospace;
--print-sm:3px 3px 0 #060809;--print:6px 6px 0 #060809;--focus:0 0 0 2px #F5E7CF,0 0 0 4px #060809;--ease:cubic-bezier(0.22,1,0.36,1)}
body{font-size:16px;line-height:26px}
:focus-visible{outline:none;box-shadow:var(--focus);border-radius:0}
.eyebrow{font-size:13px;line-height:16px;font-weight:600;letter-spacing:.24em;color:var(--rust-text)}
.nav{background:var(--bg);border-bottom:2px solid var(--line-strong)}
.nav__in{width:min(1200px,100% - 32px);margin-inline:auto;height:72px}
.brand{font-family:var(--display);font-weight:600;font-size:17px;letter-spacing:.14em;text-transform:uppercase;gap:12px}
.brand__mark{position:relative;width:34px;height:34px;flex:none}
.brand__mark svg{position:absolute;width:26px;height:26px}
.brand__mark .h1{left:0;top:0}.brand__mark .h2{left:8px;top:8px}
.links{gap:32px}
.links a{font-size:14px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;opacity:1;border-bottom:4px solid transparent;border-radius:0;padding:6px 0}
.links a:hover{color:var(--rust-text)}
.links a[aria-current]{border-color:var(--rust)}
.btn{font-size:14px;line-height:16px;letter-spacing:.08em;padding:14px 26px;border-radius:9999px;border:2px solid var(--ink);min-height:48px;transition:transform .15s var(--ease),box-shadow .15s var(--ease),background .15s ease-out}
.btn:hover{transform:translate(-2px,-2px);box-shadow:var(--print-sm)}
.btn:active{transform:none;box-shadow:none}
.btn--cta{background:var(--rust);color:var(--ink)}.btn--cta:hover{background:var(--rust)}
.btn--ghost{background:transparent;color:var(--ink)}.btn--ghost:hover{color:var(--ink);background:var(--seaglass)}
.btn--sm{padding:10px 20px;font-size:13px;border-radius:9999px;min-height:44px}
.menu-btn{border-width:2px}
.sheet{border-bottom:2px solid var(--ink)}
.sheet a{font-family:var(--display);font-weight:500;text-transform:uppercase;letter-spacing:.02em}
.sheet a[aria-current]{color:var(--rust-text)}
/* hero */
.hero{position:relative;display:grid;grid-template-columns:1.25fr 1fr;gap:clamp(32px,5vw,72px);align-items:center;padding-block:96px 96px}
.hero h1{font-weight:500;text-transform:uppercase;letter-spacing:.02em;font-size:clamp(52px,7.4vw,88px);line-height:.95}
.hero h1 .r{color:var(--rust-text)}
.hero__lede{font-size:19px;line-height:30px;color:var(--ink-2);max-width:36ch;margin-top:28px}
.actions{display:flex;gap:16px;flex-wrap:wrap;margin-top:36px}
.hero__art{position:relative;aspect-ratio:1;max-width:460px;width:100%;justify-self:end}
.hero__art .hx{position:absolute}
.hx--back{width:74%;left:0;top:4%}
.hx--front{width:74%;right:0;bottom:0}
.hero__portrait{position:absolute;width:62%;right:6%;bottom:6%;aspect-ratio:1;clip-path:polygon(50% 2%,93% 26%,93% 74%,50% 98%,7% 74%,7% 26%);background:var(--ink)}
.hero__portrait img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.1);mix-blend-mode:normal}
.hero__portrait::after{content:"";position:absolute;inset:0;background:var(--seaglass);mix-blend-mode:multiply}
.burst{position:absolute;width:22%;left:6%;bottom:8%}
.hero__tag{position:absolute;left:2%;top:46%;font:400 13px/1 var(--mono);background:var(--card);border:2px solid var(--ink);padding:8px 12px;box-shadow:var(--print-sm)}
/* divider: pill rule with a one-word label */
.divider{display:flex;align-items:center;gap:20px}
.divider::before,.divider::after{content:"";flex:1;height:4px;border-radius:9999px;background:var(--ink)}
/* section */
.sec{padding-top:64px}
.sec__head{display:flex;justify-content:space-between;align-items:end;gap:24px;flex-wrap:wrap;margin:56px 0 32px}
.sec h2{font-weight:500;font-size:36px;line-height:1.1;letter-spacing:.01em;margin-top:12px}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chips button{font:600 13px/16px var(--display);letter-spacing:.08em;text-transform:uppercase;color:var(--ink);background:transparent;border:2px solid var(--ink);border-radius:9999px;padding:12px 18px;min-height:44px;cursor:pointer;transition:background .15s ease-out}
.chips button:hover{background:var(--seaglass-soft)}
.chips button[aria-pressed=true]{background:var(--ink);color:var(--cream)}
.rows{border-top:2px solid var(--ink)}
.rows li{border-bottom:1px solid var(--line)}
.row{display:grid;grid-template-columns:64px 200px minmax(0,1fr) minmax(0,1fr) 52px;gap:28px;align-items:center;padding:28px 0}
.row__no{font:400 13px/1 var(--mono);color:var(--ink-2)}
.row__thumb{display:block;aspect-ratio:4/3;border:2px solid var(--ink);background:var(--seaglass);overflow:hidden;transition:transform .15s var(--ease),box-shadow .15s var(--ease)}
.row__thumb img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.05);mix-blend-mode:multiply;transition:filter .25s ease-out}
.row:hover .row__thumb{transform:translate(-3px,-3px);box-shadow:var(--print)}
.row:hover .row__thumb img{filter:none;mix-blend-mode:normal}
.row__title{display:grid;gap:8px;justify-items:start}
.row__h{font-size:24px;line-height:1.2;font-weight:600}
.row:hover .row__h{color:var(--rust-text)}
.row__eyebrow{font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-2)}
.badge{font:600 12px/14px var(--display);letter-spacing:.08em;text-transform:uppercase;padding:5px 10px;border-radius:9999px}
.badge--rust{background:var(--rust-soft);color:var(--rust-text)}
.badge--seaglass{background:var(--seaglass-soft);color:var(--seaglass-text)}
.badge--mustard{background:var(--mustard-soft);color:var(--mustard-text)}
.row__desc{display:grid;gap:14px;color:var(--ink-2)}
.tags li{font:600 11px/14px var(--display);letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--ink-2);color:var(--ink-2)}
.row__go{width:52px;height:52px;border-radius:9999px;border:2px solid var(--ink);display:grid;place-items:center;transition:transform .15s var(--ease),box-shadow .15s var(--ease),background .15s ease-out}
.row:hover .row__go{background:var(--rust);transform:translate(-2px,-2px);box-shadow:var(--print-sm)}
/* footer as the inverse badge */
.foot{margin-top:120px;border:0;background:var(--ink);color:var(--cream)}
.foot__in{color:var(--cream);padding-block:48px}
.foot nav a{font-size:13px;letter-spacing:.08em}
.foot nav a:hover{color:var(--rust)}
.foot__cta{display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;padding-block:72px 48px;border-bottom:1px solid #2A2F31}
.foot__cta p{font-weight:500;text-transform:uppercase;letter-spacing:.02em;font-size:clamp(36px,5vw,56px);line-height:1}
.foot .btn--cta{border-color:var(--cream)}
.foot .btn--cta:hover{box-shadow:3px 3px 0 var(--cream)}
@media (max-width:1000px){.row{grid-template-columns:48px 160px 1fr 52px}.row__desc{display:none}}
@media (max-width:860px){.hero{grid-template-columns:1fr;padding-block:56px}.hero__art{justify-self:center;max-width:340px;order:-1}.row{grid-template-columns:112px 1fr 44px;gap:16px}.row__no{display:none}.row__h{font-size:19px}.row__go{width:44px;height:44px}}
@media (max-width:600px){.hero h1{font-size:clamp(40px,11.5vw,52px)}.sec h2{font-size:30px}}`;

const gtlBody = () => {
  const header = nav().replace(atom(24), `<span class="brand__mark">${hex("h1", "var(--seaglass)")}${hex("h2", "var(--rust)")}</span>`);
  return `${header}
<main class="wrap">
<section class="hero">
  <div><p class="eyebrow">Senior product designer</p><h1 style="margin-top:20px">Hi, I’m <br><span class="r">Ed.</span></h1><p class="hero__lede">${LEDE}</p>
  <div class="actions"><a class="btn btn--cta" href="#work">See the work</a><a class="btn btn--ghost" href="/about">About me</a></div></div>
  <div class="hero__art">${hex("hx hx--back", "var(--seaglass)")}${hex("hx hx--front", "var(--rust)")}<div class="hero__portrait"><img src="${photo}" alt="Portrait of Ed Guillen"></div>${starburst("burst")}<span class="hero__tag">${work.length} projects</span></div>
</section>
<div class="divider"><p class="eyebrow">Work</p></div>
<section class="sec" id="work"><div class="sec__head"><h2>Selected work</h2>${filterChips}</div>
<ul class="rows">${work.map(gtlRow).join("")}</ul></section>
</main>
<footer class="foot"><div class="wrap"><div class="foot__cta"><p>Let’s make<br>something good.</p><a class="btn btn--cta" href="/contact">Get in touch</a></div>
<div class="foot__in"><span>© 2026 Ed Guillen</span><nav aria-label="Social">${socials.map(([l, h]) => `<a href="${h}">${l}</a>`).join("")}</nav></div></div></footer>${chipJs}`;
};
writeFileSync(path.join(OUT, "3-gtl.html"), doc({ n: "3B", title: "Editorial index · Good Times Lab", fonts: "gtl", css: gtlCss, body: gtlBody() }).replace("Mockup 3B/6", "Mockup 3B"));
console.log("Wrote mockups/3-gtl.html");

// ---------- side-by-side compare ----------
writeFileSync(path.join(OUT, "compare.html"), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>Option 3 · side by side</title>
<style>
:root{--bg:#1b1a19;--ink:#f3ece0;--ink-2:#b8b0a4;--line:rgba(243,236,224,.16)}
*{box-sizing:border-box}html,body{margin:0;height:100%;background:var(--bg);color:var(--ink);font:14px/1.4 system-ui,sans-serif}
header{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:12px 16px;border-bottom:1px solid var(--line)}
h1{font-size:15px;margin:0;font-weight:600}
.seg{display:flex;border:1px solid var(--line);border-radius:999px;overflow:hidden}
.seg button{font:inherit;color:inherit;background:none;border:0;padding:10px 16px;min-height:40px;cursor:pointer}
.seg button[aria-pressed=true]{background:var(--ink);color:var(--bg)}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:16px;height:calc(100% - 66px)}
.pane{display:flex;flex-direction:column;min-width:0;min-height:0}
.pane p{margin:0 0 8px;display:flex;justify-content:space-between;color:var(--ink-2)}
.pane p b{color:var(--ink)}
.pane a{color:var(--ink-2)}
.frame{flex:1;min-height:0;overflow:hidden;border:1px solid var(--line);border-radius:8px;background:#fff;position:relative}
iframe{border:0;position:absolute;left:0;top:0;transform-origin:0 0}
.mobile .frame{background:transparent;border:0}
.mobile iframe{position:relative;margin:0 auto;display:block;transform:none!important;width:390px!important;height:100%!important;border:1px solid var(--line);border-radius:24px;background:#fff}
@media (max-width:800px){.grid{grid-template-columns:1fr;height:auto}.frame{height:80vh}}
</style></head>
<body>
<header><h1>Option 3 · Editorial index: current blend vs. Good Times Lab system</h1>
<div class="seg" role="group" aria-label="Viewport"><button type="button" aria-pressed="true" data-w="1440">Desktop</button><button type="button" data-w="390">Mobile</button></div></header>
<main class="grid">
  <section class="pane"><p><b>3 · Production + friend blend</b><a href="/mockups/3" target="_blank">Open ↗</a></p><div class="frame"><iframe src="/mockups/3" title="Option 3, production and friend blend"></iframe></div></section>
  <section class="pane"><p><b>3B · Good Times Lab design system</b><a href="/mockups/3-gtl" target="_blank">Open ↗</a></p><div class="frame"><iframe src="/mockups/3-gtl" title="Option 3 in the Good Times Lab design system"></iframe></div></section>
</main>
<script>
const W=()=>+document.querySelector('.seg [aria-pressed=true]').dataset.w;
function fit(){const w=W();document.body.classList.toggle('mobile',w<500);if(w<500)return;
document.querySelectorAll('.frame').forEach(f=>{const i=f.querySelector('iframe'),s=f.clientWidth/w;i.style.width=w+'px';i.style.height=(f.clientHeight/s)+'px';i.style.transform='scale('+s+')'})}
document.querySelector('.seg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;document.querySelectorAll('.seg button').forEach(x=>x.setAttribute('aria-pressed',x===b));fit()});
addEventListener('resize',fit);fit();
</script></body></html>
`);
console.log("Wrote mockups/compare.html");

// ---------- index: the spectrum ----------
const index = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>Homepage mockups</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${FONTS.mix}&display=swap">
<style>
:root{--bg:#f1ede7;--card:#faf7f4;--ink:#2a241d;--ink-2:#5a4f40;--line:rgba(42,36,29,.16);--prod:#c33a26;--friend:#151312}
@media (prefers-color-scheme:dark){:root{--bg:#151312;--card:#211e1c;--ink:#f3ece0;--ink-2:#b8b0a4;--line:rgba(243,236,224,.14);--friend:#f3ece0}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.55 "DM Sans",system-ui,sans-serif}
.wrap{width:min(1200px,100% - 32px);margin-inline:auto;padding-block:56px 80px}
h1{font:300 clamp(40px,6vw,72px)/1 Fraunces,Georgia,serif;letter-spacing:-.03em;margin:0}
.sub{color:var(--ink-2);max-width:60ch;margin:16px 0 40px}
.scale{display:flex;justify-content:space-between;font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-2);margin-bottom:8px}
.bar{height:6px;border-radius:3px;background:linear-gradient(90deg,#c33a26,#16283a 50%,#e8674a);margin-bottom:40px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:28px}
a.m{display:flex;flex-direction:column;background:var(--card);border:1px solid var(--line);border-radius:14px;overflow:hidden;color:inherit;text-decoration:none;transition:transform .2s,border-color .2s}
a.m:hover{transform:translateY(-3px);border-color:#e8674a}
a.m img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;border-bottom:1px solid var(--line)}
.m div{padding:18px 20px 22px;display:grid;gap:8px}
.m h2{font:500 22px/1.2 Fraunces,serif;margin:0}
.m p{margin:0;font-size:14px;color:var(--ink-2)}
.meter{display:flex;align-items:center;gap:10px;font-size:12px;color:var(--ink-2)}
.meter span{flex:1;height:4px;border-radius:2px;background:var(--line);position:relative}
.meter i{position:absolute;top:-4px;width:12px;height:12px;border-radius:50%;background:#e8674a;transform:translateX(-50%)}
</style></head>
<body><main class="wrap">
<h1>Six homepage directions</h1>
<p class="sub">Each one blends the production site with your friend’s proposal. 1 leans hardest on what’s live today; 6 is closest to the friend’s design. All use the real copy, images and links.</p>
<p class="sub" style="margin-top:-24px"><a href="/mockups/compare" style="color:inherit">Option 3 vs. Good Times Lab, side by side →</a></p>
<div class="scale"><span>Production</span><span>Friend’s design</span></div><div class="bar"></div>
<div class="grid">
${variants.map((v, i) => `<a class="m" href="/mockups/${i + 1}"><img src="/mockups/img/thumb-${i + 1}.webp" alt="" loading="lazy"><div><h2>${i + 1}. ${v.title}</h2><div class="meter">Prod<span><i style="left:${v.skew}%"></i></span>Friend</div><p>${v.pitch}</p></div></a>`).join("\n")}
</div></main></body></html>
`;
writeFileSync(path.join(OUT, "index.html"), index);
console.log("Wrote mockups/index.html");
