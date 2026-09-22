import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { page } from "./layout.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function entry({ title, body, deliverables = [], links = [] }) {
  return `<div class="work-entry">
    <h3>${title}</h3>
    <p class="t-body" style="color:var(--ink-secondary)">${body}</p>
    ${deliverables.length ? `<div class="skill-tags">${deliverables.map((d) => `<span class="atm-tag">${d}</span>`).join("")}</div>` : ""}
    ${links.length ? `<div class="work-entry__links">${links.map((l) => `<a class="atm-btn atm-btn--secondary atm-btn--sm" href="${l.href}" target="_blank" rel="noopener noreferrer">${l.label}</a>`).join("")}</div>` : ""}
  </div>`;
}

const latest = [
  entry({
    title: "Course redesign — Compassion Project",
    body: "Led UX course redesign and adaptation to rebuild on the current platform.",
    deliverables: ["Course page template library", "Theme library", "Brainstorming session jam", "Game flow concept", "Wireframes (Modules 01–03)"],
    links: [
      { href: "https://www.figma.com/file/tULAtd5I1VGoEbJSk6jW7x/COMP2---Page-and-Color-Library?node-id=0:1", label: "Figma" },
      { href: "https://s3.amazonaws.com/everfi-curriculums/curriculums/compassion-2/develop/index.html#", label: "Live course" },
    ],
  }),
  entry({
    title: "IA and layout design — Elements Design System",
    body: "As UX Designer, I was tasked with defining a scalable solution for EVERFI’s Elements information architecture and designing this structure cohesively.",
    links: [
      { href: "/elements", label: "Case study" },
      { href: "https://www.figma.com/file/xYcJzECPNufIW3t1AEcB3f/Elements---Visual-Design?node-id=4687:10737", label: "Figma" },
      { href: "https://elements.everfi.com/", label: "Live site" },
    ],
  }),
  entry({
    title: "Course building process design",
    body: "Designed and created a resource that helps multidisciplinary teams understand the course building process from a 30,000-foot view.",
    links: [
      { href: "/course-building-process", label: "Case study" },
      { href: "https://www.figma.com/file/bQ20bwST0bfft7VffPRtnt/Course-Building-Process?node-id=0:1", label: "Figma" },
    ],
  }),
  entry({
    title: "Simulation-based learning",
    body: "Led the UX and interaction design to create a simulation-based learning experience.",
    deliverables: ["Recycling game concept", "Final game lo-fi wireframes", "Game proof of concept"],
    links: [
      { href: "/simulation-based-learning", label: "Case study" },
      { href: "https://www.figma.com/file/QpaAzlP5cTEGw3TEJMrgBr/SUS-Page-Library?node-id=74:7584", label: "Figma" },
      { href: "https://everfi-curriculums.s3.amazonaws.com/curriculums/recycling-sustainability/develop/index.html#m03/a02/page-2", label: "Live game" },
    ],
  }),
  entry({
    title: "Universal course template library",
    body: "Designed a universal course template library and process that provides coverage for most of the course building needs.",
    links: [
      { href: "https://docs.google.com/document/d/1fsL-CZTUhP8MQVeQWz3DRlCC1lkgK0s6g-WYgQT8YY0/edit?usp=sharing", label: "Template process" },
      { href: "https://www.figma.com/file/4GqYsEs774RfVXdbGIzYJH/Generic-Page-Library?node-id=301:13566", label: "Figma wireframes" },
    ],
  }),
].join("\n  ");

const freelance = [
  entry({
    title: "Flight Analysis redesign (2018–2019)",
    body: "Redesigned the customer’s flagship product, Auterion Suite (previously Flight Analysis).",
    deliverables: ["UX plan", "Stakeholder interviews", "Interview insights", "Feature list", "Sketches"],
    links: [
      { href: "https://www.figma.com/file/41unouL92MdrR3GlfSran9/Fligth-Analysis-Page?node-id=5:8918", label: "Figma" },
      { href: "https://invis.io/MALSTJQBNEV", label: "Prototype" },
    ],
  }),
  entry({
    title: "QGroundControl app redesign (2018–2019)",
    body: "Redesigned the drone mission planning tool for a cohesive design and a more intuitive user experience.",
    deliverables: ["UX/UI redesign evaluation", "Changes overview"],
    links: [
      { href: "https://www.figma.com/file/NiNP03SL0rzShDUGGdqW93/QGC-app?node-id=5:5904", label: "Figma" },
      { href: "https://invis.io/S5NB7P787RH", label: "Prototype" },
    ],
  }),
  entry({
    title: "QGroundControl camera control redesign (2018–2019)",
    body: "Redesigned camera controls for the QGC application for a more intuitive, streamlined flow.",
    links: [
      { href: "https://www.figma.com/file/hO3HfJfMwfQ1tjyzbwBD7T/QGC-Camera-feature?node-id=9:775", label: "Figma" },
      { href: "https://invis.io/G7OUEOUZB2P", label: "Prototype" },
    ],
  }),
].join("\n  ");

const body = `
<section class="atm-container article-header">
  <p class="atm-eyebrow">Archive</p>
  <h1>Other work</h1>
</section>
<section class="atm-container section--tight">
  <h2 style="margin-top:0">Latest</h2>
  ${latest}
</section>
<section class="atm-container section--tight">
  <h2>Freelance work</h2>
  ${freelance}
</section>
`;

writeFileSync(
  path.join(ROOT, "other-work.html"),
  page({
    title: "Other Work — Ed Guillen",
    description: "Additional EVERFI and freelance design projects from Ed Guillen.",
    activeNav: "work",
    path: "/other-work",
    bodyHtml: body,
  })
);
console.log("Wrote other-work.html");
