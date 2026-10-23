export const salesHero = {
  announcement: "2027 Open Enrollment",
  headlineLines: ["Go beyond job ready.", "Build a life-changing career."],
  support:
    "Smaller cohorts, practitioner mentors, and interview prep that stays with you until the offer — then lock your 2027 spot with $250.",
  proofLine: "40 job offers landed in 15 months · $120k avg. starting salary",
  primaryCta: "Lock my spot — $250",
  secondaryCta: "Compare programmes",
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
  body: "On LinkedIn, FairChild shared a cybersecurity cohort story: twenty signed job offers from a programme that opened in June 2025 — new titles and new tax brackets, not enrolment vanity metrics.",
  href: "https://www.linkedin.com/posts/fairchildinstitute_cybersecurity-grc-itaudit-activity-7496867033498832896-VW9w",
  linkLabel: "Read the LinkedIn post",
} as const

export const problem = {
  title: "You already know the feeling",
  body: [
    "Tabs full of tutorials. Certificates that never come up in interviews. Applications that go quiet for weeks.",
    "You are not lazy. The path you were sold was built for completion rates — not for a hire.",
  ],
} as const

export const falseBeliefs = [
  {
    belief: "One more certificate will tip the scale",
    truth: "Hiring managers buy proof you can do the job under pressure — not another PDF badge.",
  },
  {
    belief: "If I binge enough content, it will click",
    truth: "Careers are sequenced. Random learning keeps you busy and still unhireable.",
  },
  {
    belief: "I just need more discipline alone",
    truth: "Serious transitions need mentors who have sat on both sides of the interview table.",
  },
] as const

export const epiphany = {
  title: "What actually gets you hired",
  lead: "FairChild builds careers in a specific order — skill, practice, proof, interview, offer.",
  steps: [
    "Structured skill — learn in the right sequence, not random playlists",
    "Mentored practice — practitioners, not slideshow teachers",
    "Portfolio proof — work recruiters can respect and ask about",
    "Interview mastery — resume, LinkedIn, mocks, negotiation",
    "The offer — support that stays until you are in the seat",
  ],
} as const

