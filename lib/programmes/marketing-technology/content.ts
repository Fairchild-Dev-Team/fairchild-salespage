/**
 * Content shared by the program page and its course pages.
 * Source: "Marketing Technology Institute (MTI) - Program Page Content (Nov 1, 2026)".
 */

import { illustrations } from "@/lib/programmes/shared"
import type {
  ProgrammeCertification,
  ProgrammeOutlineCourse,
  ProgrammeProject,
} from "@/lib/programmes/types"

export const course = (id: string, title: string) => ({
  id: `marketing-technology-${id}`,
  title,
})

export const marketingCloud1 = course(
  "marketing-cloud-1",
  "Marketing Cloud Part 1: Intermediate"
)
export const marketingCloud2 = course(
  "marketing-cloud-2",
  "Marketing Cloud Part 2: Advanced"
)
export const sqlProgramming = course("sql-programming", "SQL & Programming")
export const apiIntegrations = course("api-integrations", "API & Integrations")
export const aiAgentforce = course("ai-agentforce", "AI & Agentforce")
export const enterpriseIntegration = course(
  "enterprise-integration",
  "Enterprise Integration"
)
export const data360 = course("data-ingestion", "Data 360")
export const baConsulting = course(
  "ba-consulting",
  "Business Analysis & Consulting"
)

/** Program learning outcomes, in document order. Course pages pick from these. */
export const outcomes = [
  "Build and send email campaigns and multi-step customer journeys with Email Studio, Journey Builder and Automation Studio.",
  "Personalise content at scale with AMPscript, SSJS, HTML and CSS.",
  "Query and segment customer data with SQL to target the right audience.",
  "Unify customer data in Data 360: ingest, model, resolve identities, segment and activate.",
  "Use Agentforce and AI automation to plan, run and optimise campaigns.",
  "Connect marketing platforms to other systems with REST and SOAP APIs, OAuth and MuleSoft.",
  "Measure campaign performance and report results with marketing analytics.",
  "Advise clients and stakeholders on marketing strategy, ROI and solution design.",
]

export const projects: ProgrammeProject[] = [
  {
    title: "Welcome Journey Campaign",
    summary:
      "Build a multi-step welcome journey in Journey Builder with segmented emails and automated follow-ups.",
    skills: ["Email Studio", "Journey Builder", "Automation Studio"],
  },
  {
    title: "Personalised Email at Scale",
    summary:
      "Create dynamic email templates that change content per customer using AMPscript, SQL and SSJS.",
    skills: ["AMPscript", "SQL", "SSJS"],
  },
  {
    title: "Unified Customer Profile",
    summary:
      "Bring data from two sources into Data 360, resolve identities and build an audience segment ready for activation.",
    skills: ["Data ingestion", "Identity resolution", "Segmentation"],
  },
  {
    title: "AI-Assisted Campaign",
    summary:
      "Use Agentforce to draft, target and optimise a campaign, then compare results against a manual version.",
    skills: ["Agentforce", "AI automation", "Campaign analytics"],
  },
  {
    title: "Capstone: Integrated Marketing Solution",
    summary:
      "Design and present a complete solution for a sample client: architecture, integrations, campaigns and ROI measurement.",
    skills: ["Solution design", "API integration", "Consulting"],
  },
]

export const outlineCourses: ProgrammeOutlineCourse[] = [
  {
    ...marketingCloud1,
    priceUsd: 1500,
    summary:
      "Email Studio, Journey Builder and Automation Studio for building and running campaigns.",
  },
  {
    ...marketingCloud2,
    priceUsd: 2000,
    summary:
      "AMPscript, SSJS, SQL, HTML, CSS and JavaScript for advanced personalisation and automation.",
  },
  {
    ...course("marketing-cloud-next", "Marketing Cloud Next"),
    priceUsd: null,
    summary:
      "Modern marketing automation, personalisation and data-driven engagement on Salesforce's newest marketing platform.",
  },
  {
    ...sqlProgramming,
    priceUsd: null,
    summary:
      "SQL, AMPscript and SSJS for querying data and scripting marketing logic.",
  },
  {
    ...apiIntegrations,
    priceUsd: null,
    summary:
      "REST and SOAP APIs and OAuth authentication for connecting marketing systems.",
  },
  {
    ...aiAgentforce,
    priceUsd: 1000,
    summary:
      "Agentforce, AI automation and Data 360 with AI for smarter campaigns.",
  },
  {
    ...enterpriseIntegration,
    priceUsd: 1000,
    summary:
      "MuleSoft, APIs and event-driven architecture for large-scale integrations.",
  },
  {
    ...course("data-analytics", "Data Analytics"),
    priceUsd: 1000,
    summary:
      "Measure campaign performance and turn results into reports and insights.",
  },
  {
    ...data360,
    priceUsd: 750,
    summary:
      "Data ingestion, data modelling, identity resolution, segmentation and activation.",
  },
  {
    ...course("tech-architecture", "Tech Architecture"),
    priceUsd: 500,
    summary:
      "Data, integration, security and enterprise architecture for marketing solutions.",
  },
  {
    ...course("data-cloud", "Data & Cloud"),
    priceUsd: null,
    summary:
      "Working with Snowflake, Databricks, AWS and Azure as marketing data sources.",
  },
  {
    ...baConsulting,
    priceUsd: 500,
    summary:
      "Marketing strategy, analytics, ROI, solution design and client communication.",
  },
]

export const certifications: ProgrammeCertification[] = [
  {
    name: "Salesforce Certified Marketing Cloud Email Specialist",
    body: "Salesforce",
    preparedIn: [marketingCloud1],
  },
  {
    name: "Salesforce Certified Marketing Cloud Engagement Developer",
    body: "Salesforce",
    preparedIn: [marketingCloud2, sqlProgramming],
  },
  {
    name: "Salesforce Certified Marketing Cloud Engagement Consultant",
    body: "Salesforce",
    preparedIn: [marketingCloud1, marketingCloud2, baConsulting],
  },
  {
    name: "Data 360 Consultant (formerly Data Cloud Consultant)",
    body: "Salesforce",
    preparedIn: [data360, aiAgentforce],
  },
  {
    name: "Salesforce Certified Agentforce Specialist",
    body: "Salesforce",
    preparedIn: [aiAgentforce],
  },
  {
    name: "Salesforce Certified MuleSoft Developer",
    body: "Salesforce",
    preparedIn: [enterpriseIntegration, apiIntegrations],
  },
]

export const certificationNote =
  "Email Specialist is the usual starting point. Consultant and developer certifications assume hands-on project experience, so fellows typically take them later."

export const requirements = {
  heading: "Prerequisites and requirements",
  items: [
    {
      title: "Prior experience",
      body: "None. Marketing or basic HTML knowledge helps but is not required. Scripting and SQL are taught from the basics.",
      illustration: illustrations.experience,
    },
    {
      title: "Language",
      body: "Good written and spoken English.",
      illustration: illustrations.language,
    },
    {
      title: "Equipment",
      body: "A laptop or desktop computer and a reliable internet connection. A phone or tablet alone is not enough for the tools used.",
      illustration: illustrations.equipment,
    },
  ],
}
