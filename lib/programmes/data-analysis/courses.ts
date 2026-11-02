/**
 * Data Analysis Institute course pages.
 * The DAI document gives each course a one-line description in the program outline,
 * and names the courses that prepare for each certification. Each page adds the
 * program outcomes, projects, skills and tools that match that course. No course
 * has modules in the sheet.
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
} from "@/lib/programmes/data-analysis/content"
import { toolLogos } from "@/lib/programmes/shared"
import type { CoursePageContent } from "@/lib/programmes/types"

const pills = ["Beginner friendly", "100% online, self-paced"]

const [
  excel,
  sql,
  python,
  r,
  powerBi,
  statistics,
  storytelling,
  documentation,
] = outcomes

const project = (title: string) =>
  pick(projects, (item) => item.title === title, `DAI project ${title}`)

function course(id: string, parts: CoursePageParts) {
  const courseId = `data-analysis-${id}`
  return coursePage(
    pick(outlineCourses, (item) => item.id === courseId, `DAI course ${id}`),
    { pills, requirements },
    {
      certifications: certificationsFor(certifications, courseId),
      certificationNote,
      ...parts,
    }
  )
}

export const dataAnalysisCourses: Record<string, CoursePageContent> = {
  "data-analysis-advanced-excel": course("advanced-excel", {
    learn: [excel],
    projects: [project("Sales Performance Workbook")],
    skills: ["Data cleaning", "Data analysis"],
    tools: [{ name: "Microsoft Excel", logo: toolLogos.excel }],
  }),
  "data-analysis-sql": course("sql", {
    learn: [sql],
    projects: [project("Database Insights Report")],
    skills: ["Querying databases"],
    tools: [{ name: "SQL" }],
  }),
  "data-analysis-python-r": course("python-r", {
    learn: [python, r, statistics],
    projects: [project("Python Data Analysis")],
    skills: ["Statistical analysis", "Data visualisation", "Data cleaning"],
    tools: [
      { name: "Python", logo: toolLogos.python },
      { name: "pandas", logo: toolLogos.pandas },
      { name: "R", logo: toolLogos.r },
      { name: "Jupyter Notebook", logo: toolLogos.jupyter },
    ],
  }),
  "data-analysis-power-bi": course("power-bi", {
    learn: [powerBi],
    projects: [project("Interactive Power BI Dashboard")],
    skills: ["Dashboard design", "Data modelling"],
    tools: [{ name: "Power BI" }],
  }),
  "data-analysis-storytelling": course("storytelling", {
    learn: [storytelling, documentation],
    projects: [project("Capstone: End-to-End Analysis")],
    skills: ["Data storytelling", "Report writing", "Documentation"],
  }),
}
