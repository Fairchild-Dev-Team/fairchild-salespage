/**
 * CRM Institute.
 * Source: "CRM Revenue Ops & Marketing (CRI) - Institute Page Content" (Nov 1, 2026).
 */

import {
  Code,
  Headset,
  Mail,
  Route,
  Settings,
  TrendingUp,
  UserCog,
  Users,
} from "lucide-react"

import {
  certificationNote,
  certifications,
  outcomes,
  outlineCourses,
  projects,
  requirements,
} from "@/lib/programmes/crm/content"
import { crmCourses } from "@/lib/programmes/crm/courses"
import { toolLogos } from "@/lib/programmes/shared"
import type { ProgrammePageContent } from "@/lib/programmes/types"

export const crm: ProgrammePageContent = {
  id: "crm",
  hero: {
    // The sheet gives no duration for CRI; the document uses 6 or 12 months to match BII.
    pills: ["6 or 12 months", "Beginner friendly"],
    headline:
      "Build, automate and grow the systems that run sales, service and marketing.",
    summary:
      "Learn Salesforce from administration to development, plus ServiceNow and HubSpot, with Agentforce AI built into the work.",
    facts: [
      { label: "Courses", value: "13" },
      { label: "Format", value: "100% online, self-paced" },
    ],
    priceNote: "or take individual courses from $500.",
  },
  audience: {
    heading: "Who this institute is for",
    audiences: [
      {
        title: "Career changers",
        body: "From sales, customer service, marketing, administration or operations who want a structured route into a CRM administrator, consultant or developer role.",
        icon: Route,
      },
      {
        title: "CRM users ready to step up",
        body: "Sales reps, service agents and marketers who use Salesforce, HubSpot or ServiceNow every day and want to configure and improve the system, not just use it.",
        icon: Users,
      },
      {
        title: "Admins moving into development",
        body: "Junior admins and analysts who want to add automation, integrations, Apex and Lightning Web Components to their skill set.",
        icon: Code,
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
      "CRM administration",
      "Data modelling",
      "Security and access control",
      "Reports and dashboards",
      "Sales process design",
      "Case management",
      "Process automation",
      "Email and journey marketing",
      "AI agent design",
      "API integration",
      "Programmatic development",
      "Customer portals",
    ],
    tools: [
      { name: "Salesforce", logo: toolLogos.salesforce },
      { name: "Sales Cloud" },
      { name: "Service Cloud" },
      { name: "Marketing Cloud" },
      { name: "Salesforce Flow" },
      { name: "Agentforce" },
      { name: "Experience Cloud" },
      { name: "Apex" },
      { name: "Lightning Web Components" },
      { name: "ServiceNow" },
      { name: "HubSpot CRM", logo: toolLogos.hubspot },
      { name: "AMPscript" },
      { name: "SQL" },
    ],
  },
  outline: {
    heading: "Institute outline",
    facts: [
      { value: "13", label: "courses" },
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
    certifications: certifications,
  },
  requirements,
  outcomes: {
    heading: "Career outcomes",
    intro: "Graduates are prepared to apply for roles such as:",
    roles: [
      { title: "Salesforce Administrator", icon: Settings },
      { title: "CRM Consultant", icon: Headset },
      { title: "Salesforce Developer", icon: Code },
      { title: "Marketing Cloud Specialist", icon: Mail },
      { title: "Revenue Operations Analyst", icon: TrendingUp },
      { title: "ServiceNow Administrator", icon: UserCog },
    ],
  },
  related: {
    heading: "Related institutes",
    programmes: [
      {
        title: "Marketing Technology Institute",
        body: "Go deeper into Marketing Cloud, data and marketing automation.",
        href: "/catalogue/programme/marketing-technology",
      },
      {
        title: "Business Innovation Institute",
        body: "Add business analysis and requirements skills to your CRM work.",
        href: "/catalogue/programme/business-innovation",
      },
      {
        title: "Software Engineering Institute",
        body: "Build on Apex and JavaScript with broader software engineering skills.",
        href: "/catalogue/programme/software-engineering",
      },
      {
        title: "Project Planning Institute",
        body: "Learn to plan and lead CRM implementation projects.",
        href: "/catalogue/programme/project-planning",
      },
    ],
  },
  courses: crmCourses,
}
