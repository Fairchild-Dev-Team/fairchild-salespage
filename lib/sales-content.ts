export const salesHero = {
  announcement: "Now enrolling · Class of 2027",
  brand: "FairChild",
  headline: {
    line1: "Build the skills.",
    line2Lead: "Master the ",
    line2Accent: "interviews.",
    line3Accent: "Land the opportunity.",
  },
  subhead: {
    lead: "Don't just break into tech. Break into the ",
    accent: "bracket you deserve.",
  },
  support:
    "Get hands-on training, expert mentorship, and dedicated career support to help you compete for high-value IT opportunities. Secure your place in the Class of 2027 with a $250 seat deposit.",
  visual: {
    image: {
      src: "/images/sales/hero/hero-graduate.jpg",
      alt: "A graduate in a gown raising her cap in celebration",
    },
    outcomeCard: {
      eyebrow: "Offers secured",
      title: "40+",
      meta: "In the last 15 months",
    },
    salaryCard: {
      eyebrow: "Starting salary",
      value: "$120K",
      meta: "Average among our mentees",
    },
  },
  primaryCta: "Reserve My Seat",
  secondaryCta: "View institutes",
} as const

/** Proof used on-page. Prefer company-published numbers; do not invent new ones. */
export const credibility = [
  {
    value: "40",
    label: "Job offers in 15 months",
    source: "FairChild company reporting",
  },
  {
    value: "$120k",
    label: "Avg. mentee starting salary",
    source: "fairchildinstitute.com",
  },
  {
    value: "1,000+",
    label: "Mentees supported",
    source: "FairChild LinkedIn / About",
  },
  {
    value: "200+",
    label: "Companies mentees placed in",
    source: "FairChild LinkedIn / About",
  },
] as const

export const linkedInProof = {
  title: "Signed offers — not certificates issued",
  body: "On LinkedIn, FairChild shared a cybersecurity cohort story: twenty signed job offers from a program that opened in June 2025 — new titles and new tax brackets, not enrolment vanity metrics.",
  href: "https://www.linkedin.com/posts/fairchildinstitute_cybersecurity-grc-itaudit-activity-7496867033498832896-VW9w",
  linkLabel: "Read the LinkedIn post",
} as const

export const problem = {
  eyebrow: "Here's what might be holding you back",
  titleLead: "You've been learning.",
  title: "But are you getting closer to being hired?",
  body: [
    "You've completed courses, collected certificates, watched countless tutorials, and submitted applications. Yet, the interview invitations aren't coming.",
    "The problem might not be your effort. It might be the way you've been approaching your career transition.",
    "Learning new skills is important, but knowing how to apply them, demonstrate your abilities, and navigate the hiring process is what moves you closer to an opportunity.",
  ],
} as const

export const falseBeliefs = [
  {
    belief: "Another certificate will make the difference.",
    response: "Not necessarily.",
    truth:
      "Employers want to see what you can do. They look for practical skills, relevant experience, and the ability to solve real problems. A certificate alone rarely tells that story.",
  },
  {
    belief: "I just need to watch more tutorials.",
    response: "More information doesn't always mean more progress.",
    truth:
      "Without a clear learning path, it's easy to jump between courses, accumulate knowledge, and struggle to connect everything into practical skills employers value.",
  },
  {
    belief: "I can figure everything out on my own.",
    response: "You don't have to navigate the entire journey alone.",
    truth:
      "Having guidance from experienced professionals who understand the industry, hiring expectations, and interview process can help you avoid costly mistakes and focus on what actually matters.",
  },
] as const

export const epiphany = {
  eyebrow: "The path to the offer",
  title: "Five steps. In this order.",
  lead: "Skill, then practice, then proof, then the interview, then the seat.",
  steps: [
    {
      title: "Structured skill",
      body: "Learn the next thing that gets you hired, not another random playlist.",
    },
    {
      title: "Mentored practice",
      body: "Practitioners who have sat on both sides of the interview table.",
    },
    {
      title: "Portfolio proof",
      body: "Work a recruiter can open, respect, and ask you about.",
    },
    {
      title: "Interview mastery",
      body: "Resume, LinkedIn, mocks, and negotiation before the real conversation.",
    },
    {
      title: "The offer",
      body: "Support stays until you are in the seat, not until the course ends.",
    },
  ],
} as const

