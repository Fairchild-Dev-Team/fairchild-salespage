import type {
  CoursePageContent,
  ProgrammeCertification,
  ProgrammeOutlineCourse,
  ProgrammeProject,
  ProgrammeTool,
} from "@/lib/programmes/types"
import type { IllustratedPoint } from "@/components/sales/programme-foundations"

export type CoursePageParts = {
  learn?: string[]
  projects?: ProgrammeProject[]
  skills?: string[]
  tools?: ProgrammeTool[]
  certifications?: ProgrammeCertification[]
  certificationNote?: string
}

/** Finds an item by title or id and fails loudly, so a typo can't drop a section. */
export function pick<T>(
  items: T[],
  match: (item: T) => boolean,
  label: string
): T {
  const found = items.find(match)
  if (!found) throw new Error(`Unknown ${label}`)
  return found
}

/** Certifications whose "Prepared in" list names this course, as the program document maps them. */
export function certificationsFor(
  certifications: ProgrammeCertification[],
  courseId: string
) {
  return certifications.filter((item) =>
    item.preparedIn.some((course) => course.id === courseId)
  )
}

function projectsIntro(projects: ProgrammeProject[]) {
  if (projects.length > 1) {
    return `This course feeds ${projects.length} of the program's portfolio pieces.`
  }
  const [only] = projects
  return only.title.startsWith("Capstone")
    ? "This course feeds the program's capstone portfolio piece."
    : `This course feeds the program's ${only.title} portfolio piece.`
}

/**
 * Builds a course page from a program document: the course's outline description,
 * plus the program outcomes, projects, skills, tools and certifications that match it.
 */
export function coursePage(
  course: ProgrammeOutlineCourse,
  shared: {
    pills: string[]
    requirements: { heading: string; items: IllustratedPoint[] }
  },
  parts: CoursePageParts
): CoursePageContent {
  const certifications = parts.certifications ?? []
  return {
    summary: course.summary,
    pills: shared.pills,
    learn: parts.learn?.length
      ? { heading: "What you will learn", items: parts.learn }
      : undefined,
    build: parts.projects?.length
      ? {
          heading: "What you will build",
          intro: projectsIntro(parts.projects),
          projects: parts.projects,
        }
      : undefined,
    skills:
      parts.skills?.length || parts.tools?.length
        ? {
            heading: "Skills you'll learn",
            skills: parts.skills ?? [],
            tools: parts.tools,
          }
        : undefined,
    certifications: certifications.length
      ? {
          heading: "Certification pathway",
          intro:
            certifications.length === 1
              ? "This course prepares fellows for this industry certification. Exams are taken with the certifying body, and exam fees are paid separately."
              : "This course prepares fellows for these industry certifications. Exams are taken with the certifying body, and exam fees are paid separately.",
          note: parts.certificationNote,
          certifications,
        }
      : undefined,
    requirements: shared.requirements,
  }
}
