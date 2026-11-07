/**
 * Data Science Institute course pages.
 * The DSI document gives each course a one-line description in the institute outline,
 * and names the courses that prepare for each certification. Each page adds the
 * institute outcomes, projects, skills and tools that match that course. No course
 * has modules or a price in the sheet.
 */

import {
  certificationsFor,
  coursePage,
  pick,
  type CoursePageParts,
} from "@/lib/programmes/course-page"
import {
  certificationNote,
  certifications,
  outcomes,
  outlineCourses,
  projects,
  requirements,
} from "@/lib/programmes/data-science/content"
import { toolLogos } from "@/lib/programmes/shared"
import type { CoursePageContent } from "@/lib/programmes/types"

const pills = ["Beginner friendly", "100% online, self-paced"]

const [
  python,
  maths,
  statistics,
  models,
  machineLearning,
  neuralNetworks,
  prompts,
] = outcomes

const project = (title: string) =>
  pick(projects, (item) => item.title === title, `DSI project ${title}`)

const exploratory = project("Exploratory Data Analysis")

function course(id: string, parts: CoursePageParts) {
  const courseId = `data-science-${id}`
  return coursePage(
    pick(outlineCourses, (item) => item.id === courseId, `DSI course ${id}`),
    { pills, requirements },
    {
      certifications: certificationsFor(certifications, courseId),
      certificationNote,
      ...parts,
    }
  )
}

export const dataScienceCourses: Record<string, CoursePageContent> = {
  "data-science-programming-tools": course("programming-tools", {
    learn: [python],
    projects: [exploratory],
    skills: ["Python programming"],
    tools: [
      { name: "Python", logo: toolLogos.python },
      { name: "Jupyter Notebook", logo: toolLogos.jupyter },
      { name: "Git", logo: toolLogos.git },
    ],
  }),
  "data-science-maths-statistics": course("maths-statistics", {
    learn: [statistics],
    projects: [project("Statistical Experiment Report")],
    skills: ["Statistics", "Probability", "Hypothesis testing"],
  }),
  "data-science-analysis-modelling": course("analysis-modelling", {
    learn: [models],
    projects: [project("Predictive Model")],
    skills: ["Regression and classification", "Model evaluation"],
  }),
  "data-science-mathematical-foundations": course("mathematical-foundations", {
    learn: [maths],
    skills: ["Linear algebra", "Calculus"],
  }),
  "data-science-programming-data": course("programming-data", {
    learn: [python],
    projects: [exploratory],
    skills: ["Data wrangling"],
    tools: [
      { name: "Python", logo: toolLogos.python },
      { name: "pandas", logo: toolLogos.pandas },
      { name: "NumPy", logo: toolLogos.numpy },
      { name: "SQL" },
    ],
  }),
  "data-science-core-ai-ml": course("core-ai-ml", {
    learn: [machineLearning, neuralNetworks],
    projects: [project("Machine Learning Pipeline")],
    skills: ["Machine learning", "Deep learning concepts"],
    tools: [{ name: "scikit-learn", logo: toolLogos.scikitLearn }],
  }),
  // The focus areas offered are still to confirm, so nothing is matched yet.
  "data-science-advanced-topics": course("advanced-topics", {}),
  "data-science-prompt-engineering": course("prompt-engineering", {
    learn: [prompts],
    projects: [project("Capstone: AI-Powered Data Product")],
    skills: ["Prompt engineering"],
    tools: [{ name: "Large language models" }],
  }),
}
