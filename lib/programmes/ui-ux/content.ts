/**
 * Content shared by the program page and its course pages.
 * Source: "UI UX Design Institute (UDI) - Program Page Content (Nov 1, 2026)".
 */

import { illustrations } from "@/lib/programmes/shared"
import type {
  ProgrammeCertification,
  ProgrammeOutlineCourse,
  ProgrammeProject,
} from "@/lib/programmes/types"

export const course = (id: string, title: string) => ({
  id: `ui-ux-${id}`,
  title,
})

/** Program learning outcomes, in document order. Course pages pick from these. */
export const outcomes = [
  "Apply design thinking to understand problems before jumping to solutions.",
  "Plan and run user research: interviews, surveys and competitor reviews.",
  "Turn research into personas, user journeys and information architecture.",
  "Sketch and wireframe solutions to UX problems.",
  "Create polished interfaces using colour, typography, layout and accessibility principles.",
  "Design efficiently in Figma, use AI tools to speed up the work, and build reusable design systems.",
  "Build interactive prototypes and test them with real users.",
  "Present design decisions, hand off work to developers and build a professional portfolio.",
]

export const projects: ProgrammeProject[] = [
  {
    title: "User Research Report",
    summary:
      "Interview users about a real problem and turn findings into personas and a journey map.",
    skills: ["User research", "Personas", "Journey mapping"],
  },
  {
    title: "Wireframes and Information Architecture",
    summary: "Map the structure of a mobile app and wireframe its key screens.",
    skills: ["Information architecture", "Wireframing", "UX problem solving"],
  },
  {
    title: "High-Fidelity App Design",
    summary: "Turn wireframes into polished, accessible screens in Figma.",
    skills: ["Visual design", "Typography", "Accessibility"],
  },
  {
    title: "Design System and Responsive Website",
    summary:
      "Build a reusable component library and use it to design a website that works on phone, tablet and desktop.",
    skills: ["Design systems", "Responsive design", "Figma components"],
  },
  {
    title: "Capstone: End-to-End Product Case Study",
    summary:
      "Take a product from research to tested prototype, then present it as a portfolio case study with a developer handoff.",
    skills: ["Prototyping", "Usability testing", "Presentation", "Handoff"],
  },
]

export const outlineCourses: ProgrammeOutlineCourse[] = [
  {
    ...course("digital-foundations", "Digital & Design Foundations"),
    priceUsd: null,
    summary:
      "How digital products are made, design thinking and core visual principles.",
  },
  {
    ...course(
      "understanding-users",
      "Understanding Users & Structuring Experiences"
    ),
    priceUsd: null,
    summary:
      "User research, personas, journey maps and information architecture.",
  },
  {
    ...course("wireframing", "Wireframing & UX Problem Solving"),
    priceUsd: null,
    summary:
      "Sketching, user flows and wireframes that solve real user problems.",
  },
  {
    ...course("visual-design", "UI & Visual Design"),
    priceUsd: null,
    summary: "Colour, typography, layout, iconography and accessibility.",
  },
  {
    ...course("figma-ai", "Figma Mastery & Designing with AI"),
    priceUsd: null,
    summary:
      "Figma from basics to advanced features, and AI tools that speed up design work.",
  },
  {
    ...course("design-systems", "Design Systems & Responsive Design"),
    priceUsd: null,
    summary: "Components, styles and layouts that adapt to every screen size.",
  },
  {
    ...course("prototyping", "Prototyping & Interaction"),
    priceUsd: null,
    summary: "Clickable prototypes, transitions and micro-interactions.",
  },
  {
    ...course("usability", "Usability Testing & Product Thinking"),
    priceUsd: null,
    summary:
      "Plan and run usability tests, and connect design choices to product goals.",
  },
  {
    ...course(
      "handoff",
      "Design Communication, Presentation & Developer Handoff"
    ),
    priceUsd: null,
    summary:
      "Present design decisions to stakeholders and prepare files for developers.",
  },
  {
    ...course("capstone", "Capstone, Portfolio & Professional Practice"),
    priceUsd: null,
    summary:
      "Build the capstone case study, polish your portfolio and prepare for the job market.",
  },
]

export const certifications: ProgrammeCertification[] = [
  {
    name: "FairChild Certificate of Completion, UI/UX Design",
    body: "FairChild Institute",
    preparedInLabel: "Earned through",
    preparedIn: [{ title: "Completing all 10 courses and the capstone" }],
  },
  {
    name: "Professional portfolio with five case studies",
    body: "Your own",
    preparedInLabel: "Earned through",
    preparedIn: [{ title: "Projects 01 to 05" }],
  },
]

export const certificationNote =
  "Fellows who later want an external credential can pursue options such as the Nielsen Norman Group UX Certification. It requires NN/g's own courses and exams, at extra cost."

export const requirements = {
  heading: "Prerequisites and requirements",
  items: [
    {
      title: "Prior experience",
      body: "None. No design or technical background is needed.",
      illustration: illustrations.experience,
    },
    {
      title: "Language",
      body: "Good written and spoken English.",
      illustration: illustrations.language,
    },
    {
      title: "Equipment",
      body: "A laptop or desktop computer and a reliable internet connection. A phone or tablet alone is not enough for the tools used. Figma's free plan is enough to start.",
      illustration: illustrations.equipment,
    },
  ],
}
