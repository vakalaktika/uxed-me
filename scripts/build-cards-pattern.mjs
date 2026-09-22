import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { page, articleHeader, heroFigure, figure, gallery, articleNav } from "./layout.mjs";
import { img } from "./img.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const P = "cards-pattern";
const i = (name, alt) => figure(img(P, name), alt);

const hero = img(P, "eb60cae6-77f7-4fa5-8877-c29921c0647b-Outcome.png");

const explorationGallery = gallery([
  { img: img(P, "ed32dd7a-bd37-4306-a4c9-6692d35fca61-Early-explorations---Details.png"), alt: "Early card exploration — detail variants" },
  { img: img(P, "34651eb0-5da7-4893-955d-0df60eb0ac93-Elective-Learning.png"), alt: "Elective Learning card exploration" },
  { img: img(P, "b8d541b1-bcf9-46ca-af47-367f6c987da8-K12-Learner.png"), alt: "K-12 Learner card exploration" },
  { img: img(P, "caadc746-bc53-469a-a0c9-77cdba99f1a6-K12-Teacher.png"), alt: "K-12 Teacher card exploration" },
  { img: img(P, "e15837dd-7205-42b4-a2ab-04a283984497-Platform-Course-Card.png"), alt: "Platform course card exploration" },
]);

const afterGallery = gallery([
  { img: img(P, "48918ef1-c15a-4f7d-a913-900933e90f38-After-Elective-Learning-Pathway-1.png"), alt: "Final elective learning pathway card" },
  { img: img(P, "7cd409a1-0586-4843-a442-21228768def4-After-Elective-Learning-Platform.png"), alt: "Final elective learning platform card" },
  { img: img(P, "38f9368c-c810-46f8-bd19-7b1ce3efe8cc-After-Elective-Learning-Hub.png"), alt: "Final elective learning hub card" },
  { img: img(P, "796b526e-184e-477a-a8ce-924b8128e79c-After-Elective-Learning-Pathway.png"), alt: "Final elective learning pathway card, alternate state" },
  { img: img(P, "44576050-b466-423d-b3bb-71d8b63ff0b2-After-Elective-Learner.png"), alt: "Final elective learner card" },
  { img: img(P, "4cd1a3ad-ad61-4475-96d8-64d6f2c6f013-After-K-12-Teacher.png"), alt: "Final K-12 teacher card" },
  { img: img(P, "1eaf1259-0653-4243-ab92-0460f4e7af96-After-Assigned-Learning-Pathway.png"), alt: "Final assigned learning pathway card" },
  { img: img(P, "82fc03ae-2fba-4689-a4a4-de1d951f611b-After-Elective-Student.png"), alt: "Final elective student card" },
  { img: img(P, "82379541-7e79-4ccf-9ac1-6a20035ddf77-After-Elective-Admin.png"), alt: "Final elective admin card" },
]);

