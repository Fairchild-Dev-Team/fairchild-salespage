/**
 * IT Cybersecurity Institute.
 * Source: "Cybersecurity Institute (ICI) - Program Page Content" (Nov 1, 2026).
 */

import {
  FileCheck,
  Laptop,
  Radar,
  Route,
  Scale,
  ShieldAlert,
  Siren,
  UserCog,
} from "lucide-react"

import {
  certificationNote,
  certifications,
  outcomes,
  outlineCourses,
  projects,
  requirements,
} from "@/lib/programmes/cybersecurity/content"
import { cybersecurityCourses } from "@/lib/programmes/cybersecurity/courses"
import { toolLogos } from "@/lib/programmes/shared"
import type { ProgrammePageContent } from "@/lib/programmes/types"

export const cybersecurity: ProgrammePageContent = {
  id: "cybersecurity",
  hero: {
    pills: ["6 months", "Beginner friendly"],
    headline:
      "Protect organisations from cyber threats, on the front line or in the boardroom.",
    summary:
      "Learn security operations and governance, risk and compliance, and prepare for recognised cybersecurity certifications with a dedicated practice question bank.",
    facts: [
      { label: "Courses", value: "3" },
      { label: "Format", value: "100% online, self-paced" },
    ],
    priceNote: "or take individual courses from $500.",
  },
  audience: {
    heading: "Who this program is for",
    audiences: [
      {
        title: "Career changers",
        body: "From IT support, administration, finance, audit, law enforcement or the military who want a structured route into cybersecurity.",
        icon: Route,
      },
      {
        title: "IT professionals moving into security",
        body: "Help desk, network and systems staff who want to specialise in security operations.",
        icon: Laptop,
      },
      {
        title: "Risk, audit and compliance professionals",
        body: "People in audit, risk or legal roles who want to apply their skills to information security governance.",
        icon: Scale,
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
      "Security fundamentals",
      "Threat analysis",
      "Security monitoring",
      "Log analysis",
      "Alert triage",
      "Incident response",
      "Risk assessment",
      "Governance and compliance",
      "Policy writing",
      "Audit preparation",
      "Security reporting",
    ],
    // The specific SIEM taught is still to confirm.
    tools: [
      { name: "SIEM platforms" },
      { name: "Wireshark", logo: toolLogos.wireshark },
      { name: "Linux command line", logo: toolLogos.linux },
      { name: "NIST Cybersecurity Framework" },
      { name: "ISO/IEC 27001" },
      { name: "Risk registers" },
    ],
  },
  outline: {
    heading: "Program outline",
    facts: [
      { value: "3", label: "courses" },
      { value: "5", label: "projects" },
      { value: "6", label: "months" },
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
      { title: "SOC Analyst (Tier 1)", icon: Radar },
      { title: "Cybersecurity Analyst", icon: ShieldAlert },
      { title: "GRC Analyst", icon: FileCheck },
      { title: "IT Risk and Compliance Analyst", icon: Scale },
      { title: "Information Security Officer (junior)", icon: UserCog },
      { title: "Incident Response Analyst (junior)", icon: Siren },
    ],
  },
  related: {
    heading: "Related programs",
    programmes: [
      {
        title: "Project Planning Institute",
        body: "Add project control and reporting skills to your GRC work.",
        href: "/catalogue/programme/project-planning",
      },
      {
        title: "Data Analysis Institute",
        body: "Strengthen the SQL and data skills used in security monitoring.",
        href: "/catalogue/programme/data-analysis",
      },
      {
        title: "Business Innovation Institute",
        body: "Add business analysis and requirements skills for security projects.",
        href: "/catalogue/programme/business-innovation",
      },
      {
        title: "Data Science Institute",
        body: "Apply machine learning to threat detection.",
        href: "/catalogue/programme/data-science",
      },
    ],
  },
  courses: cybersecurityCourses,
}
