import Link from "next/link"

import { SiteHeader } from "@/components/layout/site-header"
import { GradientPillButton } from "@/components/ui/gradient-pill-button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <div className="mx-auto flex max-w-xl flex-col items-start gap-4 px-4 py-24 lg:px-[120px]">
        <h1 className="font-heading text-heading font-semibold text-[#0E121B]">
          Page not found
        </h1>
        <p className="text-[#525866]">
          That programme or page does not exist. Head back to enrollment.
        </p>
        <GradientPillButton href="/">Go to sales page</GradientPillButton>
        <Link href="/#programmes" className="text-sm text-[#AD14A7]">
          Browse programmes
        </Link>
      </div>
    </div>
  )
}
