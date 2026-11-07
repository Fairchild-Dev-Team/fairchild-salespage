/**
 * Code the Future Institute (teens).
 * Source: "Code the Future Institute - Institute Page Content" (Nov 1, 2026).
 * Price, duration and age range are not in the sheet yet [confirm].
 */

import {
  Award,
  Bot,
  Code,
  FolderOpen,
  GraduationCap,
  Gamepad2,
  Palette,
  ShieldCheck,
  UserCheck,
  BarChart3,
  Users,
} from "lucide-react"

import { illustrations, toolLogos } from "@/lib/programmes/shared"
import type { ProgrammePageContent } from "@/lib/programmes/types"

export const codeTheFuture: ProgrammePageContent = {
  id: "code-the-future",
  hero: {
    pills: ["Ages 13 to 17", "No experience needed"],
    headline: "Give your teen a head start in technology.",
    summary:
      "In AI-Powered Web Design for Teens, young learners design and build real websites, and learn to use AI tools safely and creatively along the way.",
    facts: [
      { label: "Courses", value: "1" },
      { label: "Modules", value: "6" },
      { label: "Format", value: "100% online, self-paced" },
    ],
    ctaLabel: "Enroll Your Teen",
  },
  audience: {
    heading: "Who this institute is for",
    audiences: [
      {
        title: "Curious beginners",
        body: "Teens who enjoy games, apps or social media and want to learn how websites are actually made.",
        icon: Gamepad2,
      },
      {
        title: "Creative teens",
        body: "Young people who like drawing, design, writing or music and want a place online to show their work.",
        icon: Palette,
      },
      {
        title: "Parents planning ahead",
        body: "Parents who want their child to build practical technology skills and use AI responsibly, not just consume it.",
        icon: Users,
      },
    ],
  },
  learn: {
    heading: "What your teen will learn",
    items: [
      "Understand how websites work, from browsers to web addresses.",
      "Plan a website: choose a purpose, an audience and a simple page structure.",
      "Apply basic design principles: layout, colour, fonts and images.",
      "Build web pages with HTML and style them with CSS.",
      "Add simple interactive features with beginner JavaScript.",
      "Use AI tools to brainstorm ideas, draft text and fix code, and check that the results are correct.",
      "Stay safe online: protect personal information, respect copyright and use AI responsibly.",
      "Publish a website and present it with confidence.",
    ],
  },
  build: {
    heading: "What your teen will build",
    intro:
      "Teens finish with four projects they can share with family, friends and future schools.",
    projects: [
      {
        title: "All About Me Page",
        summary:
          "Build a first web page about a hobby or interest, without sharing personal details.",
        skills: ["HTML basics", "Page structure"],
      },
      {
        title: "Styled Fan or Hobby Site",
        summary:
          "Turn the first page into a multi-page site with colours, fonts and layout.",
        skills: ["CSS", "Design principles"],
      },
      {
        title: "Interactive Feature",
        summary: "Add a quiz, image gallery or button that responds to clicks.",
        skills: ["Beginner JavaScript", "Interactivity"],
      },
      {
        title: "Final Project: AI-Assisted Website",
        summary:
          "Plan and build a complete website for a cause, club or small business idea, using AI tools to help, then present it.",
        skills: ["Planning", "AI tools", "Publishing", "Presenting"],
      },
    ],
  },
  skills: {
    heading: "Skills you'll learn",
    skills: [
      "Web design",
      "Page layout",
      "Colour and typography",
      "Coding basics",
      "Problem solving",
      "Creative thinking",
      "Responsible AI use",
      "Online safety",
      "Digital citizenship",
      "Presenting",
    ],
    tools: [
      { name: "HTML", logo: toolLogos.html },
      { name: "CSS", logo: toolLogos.css },
      { name: "JavaScript", logo: toolLogos.javascript },
      { name: "Visual Studio Code or a browser-based code editor" },
      { name: "AI assistants" },
      { name: "Free website hosting" },
    ],
  },
  outline: {
    heading: "Institute outline",
    // The six modules are proposals for the lead to review [confirm].
    intro:
      "The institute is one course, AI-Powered Web Design for Teens, organised into six modules.",
    facts: [
      { value: "1", label: "course" },
      { value: "6", label: "modules" },
      { value: "4", label: "projects" },
    ],
    courses: [
      {
        title: "How the Web Works",
        priceUsd: null,
        summary:
          "Browsers, websites, web addresses and how pages reach your screen.",
      },
      {
        title: "Planning and Design",
        priceUsd: null,
        summary: "Purpose, audience, sketching layouts, colour and fonts.",
      },
      {
        title: "Building with HTML",
        priceUsd: null,
        summary: "Headings, text, images, links and page structure.",
      },
      {
        title: "Styling with CSS",
        priceUsd: null,
        summary: "Colours, fonts, spacing and layouts that work on phones.",
      },
      {
        title: "Interactivity and AI Tools",
        priceUsd: null,
        summary:
          "Beginner JavaScript, and using AI to brainstorm, draft and debug safely.",
      },
      {
        title: "Publish and Present",
        priceUsd: null,
        summary: "Putting the site online and presenting the final project.",
      },
    ],
  },
  // Each point is a policy FairChild needs to confirm before publishing.
  highlights: {
    heading: "For parents",
    items: [
      {
        title: "Parent-led enrollment",
        body: "A parent or guardian enrolls and manages the account.",
        icon: UserCheck,
      },
      {
        title: "Progress updates",
        body: "Parents receive regular updates on modules completed and projects submitted.",
        icon: BarChart3,
      },
      {
        title: "Safe learning space",
        body: "Any community or messaging features for teens are moderated, and teens are taught never to share personal details online.",
        icon: ShieldCheck,
      },
      {
        title: "Age-appropriate AI tools",
        body: "The course only uses AI tools whose terms allow use by teens, with parental consent where required.",
        icon: Bot,
      },
      {
        title: "Certificate of completion",
        body: "Teens receive a FairChild certificate when they finish the final project.",
        icon: Award,
      },
    ],
  },
  requirements: {
    heading: "Prerequisites and requirements",
    items: [
      { title: "Age", body: "13 to 17.", illustration: illustrations.choose },
      {
        title: "Prior experience",
        body: "None. Basic typing and computer skills are enough.",
        illustration: illustrations.experience,
      },
      {
        title: "Language",
        body: "Able to read and follow instructions in English.",
        illustration: illustrations.language,
      },
      {
        title: "Equipment",
        body: "A laptop or desktop computer and a reliable internet connection. A phone or tablet alone is not enough.",
        illustration: illustrations.equipment,
      },
      {
        title: "Parental consent",
        body: "A parent or guardian must enroll and agree to the institute terms.",
        illustration: illustrations.proof,
      },
    ],
  },
  outcomes: {
    heading: "Where this leads",
    intro: "The course builds a foundation for:",
    roles: [
      {
        title: "Further study in computer science, design or digital media",
        icon: GraduationCap,
      },
      {
        title: "Coding clubs, hackathons and school technology projects",
        icon: Code,
      },
      {
        title:
          "A starter portfolio for school, scholarship or summer program applications",
        icon: FolderOpen,
      },
      {
        title:
          "Later study in FairChild's Software Engineering or UI/UX Design institutes",
        icon: Award,
      },
    ],
  },
  // The document notes these shared items are written for adults.
  hideShared: {
    learning: ["Choose your pace", "Add mentorship and career support"],
    faq: [
      "What is the difference between the 6-month and 12-month pace?",
      "Does the institute include job placement?",
    ],
  },
  related: {
    heading: "Related institutes",
    programmes: [
      {
        title: "Software Engineering Institute",
        body: "The next step for teens ready to go further with code and AI (for learners 18 and over).",
        href: "/catalogue/programme/software-engineering",
      },
      {
        title: "UI/UX Design Institute",
        body: "Take design skills further into full product design (for learners 18 and over).",
        href: "/catalogue/programme/ui-ux",
      },
    ],
  },
}
