/**
 * Content shared by the institute page and its course pages.
 * Source: "Data Science Institute (DSI) - Institute Page Content (Nov 1, 2026)".
 */

import { illustrations } from "@/lib/programmes/shared"
import type {
  ProgrammeCertification,
  ProgrammeOutlineCourse,
  ProgrammeProject,
} from "@/lib/programmes/types"

export const course = (id: string, title: string) => ({
  id: `data-science-${id}`,
  title,
})

export const programmingTools = course(
  "programming-tools",
  "Programming & Tools"
)
export const programmingData = course(
  "programming-data",
  "Programming & Data Foundations"
)
export const coreAiMl = course(
  "core-ai-ml",
  "Core Artificial Intelligence & Machine Learning"
)
export const promptEngineering = course(
  "prompt-engineering",
  "Prompt Engineering"
)

/** Institute learning outcomes, in document order. Course pages pick from these. */
export const outcomes = [
  "Write Python to load, clean, transform and explore data.",
  "Apply the maths behind data science: linear algebra, calculus and probability, explained for practical use.",
  "Use statistics to test hypotheses, measure uncertainty and draw sound conclusions.",
  "Build and evaluate models for prediction and classification.",
  "Train and tune machine learning models with libraries such as scikit-learn.",
  "Understand how neural networks and modern AI models work, and when to use them.",
  "Use prompt engineering to get reliable results from large language models in data workflows.",
  "Communicate model results, limits and risks clearly to non-technical audiences.",
]

export const projects: ProgrammeProject[] = [
  {
    title: "Exploratory Data Analysis",
    summary:
      "Clean and explore a real dataset in Python and present the key patterns you find.",
    skills: ["Python", "pandas", "Data visualisation"],
  },
  {
    title: "Statistical Experiment Report",
    summary:
      "Design and analyse an A/B test, and explain whether the result is meaningful.",
    skills: ["Hypothesis testing", "Probability", "Statistics"],
  },
  {
    title: "Predictive Model",
    summary:
      "Build and evaluate a model that forecasts a business outcome, such as sales or customer churn.",
    skills: ["Regression", "Classification", "Model evaluation"],
  },
  {
    title: "Machine Learning Pipeline",
    summary:
      "Train, tune and compare several machine learning models, then package the best one for reuse.",
    skills: ["scikit-learn", "Feature engineering", "Model tuning"],
  },
  {
    title: "Capstone: AI-Powered Data Product",
    summary:
      "Combine a machine learning model with a large language model to build a working data product, and present its results and limits.",
    skills: ["Machine learning", "Prompt engineering", "Communication"],
  },
]

export const outlineCourses: ProgrammeOutlineCourse[] = [
  {
    ...programmingTools,
    priceUsd: null,
    summary:
      "Python, Jupyter, Git and the core tools used in data science work.",
  },
  {
    ...course("maths-statistics", "Maths & Statistics"),
    priceUsd: null,
    summary:
      "Descriptive and inferential statistics, probability and hypothesis testing.",
  },
  {
    ...course("analysis-modelling", "Analysis and Modelling"),
    priceUsd: null,
    summary:
      "Exploratory analysis, regression and classification models, and model evaluation.",
  },
  {
    ...course("mathematical-foundations", "Mathematical Foundations"),
    priceUsd: null,
    summary:
      "Linear algebra and calculus needed to understand how models learn.",
  },
  {
    ...programmingData,
    priceUsd: null,
    summary:
      "Data structures, data cleaning and working with databases in Python and SQL.",
  },
  {
    ...coreAiMl,
    priceUsd: null,
    summary:
      "Supervised and unsupervised learning, neural networks and model tuning.",
  },
  {
    ...course("advanced-topics", "Advanced Topics and Specialisation"),
    priceUsd: null,
    summary:
      "Choose a focus area such as natural language processing, computer vision or time series.",
  },
  {
    ...promptEngineering,
    priceUsd: null,
    summary:
      "Designing prompts and workflows that get reliable results from large language models.",
  },
]

export const certifications: ProgrammeCertification[] = [
  {
    name: "PCEP: Certified Entry-Level Python Programmer, with PCAP as the next level",
    body: "Python Institute",
    preparedIn: [programmingTools, programmingData],
  },
  {
    name: "Microsoft Certified: Azure AI Fundamentals (AI-901)",
    body: "Microsoft",
    preparedIn: [coreAiMl, promptEngineering],
  },
]

export const certificationNote =
  "In data science, employers weigh a portfolio of real models and analyses more heavily than certifications. The five projects are designed to provide that portfolio."

export const requirements = {
  heading: "Prerequisites and requirements",
  items: [
    {
      title: "Prior experience",
      body: "No coding experience is needed. Comfort with secondary-school maths helps, as the institute builds on it quickly.",
      illustration: illustrations.experience,
    },
    {
      title: "Language",
      body: "Good written and spoken English.",
      illustration: illustrations.language,
    },
    {
      // The 8 GB memory figure is still to confirm.
      title: "Equipment",
      body: "A laptop or desktop computer with at least 8 GB of memory and a reliable internet connection. A phone or tablet alone is not enough for the tools used.",
      illustration: illustrations.equipment,
    },
  ],
}
