/**
 * Software Engineering Institute course pages.
 * The SEI document gives each course a one-line description in the institute outline,
 * and names the courses that prepare for each certification. Each page adds the
 * institute outcomes, projects, skills and tools that match that course. No course
 * has modules in the sheet.
 */

import {
  certificationsFor,
  coursePage,
  pick,
  type CoursePageParts,
} from "@/lib/programmes/course-page"
import { toolLogos } from "@/lib/programmes/shared"
import {
  certificationNote,
  certifications,
  outcomes,
  outlineCourses,
  projects,
  requirements,
} from "@/lib/programmes/software-engineering/content"
import type { CoursePageContent } from "@/lib/programmes/types"

const pills = ["Beginner friendly", "100% online, self-paced"]

const [aiBasics, html, css, javascript, practices, aiCoding, apis, fullApp] =
  outcomes

const project = (title: string) =>
  pick(projects, (item) => item.title === title, `SEI project ${title}`)

function course(id: string, parts: CoursePageParts) {
  const courseId = `software-engineering-${id}`
  return coursePage(
    pick(outlineCourses, (item) => item.id === courseId, `SEI course ${id}`),
    { pills, requirements },
    {
      certifications: certificationsFor(certifications, courseId),
      certificationNote,
      ...parts,
    }
  )
}

export const softwareEngineeringCourses: Record<string, CoursePageContent> = {
  "software-engineering-intro-ai": course("intro-ai", {
    learn: [aiBasics, apis],
    projects: [project("AI Feature Integration")],
    skills: ["AI fundamentals", "Machine learning concepts", "Prompt design"],
    tools: [{ name: "AI model APIs" }],
  }),
  "software-engineering-software-engineering": course("software-engineering", {
    learn: [practices, aiCoding, fullApp],
    projects: [project("Capstone: Full Application")],
    skills: [
      "Software engineering practices",
      "Version control",
      "Testing and debugging",
      "AI-assisted coding",
      "Deployment",
    ],
    tools: [
      { name: "Git", logo: toolLogos.git },
      { name: "GitHub", logo: toolLogos.github },
      { name: "Visual Studio Code" },
      { name: "AI coding assistants" },
    ],
  }),
  "software-engineering-html-css": course("html-css", {
    learn: [html, css],
    projects: [project("Personal Portfolio Site")],
    skills: ["Web development", "Responsive design"],
    tools: [
      { name: "HTML", logo: toolLogos.html },
      { name: "CSS", logo: toolLogos.css },
    ],
  }),
  "software-engineering-javascript": course("javascript", {
    learn: [javascript, apis],
    projects: [
      project("Interactive Web App"),
      project("API-Powered Dashboard"),
    ],
    skills: ["JavaScript programming", "API integration"],
    tools: [
      { name: "JavaScript", logo: toolLogos.javascript },
      { name: "Browser developer tools" },
    ],
  }),
}
