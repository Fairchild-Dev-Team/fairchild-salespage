/**
 * 2027 catalogue from the training timetable, not the live lander API.
 * Source: "Babskenky 2027 Training Timetable (Tentative)", tab "2027 Future Courses".
 * A blank $500 row under IIBA CBAP had no course name, so it is not included.
 * Prices are whole US dollars as written on the sheet.
 */

export type CatalogueKind = "programme" | "course" | "product"

export type CatalogueCourse = {
  id: string
  programmeId: string | null
  productId: string | null
  title: string
  summary: string | null
  priceUsd: number | null
}

export type CatalogueProgramme = {
  id: string
  title: string
  track: string
  leader: string
  duration: string | null
  priceUsd: number | null
  courses: CatalogueCourse[]
}

export type CatalogueInclude = {
  title: string
  priceUsd: number | null
  courseId?: string
}

export type CatalogueProduct = {
  id: string
  title: string
  leader: string
  duration: string | null
  priceUsd: number | null
  summary: string
  includes: CatalogueInclude[]
  /**
   * Lander admin product name(s) when they differ from the timetable title.
   * Checkout matches these (then slug) against lander.products[].name.
   */
  landerNames?: string[]
}

type CourseInput = {
  id: string
  title: string
  priceUsd?: number | null
  summary?: string | null
}

function programme(input: {
  id: string
  title: string
  track: string
  leader: string
  duration?: string | null
  priceUsd?: number | null
  courses: CourseInput[]
}): CatalogueProgramme {
  return {
    id: input.id,
    title: input.title,
    track: input.track,
    leader: input.leader,
    duration: input.duration ?? null,
    priceUsd: input.priceUsd ?? null,
    courses: input.courses.map((course) => ({
      id: `${input.id}-${course.id}`,
      programmeId: input.id,
      productId: null,
      title: course.title,
      summary: course.summary ?? null,
      priceUsd: course.priceUsd ?? null,
    })),
  }
}

