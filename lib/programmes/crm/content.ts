/**
 * CRM Institute content shared by the program page and its course pages.
 * Source: "CRM Revenue Ops & Marketing (CRI) - Program Page Content" (Nov 1, 2026).
 */

import { illustrations } from "@/lib/programmes/shared"
import type {
  ProgrammeCertification,
  ProgrammeOutlineCourse,
  ProgrammeProject,
} from "@/lib/programmes/types"

export const course = (id: string, title: string) => ({
  id: `crm-${id}`,
  title,
})

/** Program learning outcomes, in document order. Course pages pick from these. */
export const outcomes = [
  "Set up and manage a Salesforce org: users, security, data model, reports and dashboards.",
  "Configure Sales Cloud and Service Cloud to support real sales pipelines and customer service processes.",
  "Automate business processes with Salesforce Flow, without writing code.",
  "Build and run email and customer journeys in Marketing Cloud, including AMPscript, SQL and SSJS for advanced personalisation.",
  "Design AI agents with Agentforce that answer customers and support staff.",
  "Connect CRM systems to other applications using APIs and integration patterns.",
  "Write Apex code and build Lightning Web Components when declarative tools are not enough.",
  "Work across platforms beyond Salesforce, including ServiceNow, HubSpot CRM and Experience Cloud portals.",
]

export const projects: ProgrammeProject[] = [
  {
    title: "Salesforce Org Setup",
    summary:
      "Configure a Salesforce org for a sample company: users, roles, security, custom objects, reports and dashboards.",
    skills: ["Salesforce administration", "Data modelling", "Security"],
  },
  {
    title: "Sales and Service Implementation",
    summary:
      "Set up a sales pipeline in Sales Cloud and a case management process in Service Cloud, then automate key steps with Flow.",
    skills: ["Sales Cloud", "Service Cloud", "Flow automation"],
  },
  {
    title: "Marketing Journey Campaign",
    summary:
      "Build a segmented email campaign and customer journey in Marketing Cloud with personalised content.",
    skills: ["Marketing Cloud", "AMPscript", "SQL segmentation"],
  },
  {
    title: "Agentforce Service Agent",
    summary:
      "Design and test an AI agent that answers common customer questions and hands complex cases to a person.",
    skills: ["Agentforce", "Prompt design", "Service automation"],
  },
  {
    title: "Capstone: Custom App with Integration",
    summary:
      "Build a custom Salesforce app with Apex and Lightning Web Components that connects to an external system through an API.",
    skills: ["Apex", "Lightning Web Components", "API integration"],
  },
]

export const outlineCourses: ProgrammeOutlineCourse[] = [
  {
    ...course("salesforce-admin", "Salesforce Admin"),
    priceUsd: 1000,
    summary:
      "The foundation: users, security, objects, fields, data management, reports and dashboards.",
  },
  {
    ...course("agent-service-cloud", "Agent Service Cloud"),
    priceUsd: 750,
    summary:
      "Case management, service consoles, knowledge and AI-assisted customer service.",
  },
  {
    ...course("agent-sales-cloud", "Agent Sales Cloud"),
    priceUsd: 750,
    summary: "Leads, opportunities, forecasting and AI-assisted selling.",
  },
  {
    ...course("marketing-cloud-1", "Marketing Cloud Part 1: Intermediate"),
    priceUsd: 1500,
    summary:
      "Email Studio, Journey Builder and Automation Studio for campaign delivery.",
  },
  {
    ...course("marketing-cloud-2", "Marketing Cloud Part 2: Advanced"),
    priceUsd: 2000,
    summary:
      "AMPscript, SSJS, SQL, HTML and CSS for advanced personalisation and automation.",
  },
  {
    ...course("flow-automation", "Salesforce Flow Automation"),
    priceUsd: 1000,
    summary:
      "Automate business processes with Flow, from simple record updates to multi-step processes.",
  },
  {
    ...course("servicenow", "ServiceNow"),
    priceUsd: 1000,
    summary:
      "IT service management basics: incidents, requests, workflows and platform administration.",
  },
  {
    ...course("hubspot", "HubSpot CRM"),
    priceUsd: 1000,
    summary:
      "Contacts, deals, pipelines and marketing tools on the HubSpot platform.",
  },
  {
    ...course("integration-api", "Integration and API Management"),
    priceUsd: 750,
    summary:
      "Connect Salesforce with other systems using REST and SOAP APIs and common integration patterns.",
  },
  {
    ...course("experience-cloud", "Experience Cloud"),
    priceUsd: 500,
    summary: "Build customer and partner portals on Salesforce.",
  },
  {
    ...course("agentforce", "Salesforce Agentforce"),
    priceUsd: 500,
    summary: "Design, configure and test AI agents for sales and service.",
  },
  {
    ...course("apex", "Salesforce Apex Programmatic Development"),
    priceUsd: 2000,
    summary:
      "Write Apex classes and triggers, and test code for business logic beyond declarative tools.",
  },
  {
    ...course("lwc", "Salesforce Lightning Web Components (LWC)"),
    priceUsd: 1500,
    summary:
      "Build custom user interface components for Salesforce with JavaScript.",
  },
]

