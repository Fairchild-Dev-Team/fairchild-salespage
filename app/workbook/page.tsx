import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { WorkbookSection } from "@/components/sales/workbook-section"

export const metadata: Metadata = {
  title: "Workbook",
  description: "Flip through The 2027 Restart Workbook as a book.",
}

export default function WorkbookPage() {
  return (
    <div className="workbook-light min-h-svh bg-white">
      <SiteHeader ctaHref="/#programmes" ctaLabel="Save my seat" />
      <main className="pb-16">
        <WorkbookSection />
      </main>
      <div className="mx-auto w-full max-w-page px-4 pb-12 lg:px-[120px]">
        <SiteFooter />
      </div>
    </div>
  )
}
