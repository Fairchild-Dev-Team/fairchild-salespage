/**
 * Business Innovation Institute course pages.
 * The BII document gives each course a one-line description in the program outline.
 * Each page adds the program outcomes, projects, skills, tools and certifications
 * that match that course. Only Business Analysis with AI has modules, from the
 * sheet's Business Analysis Modules tab.
 */

import {
  certifications,
  courseSummary,
  ecbaNote,
  outcomes,
  outlineCourses,
  project,
  requirements,
} from "@/lib/programmes/business-innovation/content"
import {
  coursePage,
  pick,
  type CoursePageParts,
} from "@/lib/programmes/course-page"
import { toolLogos } from "@/lib/programmes/shared"
import type { CoursePageContent } from "@/lib/programmes/types"

const pills = ["Beginner friendly", "100% online, self-paced"]

const [
  baRole,
  stakeholders,
  requirementsOutcome,
  aiTools,
  dataOutcome,
  prototypes,
  testing,
  change,
] = outcomes

const [salesforceBaCertification, ecbaCertification, scrumCertification] =
  certifications

const course = (id: string, parts: CoursePageParts) =>
  coursePage(
    pick(
      outlineCourses,
      (item) => item.id === `business-innovation-${id}`,
      `BII course ${id}`
    ),
    { pills, requirements },
    parts
  )

const capstone = project("Capstone: Product Launch and Change Plan")
const dataCase = project("Data-Backed Business Case")
const prototypeAndTest = project("Prototype and Test Plan")

const businessAnalysisWithAi: CoursePageContent = {
  summary: courseSummary("business-innovation-business-analysis-with-ai"),
  pills,
  learn: {
    heading: "What you will learn",
    items: [baRole, stakeholders, requirementsOutcome, aiTools],
  },
  modules: {
    heading: "Course modules",
    intro: "Four modules, in the order you take them.",
    // Week order from the Business Analysis Modules tab. The sheet numbers
    // Software System Development Lifecycle as Module 3 but runs it second.
    modules: [
      {
        title: "What is Business Analysis?",
        subtitle: "The Business Analyst Operating System",
        weeks: [1, 7],
      },
      { title: "Software System Development Lifecycle", weeks: [8, 11] },
      { title: "Stakeholder Mastery", weeks: [12, 18] },
      { title: "Requirements Mastery", weeks: [19, 22] },
    ],
  },
  build: {
    heading: "What you will build",
    intro:
      "The stakeholder and requirements work in this course feeds two of the program's portfolio pieces.",
    projects: [
      project("Stakeholder and Discovery Pack"),
      project("Requirements Specification"),
    ],
  },
  skills: {
    heading: "Skills you'll learn",
    skills: [
      "Business analysis",
      "Stakeholder management",
      "Requirements elicitation",
      "User stories and acceptance criteria",
      "Process modelling",
      "Software development lifecycle",
      "Agile and Scrum",
      "AI-assisted analysis",
    ],
  },
  certifications: {
    heading: "Certification pathway",
    intro:
      "This course prepares fellows for this industry certification. Exams are taken with the certifying body, and exam fees are paid separately.",
    note: ecbaNote,
    certifications: [ecbaCertification],
  },
  requirements,
}

export const businessInnovationCourses: Record<string, CoursePageContent> = {
  "business-innovation-business-analysis-with-ai": businessAnalysisWithAi,
  "business-innovation-change-management": course("change-management", {
    learn: [change],
    projects: [capstone],
    skills: ["Change management"],
  }),
  "business-innovation-product-development": course("product-development", {
    learn: [testing],
    projects: [capstone],
    skills: ["Product development"],
  }),
  "business-innovation-salesforce-ba": course("salesforce-ba", {
    skills: ["Business analysis"],
    tools: [{ name: "Salesforce", logo: toolLogos.salesforce }],
    certifications: [salesforceBaCertification],
  }),
  "business-innovation-quality-testing": course("quality-testing", {
    learn: [testing],
    projects: [prototypeAndTest],
    skills: ["Quality and user acceptance testing"],
  }),
  "business-innovation-microsoft-devops": course("microsoft-devops", {
    skills: ["Agile and Scrum"],
    tools: [{ name: "Microsoft Azure DevOps", logo: toolLogos.azureDevOps }],
  }),
  "business-innovation-agile-scrum": course("agile-scrum", {
    learn: [baRole],
    projects: [capstone],
    skills: ["Agile and Scrum"],
    certifications: [scrumCertification],
  }),
  "business-innovation-sql-for-ba": course("sql-for-ba", {
    learn: [dataOutcome],
    projects: [dataCase],
    skills: ["Data analysis"],
    tools: [{ name: "SQL" }],
  }),
  "business-innovation-advanced-excel": course("advanced-excel", {
    learn: [dataOutcome],
    projects: [dataCase],
    skills: ["Data analysis"],
    tools: [{ name: "Microsoft Excel", logo: toolLogos.excel }],
  }),
  "business-innovation-ui-ux-in-ba": course("ui-ux-in-ba", {
    learn: [prototypes],
    projects: [prototypeAndTest],
    skills: ["Wireframing"],
    tools: [
      { name: "Figma", logo: toolLogos.figma },
      { name: "Miro", logo: toolLogos.miro },
    ],
  }),
  "business-innovation-iiba-cbap": course("iiba-cbap", {
    skills: ["Business analysis"],
    certifications: [ecbaCertification],
    certificationNote: ecbaNote,
  }),
}