export const certifications: ProgrammeCertification[] = [
  {
    name: "Salesforce Certified Platform Administrator",
    body: "Salesforce",
    preparedIn: [course("salesforce-admin", "Salesforce Admin")],
  },
  {
    name: "Salesforce Certified Platform App Builder",
    body: "Salesforce",
    preparedIn: [
      course("salesforce-admin", "Salesforce Admin"),
      course("flow-automation", "Salesforce Flow Automation"),
    ],
  },
  {
    name: "Salesforce Certified Sales Cloud Consultant",
    body: "Salesforce",
    preparedIn: [course("agent-sales-cloud", "Agent Sales Cloud")],
  },
  {
    name: "Salesforce Certified Service Cloud Consultant",
    body: "Salesforce",
    preparedIn: [course("agent-service-cloud", "Agent Service Cloud")],
  },
  {
    name: "Salesforce Certified Marketing Cloud Email Specialist",
    body: "Salesforce",
    preparedIn: [
      course("marketing-cloud-1", "Marketing Cloud Part 1: Intermediate"),
    ],
  },
  {
    name: "Salesforce Certified Marketing Cloud Engagement Developer",
    body: "Salesforce",
    preparedIn: [
      course("marketing-cloud-2", "Marketing Cloud Part 2: Advanced"),
    ],
  },
  {
    name: "Salesforce Certified Experience Cloud Consultant",
    body: "Salesforce",
    preparedIn: [course("experience-cloud", "Experience Cloud")],
  },
  {
    name: "Salesforce Certified Agentforce Specialist",
    body: "Salesforce",
    preparedIn: [course("agentforce", "Salesforce Agentforce")],
  },
  {
    name: "Salesforce Certified Platform Developer",
    body: "Salesforce",
    preparedIn: [
      course("apex", "Salesforce Apex Programmatic Development"),
      course("lwc", "Salesforce Lightning Web Components (LWC)"),
    ],
  },
  {
    name: "Certified System Administrator (CSA)",
    body: "ServiceNow",
    preparedIn: [course("servicenow", "ServiceNow")],
  },
  {
    name: "HubSpot Academy CRM certifications",
    body: "HubSpot",
    preparedIn: [course("hubspot", "HubSpot CRM")],
  },
]

export const certificationNote =
  "Consultant-level certifications assume hands-on project experience. Most career changers start with Platform Administrator and add others as they build experience."

export const requirements = {
  heading: "Prerequisites and requirements",
  items: [
    {
      title: "Prior experience",
      body: "None. The program starts with Salesforce administration. Coding is introduced later, in the Apex and Lightning Web Components courses.",
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
