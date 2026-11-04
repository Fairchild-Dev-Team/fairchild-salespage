import type { Metadata } from "next"

import { MetaPixel } from "@/components/analytics/meta-pixel"
import { SiteFooter } from "@/components/layout/site-footer"
import { MobileStickyCta } from "@/components/sales/mobile-sticky-cta"
import { SalesHero } from "@/components/sales/sales-hero"
import { StickySalesHeader } from "@/components/sales/sales-hero-nav"
import { MenteeStories } from "@/components/sales/mentee-stories"
import {
  FellowshipSection,
  FinancialAidSection,
  SpotObjectionSection,
} from "@/components/sales/offer-sections"
import {
  ClosingCta,
  CredibilityBar,
  EpiphanySection,
  FaqSection,
  HowItWorksSection,
  MidCtaBand,
  PricingSection,
  ProblemSection,
  ProgrammesSection,
} from "@/components/sales/sales-sections"

export const metadata: Metadata = {
  title: "FairChild Institute — 2027 Enrollment",
  description:
    "Land the offer. Change the bracket. FairChild mentees average $120k starting salary — lock a 2027 seat for $250.",
}

export default function Page() {
  return (
    <>
      <MetaPixel />
      <div className="bg-white pb-16 md:pb-0">
        <StickySalesHeader />
        <SalesHero />
        <CredibilityBar />
        <ProgrammesSection />
        <PricingSection />
        <ProblemSection />
        <EpiphanySection />
        <HowItWorksSection />
        <MidCtaBand />
        <MenteeStories />
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
