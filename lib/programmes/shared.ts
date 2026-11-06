/** unDraw illustrations reused across program and course pages. */
export const illustrations = {
  experience: "/images/sales/path/skill.svg",
  language: "/images/sales/path/interview.svg",
  equipment: "/images/sales/details/train.svg",
  time: "/images/sales/details/lock.svg",
  practice: "/images/sales/path/practice.svg",
  choose: "/images/sales/details/choose.svg",
  community: "/images/sales/path/offer.svg",
  proof: "/images/sales/path/proof.svg",
  pay: "/images/sales/details/pay.svg",
}

/** Brand marks from Simple Icons, saved locally. */
export const toolLogos = {
  salesforce: "/images/programme/tools/salesforce.svg",
  azureDevOps: "/images/programme/tools/azuredevops.svg",
  excel: "/images/programme/tools/microsoftexcel.svg",
  figma: "/images/programme/tools/figma.svg",
  miro: "/images/programme/tools/miro.svg",
  hubspot: "/images/programme/tools/hubspot.svg",
  html: "/images/programme/tools/html5.svg",
  css: "/images/programme/tools/css3.svg",
  javascript: "/images/programme/tools/javascript.svg",
  git: "/images/programme/tools/git.svg",
  github: "/images/programme/tools/github.svg",
  wireshark: "/images/programme/tools/wireshark.svg",
  linux: "/images/programme/tools/linux.svg",
  python: "/images/programme/tools/python.svg",
  pandas: "/images/programme/tools/pandas.svg",
  r: "/images/programme/tools/r.svg",
  jupyter: "/images/programme/tools/jupyter.svg",
  numpy: "/images/programme/tools/numpy.svg",
  scikitLearn: "/images/programme/tools/scikitlearn.svg",
  snowflake: "/images/programme/tools/snowflake.svg",
  databricks: "/images/programme/tools/databricks.svg",
  aws: "/images/programme/tools/amazonwebservices.svg",
  tableau: "/images/programme/tools/tableau.svg",
  mulesoft: "/images/programme/tools/mulesoft.svg",
  maze: "/images/programme/tools/maze.svg",
}

/**
 * FAQ shown on every program and course page.
 * Worded to fit any program, per the CRM review note on the shared FAQ.
 */
export const fairchildFaq = {
  heading: "FAQ",
  items: [
    {
      question: "Do I need a technical background?",
      answer:
        "No. Every program starts with the basics and builds up step by step.",
    },
    {
      question: "What is the difference between the 6-month and 12-month pace?",
      answer:
        "Where a program offers both, the content is the same. The 6-month pace needs more study hours each week; the 12-month pace suits people working full time.",
    },
    {
      question: "Can I take a single course instead of the full program?",
      // Not every program saves money as a bundle (Cybersecurity costs more), so no saving claim.
      answer: "Yes. Each course can be bought on its own.",
    },
    {
      question: "Are classes live?",
      answer:
        "Yes. Classes are held live online, and you can also take them self-paced.",
    },
    {
      question: "Will I get a certificate?",
      answer:
        "Yes. Fellows receive a FairChild certificate of completion. Industry certification exams are booked with the certifying body.",
    },
    {
      question: "Does the program include job placement?",
      answer:
        "The program builds job-ready skills and a portfolio. Interview preparation and career coaching are available through Guided Mentorship & Career Development or the FairChild Fellowship.",
    },
  ],
}

/** The sale countdown runs to the end of 31 December 2026, Lagos time. */
export const SALE_ENDS_AT = "2026-12-31T23:59:59+01:00"

/**
 * Program offer prices, paid in full. Every program is the same; these match the
 * full-payment terms checkout charges (DEFAULT_PROGRAMME_TERMS in lib/checkout.ts).
 */
export const PROGRAMME_OFFERS = [
  { months: 12, label: "1 year", offerUsd: 2000, listUsd: 5000 },
  { months: 6, label: "6 months", offerUsd: 1500, listUsd: 3000 },
] as const

/** The offers a program's documented length allows; no length means both. */
export function programmeOffers(duration: string | null) {
  return PROGRAMME_OFFERS.filter(
    (offer) =>
      !duration ||
      !/\b(6|12)\b/.test(duration) ||
      new RegExp(`\\b${offer.months}\\b`).test(duration)
  )
}

/** Every course sells at this price on the current offer. */
export const COURSE_OFFER_USD = 500

/** Paid today to secure a course spot; the rest is due before the class starts. */
export const COURSE_DEPOSIT_USD = 250

/**
 * A course's offer: $500, with the sheet price struck through when it is higher.
 * Courses already at $500 (or unpriced) get no strike and no discount.
 */
export function courseOffer(listUsd: number | null) {
  const struckUsd =
    listUsd != null && listUsd > COURSE_OFFER_USD ? listUsd : null
  return {
    offerUsd: COURSE_OFFER_USD,
    struckUsd,
    percentOff:
      struckUsd != null
        ? Math.round((1 - COURSE_OFFER_USD / struckUsd) * 100)
        : null,
  }
}

/** "What's included" in the program pricing box. [confirm] */
export const programmeIncludes = (courseCount: number) => [
  `All ${courseCount} courses in the program`,
  "Real-world projects for your portfolio",
  "Verifiable certificate of completion",
  "Preparation for industry certifications",
  "Fully online and self-paced, through the FairChild learning portal",
  "Access to the fellows community",
]

/** "What's included" in the course pricing box. [confirm] */
export const courseIncludes = [
  "The full course on the FairChild learning portal",
  "Real-world projects for your portfolio",
  "Verifiable certificate of completion",
  "Fully online and self-paced",
]
