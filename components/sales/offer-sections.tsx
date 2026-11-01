import Link from "next/link"
import { CircleCheck } from "lucide-react"

import { CatalogueProductButton } from "@/components/sales/catalogue-product-button"
import { SectionShell } from "@/components/sales/section-shell"
import { GradientPillButton } from "@/components/ui/gradient-pill-button"
import { applicationPortalUrl } from "@/lib/application-portal"
import {
  financialAid,
  fellowshipBlurb,
  spotObjection,
} from "@/lib/sales-content"
import { cn } from "@/lib/utils"

export function FellowshipSection() {
  return (
    <SectionShell id="fellowship">
      <div className="grid gap-8 overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#94008D_0%,#94008D_43.55%,#4D0044_96.79%)] p-6 text-white sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-center lg:gap-12 lg:p-12">
        <div>
          <p className="text-sm font-semibold tracking-[0.12em] text-[#FA9BF6] uppercase">
            {fellowshipBlurb.eyebrow}
          </p>
          <h2 className="mt-4 font-heading text-heading font-semibold text-balance">
            {fellowshipBlurb.title}
          </h2>
          <p className="mt-4 max-w-xl text-copy text-white/80">
            {fellowshipBlurb.body}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {fellowshipBlurb.badges.map((badge) => (
              <li
                key={badge}
                className="rounded-full bg-[#FEF5FE] px-3.5 py-1.5 text-sm font-medium text-[#0E121B]"
              >
                {badge}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <CatalogueProductButton
              productId={fellowshipBlurb.productId}
              className="w-fit"
            >
              View products
            </CatalogueProductButton>
            <Link
              href={`/catalogue/product/${fellowshipBlurb.productId}`}
              className="text-sm font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-[#FA9BF6]"
            >
              See the full Fellowship page
            </Link>
          </div>
        </div>

        <div className="rounded-[24px] bg-white p-6 text-[#0E121B] sm:p-7">
          <h3 className="font-heading text-lg font-semibold tracking-[-0.02em]">
            {fellowshipBlurb.includedHeading}
          </h3>
          <ul className="mt-5 space-y-3">
            {fellowshipBlurb.included.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed"
              >
                <CircleCheck
                  className="mt-0.5 size-5 shrink-0 text-[#631760]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  )
}

export function FinancialAidSection() {
  const portalUrl = applicationPortalUrl()

  return (
    <SectionShell id="financial-aid">
      <div className="grid gap-10 rounded-[28px] border border-[#E8D5E6] bg-[#FEF5FE] p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:p-12">
        <div>
          <h2 className="font-heading text-heading font-semibold text-balance text-[#0E121B]">
            {financialAid.title}
          </h2>
          <p className="mt-4 max-w-xl text-copy text-[#525866]">
            {financialAid.lead}
          </p>
          <div className="mt-8">
            <GradientPillButton href={portalUrl} className="w-fit">
              {financialAid.cta}
            </GradientPillButton>
          </div>
        </div>

        <ol className="relative space-y-3">
          <span
            aria-hidden
            className="absolute top-8 bottom-8 left-[2.25rem] w-px bg-[linear-gradient(180deg,#94008D_0%,#4D0044_100%)]"
          />
          {financialAid.steps.map((step, index) => (
            <li
              key={step}
              className="relative flex items-center gap-4 rounded-2xl border border-[#E8D5E6] bg-white p-4 sm:p-5"
            >
              <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-[#631760] font-heading text-sm font-semibold text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-base leading-snug text-[#0E121B]">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  )
}

export function SpotObjectionSection() {
  return (
    <SectionShell bleed className="bg-gradient-purple text-white">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-center lg:gap-14">
        <div>
          <h2 className="max-w-2xl font-heading text-heading font-semibold text-balance">
            “{spotObjection.title}”
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            {spotObjection.body}
          </p>
          <div className="mt-8">
            <GradientPillButton href="/#programmes" className="w-fit">
              Save my seat
            </GradientPillButton>
          </div>
        </div>

        <div className="rounded-[24px] bg-white p-6 text-[#0E121B] shadow-[0_16px_40px_rgba(14,18,27,0.25)] sm:p-7">
          <p className="font-heading text-lg font-semibold tracking-[-0.02em]">
            {spotObjection.baseFee}
          </p>
          <div
            aria-hidden
            className="mt-5 flex h-3 gap-1 overflow-hidden rounded-full"
          >
            <span className="flex-1 bg-[linear-gradient(95.72deg,#F233EA_43.24%,#FA9BF6_98.17%)]" />
            <span className="flex-1 bg-[#E8D5E6]" />
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-3">
            {spotObjection.split.map((part, index) => (
              <div
                key={part.label}
                className={cn(
                  "rounded-2xl p-4",
                  index === 0
                    ? "bg-[#FEF5FE] ring-1 ring-[#FA9BF6]"
                    : "bg-[#F6F4F5]"
                )}
              >
                <dt className="text-sm text-[#525866]">{part.label}</dt>
                <dd className="mt-1 font-heading text-3xl font-semibold tracking-[-0.03em] text-[#631760]">
                  {part.amount}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </SectionShell>
  )
}
