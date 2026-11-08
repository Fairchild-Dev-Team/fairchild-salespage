import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { FlipbookSection } from "@/components/sales/flipbook-section"
import { workbooks } from "@/lib/workbook"

export const metadata: Metadata = {
  title: "Workbook",
  description:
    "Flip through The 2027 Restart Workbook as a book.",
}

export default function WorkbookPage() {
  return (
    <div className="min-h-svh bg-white">
      <SiteHeader ctaHref="/#programmes" ctaLabel="Save my seat" />
      <main className="pb-16">
        <FlipbookSection
          items={workbooks}
          sectionId="workbook"
          eyebrow="Workbook"
          heading="The 2027 Restart Workbook"
          description="Browse it as a book — drag a corner, use the arrows, or open the table of contents."
          showSelect={false}
          storageKeyPrefix="workbook"
          emptyHint="lib/workbook.ts"
        />
      </main>
      <div className="mx-auto w-full max-w-page px-4 pb-12 lg:px-[120px]">
        <SiteFooter />
      </div>
    </div>
  )
}
