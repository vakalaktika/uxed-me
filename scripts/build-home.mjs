import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { page } from "./layout.mjs";
import { img } from "./img.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const portrait = img("home", "9e8ac426-621a-44eb-abfd-1e0b8f384e92-Ed1.png");

// Every project on the home index, newest client first. `tags` drive the
// filter chips; keep them to the chip vocabulary in FILTERS below.
const work = [
  {
    href: "/cards-pattern",
    img: img("home", "e577fd47-4d5e-446d-9df1-3d7ab5fa4de5-cards-case-study.png"),
    client: "EVERFI",
    eyebrow: "Design systems",
    title: "Unifying EVERFI’s card component",
    body: "One card component for every EVERFI product, built to handle different content, metadata and use cases.",
    tags: ["Design system", "UX"],
  },
  {
    href: "/simulation-based-learning",
    img: img("home", "ca94c176-0cee-465d-8ccf-277354a4b764-simulation-based-learning.png"),
    client: "EVERFI",
    eyebrow: "UX · Interaction design",
    title: "Simulation-based learning",
    body: "A simulation where learners make decisions, see their impact, and practise a skill before they need it.",
    tags: ["UX", "Interaction", "Learning"],
  },
  {
    href: "/course-building-process",
    img: img("home", "be21c4ec-a4b0-4a65-bc79-606aa1e37515-process-case-study.png"),
    client: "EVERFI",
    eyebrow: "IA · Process design",
    title: "Course building process design",
    body: "A map of how a course gets built at EVERFI, made from interviews with every team that touches one.",
    tags: ["Process", "IA", "Learning"],
  },
  {
    href: "/elements",
    img: img("home", "51b0f96e-13a8-43d8-bb5a-807f2c3eb7e4-elements-case-study.png"),
    client: "EVERFI",
    eyebrow: "Design systems · IA",
    title: "Cohesive documentation design",
    body: "An information architecture for EVERFI’s design-system docs, so new and current team members can find what they need.",
    tags: ["Design system", "IA"],
  },
  {
    href: "/solo-app-case-studies",
    img: img("home", "af9f4514-12f1-4065-bc6a-296cd6898ea0-image-asset.jpg"),
    client: "3DR",
    eyebrow: "Interaction design",
    title: "3DR Solo App",
    body: "A mobile app for aerial photography, where computer-assisted Smart Shots let you concentrate on capturing, not flying.",
    tags: ["Mobile", "Hardware", "Interaction"],
  },
  {
    href: "/site-scan",
    img: img("home", "9ef89ff3-e8bc-49ae-a1c4-dceba0191a21-image-asset.jpg"),
    client: "3DR",
    eyebrow: "Interaction design",
    title: "SiteScan App",
    body: "An aerial analytics platform for surveying, scanning and inspecting work sites, while keeping inspectors safe on the ground.",
    tags: ["Hardware", "UX"],
  },
  {
    href: "/atat-attack",
    img: img("home", "84f0ef93-4ae9-4eae-8446-136ee59b6141-at-at-concept.jpg"),
    client: "Side project",
    eyebrow: "Game design",
    title: "AT-AT Attack",
    body: "An augmented reality drone game. What happens when fandom and free time collide.",
    tags: ["Game", "Interaction"],
  },
];

const FILTERS = ["Design system", "UX", "Interaction", "IA", "Learning", "Mobile", "Hardware", "Game"];

const ARROW = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

const row = (w) => `<li data-tags="${w.tags.join("|")}">
      <a class="work-row" href="${w.href}">
        <span class="work-row__thumb"><img src="${w.img.src}" width="${w.img.width}" height="${w.img.height}" alt="" loading="lazy"></span>
        <span class="work-row__client"><b aria-hidden="true">${w.client[0]}</b>${w.client}</span>
        <div class="work-row__title"><h3>${w.title}</h3><span class="atm-eyebrow">${w.eyebrow}</span></div>
        <span class="work-row__desc"><span>${w.body}</span><span class="work-row__tags">${w.tags.map((t) => `<span>${t}</span>`).join("")}</span></span>
        <span class="work-row__go" aria-hidden="true">${ARROW}</span>
      </a>
    </li>`;

const body = `
<div class="atm-container">
<section class="home-hero">
  <h1 class="home-hero__title">Hi, I’m <br><em>Ed.</em></h1>
  <div class="home-hero__side">
    <p class="home-hero__me"><img src="${portrait.src}" width="${portrait.width}" height="${portrait.height}" alt="" loading="eager"><span><b>Ed Guillen</b>Principal UX designer</span></p>
    <p class="home-hero__lede">I’m a principal UX designer at EVERFI, where I work on the systems behind our digital courses: shared components, documentation, and the process teams follow to build a course. Before that, I designed drone apps at 3D Robotics. Also, I bake sourdough.</p>
    <div class="home-hero__actions">
      <a class="atm-btn atm-btn--cta" href="#work">See the work</a>
      <a class="atm-btn atm-btn--secondary" href="/about">About me</a>
    </div>
  </div>
</section>

<section class="work-index" id="work" aria-labelledby="work-title">
  <div class="work-index__head">
    <div><p class="atm-eyebrow">Index</p><h2 id="work-title">Selected <em>work</em></h2></div>
    <div class="filter-chips" role="group" aria-label="Filter projects" data-work-filter>
      <button type="button" data-filter="all" aria-pressed="true">All</button>
      ${FILTERS.map((f) => `<button type="button" data-filter="${f}" aria-pressed="false">${f}</button>`).join("\n      ")}
    </div>
  </div>
  <p class="visually-hidden" role="status" data-work-filter-status></p>
  <ul class="work-rows">
    ${work.map(row).join("\n    ")}
  </ul>
  <div class="work-index__more"><a class="atm-btn atm-btn--secondary" href="/other-work">Explore my other work</a></div>
</section>
</div>
`;

writeFileSync(
  path.join(ROOT, "index.html"),
  page({
    title: "Ed Guillen — Principal UX Designer",
    description:
      "Ed Guillen, principal UX designer at EVERFI. Design systems, information architecture and simulation-based learning.",
    activeNav: "work",
    path: "/",
    bodyHtml: body,
  })
);
console.log("Wrote index.html");
