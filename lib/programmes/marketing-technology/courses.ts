/**
 * Marketing Technology Institute course pages.
 * The MTI document gives each course a one-line description in the institute outline,
 * and names the courses that prepare for each certification. Each page adds the
 * institute outcomes, projects, skills and tools that match that course. No course
 * has modules in the sheet, and four courses have no price yet.
 */

import {
  certificationNote,
  certifications,
  outcomes,
  outlineCourses,
  projects,
  requirements,
} from "@/lib/programmes/marketing-technology/content"
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
  journeys,
  personalisation,
  segmentation,
  customerData,
  aiCampaigns,
  integrations,
  analytics,
  consulting,
] = outcomes

const project = (title: string) =>
  pick(projects, (item) => item.title === title, `MTI project ${title}`)

const welcomeJourney = project("Welcome Journey Campaign")
const personalisedEmail = project("Personalised Email at Scale")
const unifiedProfile = project("Unified Customer Profile")
const aiCampaign = project("AI-Assisted Campaign")
const capstone = project("Capstone: Integrated Marketing Solution")

function course(id: string, parts: CoursePageParts) {
  const courseId = `marketing-technology-${id}`
  return coursePage(
    pick(outlineCourses, (item) => item.id === courseId, `MTI course ${id}`),
    { pills, requirements },
    {
      certifications: certificationsFor(certifications, courseId),
      // The institute's note covers every MTI certification level, so it goes on each one.
      certificationNote,
      ...parts,
    }
  )
}

export const marketingTechnologyCourses: Record<string, CoursePageContent> = {
  "marketing-technology-marketing-cloud-1": course("marketing-cloud-1", {
    learn: [journeys],
    projects: [welcomeJourney],
    skills: ["Email marketing", "Journey design", "Marketing automation"],
    tools: [{ name: "Salesforce Marketing Cloud" }],
  }),
  "marketing-technology-marketing-cloud-2": course("marketing-cloud-2", {
    learn: [personalisation],
    projects: [personalisedEmail],
    skills: ["Personalisation", "Marketing automation"],
    tools: [
      { name: "AMPscript" },
      { name: "SSJS" },
      { name: "SQL" },
      { name: "HTML", logo: toolLogos.html },
      { name: "CSS", logo: toolLogos.css },
      { name: "JavaScript", logo: toolLogos.javascript },
    ],
  }),
  "marketing-technology-marketing-cloud-next": course("marketing-cloud-next", {
    skills: ["Marketing automation", "Personalisation"],
    tools: [{ name: "Marketing Cloud Next" }],
  }),
  "marketing-technology-sql-programming": course("sql-programming", {
    learn: [segmentation],
    projects: [personalisedEmail],
    skills: ["Audience segmentation", "Personalisation"],
    tools: [{ name: "SQL" }, { name: "AMPscript" }, { name: "SSJS" }],
  }),
  "marketing-technology-api-integrations": course("api-integrations", {
    learn: [integrations],
    projects: [capstone],
    skills: ["API integration"],
  }),
  "marketing-technology-ai-agentforce": course("ai-agentforce", {
    learn: [aiCampaigns],
    projects: [aiCampaign],
    skills: ["Marketing automation"],
    tools: [{ name: "Agentforce" }, { name: "Data 360" }],
  }),
  "marketing-technology-enterprise-integration": course(
    "enterprise-integration",
    {
      learn: [integrations],
      projects: [capstone],
      skills: ["API integration", "Event-driven architecture"],
      tools: [{ name: "MuleSoft", logo: toolLogos.mulesoft }],
    }
  ),
  "marketing-technology-data-analytics": course("data-analytics", {
    learn: [analytics],
    projects: [aiCampaign],
    skills: ["Marketing analytics"],
  }),
  "marketing-technology-data-ingestion": course("data-ingestion", {
    learn: [customerData],
    projects: [unifiedProfile],
    skills: [
      "Customer data management",
      "Identity resolution",
      "Audience segmentation",
    ],
    tools: [{ name: "Data 360" }],
  }),
  "marketing-technology-tech-architecture": course("tech-architecture", {
    projects: [capstone],
    skills: ["Solution architecture"],
  }),
  "marketing-technology-data-cloud": course("data-cloud", {
    skills: ["Customer data management"],
    tools: [
      { name: "Snowflake", logo: toolLogos.snowflake },
      { name: "Databricks", logo: toolLogos.databricks },
      { name: "AWS", logo: toolLogos.aws },
      { name: "Microsoft Azure" },
    ],
  }),
  "marketing-technology-ba-consulting": course("ba-consulting", {
    learn: [consulting],
    projects: [capstone],
    skills: ["Client consulting", "Solution architecture"],
  }),
}
