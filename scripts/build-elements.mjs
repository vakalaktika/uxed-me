import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { page, articleHeader, heroFigure, figure, articleNav } from "./layout.mjs";
import { img } from "./img.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const P = "elements";
const i = (name, alt) => figure(img(P, name), alt);

const hero = img(P, "6ee04640-6680-4e1d-b4dd-f075b4e24792-elements-homepage.png");

const body = `
${articleHeader({
  eyebrow: "UX design · IA design · User research",
  title: "Elements design system — IA design",
  lede: "Creating a toolkit to help new and current members of the Product team understand how we design and develop our learning experiences.",
  meta: [
    ["Role", "UX Design, IA Design, User Research"],
    ["Cross-functional collaborators", "Content (Learning Experience), Visual Design, Implementation Specialist (Dev)"],
    ["Live site", "elements.everfi.com"],
  ],
})}
${heroFigure(hero, "Elements design system homepage")}

<div class="atm-container">
  <div class="prose">
    <h2>Overview</h2>
    <p>Elements is a design system resource that helps multidisciplinary teams at EVERFI understand how we ideate, design, and develop our learning experiences. As UX Designer, I was tasked with defining a scalable information architecture for Elements and designing that structure cohesively.</p>

    <h2>Solution approach</h2>
    <p>Previous attempts at defining our process had no particular architecture or hierarchy in mind — we knew what we wanted to say about each topic, but not the order or how topics related to one another.</p>
    ${i("19b62a8d-8686-45fe-bb4d-8273e3f4cada-Original-aproach.png", "First iteration of the Elements design system")}

    <h3>Research</h3>
    <p>I met with our content writers to understand what they wanted to say and how, then interviewed newer and existing employees to find the knowledge gaps and understand how the toolkit could set them up for success in day-to-day work.</p>

    <h3>Information architecture and hierarchy</h3>
    <p>Next, I defined the layers of information and their hierarchy, breaking down every topic area into the what, why, and how.</p>
    ${i("e9f1c181-fba9-4b2d-a9f5-9a6910ba3754-IA-Structure.png", "Elements information architecture structure")}

    <h3>Page layout design</h3>
    <p>With the information hierarchy as a blueprint, designing the page layouts moved faster than expected. I ran a comparative analysis against Polaris, Material Design, Canvas, Primer, and other established design systems to understand industry standards and validate the proposed solution.</p>
    <p>The main goal for end users was to be able to quickly scan a page and find:</p>
    <ul>
      <li>What the topic was about, and its sections, concepts, definitions, usage, and examples</li>
      <li>Why it was important to do it the described way</li>
      <li>When to use it</li>
      <li>How it could be readily implemented</li>
    </ul>
    <p>I applied that same hierarchy within each page: describing a concept always followed the same principle — what it was, why it’s used that way, when to use it, and how to implement it.</p>
    ${i("9e089bb8-fc6a-4d38-ba49-763ed40401ff-Old-Page.png", "Page layout before the IA redesign")}
    ${i("2fb427b4-ae1e-45cf-b9de-f89ea6df2e12-New-Page.png", "Page layout after the IA redesign")}

    <h2>Final thoughts</h2>
    <p>Like many design systems, Elements will always be a living document. This approach still covers most of our product development needs, but it keeps evolving as EVERFI grows and new needs test it. Since launch, we’ve moved toward more concise information on each topic while always following the core principle of prioritizing the what, why, and how — which makes Elements an essential toolkit for the entire Product team.</p>
  </div>
</div>
${articleNav()}
`;

writeFileSync(
  path.join(ROOT, "elements.html"),
  page({
    title: 'IA and Layout Design for EVERFI’s "Elements" — Ed Guillen',
    description:
      "A design system resource that helps multidisciplinary teams at EVERFI understand how we ideate, design, and develop our learning experiences.",
    activeNav: "work",
    path: "/elements",
    bodyHtml: body,
  })
);
console.log("Wrote elements.html");
