import type { CourseModule } from "@/components/sales/course-modules"
import type { ProgrammeAudienceItem } from "@/components/sales/programme-audience"
import type { IllustratedPoint } from "@/components/sales/programme-foundations"
import type { ProgrammeOutcome } from "@/components/sales/programme-outcomes"
import type { RelatedProgramme } from "@/components/sales/programme-related"

export type ProgrammeProject = {
  title: string
  summary: string
  skills: string[]
}

export type ProgrammeTool = { name: string; logo?: string }

export type ProgrammeCertification = {
  name: string
  body: string
  /** Defaults to "Prepared in", for example "Earned through". */
  preparedInLabel?: string
  /** Catalogue course ids and titles. Leave out the id for plain text. */
  preparedIn: { id?: string; title: string }[]
}

export type ProgrammeOutlineCourse = {
  /** Catalogue course id, used for the course link. Leave out for modules. */
  id?: string
  title: string
  priceUsd: number | null
  summary: string
}

export type ProgrammeHeroContent = {
  pills: string[]
  headline: string
  summary: string
  /** Rows in the hero card, under "Program outline". */
  facts: { label: string; value: string }[]
  /** Line under Enroll Now. */
  priceNote?: string
  /** Button label, when not "Enroll Now". */
  ctaLabel?: string
  /** Heading over the facts, when not "Program outline". */
  cardLabel?: string
  /** Label over the price, when not "Full program". */
  priceLabel?: string
}

/**
 * Copy for one course page. Sections left out are not shown.
 * Title, price and position in the program come from the catalogue.
 */
export type CoursePageContent = {
  summary: string
  pills: string[]
  learn?: { heading: string; items: string[] }
  modules?: {
    heading: string
    intro?: string
    modules: CourseModule[]
    throughline?: string
    note?: string
  }
  build?: { heading: string; intro?: string; projects: ProgrammeProject[] }
  skills?: { heading: string; skills: string[]; tools?: ProgrammeTool[] }
  certifications?: {
    heading: string
    intro: string
    note?: string
    certifications: ProgrammeCertification[]
  }
  requirements?: { heading: string; items: IllustratedPoint[] }
}

/**
 * Copy for one program or product page, from its "Program Page Content" document.
 * Title and full price come from the catalogue. Sections left out are not shown.
 * How learning works, instructors and the FAQ are shared and always shown.
 */
export type ProgrammePageContent = {
  /** Catalogue programme or product id. */
  id: string
  hero: ProgrammeHeroContent
  audience?: {
    heading: string
    audiences: ProgrammeAudienceItem[]
    note?: string
  }
  learn?: { heading: string; items: string[] }
  build?: { heading: string; intro?: string; projects: ProgrammeProject[] }
  skills?: { heading: string; skills: string[]; tools?: ProgrammeTool[] }
  outline?: {
    heading: string
    intro?: string
    facts?: { value: string; label: string }[]
    courses: ProgrammeOutlineCourse[]
    tone?: "pink" | "white"
  }
  /** Numbered steps, such as "How it works". */
  steps?: {
    heading: string
    intro?: string
    steps: { title: string; body: string }[]
  }
  /** Program cards to pick from, such as "Choose your program". */
  choose?: { heading: string; intro?: string; programmes: RelatedProgramme[] }
  certifications?: {
    heading: string
    intro: string
    note?: string
    certifications: ProgrammeCertification[]
  }
  requirements?: { heading: string; items: IllustratedPoint[] }
  /** Icon cards on a dark band, such as "For parents" or "What is included". */
  highlights?: {
    heading: string
    intro?: string
    items: ProgrammeAudienceItem[]
  }
  outcomes?: {
    heading: string
    intro: string
    roles?: ProgrammeOutcome[]
    note?: string
  }
  /** Shared items that do not fit this audience, matched by title or question. */
  hideShared?: { learning?: string[]; faq?: string[] }
  related?: { heading: string; programmes: RelatedProgramme[] }
  /** Course pages for this program, keyed by catalogue course id. */
  courses?: Record<string, CoursePageContent>
}
