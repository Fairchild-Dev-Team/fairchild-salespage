import { businessInnovation } from "@/lib/programmes/business-innovation"
import { crm } from "@/lib/programmes/crm"
import { marketingTechnology } from "@/lib/programmes/marketing-technology"
import { softwareEngineeringInstitute } from "@/lib/programmes/software-engineering"
import { codeTheFuture } from "@/lib/programmes/code-the-future"
import { uiUx } from "@/lib/programmes/ui-ux"
import { projectPlanning } from "@/lib/programmes/project-planning"
import { dataAnalysis } from "@/lib/programmes/data-analysis"
import { dataScience } from "@/lib/programmes/data-science"
import { cybersecurity } from "@/lib/programmes/cybersecurity"
import { fellowship } from "@/lib/programmes/fellowship"
import { guidedMentorship } from "@/lib/programmes/guided-mentorship"
import type {
  CoursePageContent,
  ProgrammePageContent,
} from "@/lib/programmes/types"

const programmePages: ProgrammePageContent[] = [
  businessInnovation,
  crm,
  marketingTechnology,
  softwareEngineeringInstitute,
  codeTheFuture,
  uiUx,
  projectPlanning,
  dataAnalysis,
  dataScience,
  cybersecurity,
  fellowship,
  guidedMentorship,
]

const programmePageById = new Map(programmePages.map((page) => [page.id, page]))

export function getProgrammePage(id: string): ProgrammePageContent | undefined {
  return programmePageById.get(id)
}

export function getCoursePage(id: string): CoursePageContent | undefined {
  for (const page of programmePages) {
    const course = page.courses?.[id]
    if (course) return course
  }
  return undefined
}