export const enrollmentDetails = {
  title: "All the details",
  items: [
    {
      label: "What",
      body: "A career program with cohort learning, a portfolio, and interview support through the offer.",
    },
    {
      label: "When",
      body: "2027 enrollment. Pay $250 today. The other $250 of the base fee is due before January 2027.",
    },
    {
      label: "Where",
      body: "You choose the program on this page. Checkout is on that program, and you get a receipt by email.",
    },
  ],
} as const

export const howItWorks = [
  {
    step: "01",
    title: "Choose your path",
    body: "1-year program, 6-month track, standalone course, Interview Prep, or Fellowship if you are alumni.",
  },
  {
    step: "02",
    title: "Lock your spot",
    body: "$250 today toward the $500 base fee. Remaining $250 before January 2027.",
  },
  {
    step: "03",
    title: "Pick how you pay",
    body: "Full-pay savings and payment plans are on each product page. Checkout is secure via Stripe.",
  },
  {
    step: "04",
    title: "Train for the offer",
    body: "Cohort learning, mentorship, projects, and Interview Mastery until the outcome is real.",
  },
] as const

export const midCta = {
  title: "Ready to stop collecting certificates?",
  body: "$250 holds a 2027 seat. Pick the program next. Tuition options are on that page.",
  primaryCta: "Save my seat",
  secondaryCta: "See pricing",
} as const

export const spotObjection = {
  title: "Why is the first step only $250?",
  body: "It is half of the $500 base fee, and that fee counts toward tuition where the program says so. The other $250 is due before January 2027. Full pay and payment plans are on the program page, after you choose.",
  /** The same split as `body` and `pricingOverview.baseFee`, for the breakdown card. */
  baseFee: "$500 base fee",
  split: [
    { amount: "$250", label: "Today" },
    { amount: "$250", label: "Before January 2027" },
  ],
} as const

export const pricingOverview = {
  title: "Clear pricing. No surprise math.",
  baseFee:
    "Every course and program spot locks with a $500 base fee: $250 now + $250 before January 2027.",
  /** `struck` is the real list price, shown crossed out beside the offer price in `normal`. */
  rows: [
    {
      name: "1-Year Program",
      normal: "$2,000",
      struck: "$5,000" as string | undefined,
      saving: "60% off" as string | undefined,
      highlight: "Best savings" as string | undefined,
      options: "Full pay by end of January: $2,000 · Plan: $3,000",
      href: "/#programmes",
    },
    {
      name: "6-Month Program",
      normal: "$1,500",
      struck: "$3,000" as string | undefined,
      saving: "50% off" as string | undefined,
      highlight: "Fastest path" as string | undefined,
      options: "One-time: $1,500 · Plan: $2,000 ($500 + $250/mo × 6)",
      href: "/#programmes",
    },
    {
      name: "Standalone Course",
      normal: "$500",
      struck: undefined as string | undefined,
      saving: undefined as string | undefined,
      highlight: undefined as string | undefined,
      options: "Pay in full or lock with $250",
      href: "/#programmes",
    },
    {
      name: "FairChild Fellowship",
      normal: "$500",
      struck: undefined as string | undefined,
      saving: undefined as string | undefined,
      highlight: undefined as string | undefined,
      options: "Pay in full or lock with $250",
      href: "/#programmes",
    },
  ],
} as const

/** Source: "FairChild Fellowship - Program Page Content" (Nov 1, 2026), hero and "What is included". */
export const fellowshipBlurb = {
  eyebrow: "FairChild Fellowship",
  title: "Learn the skills. Get the support. Land the role.",
  body: "Choose any FairChild program and add Guided Mentorship & Career Development, with interview preparation, certification support and professional references, in one 12-month fellowship.",
  badges: ["12 months", "Any program", "Mentorship included", "100% online"],
  includedHeading: "What is included",
  included: [
    "Your choice of program",
    "Guided mentorship",
    "200+ hours interview prep series",
    "Job attestation and reference",
    "Support for 50+ IT certifications",
    "Professional presentation skills",
    "FairChild fellows community",
  ],
  productId: "fellowship",
} as const

