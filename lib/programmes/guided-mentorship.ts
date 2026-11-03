/**
 * Guided Mentorship & Career Development (catalogue product).
 * Source: "Guided Mentorship & Career Development - Program Page Content" (Nov 1, 2026).
 */

import { GraduationCap, Rocket, TrendingUp } from "lucide-react"

import { illustrations } from "@/lib/programmes/shared"
import type { ProgrammePageContent } from "@/lib/programmes/types"

export const guidedMentorship: ProgrammePageContent = {
  id: "guided-mentorship",
  hero: {
    pills: ["6 or 12 months", "Any background"],
    headline: "Turn your skills into job offers.",
    summary:
      "Get a mentor, more than 200 hours of interview preparation, certification support and presentation training, so you walk into interviews ready.",
    facts: [
      { label: "Components", value: "5" },
      { label: "Format", value: "100% online" },
    ],
    priceNote: "or take individual components from $250.",
  },
  audience: {
    heading: "Who this program is for",
    audiences: [
      {
        title: "Recent graduates of a FairChild program",
        body: "Fellows who have finished their training and want structured support through the job search.",
        icon: GraduationCap,
      },
      {
        title: "Career changers with skills but no offers",
        body: "People who have trained elsewhere and are not getting past interviews.",
        icon: Rocket,
      },
      {
        title: "Professionals aiming higher",
        body: "People already in tech who want to move into a better role, prepare for certifications or present with more confidence.",
        icon: TrendingUp,
      },
    ],
  },
  learn: {
    heading: "What you will gain",
    items: [
      "A clear career plan with target roles and milestones, agreed with your mentor.",
      "Confidence in technical and behavioural interviews through repeated practice and feedback.",
      "Strong answers to common interview questions, built from your own experience and projects.",
      "A certification plan matched to your target role.",
      "A professional reference and attestation of the work you completed.",
      "The ability to present your work and ideas clearly to interviewers and stakeholders.",
      "Polished presentation materials designed in Figma.",
    ],
  },
  outline: {
    heading: "What is included",
    facts: [
      { value: "5", label: "components" },
      { value: "6 or 12", label: "months" },
    ],
    tone: "white",
    courses: [
      {
        id: "interview-prep-series",
        title: "200+ Hours Interview Prep Series",
        priceUsd: 2000,
        summary:
          "Technical and behavioural interview practice, mock interviews and feedback.",
      },
      {
        id: "job-attestation",
        title: "Job Attestation & Reference",
        priceUsd: 1000,
        summary:
          "A professional reference and written attestation of the projects and work you completed with FairChild.",
      },
      {
        id: "it-certifications",
        title: "50+ IT Certification Support",
        priceUsd: 250,
        summary:
          "Guidance on choosing and preparing for more than 50 industry certifications.",
      },
      {
        id: "presentation-skills",
        title: "Professional Presentation Skills",
        priceUsd: 500,
        summary: "Structuring and delivering clear, confident presentations.",
      },
      {
        id: "presentation-skills-figma",
        title: "Professional Presentation Skills using Figma",
        priceUsd: 500,
        summary:
          "Designing professional slides and visual presentations in Figma.",
      },
    ],
  },
  steps: {
    heading: "How it works",
    steps: [
      {
        title: "Meet your mentor",
        body: "Review your background and agree your target roles.",
      },
      {
        title: "Build your plan",
        body: "Set milestones for certifications, interview practice and applications.",
      },
      {
        title: "Practise interviews",
        body: "Work through the interview prep series and mock interviews.",
      },
      {
        title: "Get certified",
        body: "Prepare for the certifications in your plan.",
      },
      {
        title: "Sharpen your presentation",
        body: "Learn to present your work, and build slides in Figma.",
      },
      {
        title: "Apply with confidence",
        body: "Use your reference, attestation and portfolio in your job applications.",
      },
    ],
  },
  requirements: {
    heading: "Prerequisites and requirements",
    items: [
      {
        // Whether people trained outside FairChild can enroll is still to confirm.
        title: "Prior experience",
        body: "Training or experience in a technology field, either through a FairChild program or elsewhere.",
        illustration: illustrations.experience,
      },
      {
        title: "Language",
        body: "Good written and spoken English.",
        illustration: illustrations.language,
      },
      {
        title: "Equipment",
        body: "A laptop or desktop computer with a webcam and microphone for mock interviews, and a reliable internet connection.",
        illustration: illustrations.equipment,
      },
    ],
  },
  outcomes: {
    heading: "Career outcomes",
    intro:
      "This program supports your job search in the field you trained in, whether that is business analysis, CRM, data, design, project management, software or cybersecurity.",
    note: "See each program page for its target roles.",
  },
  // This page is the mentorship offer itself, so the shared card pointing to it is hidden.
  hideShared: { learning: ["Add mentorship and career support"] },
  related: {
    heading: "Related programs",
    programmes: [
      {
        title: "FairChild Fellowship",
        body: "Combine this program with full training in any FairChild program.",
        href: "/catalogue/product/fellowship",
      },
      {
        title: "Business Innovation Institute",
        body: "Build business analysis and product skills.",
        href: "/catalogue/programme/business-innovation",
      },
      {
        title: "Data Analysis Institute",
        body: "Build data analysis and reporting skills.",
        href: "/catalogue/programme/data-analysis",
      },
      {
        title: "CRM Institute",
        body: "Build Salesforce and CRM skills.",
        href: "/catalogue/programme/crm",
      },
    ],
  },
}
