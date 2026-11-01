/**
 * Project Planning Institute course pages.
 * The document gives each course a one-line description in the program outline,
 * and names the courses that prepare for each certification. Each page adds the
 * program outcomes, projects, skills and tools that match that course. No course
 * has modules or a price in the sheet.
 */

import {
  certificationsFor,
  coursePage,
  pick,
  type CoursePageParts,
} from "@/lib/programmes/course-page"
import {
  certificationNote,
  certifications,
  outcomes,
  outlineCourses,
  projects,
  requirements,
} from "@/lib/programmes/project-planning/content"
import { toolLogos } from "@/lib/programmes/shared"
import type { CoursePageContent } from "@/lib/programmes/types"

const pills = ["Beginner friendly", "100% online, self-paced"]

const [
  lifecycle,
  scope,
  budget,
  risk,
  leadership,
  aiTools,
  dataReporting,
  pmiPrep,
] = outcomes

const project = (title: string) =>
  pick(
    projects,
    (item) => item.title === title,
    `Project Planning project ${title}`
  )

function course(id: string, parts: CoursePageParts) {
  const courseId = `project-planning-${id}`
  return coursePage(
    pick(
      outlineCourses,
      (item) => item.id === courseId,
      `Project Planning course ${id}`
    ),
    { pills, requirements },
    {
      certifications: certificationsFor(certifications, courseId),
      certificationNote,
      ...parts,
    }
  )
}

export const projectPlanningCourses: Record<string, CoursePageContent> = {
  "project-planning-ai-project-management": course("ai-project-management", {
    learn: [lifecycle, leadership, aiTools],
    projects: [project("Capstone: AI-Assisted Project Delivery")],
    skills: [
      "AI-assisted project management",
      "Team leadership",
      "Stakeholder management",
      "Agile and hybrid delivery",
    ],
    tools: [{ name: "AI assistants" }],
  }),
  "project-planning-project-planning-control": course(
    "project-planning-control",
    {
      learn: [scope, budget, risk, pmiPrep],
      projects: [
        project("Project Charter and Scope Plan"),
        project("Schedule and Budget Baseline"),
        project("Risk and Change Log"),
      ],
      skills: [
        "Project planning",
        "Scope management",
        "Scheduling",
        "Budgeting and cost control",
        "Risk management",
        "Dashboard reporting",
      ],
      tools: [
        { name: "Power BI" },
        { name: "Tableau", logo: toolLogos.tableau },
        { name: "Project scheduling software" },
      ],
    }
  ),
  "project-planning-data-analysis-fundamentals": course(
    "data-analysis-fundamentals",
    {
      learn: [dataReporting],
      projects: [project("Project Performance Dashboard")],
      skills: ["Data analysis", "Dashboard reporting"],
      tools: [
        { name: "Microsoft Excel", logo: toolLogos.excel },
        { name: "SQL" },
        { name: "Power BI" },
      ],
    }
  ),
  // The document does not yet say which certifications this course covers.
  "project-planning-other-certifications": course("other-certifications", {}),
}