export const catalogueProgrammes: CatalogueProgramme[] = [
  programme({
    id: "business-innovation",
    title: "Business Innovation Institute",
    track: "Business Innovation & Strategy",
    leader: "Chimaka",
    duration: "6 or 12 months",
    priceUsd: 5000,
    courses: [
      { id: "business-analysis-with-ai", title: "Business Analysis with AI", priceUsd: 2000 },
      {
        id: "change-management",
        title: "Change Management for Serious People",
        priceUsd: 1000,
        summary: "Starting November 2026.",
      },
      { id: "product-development", title: "Product Development", priceUsd: 1000 },
      { id: "salesforce-ba", title: "Salesforce BA & Exam Prep", priceUsd: 1000 },
      { id: "quality-testing", title: "Quality Testing", priceUsd: 1000 },
      { id: "microsoft-devops", title: "Microsoft DevOps", priceUsd: 500 },
      { id: "agile-scrum", title: "Agile & Scrum", priceUsd: 750 },
      { id: "sql-for-ba", title: "SQL for BA", priceUsd: 500 },
      { id: "advanced-excel", title: "Advanced Excel", priceUsd: 500 },
      {
        id: "ui-ux-in-ba",
        title: "UI/UX in Business Analysis",
        priceUsd: 1000,
        summary: "Miro, Figma, and low-fidelity design.",
      },
      { id: "iiba-cbap", title: "IIBA CBAP", priceUsd: 500 },
    ],
  }),
  programme({
    id: "crm",
    title: "CRM Institute",
    track: "CRM Revenue Ops & Marketing",
    leader: "Baba & Dele",
    priceUsd: 5000,
    courses: [
      { id: "salesforce-admin", title: "Salesforce Admin", priceUsd: 1000 },
      { id: "agent-service-cloud", title: "Agent Service Cloud", priceUsd: 750 },
      { id: "agent-sales-cloud", title: "Agent Sales Cloud", priceUsd: 750 },
      {
        id: "marketing-cloud-1",
        title: "Marketing Cloud Part 1: Intermediate",
        priceUsd: 1500,
      },
      {
        id: "marketing-cloud-2",
        title: "Marketing Cloud Part 2: Advanced",
        priceUsd: 2000,
        summary: "AMPscript, Automation, SSJS, HTML, CSS, and SQL.",
      },
      { id: "flow-automation", title: "Salesforce Flow Automation", priceUsd: 1000 },
      { id: "servicenow", title: "ServiceNow", priceUsd: 1000 },
      { id: "hubspot", title: "HubSpot CRM", priceUsd: 1000 },
      { id: "integration-api", title: "Integration and API Management", priceUsd: 750 },
      { id: "experience-cloud", title: "Experience Cloud", priceUsd: 500 },
      { id: "agentforce", title: "Salesforce Agentforce", priceUsd: 500 },
      {
        id: "apex",
        title: "Salesforce Apex Programmatic Development",
        priceUsd: 2000,
      },
      {
        id: "lwc",
        title: "Salesforce Lightning Web Components (LWC)",
        priceUsd: 1500,
      },
    ],
  }),
  programme({
    id: "marketing-technology",
    title: "Marketing Technology Institute",
    track: "Marketing Technology",
    leader: "Baba & Dele",
    priceUsd: 5000,
    courses: [
      {
        id: "marketing-cloud-1",
        title: "Marketing Cloud Part 1: Intermediate",
        priceUsd: 1500,
        summary: "Email Studio, Journey Builder, and Automation Studio.",
      },
      {
        id: "marketing-cloud-2",
        title: "Marketing Cloud Part 2: Advanced",
        priceUsd: 2000,
        summary: "SQL, AMPscript, SSJS, HTML, CSS, and JavaScript.",
      },
      {
        id: "marketing-cloud-next",
        title: "Marketing Cloud Next",
        summary: "Modern marketing automation, personalization, and data-driven engagement.",
      },
      {
        id: "sql-programming",
        title: "SQL & Programming",
        summary: "SQL, AMPscript, and SSJS.",
      },
      {
        id: "api-integrations",
        title: "API & Integrations",
        summary: "REST, SOAP, OAuth, and APIs.",
      },
      {
        id: "ai-agentforce",
        title: "AI & Agentforce",
        priceUsd: 1000,
        summary: "Agentforce, AI automation, and Data 360.",
      },
      {
        id: "enterprise-integration",
        title: "Enterprise Integration",
        priceUsd: 1000,
        summary: "MuleSoft, APIs, and event-driven architecture.",
      },
      { id: "data-analytics", title: "Data Analytics", priceUsd: 1000 },
      {
        // Unnamed on the sheet; the MTI page content calls it Data 360 [confirm name].
        id: "data-ingestion",
        title: "Data 360",
        priceUsd: 750,
        summary:
          "Data ingestion, data modeling, identity resolution, segmentation, and activation.",
      },
      {
        id: "tech-architecture",
        title: "Tech Architecture",
        priceUsd: 500,
        summary:
          "Data architecture, integration architecture, security, and enterprise architecture.",
      },
      {
        id: "data-cloud",
        title: "Data & Cloud",
        summary: "Snowflake, Databricks, AWS, and Azure.",
      },
      {
        id: "ba-consulting",
        title: "Business Analysis & Consulting",
        priceUsd: 500,
        summary:
          "Marketing strategy, analytics, ROI, solution design, and client communication.",
      },
    ],
  }),
  programme({
    id: "software-engineering",
    title: "Software Engineering Institute",
    track: "AI Software Engineering",
    leader: "AB",
    priceUsd: 5000,
    courses: [
      {
        id: "intro-ai",
        title: "Introduction to Artificial Intelligence",
        priceUsd: 2000,
      },
      { id: "software-engineering", title: "Software Engineering", priceUsd: 2000 },
      { id: "html-css", title: "HTML & CSS", priceUsd: 750 },
      { id: "javascript", title: "JavaScript", priceUsd: 750 },
    ],
  }),
  programme({
    id: "code-the-future",
    title: "Code the Future Institute",
    track: "Code the Future",
    leader: "Bisola Olaniyan",
    duration: "6 or 12 months",
    priceUsd: 5000,
    courses: [
      { id: "ai-web-design-teens", title: "AI-Powered Web Design for Teens" },
    ],
  }),
  programme({
    id: "ui-ux",
    title: "UI/UX Design Institute",
    track: "UI/UX Design Thinking",
    leader: "Femi Ojo",
    duration: "12 months",
    priceUsd: 2000,
    courses: [
      { id: "digital-foundations", title: "Digital & Design Foundations" },
      {
        id: "understanding-users",
        title: "Understanding Users & Structuring Experiences",
      },
      { id: "wireframing", title: "Wireframing & UX Problem Solving" },
      { id: "visual-design", title: "UI & Visual Design" },
      { id: "figma-ai", title: "Figma Mastery & Designing with AI" },
      { id: "design-systems", title: "Design Systems & Responsive Design" },
      { id: "prototyping", title: "Prototyping & Interaction" },
      { id: "usability", title: "Usability Testing & Product Thinking" },
      {
        id: "handoff",
        title: "Design Communication, Presentation & Developer Handoff",
      },
      { id: "capstone", title: "Capstone, Portfolio & Professional Practice" },
    ],
  }),
  programme({
    id: "project-planning",
    title: "Project Planning Institute",
    track: "Project Planning",
    leader: "Bisola Olaniyan",
    duration: "6 or 12 months",
    priceUsd: 5000,
    courses: [
      {
        id: "ai-project-management",
        title: "AI Project Management for Serious People",
      },
      {
        id: "project-planning-control",
        title: "Project Planning and Control with Certification",
        summary: "Tableau, Power BI, PMP, and PMI.",
      },
      {
        id: "data-analysis-fundamentals",
        title: "Fundamentals of Data Analysis",
        summary: "Advanced Excel, SQL, and Power BI.",
      },
      { id: "other-certifications", title: "Other Certifications" },
    ],
  }),
  programme({
    id: "data-analysis",
    title: "Data Analysis Institute",
    track: "Data Analysis",
    leader: "Bisola Olaniyan",
    duration: "12 months",
    priceUsd: 5000,
    courses: [
      { id: "advanced-excel", title: "Advanced Excel", priceUsd: 1000 },
      { id: "sql", title: "SQL", priceUsd: 1000 },
      { id: "python-r", title: "Python & R", priceUsd: 1500 },
      { id: "power-bi", title: "Power BI", priceUsd: 1000 },
      {
        id: "storytelling",
        title: "Data Storytelling & Documentation",
        priceUsd: 1000,
      },
    ],
  }),
  programme({
    id: "data-science",
    title: "Data Science Institute",
    track: "Data Science",
    leader: "Bisola Olaniyan",
    duration: "12 months",
    priceUsd: 7500,
    courses: [
      { id: "programming-tools", title: "Programming & Tools" },
      { id: "maths-statistics", title: "Maths & Statistics" },
      { id: "analysis-modelling", title: "Analysis and Modelling" },
      { id: "mathematical-foundations", title: "Mathematical Foundations" },
      { id: "programming-data", title: "Programming & Data Foundations" },
      {
        id: "core-ai-ml",
        title: "Core Artificial Intelligence & Machine Learning",
      },
      { id: "advanced-topics", title: "Advanced Topics and Specialisation" },
      { id: "prompt-engineering", title: "Prompt Engineering" },
    ],
  }),
  programme({
    id: "cybersecurity",
    title: "IT Cybersecurity Institute",
    track: "Cybersecurity",
    leader: "Dr Duke",
    duration: "6 months",
    priceUsd: 5000,
    courses: [
      { id: "grc", title: "Governance, Risk and Compliance (GRC)", priceUsd: 2000 },
      { id: "soc-analysis", title: "SOC Analysis", priceUsd: 2000 },
      {
        id: "cert-prep",
        title: "Cybersecurity Certification Prep Quizbank",
        priceUsd: 500,
      },
    ],
  }),
]

