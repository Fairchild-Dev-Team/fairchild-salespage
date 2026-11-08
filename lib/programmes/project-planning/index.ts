/**
 * Project Planning Institute.
 * Source: "Project Planning Institute - Institute Page Content" (Nov 1, 2026).
 * Price and duration match Business Innovation Institute: $5,000 list, 6 or 12 months.
 */

import {
  BarChart3,
  Briefcase,
  CalendarClock,
  ClipboardList,
  Award,
  Building2,
  Route,
  Settings2,
  Users,
} from "lucide-react"

import {
  certificationNote,
  certifications,
  outcomes,
  outlineCourses,
  projects,
  requirements,
} from "@/lib/programmes/project-planning/content"
import { projectPlanningCourses } from "@/lib/programmes/project-planning/courses"
import { toolLogos } from "@/lib/programmes/shared"
import type { ProgrammePageContent } from "@/lib/programmes/types"

export const projectPlanning: ProgrammePageContent = {
  id: "project-planning",
  hero: {
    // Same 6 or 12 month length as Business Innovation Institute.
    pills: ["6 or 12 months", "Beginner friendly"],
    headline: "Plan projects, lead teams and deliver results you can measure.",
    summary:
      "Learn project planning and control, AI-assisted project management and data reporting with Excel, SQL, Power BI and Tableau, with preparation for recognised project management certifications.",
    facts: [
      { label: "Courses", value: "4" },
      { label: "Format", value: "100% online, self-paced" },
    ],
  },
  audience: {
    heading: "Who this institute is for",
    audiences: [
      {
        title: "Career changers",
        body: "From administration, operations, teaching, events or customer service who already organise people and tasks and want a formal project management role.",
        icon: Route,
      },
      {
        title: "Accidental project managers",
        body: "Team leads, coordinators and specialists who run projects without the title or training and want proper methods and credentials.",
        icon: Users,
      },
      {
        title: "Professionals aiming for certification",
        body: "People preparing for PMI certifications who want structured study alongside practical tools for planning, tracking and reporting.",
        icon: Award,
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
      "Project planning",
      "Scope management",
      "Scheduling",
      "Budgeting and cost control",
      "Risk management",
      "Stakeholder management",
      "Agile and hybrid delivery",
      "Team leadership",
      "AI-assisted project management",
      "Data analysis",
      "Dashboard reporting",
    ],
    tools: [
      { name: "Microsoft Excel", logo: toolLogos.excel },
      { name: "SQL" },
      { name: "Power BI" },
      { name: "Tableau", logo: toolLogos.tableau },
      { name: "Project scheduling software" },
      { name: "AI assistants" },
    ],
  },
  outline: {
    heading: "Institute outline",
    facts: [
      { value: "4", label: "courses" },
      { value: "5", label: "projects" },
      { value: "6 or 12", label: "months" },
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
      { title: "Project Coordinator", icon: ClipboardList },
      { title: "Junior Project Manager", icon: Briefcase },
      { title: "Project Analyst", icon: BarChart3 },
      { title: "Project Management Office (PMO) Analyst", icon: Building2 },
      { title: "Project Scheduler or Planner", icon: CalendarClock },
      { title: "Operations Coordinator", icon: Settings2 },
    ],
  },
  related: {
    heading: "Related institutes",
    programmes: [
      {
        title: "Business Innovation Institute",
        body: "Add business analysis, agile and product development to your project skills.",
        href: "/catalogue/programme/business-innovation",
      },
      {
        title: "Data Analysis Institute",
        body: "Go deeper into Excel, SQL, Python and Power BI.",
        href: "/catalogue/programme/data-analysis",
      },
      {
        title: "CRM Institute",
        body: "Apply project skills to Salesforce and CRM implementation projects.",
        href: "/catalogue/programme/crm",
      },
      {
        title: "IT Cybersecurity Institute",
        body: "Combine project control with governance, risk and compliance.",
        href: "/catalogue/programme/cybersecurity",
      },
    ],
  },
  courses: projectPlanningCourses,
}
