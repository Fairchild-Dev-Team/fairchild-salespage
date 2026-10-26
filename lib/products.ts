export type ProductType =
  | "programme-1y"
  | "programme-6m"
  | "course"
  | "interview-prep"

export type PaymentOption = {
  id: string
  label: string
  /** Amount charged now via Stripe (USD cents) */
  amountCents: number
  description: string
  /** Shown under the option — remaining schedule, not charged here */
  scheduleNote?: string
  highlighted?: boolean
}

export type Product = {
  slug: string
  name: string
  type: ProductType
  tagline: string
  summary: string
  duration: string
  alumniSalaryRange?: string
  outcomes: string[]
  includes: string[]
  paymentOptions: PaymentOption[]
}

const spotLock: PaymentOption = {
  id: "spot-lock",
  label: "Lock your spot",
  amountCents: 25_000,
  description: "$250 today toward the $500 base fee ($250 due before January 2027).",
  scheduleNote: "Remaining $250 of the base fee is due before January 2027.",
  highlighted: true,
}

const oneYearFullPay: PaymentOption = {
  id: "full-pay",
  label: "Pay in full (by end of January)",
  amountCents: 200_000,
  description: "60% off the $5,000 list price. Total: $2,000.",
  scheduleNote: "Requires the $500 base fee / spot lock before January.",
}

const oneYearPlan: PaymentOption = {
  id: "payment-plan",
  label: "Payment plan",
  amountCents: 50_000,
  description: "Pay the $500 base fee now. Programme total on plan: $3,000.",
  scheduleNote: "Remaining balance after the $500 base fee is arranged on the $3,000 plan.",
}

function oneYearProgramme(
  slug: string,
  name: string,
  tagline: string,
  summary: string,
  outcomes: string[]
): Product {
  return {
    slug,
    name,
    type: "programme-1y",
    tagline,
    summary,
    duration: "12 months",
    alumniSalaryRange: "$100k–$150k",
    outcomes,
    includes: [
      "Live cohort sessions + self-paced study",
      "Practitioner mentorship",
      "Portfolio and project work",
      "Resume, LinkedIn, and interview support",
      "$500 base fee locks your 2027 spot ($250 now + $250 before January)",
    ],
    paymentOptions: [spotLock, oneYearFullPay, oneYearPlan],
  }
}