export const financialAid = {
  title: "West Africa Financial Aid",
  lead: "If you are in West Africa and standard payment is out of reach, start in the application portal.",
  steps: [
    "Create an account on the application portal.",
    "Complete your profile.",
    "Open the Financial Aid menu to start your application.",
  ],
  cta: "Apply for Financial Aid",
  email: "info@fairchildinstitute.com",
} as const

/** Vimeo embeds live on fairchildinstitute.com program storytelling. */
/**
 * Portrait (9:16) mentee video on Vimeo, the same one the FairChild event page uses.
 * Its embed is restricted to approved domains, so each domain serving this page must be
 * on the video's Vimeo embed allowlist.
 */
export const testimonialVideo = {
  vimeoId: "1243277631",
  title: "FairChild mentee story",
} as const

/** Mentee LinkedIn profiles, from the FairChild event page testimonials. Keyed by MenteeStory name. */
export const menteeLinkedIn: Record<string, string> = {
  "Adeyemi Adeleye": "https://www.linkedin.com/in/adeyemi-adeleye",
  "Adewale Banjo": "https://www.linkedin.com/in/adewale-banjo",
  "Juliet Onyinye Anyanwu":
    "https://www.linkedin.com/in/juliet-anyanwu-sfadminexpert",
  "Samson Bavo": "https://www.linkedin.com/in/samson-bavo-663531235/",
  "Rapheal Oki": "https://www.linkedin.com/in/raphealoki/",
  "Swati Soni": "https://www.linkedin.com/in/swati-soni07",
  "Ogenna Odebatu": "https://www.linkedin.com/in/ogenna-odebeatu/",
  "Olayinka Abodunde": "https://www.linkedin.com/in/yabodunde",
  "Bukola Adesuji": "https://www.linkedin.com/in/bukolaadesuji",
  "Nandhini Monisha Suriyamoorthi":
    "https://www.linkedin.com/in/nandhini-monisha-suriyamoorthi",
}

export type MenteeStory = {
  name: string
  role: string
  quote: string
  /** Leave out when there is no portrait; the card shows initials. */
  portrait?: string
}

/**
 * Mentee quotes from the FairChild landing page (src/data/mentees.ts), plus the
 * fairchildinstitute.com quotes this page already used. Three columns for the wall.
 */
