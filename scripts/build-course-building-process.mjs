import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { page, articleHeader, heroFigure, figure, articleNav } from "./layout.mjs";
import { img } from "./img.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const P = "course-building-process";
const i = (name, alt) => figure(img(P, name), alt);

const hero = img(P, "1cb41011-fea8-4b4a-a2cd-830f063ef348-course-building-process.png");

const body = `
${articleHeader({
  eyebrow: "IA design · Flow design · User research and interviews",
  title: "Course building process design",
  lede: "How EVERFI creates impactful learning experiences.",
  meta: [
    ["Role", "IA Design, Flow Design, User Research and Interviews"],
    ["Cross-functional collaborators", "Content, Visual Design, Implementation Specialist (Dev), A11y, QA, Product and Project managers"],
  ],
})}
${heroFigure(hero, "Course building process flow diagram")}

<div class="atm-container">
  <div class="prose">
    <h2>Overview</h2>
    <p>A visual map that helps multidisciplinary teams at EVERFI understand the course-building process, identify gaps, pain points, and bottlenecks, create efficiencies, and establish a common language across teams. It came out of researching processes across functional teams to document the order of operations and dependencies, and to recommend process improvements to Product leadership.</p>

    <h2>Solution approach</h2>
    <h3>How it started</h3>
    <p>As UX design lead, I started this as a passion project to help my team better understand:</p>
    <ul>
      <li>What does the course-building UX process look like?</li>
      <li>How do we work together with stakeholders?</li>
      <li>Who do we communicate with, when, and why?</li>
    </ul>
    <p>As a first step, I wanted to clearly understand how the UX team designs a course and the steps it takes to do so. That journey evolved into an artifact that helped the team understand what deliverables they needed from UX, where communication needed to improve, and where stakeholders felt their voice needed amplifying. From there, I wanted to understand the collaboration relationship between the UX team and other stakeholders.</p>
    ${i("12a97075-d1ea-48cb-b694-eb9a13bc4640-ux-collaboration-relationship.png", "UX collaboration relationship")}

    <h3>How it’s going</h3>
    <p>During discovery, I interviewed UX team members, then other key stakeholders — Product Managers, QA, Visual Design, A11y, Content, Developers, and Implementation Specialists — which gave me a wider lens and a much clearer overview of the course process.</p>
    ${i("26dcb747-b3fd-4ab3-b594-c73a96757bee-course-building-process-alt.png", "Course building process overview")}

    <h3>One, two, three, iterate</h3>
    <p>After interviewing 16 people over five weeks, I visualized the entire process nose-to-tail, capturing the voices of eight functional teams across the full product build. A key finding: because our products are modular, the process is often a mix of waterfall and agile — each phase depends on the previous one, but each module can also move independently. While discovery happens on the last module, the first module could already be ready to launch.</p>
    <p>Our main process phases are Discovery, Development, Launch, and Iterate.</p>

    <h2>Methods and output</h2>
    <p>The research findings guided a flow documenting the stages of the product development cycle, along with the entity relationships showing how one artifact or process informs or depends on another — helping identify efficiencies and bottlenecks. This artifact has helped the Product team avoid bottlenecks, find efficiencies, and give stakeholders a shared understanding of what our course-building process looks like.</p>
    ${i("f9935f87-73de-4560-8a6a-8a411a163a07-course-building-flow-detailed.png", "Course building detailed flow")}

    <h3>Discovery</h3>
    <p>The discovery phase lets us build the right thing, not just what we think is right — researching the topic, identifying the target audience and learning objectives, and creating personas and a content outline. It kicks off the collaborative process that generates what we need for development, and helps minimize bottlenecks downstream.</p>
    ${i("a446a866-366a-44f4-8df0-f3c7fa382e7b-phase-1-dicovery.png", "Phase 1: Discovery")}

    <h3>Development</h3>
    <p>Development runs smoother when discovery is robust. This phase is boots-on-the-ground for every functional team: each stakeholder executes their deliverables — module scripts, proof-of-concept prototypes, wireframes, visual themes, final assets, voiceovers — which implementation specialists then build on the platform.</p>
    ${i("706025eb-bfb8-447f-9809-9f099d7557a3-phase-2-develoment.png", "Phase 2: Development")}

    <h3>Launch &amp; iteration</h3>
    <p>By launch, each team has finalized its deliverables. A limited release surfaces user feedback we fold into finishing touches and enhancements before general availability. Nothing is ever perfect the first, second, or even third time around — and that’s okay. After release, known issues get fixed, new or roadmapped features land, and the cycle starts again.</p>
    ${i("26fdc682-47fd-4fa7-b970-488869fd43e6-phase-3-launch.png", "Phase 3: Launch")}
    ${i("32247c43-086a-4299-9101-4625134233e2-iterate.png", "Iteration process")}

    <h2>What’s next?</h2>
    <p>This artifact has kept evolving over the past year and has inspired other teams to build similar documents from their own department’s perspective. I’ve been collaborating with and guiding those teams while continuing to update mine as we find more efficient ways to work.</p>
    ${i("e031109c-29e7-4959-b836-c4849e6621e2-ce-collaboration-relationships.png", "Content & Engineering collaboration relationship")}

    <h2>Final thoughts</h2>
    <p>Each course is different, and smaller courses may not touch every step — but they’ve passed through it at some point. What makes the process both agile and waterfall is that discovery, development, and launch happen in sequence for a given module, but all three can be running in parallel across modules.</p>
    <p>A delightful surprise: as I was discovering, developing, and preparing to share this process with a broader audience, I was following the process itself — a very meta moment.</p>
  </div>
</div>
${articleNav()}
`;

writeFileSync(
  path.join(ROOT, "course-building-process.html"),
  page({
    title: "Course Building Process Design — Ed Guillen",
    description:
      "A visual map that helps multidisciplinary teams at EVERFI understand the course build process, identify gaps and bottlenecks, and establish a common language.",
    activeNav: "work",
    path: "/course-building-process",
    bodyHtml: body,
  })
);
console.log("Wrote course-building-process.html");
