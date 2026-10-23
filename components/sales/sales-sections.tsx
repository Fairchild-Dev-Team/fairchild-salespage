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
  epiphany,
  falseBeliefs,
  faqs,
  fellowshipBlurb,
  financialAid,
  howItWorks,
  linkedInProof,
  midCta,
  moreTestimonials,
  pricingOverview,
  problem,
  testimonials,
} from "@/lib/sales-content"
import {
  formatUsd,
  otherOffers,
  programmes,
  typeLabel,
  type Product,
} from "@/lib/products"
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
  return (
    <SectionShell className="border-b border-[#E8D5E6] bg-[#FEF5FE] !py-8 lg:!py-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {credibility.map((item) => (
          <div key={item.label} className="text-center sm:text-left">
            <p className="font-heading text-3xl font-semibold text-accent-gradient sm:text-4xl">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-[#525866]">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-3 border-t border-[#E8D5E6] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold tracking-wide text-[#631760] uppercase">
          Mentees have worked with firms like
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {employerNames.map((name) => (
            <li
              key={name}
              className="font-heading text-sm font-semibold tracking-tight text-[#0E121B]/70"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}

export function ProblemSection() {
  return (
    <SectionShell>
      <h2 className="font-heading text-heading max-w-3xl font-semibold text-[#0E121B]">
        {problem.title}
      </h2>
      <div className="mt-6 max-w-2xl space-y-4">
        {problem.body.map((paragraph) => (
          <p key={paragraph} className="text-copy text-[#525866]">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {falseBeliefs.map((item) => (
          <div
            key={item.belief}
            className="rounded-2xl border border-[#E8D5E6] bg-[#FDF5F9] p-5"
          >
            <p className="font-heading text-lg font-semibold text-[#631760]">
              “{item.belief}”
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
      <p className="text-sm font-semibold tracking-wide text-[#FA9BF6] uppercase">
        The FairChild method
      </p>
      <h2 className="mt-3 font-heading text-heading max-w-3xl font-semibold">
        {epiphany.title}
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-white/85">{epiphany.lead}</p>
      <ol className="mt-10 grid gap-4 md:grid-cols-2">
        {epiphany.steps.map((step, index) => (
          <li
            key={step}
            className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-[2px]"
          >
            <span className="font-heading text-2xl font-semibold text-[#FA9BF6]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="pt-1 text-base leading-relaxed text-white/90">{step}</span>
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
        How enrollment works
      </h2>
      <p className="mt-3 max-w-xl text-copy text-[#525866]">
        Four steps from “interested” to locked spot — no application maze.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {howItWorks.map((item) => (
          <div key={item.step} className="border-t-2 border-[#AD14A7] pt-4">
            <p className="font-miriam-libre text-sm font-semibold text-[#AD14A7]">
              {item.step}
            </p>
            <h3 className="mt-2 font-heading text-xl font-semibold text-[#0E121B]">
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

function ProductCard({ product }: { product: Product }) {
  const from = product.paymentOptions.reduce(
    (min, option) => Math.min(min, option.amountCents),
    product.paymentOptions[0]?.amountCents ?? 0
  )

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col rounded-[1.5rem] border border-[#E8D5E6] bg-white p-6 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(173,20,167,0.12)]"
    >
      <p className="text-xs font-semibold tracking-wide text-[#AD14A7] uppercase">
        {typeLabel[product.type]}
      </p>
      <h3 className="mt-2 font-heading text-2xl font-semibold text-[#0E121B] group-hover:text-[#631760]">
        {product.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#525866]">
        {product.tagline}
      </p>
      <div className="mt-5 flex items-end justify-between gap-3 border-t border-[#E8D5E6] pt-4">
        <div>
          <p className="text-xs text-[#525866]">{product.duration}</p>
          <p className="font-heading text-lg font-semibold text-[#631760]">
            From {formatUsd(from)}
          </p>
        </div>
        <span className="rounded-full bg-[#FEF5FE] px-3 py-1.5 text-sm font-medium text-[#AD14A7] transition-colors group-hover:bg-[#AD14A7] group-hover:text-white">
          Lock spot →
        </span>
      </div>
    </Link>
  )
}

export function ProgrammesSection() {
  return (
    <SectionShell id="programmes" bleed className="bg-[#FEF5FE]">
      <h2 className="font-heading text-heading font-semibold text-[#0E121B]">
        Choose your path
      </h2>
      <p className="mt-3 max-w-2xl text-copy text-[#525866]">
        Open an offer to lock your spot for $250 or pay tuition. Checkout takes about a
        minute.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {programmes.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
      <h3 className="mt-14 font-heading text-2xl font-semibold text-[#0E121B]">
        Courses, Interview Prep & Fellowship
      </h3>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {otherOffers.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
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
        <GradientPillButton href="/#programmes">Lock my spot — $250</GradientPillButton>
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
              View & pay →
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
        <GradientPillButton href="/products/fellowship" className="w-fit">
          View Fellowship
        </GradientPillButton>
      </div>
    </SectionShell>
  )
}

export function FinancialAidSection() {
  const mailto = `mailto:${financialAid.email}?subject=${encodeURIComponent("Financial Aid Application — West Africa")}`

  return (
    <SectionShell bleed className="bg-gradient-cta">
      <h2 className="font-heading text-heading font-semibold text-[#0E121B]">
        {financialAid.title}
      </h2>
      <p className="mt-4 max-w-2xl text-copy text-[#525866]">{financialAid.body}</p>
      <div className="mt-6">
        <GradientPillButton href={mailto}>Apply for Financial Aid</GradientPillButton>
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

export function ClosingCta() {
  return (
    <SectionShell className="pb-28 md:pb-24">
      <div className="cta-section-card border border-[#E8D5E6] bg-gradient-cta text-center">
        <p className="text-sm font-semibold tracking-wide text-[#AD14A7] uppercase">
          40 job offers in 15 months
        </p>
        <h2 className="mt-3 font-heading text-heading font-semibold text-[#0E121B]">
          Lock your 2027 spot
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-copy text-[#525866]">
          $250 today toward the $500 base fee. Pick a programme, pay securely, and get a
          receipt plus a FairChild follow-up on next steps.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <GradientPillButton href="/#programmes">Lock my spot — $250</GradientPillButton>
          <GradientPillButton
            href={`mailto:${financialAid.email}?subject=${encodeURIComponent("Financial Aid Application — West Africa")}`}
            variant="outline"
          >
            Apply for Financial Aid
          </GradientPillButton>
        </div>
      </div>
    </SectionShell>
  )
}
