/**
 * Marketing Technology Institute.
 * Source: "Marketing Technology Institute (MTI) - Program Page Content" (Nov 1, 2026).
 */

import {
  Code,
  Database,
  LineChart,
  Mail,
  Megaphone,
  Presentation,
  Route,
  Workflow,
} from "lucide-react"

import {
  certificationNote,
  certifications,
  outcomes,
  outlineCourses,
  projects,
  requirements,
} from "@/lib/programmes/marketing-technology/content"
import { marketingTechnologyCourses } from "@/lib/programmes/marketing-technology/courses"
import { toolLogos } from "@/lib/programmes/shared"
import type { ProgrammePageContent } from "@/lib/programmes/types"

export const marketingTechnology: ProgrammePageContent = {
  id: "marketing-technology",
  hero: {
    // The sheet gives no duration for MTI; the document uses 6 or 12 months to match BII.
    pills: ["6 or 12 months", "Beginner friendly"],
    headline: "Build the data, automation and AI behind modern marketing.",
    summary:
      "Learn Salesforce Marketing Cloud, customer data, integrations and Agentforce, and turn customer data into personalised campaigns that perform.",
    facts: [
      { label: "Courses", value: "12" },
      { label: "Format", value: "100% online, self-paced" },
    ],
    priceNote: "or take individual courses from $500.",
  },
  audience: {
    heading: "Who this program is for",
    audiences: [
      {
        title: "Career changers",
        body: "From marketing, communications, sales, design or administration who want a technical marketing role with strong demand.",
        icon: Route,
      },
      {
        title: "Marketers ready to go technical",
        body: "Email, digital and campaign marketers who want to build automation, personalisation and data segments themselves instead of waiting on IT.",
        icon: Megaphone,
      },
      {
        title: "Analysts and developers moving into martech",
        body: "Data analysts, web developers and CRM admins who want to apply SQL, scripting and integration skills to marketing platforms.",
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
      "Email marketing",
      "Journey design",
      "Marketing automation",
      "Personalisation",
      "Audience segmentation",
      "Customer data management",
      "Identity resolution",
      "API integration",
      "Event-driven architecture",
      "Marketing analytics",
      "Solution architecture",
      "Client consulting",
    ],
    tools: [
      { name: "Salesforce Marketing Cloud" },
      { name: "Marketing Cloud Next" },
      { name: "Data 360" },
      { name: "Agentforce" },
      { name: "MuleSoft", logo: toolLogos.mulesoft },
      { name: "AMPscript" },
      { name: "SSJS" },
      { name: "SQL" },
      { name: "HTML", logo: toolLogos.html },
      { name: "CSS", logo: toolLogos.css },
      { name: "JavaScript", logo: toolLogos.javascript },
      { name: "Snowflake", logo: toolLogos.snowflake },
      { name: "Databricks", logo: toolLogos.databricks },
      { name: "AWS", logo: toolLogos.aws },
      { name: "Microsoft Azure" },
    ],
  },
  outline: {
    heading: "Program outline",
    facts: [
      { value: "12", label: "courses" },
      { value: "5", label: "projects" },
      { value: "6 or 12", label: "months" },
    ],
    courses: outlineCourses,
  },
  certifications: {
    heading: "Certification pathway",
    intro:
      "The program prepares fellows for these industry certifications. Exams are taken with the certifying body, and exam fees are paid separately.",
    note: certificationNote,
    certifications,
  },
  requirements,
  outcomes: {
    heading: "Career outcomes",
    intro: "Graduates are prepared to apply for roles such as:",
    roles: [
      { title: "Marketing Cloud Specialist", icon: Mail },
      { title: "Marketing Automation Specialist", icon: Workflow },
      { title: "Marketing Cloud Developer", icon: Code },
      { title: "Marketing Operations Analyst", icon: LineChart },
      { title: "Customer Data Consultant", icon: Database },
      { title: "Martech Solutions Consultant", icon: Presentation },
    ],
  },
  related: {
    heading: "Related programs",
    programmes: [
      {
        title: "CRM Institute",
        body: "Add Salesforce administration, Sales Cloud and Service Cloud to your marketing skills.",
        href: "/catalogue/programme/crm",
      },
      {
        title: "Data Analysis Institute",
        body: "Build stronger SQL, Python and Power BI skills for marketing analytics.",
        href: "/catalogue/programme/data-analysis",
      },
      {
        title: "Data Science Institute",
        body: "Go further into modelling, machine learning and AI.",
        href: "/catalogue/programme/data-science",
      },
      {
        title: "Business Innovation Institute",
        body: "Strengthen the business analysis behind solution design and client work.",
        href: "/catalogue/programme/business-innovation",
      },
    ],
  },
  courses: marketingTechnologyCourses,
}
