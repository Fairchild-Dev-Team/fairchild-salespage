/**
 * Content shared by the program page and its course pages.
 * Source: "Data Analysis Institute (DAI) - Program Page Content (Nov 1, 2026)".
 */

import { illustrations } from "@/lib/programmes/shared"
import type {
  ProgrammeCertification,
  ProgrammeOutlineCourse,
  ProgrammeProject,
} from "@/lib/programmes/types"

export const course = (id: string, title: string) => ({
  id: `data-analysis-${id}`,
  title,
})

export const advancedExcel = course("advanced-excel", "Advanced Excel")
export const sql = course("sql", "SQL")
export const pythonR = course("python-r", "Python & R")
export const powerBi = course("power-bi", "Power BI")

/** Program learning outcomes, in document order. Course pages pick from these. */
export const outcomes = [
  "Clean, organise and analyse data in Excel with formulas, lookups and pivot tables.",
  "Write SQL queries to filter, join and summarise data from databases.",
  "Use Python to clean, analyse and visualise data with libraries such as pandas.",
  "Use R for statistical analysis and data visualisation.",
  "Build interactive Power BI dashboards that update as data changes.",
  "Apply basic statistics to spot trends, compare groups and avoid misleading conclusions.",
  "Tell a clear story with data: choose the right chart, write insights and tailor them to the audience.",
  "Document analysis so others can follow, check and repeat it.",
]

export const projects: ProgrammeProject[] = [
  {
    title: "Sales Performance Workbook",
    summary:
      "Clean a messy sales dataset in Excel and build a summary report with pivot tables and charts.",
    skills: ["Excel", "Data cleaning", "Pivot tables"],
  },
  {
    title: "Database Insights Report",
    summary:
      "Answer a set of business questions by querying a multi-table database with SQL.",
    skills: ["SQL", "Joins", "Aggregation"],
  },
  {
    title: "Python Data Analysis",
    summary:
      "Analyse a public dataset in Python, test a hypothesis and visualise the findings.",
    skills: ["Python", "pandas", "Statistics", "Visualisation"],
  },
  {
    title: "Interactive Power BI Dashboard",
    summary:
      "Build a dashboard that lets managers filter and explore key performance measures.",
    skills: ["Power BI", "Data modelling", "DAX basics"],
  },
  {
    title: "Capstone: End-to-End Analysis",
    summary:
      "Take a real-world question from raw data to a documented analysis and a short presentation for decision-makers.",
    skills: ["Data storytelling", "Documentation", "Presentation"],
  },
]

export const outlineCourses: ProgrammeOutlineCourse[] = [
  {
    ...advancedExcel,
    priceUsd: 1000,
    summary:
      "Formulas, lookups, pivot tables, data cleaning and charts for analysis.",
  },
  {
    ...sql,
    priceUsd: 1000,
    summary:
      "Querying, filtering, joining and summarising data in relational databases.",
  },
  {
    ...pythonR,
    priceUsd: 1500,
    summary: "Data analysis, statistics and visualisation in Python and R.",
  },
  {
    ...powerBi,
    priceUsd: 1000,
    summary: "Data models, measures and interactive dashboards.",
  },
  {
    ...course("storytelling", "Data Storytelling & Documentation"),
    priceUsd: 1000,
    summary: "Presenting insights clearly and documenting analysis for others.",
  },
]

export const certifications: ProgrammeCertification[] = [
  {
    name: "Microsoft Office Specialist: Excel Associate (MO-210)",
    body: "Microsoft",
    preparedIn: [advancedExcel],
  },
  {
    name: "PCEP: Certified Entry-Level Python Programmer",
    body: "Python Institute",
    preparedIn: [pythonR],
  },
  {
    name: "Microsoft Certified: Power BI Data Analyst Associate (PL-300)",
    body: "Microsoft",
    preparedIn: [powerBi, sql],
  },
]

export const certificationNote =
  "PL-300 is the most widely recognised of the three for data analyst roles. Most fellows take it after finishing the Power BI course."

export const requirements = {
  heading: "Prerequisites and requirements",
  items: [
    {
      title: "Prior experience",
      body: "None. Basic computer skills and comfort with simple maths are enough. No coding background is needed.",
      illustration: illustrations.experience,
    },
    {
      title: "Language",
      body: "Good written and spoken English.",
      illustration: illustrations.language,
    },
    {
      // The Mac guidance is still to confirm.
      title: "Equipment",
      body: "A laptop or desktop computer and a reliable internet connection. A phone or tablet alone is not enough for the tools used. Power BI Desktop runs on Windows, so Mac users need a Windows setup or the online version.",
      illustration: illustrations.equipment,
    },
  ],
}
