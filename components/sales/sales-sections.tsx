import Link from "next/link"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { GradientPillButton } from "@/components/ui/gradient-pill-button"
import { TestimonialVideos } from "@/components/sales/testimonial-videos"
import {
  credibility,
  employerNames,
  enrollmentDetails,
  epiphany,
  falseBeliefs,
  faqs,
  fellowshipBlurb,
  financialAid,
  howItWorks,
  spotObjection,
  linkedInProof,
  midCta,
  moreTestimonials,
  pricingOverview,
  problem,
  testimonials,
} from "@/lib/sales-content"
import { applicationPortalUrl } from "@/lib/application-portal"
import { getPublicLander } from "@/lib/lander"
import { cn } from "@/lib/utils"

function SectionShell({
  id,
  className,
  children,
  bleed,
}: {
  id?: string
  className?: string
  children: React.ReactNode
  bleed?: boolean
}) {
  return (
    <section
      id={id}
      className={cn(
        bleed
          ? "w-full"
          : "mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20",
        className
      )}
    >
      {bleed ? (
        <div className="mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  )
}

export function CredibilityBar() {
  const ticker = [...credibility, ...credibility]

  return (
    <section className="border-b border-[#E8D5E6] bg-[#FEF5FE]">
      <div className="proof-marquee py-6">
        <div className="proof-marquee-track">
          {ticker.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="flex items-baseline gap-3 px-8"
            >
              <p className="font-heading text-3xl font-semibold text-accent-gradient sm:text-4xl">
                {item.value}
              </p>
              <p className="max-w-40 text-sm text-[#525866]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-page flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-[120px]">
        <p className="text-xs font-semibold tracking-wide text-[#631760] uppercase">
          Alumni now at
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {employerNames.map((name) => (
            <li
              key={name}
              className="font-heading text-lg font-semibold tracking-tight text-[#0E121B]/70"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ProblemSection() {
  return (
    <SectionShell>
      <p className="font-miriam-libre text-sm font-semibold tracking-[0.12em] text-[#AD14A7] uppercase">
        {problem.eyebrow}
      </p>
      <h2 className="mt-3 font-heading text-heading max-w-3xl font-semibold text-[#0E121B]">
        {problem.title}
      </h2>
      <div className="mt-6 max-w-2xl space-y-4">
        {problem.body.map((paragraph) => (
          <p key={paragraph} className="text-lg leading-relaxed text-[#525866]">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {falseBeliefs.map((item) => (
          <div
            key={item.belief}
            className="rounded-2xl border border-[#E8D5E6] bg-[#FDF5F9] p-6"
          >
            <p className="font-heading text-xl font-semibold text-[#631760]">
              {item.belief}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#525866]">{item.truth}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

export function EpiphanySection() {
  return (
    <SectionShell bleed className="bg-gradient-purple text-white">
      <p className="font-miriam-libre text-sm font-semibold tracking-[0.12em] text-[#FA9BF6] uppercase">
        {epiphany.eyebrow}
      </p>
      <h2 className="mt-3 font-heading text-heading max-w-3xl font-semibold">
        {epiphany.title}
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-white/85 italic">{epiphany.lead}</p>
      <ol className="mt-10 grid gap-4 md:grid-cols-2">
        {epiphany.steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <p className="font-heading text-5xl font-semibold text-[#FA9BF6]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 font-heading text-2xl font-semibold">{step.title}</h3>
            <p className="mt-2 text-base leading-relaxed text-white/80">{step.body}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  )
}

export function HowItWorksSection() {
  return (
    <SectionShell>
      <h2 className="font-heading text-heading font-semibold text-[#0E121B]">
        {enrollmentDetails.title}
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {enrollmentDetails.items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-[#E8D5E6] bg-[#FEF5FE] p-6"
          >
            <p className="font-miriam-libre text-sm font-semibold tracking-[0.14em] text-[#AD14A7] uppercase">
              {item.label}
            </p>
            <p className="mt-3 text-base leading-relaxed text-[#525866]">{item.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {howItWorks.map((item) => (
          <div key={item.step}>
            <p className="font-heading text-5xl font-semibold text-[#FA9BF6]">{item.step}</p>
            <h3 className="mt-3 font-heading text-xl font-semibold text-[#0E121B]">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#525866]">{item.body}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

export function MidCtaBand() {
  return (
    <SectionShell bleed className="bg-[#FEF5FE]">
      <div className="flex flex-col items-start justify-between gap-6 rounded-[1.75rem] border border-[#E8D5E6] bg-white p-6 shadow-[0_16px_40px_rgba(173,20,167,0.08)] sm:p-8 lg:flex-row lg:items-center lg:p-10">
        <div className="max-w-xl">
          <h2 className="font-heading text-2xl font-semibold text-[#0E121B] sm:text-3xl">
            {midCta.title}
          </h2>
          <p className="mt-3 text-copy text-[#525866]">{midCta.body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <GradientPillButton href="/#programmes">{midCta.primaryCta}</GradientPillButton>
          <GradientPillButton href="/#pricing" variant="outline">
            {midCta.secondaryCta}
          </GradientPillButton>
        </div>
      </div>
    </SectionShell>
  )
}

function CatalogueCard({
  title,
  detail,
  href,
  action,
}: {
  title: string
  detail?: string | null
  href: string
  action: string
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-[1.5rem] border border-[#E8D5E6] bg-white p-6 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(173,20,167,0.12)]"
    >
      <h3 className="font-heading text-xl font-semibold text-[#0E121B] group-hover:text-[#631760]">
        {title}
      </h3>
      {detail ? (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#525866]">{detail}</p>
      ) : (
        <div className="flex-1" />
      )}
      <span className="mt-5 inline-flex w-fit rounded-full bg-[#FEF5FE] px-3 py-1.5 text-sm font-medium text-[#AD14A7] transition-colors group-hover:bg-[#AD14A7] group-hover:text-white">
        {action}
      </span>
    </Link>
  )
}

export async function ProgrammesSection() {
  const lander = await getPublicLander()
  const programmes = lander?.programmes ?? []
  const courses = lander?.courses ?? []
  const products = lander?.products ?? []
  const hasItems = programmes.length + courses.length + products.length > 0

  return (
    <SectionShell id="programmes" bleed className="bg-[#FEF5FE]">
      <h2 className="font-heading text-heading font-semibold text-[#0E121B]">
        Choose a programme
      </h2>
      <p className="mt-3 max-w-2xl text-copy text-[#525866]">
        Open a programme, course, or product to see the live price. You lock a 2027 spot
        on that page. Checkout takes about a minute.
      </p>
      {!lander ? (
        <p className="mt-6 text-sm text-[#631760]">
          The catalogue is unavailable right now. Email {financialAid.email} and we will
          help you enrol.
        </p>
      ) : !hasItems ? (
        <p className="mt-6 text-sm text-[#525866]">
          No programmes are open for enrollment yet.
        </p>
      ) : (
        <div className="mt-10 space-y-12">
          {programmes.length > 0 ? (
            <div>
              <h3 className="font-heading text-2xl font-semibold text-[#0E121B]">Programmes</h3>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {programmes.map((programme) => (
                  <CatalogueCard
                    key={programme.id}
                    title={programme.title}
                    detail={
                      programme.shortDescription ??
                      programme.description ??
                      (programme.courses?.length
                        ? `${programme.courses.length} courses`
                        : "6-month and 12-month offers")
                    }
                    href={`/catalogue/programme/${programme.id}`}
                    action="See offers"
                  />
                ))}
              </div>
            </div>
          ) : null}
          {courses.length > 0 ? (
            <div>
              <h3 className="font-heading text-2xl font-semibold text-[#0E121B]">Courses</h3>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {courses.map((course) => (
                  <CatalogueCard
                    key={course.id}
                    title={course.title}
                    detail={course.shortDescription ?? course.description ?? course.duration}
                    href={`/catalogue/course/${course.id}`}
                    action="See offers"
                  />
                ))}
              </div>
            </div>
          ) : null}
          {products.length > 0 ? (
            <div>
              <h3 className="font-heading text-2xl font-semibold text-[#0E121B]">Products</h3>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {products.map((product) => (
                  <CatalogueCard
                    key={product.id}
                    title={product.name}
                    detail={product.shortDescription}
                    href={`/catalogue/product/${product.id}`}
                    action="See offers"
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </SectionShell>
  )
}

export function ProofSection() {
  return (
    <SectionShell id="stories">
      <h2 className="font-heading text-heading font-semibold text-[#0E121B]">
        Hear it from mentees who got the offer
      </h2>
      <p className="mt-3 max-w-2xl text-copy text-[#525866]">
        Story videos from fairchildinstitute.com — plus Class of 2025 alumni in their own
        words.
      </p>

      <TestimonialVideos />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((item) => (
          <blockquote
            key={item.name}
            className="rounded-[1.5rem] border border-[#E8D5E6] bg-[#FDF5F9] p-6"
          >
            <p className="text-base leading-relaxed text-[#0E121B]">“{item.quote}”</p>
            <footer className="mt-5">
              <p className="font-heading font-semibold text-[#631760]">{item.name}</p>
              <p className="text-sm text-[#525866]">{item.role}</p>
            </footer>
          </blockquote>
        ))}
      </div>

      <details className="group mt-8 rounded-[1.5rem] border border-[#E8D5E6] bg-white open:pb-2">
        <summary className="cursor-pointer list-none px-5 py-4 font-heading text-base font-semibold text-[#631760] marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-3">
            More alumni voices
            <span className="text-[#AD14A7] transition group-open:rotate-45">+</span>
          </span>
        </summary>
        <div className="grid gap-4 border-t border-[#E8D5E6] px-5 py-5 md:grid-cols-3">
          {moreTestimonials.map((item) => (
            <blockquote key={item.name}>
              <p className="text-sm leading-relaxed text-[#0E121B]">“{item.quote}”</p>
              <footer className="mt-3">
                <p className="font-heading text-sm font-semibold text-[#631760]">
                  {item.name}
                </p>
                <p className="text-xs text-[#525866]">{item.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </details>

      <div className="mt-10 rounded-[1.5rem] border border-[#E8D5E6] bg-[#FEF5FE] p-6 sm:p-8">
        <h3 className="font-heading text-xl font-semibold text-[#631760] sm:text-2xl">
          {linkedInProof.title}
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#525866] sm:text-base">
          {linkedInProof.body}
        </p>
        <a
          href={linkedInProof.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-sm font-medium text-[#AD14A7] hover:underline"
        >
          {linkedInProof.linkLabel} →
        </a>
      </div>

      <div className="mt-10 flex justify-center">
        <GradientPillButton href="/#programmes">Save my seat</GradientPillButton>
      </div>
    </SectionShell>
  )
}

export function PricingSection() {
  return (
    <SectionShell id="pricing" bleed className="bg-[#FDF5F9]">
      <h2 className="font-heading text-heading font-semibold text-[#0E121B]">
        {pricingOverview.title}
      </h2>
      <p className="mt-3 max-w-2xl text-copy text-[#525866]">{pricingOverview.baseFee}</p>

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
            <p className="mt-2 font-heading text-2xl font-semibold text-[#631760]">
              {row.normal}
              <span className="ml-2 text-sm font-medium text-[#525866]">list</span>
            </p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#525866]">
              {row.options}
            </p>
            <span className="mt-4 text-sm font-medium text-[#AD14A7] group-hover:underline">
              Choose a programme →
            </span>
          </Link>
        ))}
      </div>
    </SectionShell>
  )
}

export function FellowshipSection() {
  return (
    <SectionShell id="fellowship">
      <div className="grid gap-8 rounded-[1.75rem] border border-[#E8D5E6] bg-[#FEF5FE] p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:p-10">
        <div>
          <h2 className="font-heading text-heading font-semibold text-[#0E121B]">
            {fellowshipBlurb.title}
          </h2>
          <p className="mt-4 max-w-2xl text-copy text-[#525866]">{fellowshipBlurb.body}</p>
        </div>
        <GradientPillButton href="/#programmes" className="w-fit">
          View products
        </GradientPillButton>
      </div>
    </SectionShell>
  )
}

export async function FinancialAidSection() {
  const portalUrl = await applicationPortalUrl()

  return (
    <SectionShell bleed className="bg-gradient-cta">
      <h2 className="font-heading text-heading font-semibold text-[#0E121B]">
        {financialAid.title}
      </h2>
      <p className="mt-4 max-w-2xl text-copy text-[#525866]">{financialAid.lead}</p>
      <ol className="mt-5 max-w-2xl list-decimal space-y-2 pl-5 text-[#525866]">
        {financialAid.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className="mt-6">
        <GradientPillButton href={portalUrl}>{financialAid.cta}</GradientPillButton>
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
            <AccordionContent className="text-[#525866]">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionShell>
  )
}

export function SpotObjectionSection() {
  return (
    <SectionShell bleed className="bg-gradient-purple text-white">
      <h2 className="max-w-3xl font-heading text-heading font-semibold">
        “{spotObjection.title}”
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
        {spotObjection.body}
      </p>
      <div className="mt-8">
        <GradientPillButton href="/#programmes">Save my seat</GradientPillButton>
      </div>
    </SectionShell>
  )
}

export async function ClosingCta() {
  const portalUrl = await applicationPortalUrl()

  return (
    <SectionShell className="pb-28 md:pb-24">
      <div className="cta-section-card border border-[#E8D5E6] bg-gradient-cta text-center">
        <p className="font-miriam-libre text-sm font-semibold tracking-[0.12em] text-[#AD14A7] uppercase">
          Quick recap
        </p>
        <h2 className="mt-3 font-heading text-heading font-semibold text-[#0E121B]">
          Claim your 2027 seat
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[#525866]">
          $250 today toward the $500 base fee. Pick a programme, pay on that page, and
          get a receipt plus a FairChild follow-up.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <GradientPillButton href="/#programmes">Save my seat</GradientPillButton>
          <GradientPillButton href={portalUrl} variant="outline">
            {financialAid.cta}
          </GradientPillButton>
        </div>
      </div>
    </SectionShell>
  )
}