export const menteeStoryColumns: MenteeStory[][] = [
  [
    {
      name: "Adeyemi Adeleye",
      role: "IT Professional",
      quote:
        "I was tired and almost gave up… but FairChild held my hand and walked me into my breakthrough.",
      portrait: "/images/sales/alumni/adeyemi.jpeg",
    },
    {
      name: "Swati Soni",
      role: "Senior Salesforce Developer",
      quote:
        "FairChild gave me the starting point professionals get 20 years into their careers.",
      portrait: "/images/sales/alumni/swati.png",
    },
    {
      name: "Juliet Onyinye Anyanwu",
      role: "Salesforce Administrator",
      quote:
        "I applied everything FairChild taught us, from the HR prep classes to the one-on-one interview prep sessions. One of the things that stood out most during my interview was how impressed they were with how much I knew about their organization.",
      portrait: "/images/sales/alumni/juliet.png",
    },
    {
      name: "Samson Bavo",
      role: "Salesforce Administrator",
      quote:
        "FairChild didn’t just help me find a job. You helped a father find work that his family can be proud of.",
      portrait: "/images/sales/alumni/samson.png",
    },
    {
      name: "Vicky Agu",
      role: "Senior Business Analyst",
      quote:
        "FairChild interview preparation helped me land a role I only dreamed about.",
    },
  ],
  [
    {
      name: "Rapheal Oki",
      role: "Salesforce Professional",
      quote:
        "At a young age, while most of my peers were focused on school life, I was stepping into the Salesforce ecosystem. From the very start, he wasn't just a mentor—he was a game changer. He saw potential in me before I saw it in myself.",
      portrait: "/images/sales/alumni/rapheal.webp",
    },
    {
      name: "Adewale Banjo",
      role: "Salesforce Administrator",
      quote:
        "Day 4 in my new Salesforce Admin role still feels unreal. I used to work at a contact centre — I always knew I didn’t belong there.",
      portrait: "/images/sales/alumni/adewale.png",
    },
    {
      name: "Swati Soni",
      role: "Senior Salesforce Developer",
      quote:
        "Today was my first day in my new role as a Senior Salesforce Developer, and as I logged in, I felt a deep sense of relief and gratitude. His mentorship went far beyond technical preparation. He provided emotional support and a clear roadmap when I needed it most.",
      portrait: "/images/sales/alumni/swati.png",
    },
    {
      name: "Ogenna Odebatu",
      role: "Senior Business Consultant",
      quote:
        "Joining the FairChild program in January 2025 was instrumental in identifying what steps I needed to take to head in the right direction. Six months in, and I can confidently say that I am an improved version of myself, even after landing a six-figure role.",
      portrait: "/images/sales/alumni/ogenna.png",
    },
    {
      name: "Olayinka Abodunde",
      role: "Business Professional",
      quote:
        "Working with FairChild was truly transformational for my career. He didn't just offer advice, he provided clarity, structure, and honest feedback that helped me sharpen my skills, articulate my value, and approach my job search with confidence and strategy.",
      portrait: "/images/sales/alumni/olayinka.jpeg",
    },
  ],
  [
    {
      name: "Bukola Adesuji",
      role: "Salesforce Administrator",
      quote:
        "Working with FairChild was a defining chapter in my personal and professional journey. His guidance directly supported my Salesforce Administrator certification and helped me regain confidence after setbacks. He does not just mentor from a distance. He shows up.",
      portrait: "/images/sales/alumni/bukola.png",
    },
    {
      name: "Adewale Banjo",
      role: "Salesforce Administrator",
      quote:
        "Joining FairChild was the missing piece that turned all my efforts into results.",
      portrait: "/images/sales/alumni/adewale.png",
    },
    {
      name: "Nandhini Monisha Suriyamoorthi",
      role: "Business Analyst",
      quote:
        "FairChild changed everything for me. The BA frameworks, the structured approach to interviews, and the practice changed everything. With God's grace, I received this formal Offer Letter. After so many rejections, this opportunity felt like confirmation that the hard work really paid off.",
    },
    {
      name: "Juliet Onyinye Anyanwu",
      role: "Salesforce Administrator",
      quote:
        "The structured curriculum meant I wasn't trying to figure it out alone. Now I'm using data to solve business problems at a fintech, and my banking experience became an advantage.",
      portrait: "/images/sales/alumni/juliet.png",
    },
    {
      name: "Ogenna Odebatu",
      role: "Senior Business Consultant",
      quote:
        "FairChild mentors pushed me past imposter syndrome. I went from avoiding interviews to leading with confidence in under six months.",
      portrait: "/images/sales/alumni/ogenna.png",
    },
  ],
]

/** Employers cited on fairchildinstitute.com. Logos only when provided by the team. */
export const employers = [
  { name: "Apple" },
  {
    name: "Genesys",
    logo: "/images/sales/employers/genesys.png",
  },
  {
    name: "IndiGo",
    logo: "/images/sales/employers/indigo.png",
  },
  { name: "Kathairos" },
] as const

/** @deprecated Prefer `employers` */
export const employerNames = employers.map((employer) => employer.name)

export const faqs = [
  {
    question: "What does the $500 spot lock cover?",
    answer:
      "It reserves your 2027 place. Pay $250 today and the remaining $250 before January 2027. On programs, that base fee counts toward tuition where listed.",
  },
  {
    question: "What happens after I pay on Stripe?",
    answer:
      "You get a Stripe receipt by email. FairChild follows up on onboarding, remaining schedule (if any), and next steps for your program or course.",
  },
  {
    question: "How does 1-year pricing work?",
    answer:
      "List price is $5,000. Pay in full before the end of January for $2,000 (60% off). Or take the $3,000 payment plan. You must have the $500 base fee in place before January.",
  },
  {
    question: "How does the 6-month plan work?",
    answer:
      "Normal price $3,000. One-time payment is $1,500 (base fee of $500 + balance). Payment plan is $2,000: $500 base fee + $1,500 over 6 months at $250/month.",
  },
  {
    question: "Who is Fellowship for?",
    answer:
      "Alumni who have completed a FairChild program. Fellowship is $500, includes access to last year’s programs and courses, and one Institute program next year. Each extra Institute program is $1,000. You can start with $250 and spread the rest.",
  },
  {
    question: "Can I get Financial Aid?",
    answer:
      "Create an account on the application portal, complete your profile, then open the Financial Aid menu to start your application.",
  },
] as const
