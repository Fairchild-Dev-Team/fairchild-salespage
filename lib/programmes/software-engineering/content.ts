/**
 * Content shared by the program page and its course pages.
 * Source: "AI Software Engineering (SEI) - Program Page Content (Nov 1, 2026)".
 */

import { illustrations } from "@/lib/programmes/shared"
import type {
  ProgrammeCertification,
  ProgrammeOutlineCourse,
  ProgrammeProject,
} from "@/lib/programmes/types"

export const course = (id: string, title: string) => ({
  id: `software-engineering-${id}`,
  title,
})

export const introAi = course(
  "intro-ai",
  "Introduction to Artificial Intelligence"
)
export const softwareEngineering = course(
  "software-engineering",
  "Software Engineering"
)

/** Program learning outcomes, in document order. Course pages pick from these. */
export const outcomes = [
  "Explain how artificial intelligence and machine learning work, and where they fit in modern software.",
  "Build structured, accessible web pages with HTML.",
  "Style responsive layouts that work on phones and desktops with CSS.",
  "Write JavaScript to make pages interactive and to handle data.",
  "Apply software engineering practices: planning, version control with Git, testing and debugging.",
  "Use AI coding assistants to write, explain and review code, and check their output critically.",
  "Connect applications to APIs, including AI model APIs, to add intelligent features.",
  "Plan, build and deploy a complete web application from idea to live link.",
]

export const projects: ProgrammeProject[] = [
  {
    title: "Personal Portfolio Site",
    summary:
      "Build and publish a responsive portfolio website to showcase your work.",
    skills: ["HTML", "CSS", "Responsive design"],
  },
  {
    title: "Interactive Web App",
    summary:
      "Build a browser app, such as a budget tracker or quiz, that stores and updates data with JavaScript.",
    skills: ["JavaScript", "DOM", "Local storage"],
  },
  {
    title: "API-Powered Dashboard",
    summary:
      "Pull live data from a public API and display it in a clean, filterable interface.",
    skills: ["APIs", "Asynchronous JavaScript", "Data display"],
  },
  {
    title: "AI Feature Integration",
    summary:
      "Add an AI feature, such as a text summariser or chat assistant, to a web app using an AI model API.",
    skills: ["AI APIs", "Prompt design", "Error handling"],
  },
  {
    title: "Capstone: Full Application",
    summary:
      "Plan, build, test and deploy a complete application that solves a real problem, using Git and AI-assisted development.",
    skills: ["Software engineering", "Git", "Testing", "Deployment"],
  },
]

export const outlineCourses: ProgrammeOutlineCourse[] = [
  {
    ...introAi,
    priceUsd: 2000,
    summary:
      "How AI and machine learning work, what they can and cannot do, and how to use AI tools and model APIs responsibly in software.",
  },
  {
    ...softwareEngineering,
    priceUsd: 2000,
    summary:
      "Planning, version control, testing, debugging and deployment, with AI-assisted development throughout.",
  },
  {
    ...course("html-css", "HTML & CSS"),
    priceUsd: 750,
    summary:
      "Structure and style web pages, with responsive layouts and accessibility basics.",
  },
  {
    ...course("javascript", "JavaScript"),
    priceUsd: 750,
    summary:
      "Programming fundamentals, interactive pages, working with data and calling APIs.",
  },
]

export const certifications: ProgrammeCertification[] = [
  {
    name: "Microsoft Certified: Azure AI Fundamentals (exam AI-901)",
    body: "Microsoft",
    preparedIn: [introAi],
  },
  {
    name: "GitHub Foundations",
    body: "GitHub",
    preparedIn: [softwareEngineering],
  },
  {
    name: "GitHub Copilot",
    body: "GitHub",
    preparedIn: [softwareEngineering, introAi],
  },
]

export const certificationNote =
  "In software development, employers weigh a strong project portfolio more heavily than certifications. These exams add credibility on top of it."

export const requirements = {
  heading: "Prerequisites and requirements",
  items: [
    {
      title: "Prior experience",
      body: "None. No coding background is needed. Basic computer skills, such as managing files and installing software, are enough to start.",
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
