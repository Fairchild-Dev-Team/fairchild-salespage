/**
 * CRM Institute course pages.
 * The CRM document gives each course a one-line description in the institute outline,
 * and names the courses that prepare for each certification. Each page adds the
 * institute outcomes, projects, skills and tools that match that course. No course
 * has modules in the sheet.
 */

import {
  certificationNote,
  certifications,
  outcomes,
  outlineCourses,
  projects,
  requirements,
} from "@/lib/programmes/crm/content"
import {
  certificationsFor,
  coursePage,
  pick,
  type CoursePageParts,
} from "@/lib/programmes/course-page"
import { toolLogos } from "@/lib/programmes/shared"
import type { CoursePageContent } from "@/lib/programmes/types"

const pills = ["Beginner friendly", "100% online, self-paced"]

const [
  orgSetup,
  salesAndService,
  flow,
  marketingCloud,
  agentforce,
  integration,
  apexAndLwc,
  otherPlatforms,
] = outcomes

const project = (title: string) =>
  pick(projects, (item) => item.title === title, `CRM project ${title}`)

const orgSetupProject = project("Salesforce Org Setup")
const salesServiceProject = project("Sales and Service Implementation")
const marketingProject = project("Marketing Journey Campaign")
const agentProject = project("Agentforce Service Agent")
const capstone = project("Capstone: Custom App with Integration")

function course(id: string, parts: CoursePageParts) {
  const courseId = `crm-${id}`
  return coursePage(
    pick(outlineCourses, (item) => item.id === courseId, `CRM course ${id}`),
    { pills, requirements },
    { certifications: certificationsFor(certifications, courseId), ...parts }
  )
}

export const crmCourses: Record<string, CoursePageContent> = {
  "crm-salesforce-admin": course("salesforce-admin", {
    learn: [orgSetup],
    projects: [orgSetupProject],
    skills: [
      "CRM administration",
      "Data modelling",
      "Security and access control",
      "Reports and dashboards",
    ],
    tools: [{ name: "Salesforce", logo: toolLogos.salesforce }],
  }),
  "crm-agent-service-cloud": course("agent-service-cloud", {
    learn: [salesAndService],
    projects: [salesServiceProject],
    skills: ["Case management"],
    tools: [{ name: "Service Cloud" }],
    // Consultant-level certification, so the institute's experience note applies.
    certificationNote,
  }),
  "crm-agent-sales-cloud": course("agent-sales-cloud", {
    learn: [salesAndService],
    projects: [salesServiceProject],
    skills: ["Sales process design"],
    tools: [{ name: "Sales Cloud" }],
    // Consultant-level certification, so the institute's experience note applies.
    certificationNote,
  }),
  "crm-marketing-cloud-1": course("marketing-cloud-1", {
    learn: [marketingCloud],
    projects: [marketingProject],
    skills: ["Email and journey marketing"],
    tools: [{ name: "Marketing Cloud" }],
  }),
  "crm-marketing-cloud-2": course("marketing-cloud-2", {
    learn: [marketingCloud],
    projects: [marketingProject],
    skills: ["Email and journey marketing"],
    tools: [
      { name: "Marketing Cloud" },
      { name: "AMPscript" },
      { name: "SQL" },
    ],
  }),
  "crm-flow-automation": course("flow-automation", {
    learn: [flow],
    projects: [salesServiceProject],
    skills: ["Process automation"],
    tools: [{ name: "Salesforce Flow" }],
  }),
  "crm-servicenow": course("servicenow", {
    learn: [otherPlatforms],
    tools: [{ name: "ServiceNow" }],
  }),
  "crm-hubspot": course("hubspot", {
    learn: [otherPlatforms],
    tools: [{ name: "HubSpot CRM", logo: toolLogos.hubspot }],
  }),
  "crm-integration-api": course("integration-api", {
    learn: [integration],
    projects: [capstone],
    skills: ["API integration"],
  }),
  "crm-experience-cloud": course("experience-cloud", {
    learn: [otherPlatforms],
    skills: ["Customer portals"],
    tools: [{ name: "Experience Cloud" }],
    // Consultant-level certification, so the institute's experience note applies.
    certificationNote,
  }),
  "crm-agentforce": course("agentforce", {
    learn: [agentforce],
    projects: [agentProject],
    skills: ["AI agent design"],
    tools: [{ name: "Agentforce" }],
  }),
  "crm-apex": course("apex", {
    learn: [apexAndLwc],
    projects: [capstone],
    skills: ["Programmatic development"],
    tools: [{ name: "Apex" }],
  }),
  "crm-lwc": course("lwc", {
    learn: [apexAndLwc],
    projects: [capstone],
    skills: ["Programmatic development"],
    tools: [{ name: "Lightning Web Components" }],
  }),
}