const guidedMentorshipCourses: CatalogueCourse[] = [
  {
    id: "interview-prep-series",
    programmeId: null,
    productId: "guided-mentorship",
    title: "200+ Hours Interview Prep Series",
    summary: null,
    priceUsd: 2000,
  },
  {
    id: "job-attestation",
    programmeId: null,
    productId: "guided-mentorship",
    title: "Job Attestation & Reference",
    summary: null,
    priceUsd: 1000,
  },
  {
    id: "it-certifications",
    programmeId: null,
    productId: "guided-mentorship",
    title: "50+ IT Certification Support",
    summary: null,
    priceUsd: 250,
  },
  {
    id: "presentation-skills",
    programmeId: null,
    productId: "guided-mentorship",
    title: "Professional Presentation Skills",
    summary: null,
    priceUsd: 500,
  },
  {
    id: "presentation-skills-figma",
    programmeId: null,
    productId: "guided-mentorship",
    title: "Professional Presentation Skills using Figma",
    summary: null,
    priceUsd: 500,
  },
]

export const catalogueProducts: CatalogueProduct[] = [
  {
    id: "fellowship",
    title: "FairChild Fellowship",
    leader: "Baba",
    duration: "12 months",
    priceUsd: 500,
    summary: "Choose any program, plus guided mentorship and career development.",
    // Prefer the primary lander product when duplicate titles exist.
    landerNames: ["FairChild Fellowship", "Scholarship Bundle", "Fellowship"],
    includes: [
      { title: "Choose any program", priceUsd: null },
      { title: "Guided Mentorship & Career Development", priceUsd: null },
    ],
  },
  {
    id: "guided-mentorship",
    title: "Guided Mentorship & Career Development",
    leader: "Baba",
    duration: "6 or 12 months",
    priceUsd: 3000,
    summary:
      "Interview preparation, references, certifications, and presentation skills. Each of these can also be paid for on its own.",
    landerNames: [
      
      "Guided Mentorship & Career Development",
      
    ],
    includes: guidedMentorshipCourses.map((course) => ({
      title: course.title,
      priceUsd: course.priceUsd,
      courseId: course.id,
    })),
  },
]

export const catalogueCourses: CatalogueCourse[] = [
  ...catalogueProgrammes.flatMap((programme) => programme.courses),
  ...guidedMentorshipCourses,
]

const programmeById = new Map(catalogueProgrammes.map((item) => [item.id, item]))
const courseById = new Map(catalogueCourses.map((item) => [item.id, item]))
const productById = new Map(catalogueProducts.map((item) => [item.id, item]))

export function formatCataloguePrice(usd: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd)
}

export function getCatalogueProgramme(id: string): CatalogueProgramme | undefined {
  return programmeById.get(id)
}

export function getCatalogueCourse(id: string): CatalogueCourse | undefined {
  return courseById.get(id)
}

export function getCatalogueProduct(id: string): CatalogueProduct | undefined {
  return productById.get(id)
}
