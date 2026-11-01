/**
 * Content shared by the program page and its course pages.
 * Source: "Project Planning Institute - Program Page Content (Nov 1, 2026)".
 */

import { illustrations } from "@/lib/programmes/shared"
import type {
  ProgrammeCertification,
  ProgrammeOutlineCourse,
  ProgrammeProject,
} from "@/lib/programmes/types"

export const course = (id: string, title: string) => ({
  id: `project-planning-${id}`,
  title,
})

export const aiProjectManagement = course(
  "ai-project-management",
  "AI Project Management for Serious People"
)
export const planningControl = course(
  "project-planning-control",
  "Project Planning and Control with Certification"
)
export const dataAnalysis = course(
  "data-analysis-fundamentals",
  "Fundamentals of Data Analysis"
)

/** Program learning outcomes, in document order. Course pages pick from these. */
export const outcomes = [
  "Explain the project lifecycle and the main predictive, agile and hybrid approaches.",
  "Define scope, build a work breakdown structure and create realistic schedules.",
  "Estimate costs, set budgets and track progress against the plan.",
  "Identify and manage risks, issues and changes.",
  "Lead project teams and communicate with stakeholders at every stage.",
  "Use AI tools to draft plans, summarise status, spot risks and save time on reporting.",
  "Analyse project data with Excel and SQL, and build dashboards in Power BI and Tableau.",
  "Prepare for PMI certification exams with structured study and practice questions.",
]

export const projects: ProgrammeProject[] = [
  {
    title: "Project Charter and Scope Plan",
    summary:
      "Write a charter, stakeholder register and scope statement for a sample project.",
    skills: ["Project initiation", "Scope definition", "Stakeholder analysis"],
  },
  {
    title: "Schedule and Budget Baseline",
    summary:
      "Build a work breakdown structure, schedule and budget, and identify the critical path.",
    skills: ["Scheduling", "Cost estimation", "WBS"],
  },
  {
    title: "Risk and Change Log",
    summary:
      "Run a risk assessment, set responses and handle a simulated change request.",
    skills: ["Risk management", "Change control"],
  },
  {
    title: "Project Performance Dashboard",
    summary:
      "Analyse project data with Excel and SQL and build a status dashboard in Power BI or Tableau.",
    skills: ["Excel", "SQL", "Power BI", "Tableau"],
  },
  {
    title: "Capstone: AI-Assisted Project Delivery",
    summary:
      "Plan and track a full project from start to close, using AI tools for planning and status reporting, and present a closing report.",
    skills: ["AI project management", "Reporting", "Presentation"],
  },
]

export const outlineCourses: ProgrammeOutlineCourse[] = [
  {
    ...aiProjectManagement,
    priceUsd: null,
    summary:
      "Project lifecycle, methods and leadership, with AI tools for planning, risk and status reporting.",
  },
  {
    ...planningControl,
    priceUsd: null,
    summary:
      "Scope, schedule, cost, risk and change control, with reporting in Power BI and Tableau and preparation for PMI certification.",
  },
  {
    ...dataAnalysis,
    priceUsd: null,
    summary:
      "Advanced Excel, SQL and Power BI for analysing and reporting project data.",
  },
  {
    // Which certifications this covers is not in the sheet [confirm].
    ...course("other-certifications", "Other Certifications"),
    priceUsd: null,
    summary: "Additional certification preparation.",
  },
]

export const certifications: ProgrammeCertification[] = [
  {
    name: "Certified Associate in Project Management (CAPM)",
    body: "PMI",
    preparedIn: [planningControl, aiProjectManagement],
  },
  {
    name: "Project Management Professional (PMP)",
    body: "PMI",
    preparedIn: [planningControl, aiProjectManagement],
  },
  {
    name: "Microsoft Certified: Power BI Data Analyst Associate (PL-300)",
    body: "Microsoft",
    preparedIn: [dataAnalysis],
  },
  {
    name: "Salesforce Certified Tableau Desktop Foundations",
    body: "Salesforce",
    preparedIn: [planningControl],
  },
]

export const certificationNote =
  "PMP requires documented experience leading projects as well as 35 hours of project management education. Fellows new to project management usually start with CAPM. The PMP exam content was updated in July 2026 and now places more weight on AI in project work, which this program covers."

export const requirements = {
  heading: "Prerequisites and requirements",
  items: [
    {
      title: "Prior experience",
      body: "None. Experience organising work or people helps, but is not required.",
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
