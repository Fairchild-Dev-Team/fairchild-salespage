import type { Metadata } from "next"

import { MetaPixel } from "@/components/analytics/meta-pixel"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { MobileStickyCta } from "@/components/sales/mobile-sticky-cta"
import { SalesHero } from "@/components/sales/sales-hero"
import {
  ClosingCta,
  CredibilityBar,
  EpiphanySection,
  FaqSection,
  FellowshipSection,
  FinancialAidSection,
  HowItWorksSection,
  MidCtaBand,
  PricingSection,
  ProblemSection,
  ProgrammesSection,
  ProofSection,
  SpotObjectionSection,
} from "@/components/sales/sales-sections"

export const metadata: Metadata = {
  title: "FairChild Institute — 2027 Enrollment",
  description:
    "40 job offers in 15 months. Average start $120k. Save a 2027 FairChild seat for $250.",
}

export default function Page() {
  return (
    <>
      <MetaPixel />
      <div className="bg-white pb-16 md:pb-0">
        <SiteHeader />
        <SalesHero />
        <CredibilityBar />
        <ProblemSection />
        <EpiphanySection />
        <HowItWorksSection />
        <MidCtaBand />
        <ProgrammesSection />
        <ProofSection />
        <PricingSection />
        <FellowshipSection />
        <FinancialAidSection />
        <SpotObjectionSection />
        <FaqSection />
        <ClosingCta />
        <div className="mx-auto w-full max-w-page px-4 pb-12 lg:px-[120px]">
          <SiteFooter />
        </div>
      </div>
      <MobileStickyCta />
    </>
  )
}