const body = `
${articleHeader({
  eyebrow: "Design systems · Design thinking · Information architecture · Design strategy",
  title: "Unifying EVERFI’s card components",
  meta: [
    ["My role", "Design Lead"],
    ["Company", "EVERFI"],
    ["Timeframe", "February 2024 – August 2024"],
    ["Collaborators", "Design: Bob Weisbecker, Alyssa Kjar · Engineering: Eric Shank, Gwen Latasa, Anushree Patil · Product: Anu Burns, Marianne Epstein"],
  ],
})}
${heroFigure(hero, "Three product scenarios shown with the new unified card design")}

<div class="atm-container">
  <div class="prose">
    <h2>Outcome</h2>
    <p>The outcome of this project was a standardized card component that unified the visual experience, improved user interaction, and streamlined the design process by establishing clear standards and best practices across EVERFI’s products.</p>

    <h2>Background</h2>
    <p>EVERFI is a leading ed-tech company that delivers critical skills education through SaaS solutions across sectors including K-12, elective learning, financial education, and workplace training. As new products emerged over the years, some inconsistency emerged with them — particularly in our card components.</p>

    <h2>The challenge</h2>
    <p>Create a responsive and versatile card component that can be used across all EVERFI applications, unifying the user experience and improving usability. The component needed to accommodate different content types, metadata, and use cases while staying scalable and accessible.</p>

    <h3>Problems to solve</h3>
    <ul>
      <li><strong>Inconsistent card designs</strong> — multiple versions of card components with differing styles, sizes, and interactions across the platform were causing confusion.</li>
      <li><strong>User difficulty</strong> — users had trouble finding the right information on cards because they had to relearn card structures in different parts of the platform.</li>
      <li><strong>Lack of standards</strong> — no defined best practices or guidelines for card component usage.</li>
      <li><strong>Maintenance challenges</strong> — lack of standardization made it difficult to design new experiences across the platform.</li>
    </ul>

    <h2>Solution</h2>
    <p>Align around an intentional design language: create a unified card component and establish best practices for a cohesive visual experience across EVERFI’s platform and products.</p>

    <h3>Guiding principles</h3>
    <ul>
      <li><strong>Consistency</strong> — every card feels like a family and behaves predictably.</li>
      <li><strong>Accessibility</strong> — align with current WCAG 2.0 standards.</li>
      <li><strong>Flexibility</strong> — support various sizes and data scenarios across EVERFI’s products.</li>
      <li><strong>Scalability</strong> — design with future growth in mind to accommodate new metadata types.</li>
      <li><strong>Collaboration</strong> — involve cross-functional teams to gather insights and needs.</li>
    </ul>

    <h2>Discover &amp; define</h2>
    <p>My first step was to fully understand the landscape of our existing card component with a targeted audit: cataloging where the component was used, how, what information it displayed, and the variants needed for each product. Working in Figma, we built a repository the whole team could collaborate in and reference going forward.</p>
    ${i("af23422c-93a3-4f0c-8d58-70bc11f3ccf0-Product-Audit.png", "Product card component audit")}
    <p>As part of the working session, we looked at industry standards for card components — tags versus badges, image ratios, card orientations — and how to communicate the desired messaging and metadata successfully.</p>

    <h2>Early exploration</h2>
    <p>After cataloging our findings, we moved into ideation using Figma and FigJam, holding collaborative workshops to brainstorm and challenge different ideas.</p>
    ${i("3b9109be-ed21-42d5-8043-3e38aee8c7a4-metadata-audit.png", "Card metadata audit")}
    <p>We had deep discussions about metadata arrangement: establishing a common language for tags and badges, when to use them, and how to build a clear information hierarchy — plus visual elements like image ratios and card orientation. Each session built on the insights of the last.</p>
    ${explorationGallery}

    <h2>Design &amp; iterate</h2>
    <p>For the proof of concept, we developed several card variants in standardized sizes (narrow, medium, wide), each with predefined metadata configurations for specific use cases — consistency with room for flexibility. We then mocked up the screens and cards collected in the initial audit; seeing the components in context across different use cases was invaluable.</p>
    ${i("1ad46369-4f2f-43c6-9d31-2bd755fff247-Early-explorations---Details.png", "Early versus final card iteration")}
    <p>We established responsive design principles so cards would display effectively across devices and screen sizes, and defined clear rules for primary, secondary, and tertiary metadata to help users prioritize information naturally.</p>
    ${i("2a14a861-5d89-49c4-b239-a7a05f48a37d-New-Card-Component-Specs.png", "Card specifications and metadata description")}
    ${i("83811250-8b25-4952-9af5-5078129e2654-New-Card-Component-Variants.png", "Card layouts and variants")}
    <p>To ensure consistent implementation, I built a Storybook.js specification as a single source of truth, documenting visual design, metadata hierarchy, variant/orientation options, and edge cases.</p>
    ${afterGallery}

    <h2>Key results</h2>
    <ul>
      <li><strong>Improved user experience</strong> — users found information faster and navigated the platform with more ease; the new metadata hierarchy reduced cognitive load.</li>
      <li><strong>Positive feedback</strong> — initial testing showed higher task completion rates and satisfaction with the clarity of information.</li>
      <li><strong>Design efficiency</strong> — standardizing the component cut down redesign work, freeing designers to focus on other parts of the experience.</li>
      <li><strong>Enhanced collaboration</strong> — stronger alignment between design, development, and content teams, with open channels for future issues.</li>
      <li><strong>Scalability achieved</strong> — the component is backwards-compatible and can be integrated into new products seamlessly.</li>
    </ul>

    <h2>Summary</h2>
    <p>This became more than a design update — a strategic overhaul that addressed fundamental platform issues and advanced our Unified Design Library’s goal of a cohesive interface experience. By applying systems thinking and involving cross-functional teams, we created a scalable, accessible card component built to adapt to future needs.</p>

    <h3>Lessons learned</h3>
    <ul>
      <li><strong>Value of routine evaluations</strong> — regular audits of design components surface issues before they grow into bigger problems.</li>
      <li><strong>Importance of collaboration</strong> — engaging every stakeholder is key to building the right features into new components.</li>
      <li><strong>Documentation is key</strong> — detailed documentation keeps things consistent and gives future projects a reference point.</li>
      <li><strong>Holistic problem-solving</strong> — focusing on underlying issues rather than symptoms leads to more sustainable solutions.</li>
      <li><strong>Continuous improvement</strong> — a proactive approach keeps the user experience at the forefront.</li>
    </ul>
  </div>
</div>
${articleNav()}
`;

writeFileSync(
  path.join(ROOT, "cards-pattern.html"),
  page({
    title: "Unifying EVERFI’s Card Components — Ed Guillen",
    description:
      "Creating a responsive and versatile card component used across all EVERFI applications, unifying the user experience and improving usability.",
    activeNav: "work",
    path: "/cards-pattern",
    bodyHtml: body,
  })
);
console.log("Wrote cards-pattern.html");
