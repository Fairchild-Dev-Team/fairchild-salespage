/**
 * Content shared by the program page and its course pages.
 * Source: "Cybersecurity Institute (ICI) - Program Page Content (Nov 1, 2026)".
 */

import { illustrations } from "@/lib/programmes/shared"
import type {
  ProgrammeCertification,
  ProgrammeOutlineCourse,
  ProgrammeProject,
} from "@/lib/programmes/types"

export const course = (id: string, title: string) => ({
  id: `cybersecurity-${id}`,
  title,
})

export const grc = course("grc", "Governance, Risk and Compliance (GRC)")
export const soc = course("soc-analysis", "SOC Analysis")
export const certPrep = course(
  "cert-prep",
  "Cybersecurity Certification Prep Quizbank"
)

/** Program learning outcomes, in document order. Course pages pick from these. */
export const outcomes = [
  "Explain core security concepts: threats, vulnerabilities, controls and the attacker mindset.",
  "Monitor systems and networks for suspicious activity in a security operations centre (SOC).",
  "Investigate alerts using logs and a SIEM, and tell real incidents from false alarms.",
  "Follow incident response steps: detect, contain, recover and report.",
  "Assess and score information security risks for an organisation.",
  "Map controls to common frameworks and regulations, such as the NIST Cybersecurity Framework, ISO/IEC 27001 and data protection laws.",
  "Write security policies and prepare evidence for audits.",
  "Prepare for entry-level cybersecurity certification exams with structured practice questions.",
]

export const projects: ProgrammeProject[] = [
  {
    title: "Risk Assessment Report",
    summary:
      "Identify assets, threats and vulnerabilities for a sample company and score the risks.",
    skills: ["Risk assessment", "Threat analysis"],
  },
  {
    title: "Security Policy Pack",
    summary:
      "Write an acceptable use policy, access control policy and incident response policy.",
    skills: ["Policy writing", "Governance"],
  },
  {
    title: "Compliance Gap Analysis",
    summary:
      "Compare a sample organisation's controls against a framework and recommend fixes.",
    skills: ["Framework mapping", "Audit preparation"],
  },
  {
    title: "SOC Alert Investigation",
    summary:
      "Investigate a set of simulated alerts in a SIEM, decide which are real and document your findings.",
    skills: ["Log analysis", "SIEM", "Alert triage"],
  },
  {
    title: "Capstone: Incident Response Exercise",
    summary:
      "Respond to a simulated security incident from detection to final report, including a briefing for leadership.",
    skills: ["Incident response", "Reporting", "Communication"],
  },
]

export const outlineCourses: ProgrammeOutlineCourse[] = [
  {
    ...grc,
    priceUsd: 2000,
    summary:
      "Security governance, risk assessment, frameworks, policies, regulations and audit readiness.",
  },
  {
    ...soc,
    priceUsd: 2000,
    summary:
      "Security monitoring, log analysis, SIEM tools, threat detection and incident response.",
  },
  {
    ...certPrep,
    priceUsd: 500,
    summary:
      "Exam-style practice questions and mock exams for entry-level cybersecurity certifications.",
  },
]

export const certifications: ProgrammeCertification[] = [
  {
    name: "Certified in Cybersecurity (CC)",
    body: "ISC2",
    preparedIn: [grc, certPrep],
  },
  {
    name: "Security+",
    body: "CompTIA",
    preparedIn: [soc, grc, certPrep],
  },
  {
    name: "CySA+ (Cybersecurity Analyst)",
    body: "CompTIA",
    preparedIn: [soc],
  },
]

export const certificationNote =
  "ISC2 CC and Security+ are entry-level and suit career changers. CySA+ is usually the next step once fellows have some hands-on security experience. Advanced GRC credentials, such as ISACA's CISA or ISC2's CGRC, require years of work experience and are a later goal."

export const requirements = {
  heading: "Prerequisites and requirements",
  items: [
    {
      title: "Prior experience",
      body: "None. Basic computer skills are enough. IT support or networking experience helps for SOC Analysis but is not required.",
      illustration: illustrations.experience,
    },
    {
      title: "Language",
      body: "Good written and spoken English.",
      illustration: illustrations.language,
    },
    {
      // The 8 GB memory figure is still to confirm.
      title: "Equipment",
      body: "A laptop or desktop computer with at least 8 GB of memory and a reliable internet connection, for running security labs. A phone or tablet alone is not enough.",
      illustration: illustrations.equipment,
    },
  ],
}
