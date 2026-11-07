/**
 * UI/UX Design Institute course pages.
 * The UDI document gives each course a one-line description in the institute outline.
 * Each page adds the institute outcomes, projects, skills and tools that match that
 * course. No course has modules or a price in the sheet, and UX has no industry
 * exam per course, so there is no certification section.
 */

import {
  coursePage,
  pick,
  type CoursePageParts,
} from "@/lib/programmes/course-page"
import { toolLogos } from "@/lib/programmes/shared"
import type { CoursePageContent } from "@/lib/programmes/types"
import {
  outcomes,
  outlineCourses,
  projects,
  requirements,
} from "@/lib/programmes/ui-ux/content"

const pills = ["Beginner friendly", "100% online, self-paced"]

const [
  designThinking,
  research,
  personas,
  wireframes,
  visualDesign,
  figma,
  prototypes,
  presentation,
] = outcomes

const project = (title: string) =>
  pick(projects, (item) => item.title === title, `UDI project ${title}`)

const researchReport = project("User Research Report")
const wireframesProject = project("Wireframes and Information Architecture")
const highFidelity = project("High-Fidelity App Design")
const designSystem = project("Design System and Responsive Website")
const capstone = project("Capstone: End-to-End Product Case Study")

const figmaTool = { name: "Figma", logo: toolLogos.figma }
const miroTool = { name: "Miro", logo: toolLogos.miro }

function course(id: string, parts: CoursePageParts) {
  return coursePage(
    pick(
      outlineCourses,
      (item) => item.id === `ui-ux-${id}`,
      `UDI course ${id}`
    ),
    { pills, requirements },
    parts
  )
}

export const uiUxCourses: Record<string, CoursePageContent> = {
  "ui-ux-digital-foundations": course("digital-foundations", {
    learn: [designThinking],
    skills: ["Design thinking"],
  }),
  "ui-ux-understanding-users": course("understanding-users", {
    learn: [research, personas],
    projects: [researchReport],
    skills: [
      "User research",
      "Personas and journey mapping",
      "Information architecture",
    ],
    tools: [miroTool, { name: "FigJam" }],
  }),
  "ui-ux-wireframing": course("wireframing", {
    learn: [wireframes],
    projects: [wireframesProject],
    skills: ["Wireframing"],
    tools: [figmaTool, miroTool],
  }),
  "ui-ux-visual-design": course("visual-design", {
    learn: [visualDesign],
    projects: [highFidelity],
    skills: ["Visual design", "Typography and colour", "Accessibility"],
    tools: [figmaTool],
  }),
  "ui-ux-figma-ai": course("figma-ai", {
    learn: [figma],
    projects: [highFidelity],
    tools: [figmaTool, { name: "FigJam" }, { name: "AI design assistants" }],
  }),
  "ui-ux-design-systems": course("design-systems", {
    learn: [figma],
    projects: [designSystem],
    skills: ["Design systems", "Responsive design"],
    tools: [figmaTool],
  }),
  "ui-ux-prototyping": course("prototyping", {
    learn: [prototypes],
    projects: [capstone],
    skills: ["Prototyping"],
    tools: [figmaTool],
  }),
  "ui-ux-usability": course("usability", {
    learn: [prototypes],
    projects: [capstone],
    skills: ["Usability testing", "Product thinking"],
    tools: [{ name: "Maze", logo: toolLogos.maze }],
  }),
  "ui-ux-handoff": course("handoff", {
    learn: [presentation],
    projects: [capstone],
    skills: ["Design presentation"],
    tools: [figmaTool],
  }),
  "ui-ux-capstone": course("capstone", {
    learn: [presentation],
    projects: [capstone],
    skills: ["Design presentation"],
  }),
}
