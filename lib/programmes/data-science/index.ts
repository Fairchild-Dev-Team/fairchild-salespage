/**
 * Data Science Institute.
 * Source: "Data Science Institute (DSI) - Institute Page Content" (Nov 1, 2026).
 * No individual course prices yet, so the hero has no "from" price.
 */

import {
  BarChart3,
  Bot,
  BrainCircuit,
  Calculator,
  Code,
  Cpu,
  LineChart,
  MessageSquareText,
} from "lucide-react"

import {
  certificationNote,
  certifications,
  outcomes,
  outlineCourses,
  projects,
  requirements,
} from "@/lib/programmes/data-science/content"
import { dataScienceCourses } from "@/lib/programmes/data-science/courses"
import { toolLogos } from "@/lib/programmes/shared"
import type { ProgrammePageContent } from "@/lib/programmes/types"

export const dataScience: ProgrammePageContent = {
  id: "data-science",
  hero: {
    pills: ["12 months", "Beginner friendly"],
    headline: "Build models that predict, classify and power AI.",
    summary:
      "Learn the programming, maths and statistics behind data science, then move into machine learning, AI and prompt engineering with real projects.",
    facts: [
      { label: "Courses", value: "8" },
      { label: "Format", value: "100% online, self-paced" },
    ],
  },
  audience: {
    heading: "Who this institute is for",
    audiences: [
      {
        title: "Career changers with a numbers background",
        body: "From finance, engineering, science, teaching maths or research who want to move into data science and AI.",
        icon: Calculator,
      },
      {
        title: "Data analysts ready to level up",
        body: "Analysts who know Excel, SQL or Power BI and want to build predictive models and machine learning systems.",
        icon: LineChart,
      },
      {
        title: "Developers moving into AI",
        body: "Programmers who want the statistics, modelling and machine learning skills behind modern AI products.",
        icon: Code,
      },
    ],
  },
  learn: {
    heading: "What you will learn",
    items: outcomes,
  },
  build: {
    heading: "What you will build",
    intro: "Fellows finish with five portfolio pieces they can show employers.",
    projects,
  },
  skills: {
    heading: "Skills you'll learn",
    skills: [
      "Python programming",
      "Data wrangling",
      "Linear algebra",
      "Calculus",
      "Probability",
      "Statistics",
      "Hypothesis testing",
      "Regression and classification",
      "Machine learning",
      "Deep learning concepts",
      "Model evaluation",
      "Prompt engineering",
      "Communicating results",
    ],
    tools: [
      { name: "Python", logo: toolLogos.python },
      { name: "Jupyter Notebook", logo: toolLogos.jupyter },
      { name: "pandas", logo: toolLogos.pandas },
      { name: "NumPy", logo: toolLogos.numpy },
      { name: "Matplotlib" },
      { name: "scikit-learn", logo: toolLogos.scikitLearn },
      { name: "SQL" },
      { name: "Git", logo: toolLogos.git },
      { name: "Large language models" },
    ],
  },
  outline: {
    heading: "Institute outline",
    facts: [
      { value: "8", label: "courses" },
      { value: "5", label: "projects" },
      { value: "12", label: "months" },
    ],
    // Sheet order. The document suggests a learning order to confirm.
    courses: outlineCourses,
  },
  certifications: {
    heading: "Certification pathway",
    intro:
      "The institute prepares fellows for these industry certifications. Exams are taken with the certifying body, and exam fees are paid separately.",
    note: certificationNote,
    certifications,
  },
  requirements,
  outcomes: {
    heading: "Career outcomes",
    intro: "Graduates are prepared to apply for roles such as:",
    roles: [
      { title: "Junior Data Scientist", icon: BrainCircuit },
      { title: "Machine Learning Engineer (junior)", icon: Cpu },
      { title: "AI Analyst", icon: Bot },
      { title: "Data Analyst", icon: BarChart3 },
      { title: "Business Intelligence Analyst", icon: LineChart },
      { title: "Prompt Engineer", icon: MessageSquareText },
    ],
  },
  related: {
    heading: "Related institutes",
    programmes: [
      {
        title: "Data Analysis Institute",
        body: "Build a strong base in Excel, SQL and Power BI first.",
        href: "/catalogue/programme/data-analysis",
      },
      {
        title: "Software Engineering Institute",
        body: "Add web development to put your models into applications.",
        href: "/catalogue/programme/software-engineering",
      },
      {
        title: "Marketing Technology Institute",
        body: "Apply data science to customer data and personalisation.",
        href: "/catalogue/programme/marketing-technology",
      },
      {
        title: "IT Cybersecurity Institute",
        body: "Combine data skills with security analysis.",
        href: "/catalogue/programme/cybersecurity",
      },
    ],
  },
  courses: dataScienceCourses,
}
