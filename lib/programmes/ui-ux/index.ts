/**
 * UI/UX Design Institute.
 * Source: "UI UX Design Institute (UDI) - Program Page Content" (Nov 1, 2026).
 * The sheet has no individual course prices, so the hero has no "from" price.
 */

import {
  Brush,
  Code,
  LayoutTemplate,
  MonitorSmartphone,
  MousePointerClick,
  PenTool,
  Route,
  Search,
  Smartphone,
} from "lucide-react"

import {
  certificationNote,
  certifications,
  outcomes,
  outlineCourses,
  projects,
  requirements,
} from "@/lib/programmes/ui-ux/content"
import { uiUxCourses } from "@/lib/programmes/ui-ux/courses"
import { toolLogos } from "@/lib/programmes/shared"
import type { ProgrammePageContent } from "@/lib/programmes/types"

export const uiUx: ProgrammePageContent = {
  id: "ui-ux",
  hero: {
    pills: ["12 months", "Beginner friendly"],
    headline: "Design digital products people love to use.",
    summary:
      "Learn user research, wireframing, visual design and prototyping in Figma, with AI built into your design process, and finish with a portfolio ready for hiring managers.",
    facts: [
      { label: "Courses", value: "10" },
      { label: "Format", value: "100% online, self-paced" },
    ],
  },
  audience: {
    heading: "Who this program is for",
    audiences: [
      {
        title: "Career changers",
        body: "From teaching, customer service, marketing, retail or administration who want a creative, user-focused role in technology.",
        icon: Route,
      },
      {
        title: "Creatives moving into digital",
        body: "Graphic designers, illustrators and content creators who want to design apps and websites, not just visuals.",
        icon: Brush,
      },
      {
        title: "Tech-adjacent professionals",
        body: "Developers, business analysts, testers and product people who want to understand users and design better products.",
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
      "Design thinking",
      "User research",
      "Personas and journey mapping",
      "Information architecture",
      "Wireframing",
      "Visual design",
      "Typography and colour",
      "Accessibility",
      "Design systems",
      "Responsive design",
      "Prototyping",
      "Usability testing",
      "Product thinking",
      "Design presentation",
    ],
    tools: [
      { name: "Figma", logo: toolLogos.figma },
      { name: "FigJam" },
      { name: "Miro", logo: toolLogos.miro },
      { name: "AI design assistants" },
      { name: "Maze", logo: toolLogos.maze },
    ],
  },
  outline: {
    heading: "Program outline",
    facts: [
      { value: "10", label: "courses" },
      { value: "5", label: "projects" },
      { value: "12", label: "months" },
    ],
    courses: outlineCourses,
  },
  certifications: {
    heading: "Certification pathway",
    intro:
      "UX design has no single industry exam that employers expect. Hiring managers judge designers mainly on their portfolio, so the program is built around five portfolio projects and a capstone case study.",
    note: certificationNote,
    certifications,
  },
  requirements,
  outcomes: {
    heading: "Career outcomes",
    intro: "Graduates are prepared to apply for roles such as:",
    roles: [
      { title: "UX Designer", icon: PenTool },
      { title: "UI Designer", icon: LayoutTemplate },
      { title: "Product Designer (junior)", icon: Smartphone },
      { title: "UX Researcher (junior)", icon: Search },
      { title: "Interaction Designer", icon: MousePointerClick },
      { title: "Web Designer", icon: MonitorSmartphone },
    ],
  },
  related: {
    heading: "Related programs",
    programmes: [
      {
        title: "Software Engineering Institute",
        body: "Learn to build the interfaces you design with HTML, CSS and JavaScript.",
        href: "/catalogue/programme/software-engineering",
      },
      {
        title: "Business Innovation Institute",
        body: "Add business analysis and product development to your design skills.",
        href: "/catalogue/programme/business-innovation",
      },
      {
        title: "Data Analysis Institute",
        body: "Use data to measure how users behave and test design decisions.",
        href: "/catalogue/programme/data-analysis",
      },
      {
        title: "Project Planning Institute",
        body: "Learn to plan and run design projects from kickoff to launch.",
        href: "/catalogue/programme/project-planning",
      },
    ],
  },
  courses: uiUxCourses,
}
