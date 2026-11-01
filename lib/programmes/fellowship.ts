/**
 * FairChild Fellowship (catalogue product).
 * Source: "FairChild Fellowship - Program Page Content" (Nov 1, 2026).
 * The $500 price is from the sheet and still needs to be explained [confirm].
 */

import {
  Award,
  BarChart3,
  CalendarClock,
  ClipboardList,
  FileBadge,
  GraduationCap,
  Mic,
  PenTool,
  Presentation,
  Radar,
  Settings,
  Target,
  UserCheck,
  Users,
} from "lucide-react"

import { illustrations } from "@/lib/programmes/shared"
import type { ProgrammePageContent } from "@/lib/programmes/types"

const programme = (id: string, title: string, body: string) => ({
  title,
  body,
  href: `/catalogue/programme/${id}`,
})

export const fellowship: ProgrammePageContent = {
  id: "fellowship",
  hero: {
    pills: ["12 months", "Mentorship included"],
    headline: "Learn the skills. Get the support. Land the role.",
    summary:
      "Choose any FairChild program and add Guided Mentorship & Career Development, with interview preparation, certification support and professional references, in one 12-month fellowship.",
    cardLabel: "Fellowship outline",
    facts: [
      { label: "Program", value: "Any FairChild program" },
      { label: "Length", value: "12 months" },
      { label: "Format", value: "100% online" },
    ],
    priceLabel: "Price",
    ctaLabel: "Apply for the Fellowship",
  },
  audience: {
    heading: "Who the Fellowship is for",
    audiences: [
      {
        title: "Career changers who want a full route",
        body: "People who want training and job search support together, from first lesson to first offer.",
        icon: Target,
      },
      {
        title: "Learners who value accountability",
        body: "People who do best with a mentor checking progress, giving feedback and keeping them on track.",
        icon: UserCheck,
      },
      {
        title: "Job seekers who need an edge",
        body: "People who have the skills but need interview practice, certifications and references to stand out.",
        icon: Award,
      },
    ],
  },
  highlights: {
    heading: "What is included",
    items: [
      {
        title: "Your choice of program",
        body: "Full access to one FairChild program of your choice, including all its courses and projects.",
        icon: GraduationCap,
      },
      {
        title: "Guided mentorship",
        body: "A mentor who reviews your progress and work and helps you plan your next steps.",
        icon: Users,
      },
      {
        title: "200+ hours interview prep series",
        body: "Practice for technical and behavioural interviews, with feedback.",
        icon: Mic,
      },
      {
        title: "Job attestation and reference",
        body: "A professional reference and attestation of your project work for employers.",
        icon: FileBadge,
      },
      {
        title: "Support for 50+ IT certifications",
        body: "Guidance and preparation support across more than 50 industry certifications.",
        icon: Award,
      },
      {
        title: "Professional presentation skills",
        body: "Training to present your work clearly, including presentations built in Figma.",
        icon: Presentation,
      },
      {
        title: "FairChild fellows community",
        body: "Connection with other fellows on the same journey.",
        icon: Users,
      },
    ],
  },
  steps: {
    heading: "How it works",
    steps: [
      {
        // Whether there is an application step is still to confirm.
        title: "Apply",
        body: "Submit a short application and tell us your career goal.",
      },
      {
        title: "Choose your program",
        body: "Pick the FairChild program that matches the role you want.",
      },
      {
        title: "Meet your mentor",
        body: "Agree a learning plan and milestones for your 12 months.",
      },
      {
        title: "Learn and build",
        body: "Work through your program courses and portfolio projects, with regular mentor check-ins.",
      },
      {
        title: "Get certified",
        body: "Prepare for and take the industry certifications that fit your target role.",
      },
      {
        title: "Prepare for interviews",
        body: "Work through the interview prep series and practise presenting your work.",
      },
      {
        title: "Start your job search",
        body: "Apply for roles with your portfolio, certifications and a professional reference.",
      },
    ],
  },
  choose: {
    heading: "Choose your program",
    // Whether every program is eligible is still to confirm.
    intro: "Fellows choose one of these programs:",
    programmes: [
      programme(
        "business-innovation",
        "Business Innovation Institute",
        "Business analysis, product development and agile delivery."
      ),
      programme(
        "crm",
        "CRM Institute",
        "Salesforce, ServiceNow and HubSpot, from admin to developer."
      ),
      programme(
        "marketing-technology",
        "Marketing Technology Institute",
        "Marketing Cloud, customer data and marketing automation."
      ),
      programme(
        "software-engineering",
        "Software Engineering Institute",
        "Web development and AI-assisted software engineering."
      ),
      programme(
        "ui-ux",
        "UI/UX Design Institute",
        "User research, interface design and prototyping."
      ),
      programme(
        "project-planning",
        "Project Planning Institute",
        "Project management, reporting and PMI certification."
      ),
      programme(
        "data-analysis",
        "Data Analysis Institute",
        "Excel, SQL, Python, R and Power BI."
      ),
      programme(
        "data-science",
        "Data Science Institute",
        "Machine learning, AI and prompt engineering."
      ),
      programme(
        "cybersecurity",
        "IT Cybersecurity Institute",
        "Security operations and governance, risk and compliance."
      ),
    ],
  },
  requirements: {
    heading: "Prerequisites and requirements",
    items: [
      {
        title: "Prior experience",
        body: "As required by your chosen program. Most programs need no prior experience.",
        illustration: illustrations.experience,
      },
      {
        title: "Language",
        body: "Good written and spoken English.",
        illustration: illustrations.language,
      },
      {
        title: "Equipment",
        body: "A laptop or desktop computer and a reliable internet connection.",
        illustration: illustrations.equipment,
      },
      {
        // The check-in frequency is still to confirm.
        title: "Commitment",
        body: "Attend mentor check-ins and complete program milestones on schedule.",
        illustration: illustrations.time,
      },
    ],
  },
  outcomes: {
    heading: "Career outcomes",
    intro:
      "Fellows target roles in the field of the program they choose, such as:",
    roles: [
      { title: "Business Analyst", icon: ClipboardList },
      { title: "Salesforce Administrator", icon: Settings },
      { title: "Data Analyst", icon: BarChart3 },
      { title: "UX Designer", icon: PenTool },
      { title: "Project Coordinator", icon: CalendarClock },
      { title: "SOC Analyst", icon: Radar },
    ],
    note: "See each program page for its roles.",
  },
  // The Fellowship already includes mentorship, so the shared card pointing to it is hidden.
  hideShared: { learning: ["Add mentorship and career support"] },
  related: {
    heading: "Related programs",
    programmes: [
      {
        title: "Guided Mentorship & Career Development",
        body: "Get the mentorship and career support on its own, alongside a program you already take.",
        href: "/catalogue/product/guided-mentorship",
      },
      programme(
        "data-analysis",
        "Data Analysis Institute",
        "One of the most popular choices for career changers."
      ),
      programme(
        "business-innovation",
        "Business Innovation Institute",
        "A flexible route into business analyst and product roles."
      ),
      programme(
        "crm",
        "CRM Institute",
        "A route into Salesforce roles from admin to developer."
      ),
    ],
  },
}
