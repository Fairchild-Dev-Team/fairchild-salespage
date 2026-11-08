/**
 * Workbook flipbook catalogue.
 * Add an entry with the workbook name and its PDF link (local path or absolute URL).
 */
export type Workbook = {
  id: string
  name: string
  pdfUrl: string
}

export const workbooks: Workbook[] = [
  {
    id: "the-2027-restart-workbook",
    name: "The 2027 Restart Workbook",
    pdfUrl: "/flipbook/the-2027-restart-workbook.pdf",
  },
]
