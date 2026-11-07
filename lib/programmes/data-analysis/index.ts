/**
 * Data Analysis Institute.
 * Source: "Data Analysis Institute (DAI) - Institute Page Content" (Nov 1, 2026).
 */

import {
  BarChart3,
  Database,
  FileSpreadsheet,
  LayoutDashboard,
  LineChart,
  PieChart,
  Presentation,
  Route,
  Settings2,
} from "lucide-react"

import {
  certificationNote,
  certifications,
  outcomes,
  outlineCourses,
  projects,
  requirements,
} from "@/lib/programmes/data-analysis/content"
import { dataAnalysisCourses } from "@/lib/programmes/data-analysis/courses"
import { toolLogos } from "@/lib/programmes/shared"
import type { ProgrammePageContent } from "@/lib/programmes/types"

export const dataAnalysis: ProgrammePageContent = {
  id: "data-analysis",
  hero: {
    pills: ["12 months", "Beginner friendly"],
    headline: "Turn raw data into decisions people act on.",
    summary:
      "Learn Excel, SQL, Python, R and Power BI, then tell the story behind the numbers with clear reports and dashboards.",
    facts: [
      { label: "Courses", value: "5" },
      { label: "Format", value: "100% online, self-paced" },
    ],
    priceNote: "or take individual courses from $1,000.",
  },
  audience: {
    heading: "Who this institute is for",
    audiences: [
      {
        title: "Career changers",
        body: "From teaching, finance, healthcare administration, sales or operations who want a structured route into a data analyst role.",
        icon: Route,
      },
      {
        title: "Spreadsheet power users",
        body: "Professionals who already live in Excel and want to work faster and deeper with SQL, Python and dashboards.",
        icon: FileSpreadsheet,
      },
      {
        title: "Professionals who report on data",
        body: "Managers, coordinators and specialists who need to analyse results and present them clearly to decision-makers.",
        icon: Presentation,
      },
    ],
  },
  learn: {
    heading: "What you will learn",
    items: outcomes,
  },
  build: {
    heading: "What you will build",
    intro: "Fellows finish with five portfolio pieces they can show employers.",
    projects,
  },
  skills: {
    heading: "Skills you'll learn",
    skills: [
      "Data cleaning",
      "Data analysis",
      "Querying databases",
      "Statistical analysis",
      "Data visualisation",
      "Dashboard design",
      "Data modelling",
      "Data storytelling",
      "Report writing",
      "Documentation",
    ],
    tools: [
      { name: "Microsoft Excel", logo: toolLogos.excel },
      { name: "SQL" },
      { name: "Python", logo: toolLogos.python },
      { name: "pandas", logo: toolLogos.pandas },
      { name: "R", logo: toolLogos.r },
      { name: "Power BI" },
      { name: "Jupyter Notebook", logo: toolLogos.jupyter },
    ],
  },
  outline: {
    heading: "Institute outline",
    facts: [
      { value: "5", label: "courses" },
      { value: "5", label: "projects" },
      { value: "12", label: "months" },
    ],
    courses: outlineCourses,
  },
  certifications: {
    heading: "Certification pathway",
    intro:
      "The institute prepares fellows for these industry certifications. Exams are taken with the certifying body, and exam fees are paid separately.",
    note: certificationNote,
    certifications,
  },
  requirements,
  outcomes: {
    heading: "Career outcomes",
    intro: "Graduates are prepared to apply for roles such as:",
    roles: [
      { title: "Data Analyst", icon: BarChart3 },
      { title: "Business Intelligence Analyst", icon: LineChart },
      { title: "Reporting Analyst", icon: PieChart },
      { title: "Power BI Developer (junior)", icon: LayoutDashboard },
      { title: "Operations Analyst", icon: Settings2 },
      { title: "Marketing or Sales Analyst", icon: Database },
    ],
  },
  related: {
    heading: "Related institutes",
    programmes: [
      {
        title: "Data Science Institute",
        body: "Go further into statistics, machine learning and AI.",
        href: "/catalogue/programme/data-science",
      },
      {
        title: "Business Innovation Institute",
        body: "Add business analysis and requirements skills to your data work.",
        href: "/catalogue/programme/business-innovation",
      },
      {
        title: "Marketing Technology Institute",
        body: "Apply data skills to customer data and marketing analytics.",
        href: "/catalogue/programme/marketing-technology",
      },
      {
        title: "Project Planning Institute",
        body: "Use data to plan, track and report on projects.",
        href: "/catalogue/programme/project-planning",
      },
    ],
  },
  courses: dataAnalysisCourses,
}
