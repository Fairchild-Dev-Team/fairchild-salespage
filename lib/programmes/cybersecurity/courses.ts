/**
 * IT Cybersecurity Institute course pages.
 * The ICI document gives each course a one-line description in the program outline,
 * and names the courses that prepare for each certification. Each page adds the
 * program outcomes, projects, skills and tools that match that course. No course
 * has modules in the sheet.
 */

import {
  certificationsFor,
  coursePage,
  pick,
  type CoursePageParts,
} from "@/lib/programmes/course-page"
import {
  certificationNote,
  certifications,
  outcomes,
  outlineCourses,
  projects,
  requirements,
} from "@/lib/programmes/cybersecurity/content"
import { toolLogos } from "@/lib/programmes/shared"
import type { CoursePageContent } from "@/lib/programmes/types"

const pills = ["Beginner friendly", "100% online, self-paced"]

const [
  concepts,
  monitoring,
  alerts,
  incidents,
  risk,
  frameworks,
  policies,
  examPrep,
] = outcomes

const project = (title: string) =>
  pick(projects, (item) => item.title === title, `ICI project ${title}`)

function course(id: string, parts: CoursePageParts) {
  const courseId = `cybersecurity-${id}`
  return coursePage(
    pick(outlineCourses, (item) => item.id === courseId, `ICI course ${id}`),
    { pills, requirements },
    {
      certifications: certificationsFor(certifications, courseId),
      certificationNote,
      ...parts,
    }
  )
}

export const cybersecurityCourses: Record<string, CoursePageContent> = {
  "cybersecurity-grc": course("grc", {
    learn: [risk, frameworks, policies],
    projects: [
      project("Risk Assessment Report"),
      project("Security Policy Pack"),
      project("Compliance Gap Analysis"),
    ],
    skills: [
      "Risk assessment",
      "Governance and compliance",
      "Policy writing",
      "Audit preparation",
    ],
    tools: [
      { name: "NIST Cybersecurity Framework" },
      { name: "ISO/IEC 27001" },
      { name: "Risk registers" },
    ],
  }),
  "cybersecurity-soc-analysis": course("soc-analysis", {
    learn: [monitoring, alerts, incidents],
    projects: [
      project("SOC Alert Investigation"),
      project("Capstone: Incident Response Exercise"),
    ],
    skills: [
      "Threat analysis",
      "Security monitoring",
      "Log analysis",
      "Alert triage",
      "Incident response",
    ],
    tools: [
      { name: "SIEM platforms" },
      { name: "Wireshark", logo: toolLogos.wireshark },
      { name: "Linux command line", logo: toolLogos.linux },
    ],
  }),
  "cybersecurity-cert-prep": course("cert-prep", {
    learn: [concepts, examPrep],
    skills: ["Security fundamentals"],
  }),
}
