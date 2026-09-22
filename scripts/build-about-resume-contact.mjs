import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { page, socialLinks } from "./layout.mjs";
import { img } from "./img.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

/* ---------------- About ---------------- */
const aboutPortrait = img(
  "about-jasper",
  "f96e571f-d040-4dc9-8d6b-2f70c419e139-Ed1.png"
);

const aboutBody = `
<section class="atm-container article-header">
  <p class="atm-eyebrow">About</p>
  <h1>Hello, I’m Ed</h1>
</section>
<section class="atm-container about-layout">
  <div class="hero__portrait">
    <img src="${aboutPortrait.src}" width="${aboutPortrait.width}" height="${aboutPortrait.height}" alt="Portrait of Ed Guillen" loading="eager">
  </div>
  <div class="prose">
    <p class="t-body-lg about-lede">I know that communication among developers, management, and marketing can be tough, but I like helping these teams connect. I have experience in these roles and understand how to balance user needs with business goals.</p>
    <p>I also enjoy <a href="https://www.instagram.com/edmakesbread/" target="_blank" rel="noopener noreferrer">making bread</a>.</p>
    <a class="atm-btn atm-btn--secondary about-cta" href="/resume">View resume</a>
    ${socialLinks()}
  </div>
</section>
`;

writeFileSync(
  path.join(ROOT, "about.html"),
  page({
    title: "About — Ed Guillen",
    description:
      "About Ed Guillen, senior product designer based between San Diego and Hong Kong.",
    activeNav: "about",
    path: "/about",
    bodyHtml: aboutBody,
  })
);
console.log("Wrote about.html");

/* ---------------- Resume ---------------- */
const resumePortrait = img("resume", "7016132e-f1f2-4233-91b8-b88ac2eb55c3-ed.jpeg");

const jobs = [
  {
    when: "Jun 2016 — Current",
    what: "Product Designer → Sr. UX Designer → Principal UX Designer",
    where: "EVERFI, Remote",
  },
  {
    when: "Jul 2015 — Apr 2016",
    what: "Interaction Designer",
    where: "3D Robotics, Berkeley",
  },
  {
    when: "Dec 2011 — Jul 2015",
    what: "UX Designer Lead",
    where: "Amco, San Diego",
  },
  {
    when: "Dec 2009 — 2011",
    what: "UX Designer",
    where: "X1FM, San Diego",
  },
];

const skills = [
  "UX Strategy",
  "Information Architecture",
  "Component-based design systems",
  "WCAG",
  "Wireframing & rapid prototyping",
  "Research & testing",
  "Visual Communication",
  "Agile development",
  "Figma",
  "Sketch",
  "Adobe XD",
  "Adobe Creative Suite",
];

const resumeBody = `
<section class="atm-container" style="padding-top:var(--space-9)">
  <div class="resume-header">
    <div style="display:flex;gap:var(--space-5);align-items:center">
      <span class="atm-avatar atm-avatar--lg" style="width:72px;height:72px;overflow:hidden"><img src="${resumePortrait.src}" width="${resumePortrait.width}" height="${resumePortrait.height}" alt="" style="width:100%;height:100%;object-fit:cover"></span>
      <div>
        <h1 style="margin-bottom:4px">Eduardo Guillen</h1>
        <p class="t-nav" style="color:var(--ink-muted);letter-spacing:0.04em;text-transform:uppercase">Principal UX Designer · San Diego, CA — Remote</p>
      </div>
    </div>
    <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
      <a class="atm-btn atm-btn--secondary atm-btn--sm" href="https://www.linkedin.com/in/eduardoguillenux" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a class="atm-btn atm-btn--secondary atm-btn--sm" href="https://read.cv/uxed" target="_blank" rel="noopener noreferrer">read.cv</a>
    </div>
  </div>

  <div class="atm-panel atm-panel--ruled" style="background:transparent;padding:0">
    <section class="atm-panel__section">
      <p class="atm-section-label">About me</p>
      <p class="t-body" style="color:var(--ink)">I understand that communication between developers, management, and marketing can sometimes be difficult, but I enjoy being the glue that brings departments together. I have worked with and within these different roles, and I understand the complexities of balancing user needs with business goals.</p>
    </section>

    <section class="atm-panel__section">
      <p class="atm-section-label">Work experience</p>
      ${jobs
        .map(
          (j) => `<div class="job-entry">
        <div class="job-entry__when">${j.when}</div>
        <div><p class="job-entry__what">${j.what}</p><p class="job-entry__where">${j.where}</p></div>
      </div>`
        )
        .join("\n      ")}
    </section>

    <section class="atm-panel__section">
      <p class="atm-section-label">Tools &amp; skills</p>
      <div class="skill-tags">
        ${skills.map((s) => `<span class="atm-tag">${s}</span>`).join("\n        ")}
      </div>
    </section>

    <section class="atm-panel__section">
      <p class="atm-section-label">Education</p>
      <div class="job-entry">
        <div class="job-entry__when">Oct 2012 — Sep 2014</div>
        <div><p class="job-entry__what">MBA, Marketing concentration</p><p class="job-entry__where">CETYS University, Tijuana</p></div>
      </div>
      <div class="job-entry">
        <div class="job-entry__when">Aug 1999 — Dec 2003</div>
        <div><p class="job-entry__what">B.A., Digital Graphic Design Engineering</p><p class="job-entry__where">CETYS University, Tijuana</p></div>
      </div>
    </section>

    <section class="atm-panel__section">
      <p class="atm-section-label">Languages</p>
      <p class="t-body">Fluent in English and Spanish.</p>
    </section>

    <section class="atm-panel__section">
      <p class="atm-section-label">Personal profile</p>
      <p class="t-body" style="color:var(--ink)">A creative thinker, a fast learner, and very dependable. I’m always expanding my knowledge in my field and aspire to be the best at what I do. I have ample experience developing teams and managing them to deliver projects on time, and I can manage high-stress situations while adapting to changes in schedule. I have a passion for cooking, baking, traveling, chess, photography, and movies — and I bake one heck of a loaf of bread.</p>
    </section>
  </div>
</section>
`;

writeFileSync(
  path.join(ROOT, "resume.html"),
  page({
    title: "Resume — Ed Guillen",
    description:
      "Résumé of Eduardo Guillen, Principal UX Designer — EVERFI, 3D Robotics, Amco, X1FM.",
    activeNav: "resume",
    path: "/resume",
    bodyHtml: resumeBody,
  })
);
console.log("Wrote resume.html");

/* ---------------- Contact ---------------- */
const contactBody = `
<section class="atm-container article-header" style="padding-bottom:var(--space-11)">
  <p class="atm-eyebrow">Contact</p>
  <h1>Let’s talk</h1>
  <p class="t-body-lg lede" style="color:var(--ink-secondary)">The fastest way to reach me is email. I’m happy to talk about design systems, simulation-based learning, or your next case study.</p>
  <div style="margin-top:var(--space-6);display:flex;gap:var(--space-3);flex-wrap:wrap">
    <a class="atm-btn atm-btn--cta" href="mailto:ed@uxed.me">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/></svg>
      ed@uxed.me
    </a>
  </div>
  ${socialLinks()}
</section>
`;

writeFileSync(
  path.join(ROOT, "contact.html"),
  page({
    title: "Contact — Ed Guillen",
    description: "Get in touch with Ed Guillen.",
    activeNav: "",
    path: "/contact",
    bodyHtml: contactBody,
  })
);
console.log("Wrote contact.html");
