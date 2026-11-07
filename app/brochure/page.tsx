import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { FlipbookSection } from "@/components/sales/flipbook-section"

export const metadata: Metadata = {
  title: "Brochure",
  description:
    "Flip through FairChild Institute brochures — pick an institute and browse the PDF as a book.",
}

export default function BrochurePage() {
  return (
    <div className="min-h-svh bg-white">
      <SiteHeader ctaHref="/#programmes" ctaLabel="Save my seat" />
      <main className="pb-16">
        <FlipbookSection />
      </main>
      <div className="mx-auto w-full max-w-page px-4 pb-12 lg:px-[120px]">
        <SiteFooter />
      </div>
    </div>
  )
}
