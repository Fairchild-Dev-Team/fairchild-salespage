/**
 * Software Engineering Institute.
 * Source: "AI Software Engineering (SEI) - Program Page Content" (Nov 1, 2026).
 */

import {
  BookOpen,
  Bot,
  Bug,
  Code,
  Headset,
  LayoutTemplate,
  MonitorSmartphone,
  Route,
  Wrench,
} from "lucide-react"

import {
  certificationNote,
  certifications,
  outcomes,
  outlineCourses,
  projects,
  requirements,
} from "@/lib/programmes/software-engineering/content"
import { softwareEngineeringCourses } from "@/lib/programmes/software-engineering/courses"
import { toolLogos } from "@/lib/programmes/shared"
import type { ProgrammePageContent } from "@/lib/programmes/types"

export const softwareEngineeringInstitute: ProgrammePageContent = {
  id: "software-engineering",
  hero: {
    // The sheet gives no duration for SEI; the document uses 6 or 12 months to match BII.
    pills: ["6 or 12 months", "Beginner friendly"],
    headline: "Learn to build software, and to build it with AI.",
    summary:
      "Go from your first web page to working applications, with artificial intelligence built into how you design, code and ship.",
    facts: [
      { label: "Courses", value: "4" },
      { label: "Format", value: "100% online, self-paced" },
    ],
    priceNote: "or take individual courses from $750.",
  },
  audience: {
    heading: "Who this program is for",
    audiences: [
      {
        title: "Career changers",
        body: "From any field who want a structured route into software development, starting from zero.",
        icon: Route,
      },
      {
        title: "Self-taught beginners",
        body: "People who have tried tutorials on their own and want a clear path, real projects and a portfolio.",
        icon: BookOpen,
      },
      {
        title: "Tech-adjacent professionals",
        body: "Analysts, testers, designers and CRM admins who want to write code and use AI tools to build applications.",
        icon: Wrench,
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
      "Web development",
      "Responsive design",
      "JavaScript programming",
      "Software engineering practices",
      "Version control",
      "Testing and debugging",
      "API integration",
      "AI fundamentals",
      "Machine learning concepts",
      "AI-assisted coding",
      "Prompt design",
      "Deployment",
    ],
    tools: [
      { name: "HTML", logo: toolLogos.html },
      { name: "CSS", logo: toolLogos.css },
      { name: "JavaScript", logo: toolLogos.javascript },
      { name: "Git", logo: toolLogos.git },
      { name: "GitHub", logo: toolLogos.github },
      { name: "Visual Studio Code" },
      { name: "Browser developer tools" },
      { name: "AI coding assistants" },
      { name: "AI model APIs" },
    ],
  },
  outline: {
    heading: "Program outline",
    facts: [
      { value: "4", label: "courses" },
      { value: "5", label: "projects" },
      { value: "6 or 12", label: "months" },
    ],
    // Sheet order. The document asks whether HTML & CSS should come first [confirm].
    courses: outlineCourses,
  },
  certifications: {
    heading: "Certification pathway",
    intro:
      "The program prepares fellows for these industry certifications. Exams are taken with the certifying body, and exam fees are paid separately.",
    note: certificationNote,
    certifications,
  },
  requirements,
  outcomes: {
    heading: "Career outcomes",
    intro: "Graduates are prepared to apply for roles such as:",
    roles: [
      { title: "Junior Software Developer", icon: Code },
      { title: "Front-End Developer", icon: LayoutTemplate },
      { title: "Junior Web Developer", icon: MonitorSmartphone },
      { title: "AI Application Developer (junior)", icon: Bot },
      { title: "QA Automation Tester", icon: Bug },
      { title: "Technical Support Engineer", icon: Headset },
    ],
  },
  related: {
    heading: "Related programs",
    programmes: [
      {
        title: "UI/UX Design Institute",
        body: "Design the interfaces you build, from wireframes to prototypes.",
        href: "/catalogue/programme/ui-ux",
      },
      {
        title: "Data Science Institute",
        body: "Go deeper into machine learning, statistics and AI models.",
        href: "/catalogue/programme/data-science",
      },
      {
        title: "CRM Institute",
        body: "Apply your coding skills to Salesforce development with Apex and Lightning Web Components.",
        href: "/catalogue/programme/crm",
      },
      {
        title: "Code the Future Institute",
        body: "AI-powered web design for teens.",
        href: "/catalogue/programme/code-the-future",
      },
    ],
  },
  courses: softwareEngineeringCourses,
}
