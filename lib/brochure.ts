/**
 * Brochure flipbook catalogue.
 * Add an entry with the institute name and its PDF link (local path or absolute URL).
 *
 * Examples:
 *   { id: "crm", name: "CRM Institute", pdfUrl: "/flipbook/crm.pdf" }
 *   { id: "sei", name: "Software Engineering Institute", pdfUrl: "https://cdn.example.com/sei.pdf" }
 */
export type BrochureInstitute = {
  id: string
  name: string
  pdfUrl: string
}

export const brochureInstitutes: BrochureInstitute[] = [
  {
    id: "data-analysis",
    name: "Data Analysis Institute",
    pdfUrl: "/flipbook/data-analysis-institute.pdf",
  },
  {
    id: "data-science",
    name: "Data Science Institute",
    pdfUrl: "/flipbook/data-science-institute.pdf",
  },
  {
    id: "ai-software-engineering",
    name: "AI Software Engineering Institute",
    pdfUrl: "/flipbook/ai-software-engineering-institute.pdf",
  },
  {
    id: "ui-ux-design-institute",
    name: "UI/UX Design Institute",
    pdfUrl: "/flipbook/ui-ux-design-institute.pdf",
  },
  
]

export function getBrochureInstitute(
  id: string
): BrochureInstitute | undefined {
  return brochureInstitutes.find((item) => item.id === id)
}
