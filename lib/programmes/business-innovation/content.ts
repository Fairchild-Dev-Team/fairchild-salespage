/**
 * Business Innovation Institute content shared by the institute page and its course pages.
 * Source: "Business Innovation & Strategy (BII) - Institute Page Content" (Oct 31, 2026).
 */

import { illustrations } from "@/lib/programmes/shared"
import type {
  ProgrammeCertification,
  ProgrammeOutlineCourse,
  ProgrammeProject,
} from "@/lib/programmes/types"

export const projects: ProgrammeProject[] = [
  {
    title: "Stakeholder and Discovery Pack",
    summary:
      "Map stakeholders for a business case, plan discovery interviews and summarise findings into a problem statement.",
    skills: ["Stakeholder analysis", "Interviewing", "Problem framing"],
  },
  {
    title: "Requirements Specification",
    summary:
      "Turn discovery findings into a backlog of user stories with acceptance criteria and a current and future process map.",
    skills: ["Requirements elicitation", "User stories", "Process modelling"],
  },
  {
    title: "Data-Backed Business Case",
    summary:
      "Query a sample dataset with SQL, analyse it in Excel and present a recommendation with costs and benefits.",
    skills: ["SQL", "Excel", "Business case writing"],
  },
  {
    title: "Prototype and Test Plan",
    summary:
      "Build low-fidelity wireframes in Figma or Miro and write test cases to check the solution meets its requirements.",
    skills: ["Wireframing", "UAT", "Quality testing"],
  },
  {
    title: "Capstone: Product Launch and Change Plan",
    summary:
      "Take one product idea from vision to release plan, including sprint plan, rollout and a change management plan for users.",
    skills: ["Product development", "Agile delivery", "Change management"],
  },
]

/** Look up a project by its title, so course pages can reuse it. */
export const project = (title: string) => {
  const match = projects.find((item) => item.title === title)
  if (!match) throw new Error(`Unknown BII project: ${title}`)
  return match
}

export const requirements = {
  heading: "Prerequisites and requirements",
  items: [
    {
      title: "Prior experience",
      body: "None. No technical or business analysis background is needed.",
      illustration: illustrations.experience,
    },
    {
      title: "Language",
      body: "Good written and spoken English.",
      illustration: illustrations.language,
    },
    {
      title: "Equipment",
      body: "A laptop or desktop computer and a reliable internet connection. A phone or tablet alone is not enough for the tools used.",
      illustration: illustrations.equipment,
    },
  ],
}

/** Institute learning outcomes, in document order. Course pages pick from these. */
export const outcomes = [
  "Explain the business analyst's role across the software development lifecycle and work within agile and Scrum teams.",
  "Identify stakeholders, run discovery sessions and manage expectations from first meeting to sign-off.",
  "Elicit, document and prioritise requirements as user stories, acceptance criteria and process models.",
  "Use AI tools to speed up research, documentation, analysis and requirements drafting.",
  "Analyse business data with SQL and advanced Excel to support decisions.",
  "Create wireframes and low-fidelity prototypes to test ideas with users before build.",
  "Plan test cases, support quality testing and guide a product from idea to release.",
  "Lead and support organisational change so new systems and processes are adopted.",
]

export const outlineCourses: ProgrammeOutlineCourse[] = [
  {
    id: "business-innovation-business-analysis-with-ai",
    title: "Business Analysis with AI",
    priceUsd: 2000,
    summary:
      "The core of the institute: the business analyst role, stakeholders, the development lifecycle and requirements, with AI tools used throughout.",
  },
  {
    id: "business-innovation-change-management",
    title: "Change Management for Serious People",
    priceUsd: 1000,
    summary:
      "Plan and lead change so people adopt new systems and ways of working. Starts November 2026.",
  },
  {
    id: "business-innovation-product-development",
    title: "Product Development",
    priceUsd: 1000,
    summary:
      "Take an idea from vision and roadmap to a released product, working with design and engineering.",
  },
  {
    id: "business-innovation-salesforce-ba",
    title: "Salesforce BA & Exam Prep",
    priceUsd: 1000,
    summary:
      "Business analysis on the Salesforce platform and preparation for the Salesforce Business Analyst certification.",
  },
  {
    id: "business-innovation-quality-testing",
    title: "Quality Testing",
    priceUsd: 1000,
    summary:
      "Test planning, test cases, defect tracking and user acceptance testing.",
  },
  {
    id: "business-innovation-microsoft-devops",
    title: "Microsoft DevOps",
    priceUsd: 500,
    summary:
      "Manage backlogs, boards and sprints in Azure DevOps alongside delivery teams.",
  },
  {
    id: "business-innovation-agile-scrum",
    title: "Agile & Scrum",
    priceUsd: 750,
    summary:
      "Scrum roles, events and artefacts, backlog refinement and sprint planning.",
  },
  {
    id: "business-innovation-sql-for-ba",
    title: "SQL for BA",
    priceUsd: 500,
    summary:
      "Query databases to answer business questions and validate requirements.",
  },
  {
    id: "business-innovation-advanced-excel",
    title: "Advanced Excel",
    priceUsd: 500,
    summary:
      "Lookups, pivot tables, dashboards and analysis for business reporting.",
  },
  {
    id: "business-innovation-ui-ux-in-ba",
    title: "UI/UX in Business Analysis",
    priceUsd: 1000,
    summary:
      "Wireframes, user flows and low-fidelity prototypes in Miro and Figma.",
  },
  {
    id: "business-innovation-iiba-cbap",
    title: "IIBA CBAP",
    priceUsd: 500,
    summary:
      "Structured preparation for IIBA certification, based on the BABOK Guide.",
  },
]

/** One-line description of a course, from the institute outline. */
export const courseSummary = (id: string) => {
  const match = outlineCourses.find((item) => item.id === id)
  if (!match) throw new Error(`Unknown BII course: ${id}`)
  return match.summary
}

export const certifications: ProgrammeCertification[] = [
  {
    name: "Salesforce Certified Business Analyst",
    body: "Salesforce",
    preparedIn: [
      {
        id: "business-innovation-salesforce-ba",
        title: "Salesforce BA & Exam Prep",
      },
    ],
  },
  {
    name: "ECBA (entry level), with a path to CCBA and CBAP",
    body: "IIBA",
    preparedIn: [
      { id: "business-innovation-iiba-cbap", title: "IIBA CBAP" },
      {
        id: "business-innovation-business-analysis-with-ai",
        title: "Business Analysis with AI",
      },
    ],
  },
  {
    name: "Professional Scrum Master I or Certified ScrumMaster",
    body: "Scrum.org or Scrum Alliance",
    preparedIn: [
      { id: "business-innovation-agile-scrum", title: "Agile & Scrum" },
    ],
  },
]

export const ecbaNote =
  "CBAP requires several years of documented business analysis work experience. Most career changers start with ECBA and move up as they gain experience."