export const products: Product[] = [
  oneYearProgramme(
    "data-analysis-business-intelligence",
    "Data Analysis & Business Intelligence",
    "Turn raw data into decisions employers pay for.",
    "Master analysis and BI tools to transform data into insights that support strategy and growth.",
    [
      "Excel for data analysis",
      "SQL & relational databases",
      "Python for analysis (Pandas, NumPy)",
      "Power BI & Tableau dashboards",
    ]
  ),
  oneYearProgramme(
    "cyber-security-data-intelligence",
    "Cyber Security & Data Intelligence",
    "Protect systems. Read the signals in the data.",
    "Build cybersecurity and data intelligence skills to detect threats, protect assets, and turn complex data into clear insight.",
    [
      "Security foundations with practical labs",
      "Data intelligence for risk and detection",
      "Interview-ready portfolio work",
      "Career support through the offer",
    ]
  ),
  oneYearProgramme(
    "crm-declarative-development",
    "CRM Declarative Development (No/Low Code)",
    "Automate CRM work without waiting on a full engineering team.",
    "Master no-code and low-code CRM development to automate workflows, customize processes, and deliver CRM solutions employers need.",
    [
      "Declarative CRM configuration",
      "Workflow and process automation",
      "Real project delivery practice",
      "Salesforce-aligned career pathways",
    ]
  ),
  oneYearProgramme(
    "product-management-strategy",
    "Product Management & Strategy",
    "Ship products that solve real problems.",
    "Learn product frameworks to spot opportunity, set vision, prioritize features, and deliver customer-centric outcomes.",
    [
      "Product discovery and strategy",
      "Roadmapping and prioritization",
      "Stakeholder communication",
      "Portfolio that shows product judgment",
    ]
  ),
  {
    slug: "six-month-programme",
    name: "6-Month Programme",
    type: "programme-6m",
    tagline: "A focused path when you need momentum this year.",
    summary:
      "An accelerated FairChild programme track. Normal price $3,000 — choose one-time or a six-month plan.",
    duration: "6 months",
    outcomes: [
      "Structured cohort learning",
      "Mentorship and practice",
      "Career support built in",
      "Clear payment path with a $500 base fee",
    ],
    includes: [
      "Base fee of $500 secures your place",
      "One-time total $1,250 (base fee + balance)",
      "Or $2,000 plan: $500 base + $250/month for 6 months",
    ],
    paymentOptions: [
      {
        id: "spot-lock",
        label: "Lock your spot",
        amountCents: 25_000,
        description:
          "$250 today toward the $500 base fee ($250 due before January 2027).",
        scheduleNote: "Remaining $250 of the base fee is due before January 2027.",
        highlighted: true,
      },
      {
        id: "one-time",
        label: "One-time payment",
        amountCents: 125_000,
        description: "Total $1,250 — base fee of $500 + remaining balance.",
        highlighted: true,
      },
      {
        id: "payment-plan",
        label: "Payment plan",
        amountCents: 50_000,
        description: "Total $2,000. Pay the $500 base fee now.",
        scheduleNote: "Then $1,500 over 6 months = $250/month.",
      },
    ],
  },
  {
    slug: "interview-prep",
    name: "Interview Prep (Next Year)",
    type: "interview-prep",
    tagline: "Show up ready for the interviews that change your tax bracket.",
    summary:
      "Interview Mastery Prep for next year — resume, LinkedIn, mocks, and negotiation guidance.",
    duration: "Interview Prep series",
    outcomes: [
      "Resume refinement",
      "LinkedIn positioning",
      "Mock interviews",
      "Negotiation guidance",
    ],
    includes: ["Full Interview Prep access for next year", "FairChild mentor guidance"],
    paymentOptions: [
      {
        id: "pay-in-full",
        label: "Pay for Interview Prep",
        amountCents: 50_000,
        description: "Total $500.",
        highlighted: true,
      },
      {
        id: "spot-lock",
        label: "Lock with $250",
        amountCents: 25_000,
        description: "$250 today toward $500 ($250 due before January 2027).",
        scheduleNote: "Remaining $250 due before January 2027.",
      },
    ],
  },
  {
    slug: "standalone-course",
    name: "Standalone Course",
    type: "course",
    tagline: "One focused skill block when you already know your next step.",
    summary:
      "Individual FairChild courses priced at $500. Ideal when you need a specific capability without a full programme.",
    duration: "Course-length",
    outcomes: [
      "Targeted skill building",
      "FairChild teaching standards",
      "Clear next step into a full programme if you want it",
    ],
    includes: ["Course access", "Learning support as included for the course"],
    paymentOptions: [
      {
        id: "pay-in-full",
        label: "Pay for course",
        amountCents: 50_000,
        description: "Total $500.",
        highlighted: true,
      },
      {
        id: "spot-lock",
        label: "Lock with $250",
        amountCents: 25_000,
        description: "$250 today toward $500 ($250 due before January 2027).",
        scheduleNote: "Remaining $250 due before January 2027.",
      },
    ],
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getPaymentOption(
  product: Product,
  optionId: string
): PaymentOption | undefined {
  return product.paymentOptions.find((option) => option.id === optionId)
}

export function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

export const programmes = products.filter(
  (product) => product.type === "programme-1y" || product.type === "programme-6m"
)

export const otherOffers = products.filter(
  (product) => product.type === "course" || product.type === "interview-prep"
)

export const typeLabel: Record<ProductType, string> = {
  "programme-1y": "1-Year Programme",
  "programme-6m": "6-Month Programme",
  course: "Standalone Course",
  "interview-prep": "Interview Prep",
}
