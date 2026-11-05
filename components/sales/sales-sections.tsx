import Image from "next/image"
import Link from "next/link"
import { ArrowRight, DoorOpen, MailX } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { GradientPillButton } from "@/components/ui/gradient-pill-button"
import {
  credibility,
  employers,
  enrollmentDetails,
  epiphany,
  falseBeliefs,
  faqs,
  financialAid,
  howItWorks,
  midCta,
  pricingOverview,
  problem,
} from "@/lib/sales-content"
import { applicationPortalUrl } from "@/lib/application-portal"
import { ProgrammeBrowser } from "@/components/sales/programme-browser"
import { SaleCountdown } from "@/components/sales/sale-countdown"
import { SALE_ENDS_AT } from "@/lib/programmes/shared"
import { SectionShell } from "@/components/sales/section-shell"
import { cn } from "@/lib/utils"

export function CredibilityBar() {
  const ticker = [...credibility, ...credibility]

  return (
    <section className="border-b border-[#E8D5E6] bg-[#FEF5FE]">
      <div className="proof-marquee pt-7">
        <div className="proof-marquee-track">
          {ticker.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="flex items-baseline gap-3 px-8"
            >
              <p className="text-accent-gradient font-heading text-3xl font-semibold sm:text-4xl">
                {item.value}
              </p>
              <p className="max-w-44 text-sm text-[#525866]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-page flex-col gap-5 px-4 pt-2 pb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:px-[120px] lg:pt-3 lg:pb-10">
        <div className="min-w-0 shrink-0">
          <p className="font-sans text-sm font-normal tracking-[0.08em] text-[#631760] uppercase">
            FairChild Success Wall
          </p>
          <h2 className="mt-2 font-heading text-[clamp(1.35rem,0.7rem+3.2vw,2.75rem)] leading-[1.1] font-medium tracking-[-0.04em] text-[#0E121B]">
            <span className="block whitespace-nowrap">
              Our Mentees have worked
            </span>
            <span className="block whitespace-nowrap">with top firms like</span>
          </h2>
        </div>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-4 sm:justify-end sm:gap-x-10">
          {employers.map((employer) => (
            <li key={employer.name} className="flex h-8 items-center sm:h-9">
              {"logo" in employer && employer.logo ? (
                <Image
                  src={employer.logo}
                  alt={employer.name}
                  width={160}
                  height={36}
                  className="partner-logo-tint-brand h-7 w-auto max-w-[9rem] object-contain sm:h-8"
                />
              ) : (
                <span className="font-heading text-xl font-semibold tracking-tight text-[#631760] sm:text-2xl">
                  {employer.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ProblemSection() {
  const [certificate, tutorials, alone] = falseBeliefs

  return (
    <SectionShell id="holding-back">
      <div>
        <p className="font-miriam-libre text-sm font-semibold tracking-[0.12em] text-[#AD14A7] uppercase">
          {problem.eyebrow}
        </p>
        <h2 className="mt-4 max-w-[62rem] font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-[#0E121B]">
          <span className="block">{problem.titleLead}</span>
          <span className="block">{problem.title}</span>
        </h2>
      </div>

      <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3">
        <article className="flex min-h-[460px] flex-col overflow-hidden rounded-[28px] bg-[linear-gradient(27deg,#FEF5FE_25.75%,#E7F8FD_101.38%)] sm:rounded-[32px]">
          <div className="p-6 sm:p-8">
            <p className="text-base leading-6 text-[#525866]">
              {certificate.belief}
            </p>
            <h3 className="mt-3 font-heading text-[2.25rem] leading-none font-medium tracking-[-0.04em] text-[#0E121B] sm:text-[2.5rem]">
              {certificate.response}
            </h3>
            <p className="mt-4 text-sm leading-6 text-[#525866]">
              {certificate.truth}
            </p>
          </div>
          <div className="relative mt-auto h-40 [mask-image:linear-gradient(to_bottom,transparent,black_28%)]">
            <Image
              src="/images/sales/problem/study.jpg"
              alt="Hands working through notes at a desk"
              fill
              className="object-cover object-[center_70%]"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
        </article>

        <article className="relative flex min-h-[440px] flex-col overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#FEF6FE_0%,#E2E5ED_42%)] p-6 sm:rounded-[32px] sm:p-8">
          <div className="relative z-10 flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0E121B] text-white">
              <ArrowRight className="size-4" aria-hidden />
            </span>
            <div>
              <h3 className="font-heading text-2xl leading-tight font-medium tracking-[-0.03em] text-[#0E121B]">
                {tutorials.response}
              </h3>
              <p className="mt-3 text-base leading-6 text-[#525866]">
                {tutorials.belief}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#525866]">
                {tutorials.truth}
              </p>
            </div>
          </div>
          <div className="relative z-10 mt-6 min-h-[180px] flex-1 overflow-hidden rounded-2xl shadow-[0_18px_40px_rgba(14,18,27,0.12)]">
            <Image
              src="/images/sales/problem/tutorials.jpg"
              alt="Someone pointing at a lesson on a laptop"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
        </article>

        <article className="flex min-h-[460px] flex-col items-center overflow-hidden rounded-[28px] bg-[#EEF6F7] px-6 pt-6 sm:rounded-[32px] sm:px-8 sm:pt-8">
          <p className="max-w-[16rem] text-center text-base leading-6 text-[#0E121B]">
            {alone.belief}
          </p>
          <p className="mt-2 max-w-[18rem] text-center text-sm leading-6 text-[#525866]">
            {alone.truth}
          </p>
          <div className="relative mt-5 h-[260px] w-full max-w-[260px] overflow-hidden rounded-t-[150px]">
            <Image
              src="/images/sales/problem/mentor.jpg"
              alt="A mentor talking through work with someone at the table"
              fill
              className="object-cover object-[center_18%]"
              sizes="280px"
            />
            <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#3d2444]/85 to-transparent" />
            <p className="absolute inset-x-3 bottom-6 text-center font-heading text-[1.35rem] leading-[1.15] font-medium tracking-[-0.03em] text-white">
              {alone.response}
            </p>
          </div>
        </article>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <article className="relative min-h-[260px] overflow-hidden rounded-[28px] bg-[#FEF5FE] p-6 sm:min-h-[277px] sm:rounded-[32px] sm:p-8">
          <div className="relative z-10 max-w-[13.5rem] sm:max-w-[18rem]">
            <p className="text-lg leading-snug font-medium tracking-[-0.02em] text-[#0E121B] sm:text-2xl">
              Yet, the interview invitations aren&apos;t coming.
            </p>
            <p className="mt-3 text-base leading-7 text-[#525866]">
              {problem.body[1]}
            </p>
          </div>
          <div className="pointer-events-none absolute right-5 bottom-5 flex size-28 items-center justify-center rounded-full bg-[rgba(251,75,163,0.16)] sm:size-40">
            <MailX className="size-12 text-[#AD14A7] sm:size-16" aria-hidden />
          </div>
        </article>

        <article className="relative flex min-h-[260px] items-center overflow-hidden rounded-[28px] bg-[linear-gradient(115deg,#F0ABFC_0%,#D946EF_38%,#A21CAF_100%)] p-6 sm:min-h-[277px] sm:rounded-[32px] sm:p-8">
          <div className="relative z-10 max-w-[15rem] sm:max-w-[22rem]">
            <p className="font-heading text-[clamp(2rem,4vw,3.25rem)] leading-none font-medium tracking-[-0.04em] text-white">
              Closer to an opportunity.
            </p>
            <p className="mt-3 text-lg leading-snug font-medium text-white/95">
              {problem.body[2]}
            </p>
          </div>
          <div className="pointer-events-none absolute -right-2 bottom-2 flex size-32 items-center justify-center rounded-full bg-white/10 sm:size-44">
            <DoorOpen
              className="size-16 text-white/80 sm:size-20"
              aria-hidden
            />
          </div>
        </article>
      </div>
    </SectionShell>
  )
}

const stepIllustrations = [
  "/images/sales/path/skill.svg",
  "/images/sales/path/practice.svg",
  "/images/sales/path/proof.svg",
  "/images/sales/path/interview.svg",
  "/images/sales/path/offer.svg",
] as const

export function EpiphanySection() {
  const lastIndex = epiphany.steps.length - 1

  return (
    <SectionShell
      bleed
      className="bg-[linear-gradient(180deg,#94008D_0%,#94008D_43.55%,#4D0044_96.79%)] text-white"
    >
      <div className="max-w-[40rem]">
        <p className="font-miriam-libre text-sm font-semibold tracking-[0.12em] text-[#FA9BF6] uppercase">
          {epiphany.eyebrow}
        </p>
        <h2 className="mt-4 font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-white">
          {epiphany.title}
        </h2>
        <p className="mt-4 text-lg leading-7 text-white/80">{epiphany.lead}</p>
      </div>

      <ol className="mt-12 lg:mt-16 lg:grid lg:grid-cols-5 lg:gap-6">
        {epiphany.steps.map((step, index) => {
          const isLast = index === lastIndex

          return (
            <li key={step.title} className="relative pb-10 last:pb-0 lg:pb-0">
              {index < lastIndex ? (
                <span
                  aria-hidden
                  className="absolute top-[21px] left-[calc(50%+1.375rem)] hidden h-px w-[calc(100%-1.25rem)] bg-white/30 lg:block"
                />
              ) : null}
              <div className="flex justify-center">
                <span
                  className={
                    isLast
                      ? "relative z-10 flex size-11 items-center justify-center rounded-full bg-[linear-gradient(95.72deg,#F233EA_43.24%,#FA9BF6_98.17%)] font-heading text-sm font-semibold text-white shadow-[0_0_0_2px_rgba(250,155,246,0.45),0_0_18px_6px_rgba(250,155,246,0.7)]"
                      : "relative z-10 flex size-11 items-center justify-center rounded-full bg-white font-heading text-sm font-semibold text-[#94008D]"
                  }
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-4 min-w-0">
                <div className="flex h-28 items-center justify-center overflow-hidden rounded-2xl bg-white px-2 sm:h-32">
                  {/* eslint-disable-next-line @next/next/no-img-element -- SVG illustration; next/image does not optimise SVGs */}
                  <img
                    src={stepIllustrations[index]}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="mt-4 font-heading text-xl leading-tight font-medium tracking-[-0.03em] text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  {step.body}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </SectionShell>
  )
}

const detailIllustrations = [
  "/images/sales/details/choose.svg",
  "/images/sales/details/lock.svg",
  "/images/sales/details/pay.svg",
  "/images/sales/details/train.svg",
] as const

export function HowItWorksSection() {
  return (
    <SectionShell>
      <h2 className="max-w-[40rem] font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-[#0E121B]">
        {enrollmentDetails.title}
      </h2>

      <dl className="mt-10 grid overflow-hidden rounded-[28px] border border-[#E8D5E6] bg-white sm:grid-cols-3">
        {enrollmentDetails.items.map((item) => (
          <div
            key={item.label}
            className="border-b border-[#E8D5E6] p-6 last:border-b-0 sm:border-r sm:border-b-0 sm:p-8 sm:last:border-r-0"
          >
            <dt className="font-heading text-3xl font-medium tracking-[-0.04em] text-[#0E121B]">
              {item.label}
            </dt>
            <dd className="mt-3 text-base leading-7 text-[#525866]">
              {item.body}
            </dd>
          </div>
        ))}
      </dl>

      <ol className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {howItWorks.map((item, index) => (
          <li
            key={item.step}
            className="flex flex-col rounded-[28px] bg-[#FEF5FE] p-4 sm:p-5"
          >
            <div className="flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-white px-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG illustration; next/image does not optimise SVGs */}
              <img
                src={detailIllustrations[index]}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
            <p className="mt-4 font-heading text-sm font-semibold tracking-[0.08em] text-[#0E121B]">
              {item.step}
            </p>
            <h3 className="mt-1 font-heading text-xl leading-tight font-medium tracking-[-0.03em] text-[#0E121B]">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#525866]">{item.body}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  )
}

export function MidCtaBand() {
  return (
    <SectionShell bleed className="bg-[#FEF5FE]">
      <div className="flex flex-col items-start justify-between gap-6 rounded-[1.75rem] bg-[linear-gradient(180deg,#94008D_0%,#94008D_43.55%,#4D0044_96.79%)] p-6 text-white sm:p-8 lg:flex-row lg:items-center lg:p-10">
        <div className="max-w-xl">
          <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
            {midCta.title}
          </h2>
          <p className="mt-3 text-copy text-white/80">{midCta.body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <GradientPillButton href="/#programmes">
            {midCta.primaryCta}
          </GradientPillButton>
          <GradientPillButton href="/#pricing" variant="outline">
            {midCta.secondaryCta}
          </GradientPillButton>
        </div>
      </div>
    </SectionShell>
  )
}

export function ProgrammesSection() {
  return (
    <SectionShell id="programmes" bleed className="programmes-section">
      <div>
        <h2 className="font-heading text-heading font-semibold text-[#0E121B]">
          Choose a program
        </h2>
        <p className="mt-3 max-w-2xl text-copy text-[#525866]">
          Browse every program, or pick one to see its courses.
        </p>
      </div>
      <ProgrammeBrowser />
    </SectionShell>
  )
}

export function PricingSection() {
  return (
    <SectionShell id="pricing" bleed className="bg-[#FDF5F9]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="font-heading text-heading font-semibold text-[#0E121B]">
            {pricingOverview.title}
          </h2>
          <p className="mt-3 max-w-2xl text-copy text-[#525866]">
            {pricingOverview.baseFee}
          </p>
        </div>
        <SaleCountdown
          endsAt={SALE_ENDS_AT}
          className="w-fit max-w-full shrink-0"
        />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {pricingOverview.rows.map((row) => (
          <Link
            key={row.name}
            href={row.href}
            className={cn(
              "group flex flex-col rounded-[1.5rem] border bg-white p-5 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(173,20,167,0.1)] sm:p-6",
              row.highlight
                ? "border-[#AD14A7] ring-1 ring-[#AD14A7]/20"
                : "border-[#E8D5E6]"
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="font-heading text-xl font-semibold text-[#0E121B]">
                {row.name}
              </h3>
              {row.highlight ? (
                <span className="rounded-full bg-[#AD14A7] px-2.5 py-1 text-xs font-semibold text-white">
                  {row.highlight}
                </span>
              ) : null}
            </div>
            <p className="mt-2 flex items-baseline gap-2 font-heading text-2xl font-semibold text-[#631760]">
              <span>{row.normal}</span>
              {row.struck ? (
                <s className="text-base font-medium text-[#525866]">
                  {row.struck}
                </s>
              ) : null}
              {row.saving ? (
                <span className="self-center rounded-md bg-[#FA9BF6] px-1.5 py-0.5 font-sans text-xs font-semibold text-[#631760]">
                  {row.saving}
                </span>
              ) : null}
            </p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#525866]">
              {row.options}
            </p>
            <span className="mt-4 text-sm font-medium text-[#AD14A7] group-hover:underline">
              Choose a program →
            </span>
          </Link>
        ))}
      </div>
    </SectionShell>
  )
}

export function FaqSection() {
  return (
    <SectionShell id="faq">
      <h2 className="font-heading text-heading font-semibold text-[#0E121B]">
        Questions before you lock a spot
      </h2>
      <Accordion className="mt-8 border-t border-[#E8D5E6]">
        {faqs.map((item) => (
          <AccordionItem
            key={item.question}
            value={item.question}
            className="border-[#E8D5E6] py-1"
          >
            <AccordionTrigger className="font-heading text-base text-[#0E121B] hover:no-underline sm:text-lg">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-[#525866]">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionShell>
  )
}

export function ClosingCta() {
  const portalUrl = applicationPortalUrl()

  return (
    <SectionShell className="pb-28 md:pb-24">
      <div className="cta-section-card bg-gradient-cta border border-[#E8D5E6] text-center">
        <p className="font-miriam-libre text-sm font-semibold tracking-[0.12em] text-[#AD14A7] uppercase">
          Quick recap
        </p>
        <h2 className="mt-3 font-heading text-heading font-semibold text-[#0E121B]">
          Claim your 2027 seat
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[#525866]">
          $250 today toward the $500 base fee. Pick a program, pay on that page,
          and get a receipt plus a FairChild follow-up.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <GradientPillButton href="/#programmes">
            Save my seat
          </GradientPillButton>
          <GradientPillButton href={portalUrl} variant="outline">
            {financialAid.cta}
          </GradientPillButton>
        </div>
      </div>
    </SectionShell>
  )
}
