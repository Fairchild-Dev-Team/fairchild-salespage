/**
 * Business Innovation Institute.
 * Source: "Business Innovation & Strategy (BII) - Program Page Content" (Oct 31, 2026).
 */

import {
  Briefcase,
  ClipboardCheck,
  Cloud,
  LayoutDashboard,
  LineChart,
  Network,
  RefreshCw,
  Route,
  Users,
} from "lucide-react"

import {
  certifications,
  ecbaNote,
  outcomes,
  outlineCourses,
  projects,
  requirements,
} from "@/lib/programmes/business-innovation/content"
import { businessInnovationCourses } from "@/lib/programmes/business-innovation/courses"
import { toolLogos } from "@/lib/programmes/shared"
import type { ProgrammePageContent } from "@/lib/programmes/types"

export const businessInnovation: ProgrammePageContent = {
  id: "business-innovation",
  hero: {
    pills: ["6 or 12 months", "Beginner friendly"],
    headline:
      "Turn business problems into clear requirements, working products and measurable change.",
    summary:
      "Learn business analysis, product development and agile delivery, with AI built into how you work.",
    facts: [
      { label: "Courses", value: "11" },
      { label: "Format", value: "100% online, self-paced" },
    ],
    priceNote: "or take individual courses from $500.",
  },
  audience: {
    heading: "Who this program is for",
    audiences: [
      {
        title: "Career changers",
        body: "From teaching, banking, customer service, administration or operations who want a structured route into a business analyst or product role.",
        icon: Route,
      },
      {
        title: "Coordinators, team leads, and support staff",
        body: "Professionals already close to the work, such as coordinators, team leads or support staff who gather requirements or test systems without the formal title.",
        icon: Users,
      },
      {
        title: "Junior analysts and testers",
        body: "Junior analysts and testers who want to add agile delivery, Salesforce business analysis and AI tools to their skill set.",
        icon: LineChart,
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
      "Business analysis",
      "Stakeholder management",
      "Requirements elicitation",
      "User stories and acceptance criteria",
      "Process modelling",
      "Software development lifecycle",
      "Agile and Scrum",
      "Product development",
      "Quality and user acceptance testing",
      "Change management",
      "Data analysis",
      "Wireframing",
      "AI-assisted analysis",
    ],
    tools: [
      { name: "Salesforce", logo: toolLogos.salesforce },
      { name: "Microsoft Azure DevOps", logo: toolLogos.azureDevOps },
      { name: "SQL" },
      { name: "Microsoft Excel", logo: toolLogos.excel },
      { name: "Figma", logo: toolLogos.figma },
      { name: "Miro", logo: toolLogos.miro },
      { name: "Generative AI assistants" },
    ],
  },
  outline: {
    heading: "Program outline",
    facts: [
      { value: "11", label: "courses" },
      { value: "5", label: "projects" },
      { value: "6 or 12", label: "months" },
    ],
    courses: outlineCourses,
  },
  certifications: {
    heading: "Certification pathway",
    intro:
      "The program prepares fellows for these industry certifications. Exams are taken with the certifying body, and exam fees are paid separately.",
    note: ecbaNote,
    certifications,
  },
  requirements,
  outcomes: {
    heading: "Career outcomes",
    intro: "Graduates are prepared to apply for roles such as:",
    roles: [
      { title: "Business Analyst", icon: Briefcase },
      { title: "Business Systems Analyst", icon: Network },
      { title: "Salesforce Business Analyst", icon: Cloud },
      {
        title: "Product Analyst or Associate Product Owner",
        icon: LayoutDashboard,
      },
      { title: "QA or Test Analyst", icon: ClipboardCheck },
      { title: "Change Analyst", icon: RefreshCw },
    ],
  },
  related: {
    heading: "Related programs",
    programmes: [
      {
        title: "CRM Institute",
        body: "Go deeper into Salesforce administration and automation.",
        href: "/catalogue/programme/crm",
      },
      {
        title: "Project Planning Institute",
        body: "Add project management and PMP preparation to your analysis skills.",
        href: "/catalogue/programme/project-planning",
      },
      {
        title: "Data Analysis Institute",
        body: "Build on SQL and Excel with Python and Power BI.",
        href: "/catalogue/programme/data-analysis",
      },
      {
        title: "UI/UX Design Institute",
        body: "Take wireframing and prototyping further into full product design.",
        href: "/catalogue/programme/ui-ux",
      },
    ],
  },
  courses: businessInnovationCourses,
}
