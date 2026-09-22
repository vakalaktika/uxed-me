import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { page, caseCard, socialLinks } from "./layout.mjs";
import { img } from "./img.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const portrait = img("home", "9e8ac426-621a-44eb-abfd-1e0b8f384e92-Ed1.png");

const featured = [
  {
    href: "/cards-pattern",
    img: img("home", "e577fd47-4d5e-446d-9df1-3d7ab5fa4de5-cards-case-study.png"),
    alt: "Grid of EVERFI course and pathway cards shown in the unified card component",
    eyebrow: "Design systems",
    title: "Unifying EVERFI’s card component",
    body: "Designing a cohesive and scalable card pattern across the EVERFI product ecosystem.",
  },
  {
    href: "/simulation-based-learning",
    img: img("home", "ca94c176-0cee-465d-8ccf-277354a4b764-simulation-based-learning.png"),
    alt: "Screens from a realistic scenario-based simulation learning experience",
    eyebrow: "UX · Interaction design",
    title: "Simulation-based learning",
    body: "Immersive and engaging learning through realistic scenario-based experiences.",
  },
  {
    href: "/course-building-process",
    img: img("home", "be21c4ec-a4b0-4a65-bc79-606aa1e37515-process-case-study.png"),
    alt: "Diagram mapping the course building process across teams",
    eyebrow: "IA · Process design",
    title: "Course building process design",
    body: "How EVERFI creates impactful learning experiences.",
  },
  {
    href: "/elements",
    img: img("home", "51b0f96e-13a8-43d8-bb5a-807f2c3eb7e4-elements-case-study.png"),
    alt: "Elements design system documentation toolkit overview",
    eyebrow: "Design systems · IA",
    title: "Cohesive documentation design",
    body: "Creating a documentation toolkit to help new and current team members.",
  },
];

const otherWork = [
  {
    href: "/solo-app-case-studies",
    img: img("home", "af9f4514-12f1-4065-bc6a-296cd6898ea0-image-asset.jpg"),
    alt: "3DR Solo drone companion app interface",
    title: "3DR Solo App",
  },
  {
    href: "/site-scan",
    img: img("home", "9ef89ff3-e8bc-49ae-a1c4-dceba0191a21-image-asset.jpg"),
    alt: "SiteScan aerial analytics platform interface",
    title: "SiteScan App",
  },
  {
    href: "/atat-attack",
    img: img("home", "84f0ef93-4ae9-4eae-8446-136ee59b6141-at-at-concept.jpg"),
    alt: "Concept art for AT-AT Attack, an augmented reality drone game",
    title: "AT-AT Attack",
  },
];

const body = `
<section class="atm-container hero atm-boot">
  <div class="hero__desktop">
    <div class="hero__content">
      <h1 class="hero__heading atm-boot__1">Hi, I’m Ed.</h1>
      <p class="hero__role atm-boot__2">Senior product designer</p>
      <p class="hero__lede atm-boot__2">I bring systems thinking, empathy, and strategic clarity to help teams design smarter, build with purpose, and stay aligned. Also, I bake sourdough.</p>
      <div class="hero__actions atm-boot__3">
        <a class="atm-btn atm-btn--cta" href="#work">See the work</a>
        <a class="atm-btn atm-btn--secondary" href="/about">About me</a>
      </div>
    </div>
    <div class="hero__panel atm-boot__4">
      <svg class="hero__panel-motif atm-motif atm-orbit" viewBox="0 0 24 24" width="620" height="620" fill="none" stroke="currentColor" stroke-width="0.35" aria-hidden="true" focusable="false">
        <ellipse cx="12" cy="12" rx="10" ry="4"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
      </svg>
      <div class="hero__panel-portrait">
        <img src="${portrait.src}" width="${portrait.width}" height="${portrait.height}" alt="Portrait of Ed Guillen" loading="eager">
      </div>
    </div>
  </div>

  <div class="hero__mobile">
    <div class="hero__badge atm-boot__1">
      <svg class="hero__badge-motif atm-motif atm-orbit" viewBox="0 0 24 24" width="132" height="132" fill="none" stroke="currentColor" stroke-width="0.8" aria-hidden="true" focusable="false">
        <ellipse cx="12" cy="12" rx="10" ry="4"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
      </svg>
      <div class="hero__badge-portrait">
        <img src="${portrait.src}" width="${portrait.width}" height="${portrait.height}" alt="Portrait of Ed Guillen" loading="eager">
      </div>
    </div>
    <h1 class="hero__heading atm-boot__2">Hi, I’m Ed.</h1>
    <p class="hero__role atm-boot__2">Senior product designer</p>
    <p class="hero__lede atm-boot__3">I bring systems thinking, empathy, and strategic clarity to help teams design smarter, build with purpose, and stay aligned. Also, I bake sourdough.</p>
    <div class="hero__actions atm-boot__4">
      <a class="atm-btn atm-btn--cta" href="#work">See the work</a>
      <a class="atm-btn atm-btn--secondary" href="/about">About me</a>
    </div>
  </div>
</section>

<section id="work" class="section atm-container">
  <p class="atm-eyebrow">Selected work</p>
  <h2 style="margin-top:var(--space-3)">EVERFI case studies</h2>
  <div class="case-grid" style="margin-top:var(--space-7)">
    ${featured.map(caseCard).join("\n    ")}
  </div>
</section>

<section class="section atm-container">
  <p class="atm-eyebrow">Other work</p>
  <h2 style="margin-top:var(--space-3)">Drones, games, and side projects</h2>
  <div class="case-grid" style="margin-top:var(--space-7)">
    ${otherWork.map((c) => caseCard({ ...c, body: undefined })).join("\n    ")}
  </div>
  <div style="margin-top:var(--space-8)">
    <a class="atm-btn atm-btn--secondary" href="/other-work">Explore my other work</a>
  </div>
</section>
`;

writeFileSync(
  path.join(ROOT, "index.html"),
  page({
    title: "Ed Guillen — Senior Product Designer",
    description:
      "Portfolio of Ed Guillen, senior product designer. Systems thinking, design systems, information architecture, and simulation-based learning UX.",
    activeNav: "work",
    path: "/",
    bodyHtml: body,
  })
);
console.log("Wrote index.html");