export const howItWorks = [
  {
    step: "01",
    title: "Choose your path",
    body: "1-year programme, 6-month track, standalone course, Interview Prep, or Fellowship if you are alumni.",
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
  body: "Lock a 2027 spot for $250 today. Choose your programme next — tuition options are on each page.",
  primaryCta: "Choose a programme",
  secondaryCta: "See pricing",
} as const

export const pricingOverview = {
  title: "Clear pricing. No surprise math.",
  baseFee:
    "Every course and programme spot locks with a $500 base fee: $250 now + $250 before January 2027.",
  rows: [
    {
      name: "1-Year Programme",
      normal: "$5,000",
      highlight: "Best savings" as string | undefined,
      options: "Full pay by end of January: $2,000 · Plan: $3,000",
      href: "/products/data-analysis-business-intelligence",
    },
    {
      name: "6-Month Programme",
      normal: "$3,000",
      highlight: "Fastest path" as string | undefined,
      options: "One-time: $1,250 · Plan: $2,000 ($500 + $250/mo × 6)",
      href: "/products/six-month-programme",
    },
    {
      name: "Standalone Course",
      normal: "$500",
      highlight: undefined as string | undefined,
      options: "Pay in full or lock with $250",
      href: "/products/standalone-course",
    },
    {
      name: "Interview Prep",
      normal: "$500",
      highlight: undefined as string | undefined,
      options: "Pay in full or lock with $250",
      href: "/products/interview-prep",
    },
    {
      name: "Fellowship (Alumni)",
      normal: "$500",
      highlight: undefined as string | undefined,
      options: "$250 to start · Extra Institute programme $1,000",
      href: "/products/fellowship",
    },
  ],
} as const

export const fellowshipBlurb = {
  title: "Fellowship — for alumni who are not done learning",
  body: "Already completed a FairChild programme? Fellowship gives you last year’s programmes and courses, plus one Institute programme for next year. Extra Institute programmes are $1,000 each. Start with $250 and spread the rest.",
} as const

export const financialAid = {
  title: "West Africa Financial Aid",
  body: "If you are in West Africa and standard payment is out of reach, apply for Financial Aid. FairChild reviews applications individually and follows up by email.",
  email: "info@fairchildinstitute.com",
} as const

/** Vimeo embeds live on fairchildinstitute.com programme storytelling. */
export const testimonialVideos = [
  {
    vimeoId: "1203229291",
    name: "Samson Bavo",
    role: "Salesforce Administrator · Class of 2025",
    caption:
      "From retail to a role his family can be proud of — Samson’s FairChild story.",
  },
  {
    vimeoId: "1203229292",
    name: "Swati Soni",
    role: "Senior Salesforce Developer · Class of 2025",
    caption:
      "Six figures later — Swati on the skills that stuck and starting sooner.",
  },
] as const

/** Featured quotes near CTAs — keep the set short for scannability. */
export const testimonials = [
  {
    name: "Swati Soni",
    role: "Senior Salesforce Developer · Class of 2025",
    quote:
      "FairChild gave me the starting point professionals get 20 years into their careers.",
  },
  {
    name: "Adewale Banjo",
    role: "Salesforce Administrator · Class of 2025",
    quote:
      "Day 4 in my new Salesforce Admin role still feels unreal. I used to work at a contact centre — I always knew I didn’t belong there.",
  },
  {
    name: "Samson Bavo",
    role: "Salesforce Administrator · Class of 2025",
    quote:
      "FairChild didn’t just help me find a job. You helped a father find work that his family can be proud of.",
  },
] as const

export const moreTestimonials = [
  {
    name: "Juliet Anyanwu",
    role: "Salesforce Administrator · Class of 2025",
    quote:
      "I applied everything from HR prep to one-on-one interview sessions. Interviewers were impressed by how much I knew about their organisation.",
  },
  {
    name: "Ogenna Odebatu",
    role: "Senior Business Consultant · Class of 2025",
    quote:
      "Six months in, I am an improved version of myself — even after landing a six-figure role.",
  },
  {
    name: "Vicky Agu",
    role: "Senior Business Analyst · Class of 2025",
    quote:
      "FairChild interview preparation helped me land a role I only dreamed about.",
  },
] as const

/** Employer names cited on fairchildinstitute.com — text lockup, no fabricated logos. */
export const employerNames = ["Apple", "Genesys", "IndiGo", "Kathairos"] as const

export const faqs = [
  {
    question: "What does the $500 spot lock cover?",
    answer:
      "It reserves your 2027 place. Pay $250 today and the remaining $250 before January 2027. On programmes, that base fee counts toward tuition where listed.",
  },
  {
    question: "What happens after I pay on Stripe?",
    answer:
      "You get a Stripe receipt by email. FairChild follows up on onboarding, remaining schedule (if any), and next steps for your programme or course.",
  },
  {
    question: "How does 1-year pricing work?",
    answer:
      "List price is $5,000. Pay in full before the end of January for $2,000 (60% off). Or take the $3,000 payment plan. You must have the $500 base fee in place before January.",
  },
  {
    question: "How does the 6-month plan work?",
    answer:
      "Normal price $3,000. One-time payment is $1,250 (base fee of $500 + balance). Payment plan is $2,000: $500 base fee + $1,500 over 6 months at $250/month.",
  },
  {
    question: "Who is Fellowship for?",
    answer:
      "Alumni who have completed a FairChild programme. Fellowship is $500, includes access to last year’s programmes and courses, and one Institute programme next year. Each extra Institute programme is $1,000. You can start with $250 and spread the rest.",
  },
  {
    question: "Can I get Financial Aid?",
    answer:
      "West African applicants who cannot afford standard payment can apply for Financial Aid. Email info@fairchildinstitute.com to start.",
  },
] as const
