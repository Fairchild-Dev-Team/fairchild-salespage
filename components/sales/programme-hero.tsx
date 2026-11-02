import Link from "next/link"

import {
  brandPinkHoverClass,
  brandPinkHoverInsetClass,
} from "@/lib/buttonStyles"
import { formatCataloguePrice } from "@/lib/catalogue"
import type { ProgrammeHeroContent } from "@/lib/programmes/types"
import { cn } from "@/lib/utils"

export function ProgrammeHero({
  title,
  priceUsd,
  pills,
  headline,
  summary,
  facts,
  priceNote,
  ctaLabel = "Enroll Now",
  ctaHref,
  cardLabel = "Program outline",
  priceLabel = "Full program",
}: ProgrammeHeroContent & {
  title: string
  priceUsd: number | null
  ctaHref: string
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.72fr)] lg:gap-12">
      <div>
        <div className="flex flex-wrap gap-2">
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full bg-[#FEF5FE] px-3.5 py-1.5 text-sm font-medium text-[#0E121B]"
            >
              {pill}
            </span>
          ))}
        </div>

        <h1 className="hero-headline mt-6 max-w-3xl text-white">{headline}</h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          {summary}
        </p>
      </div>

      <aside className="rounded-[1.5rem] border border-white/10 bg-[#1A0614]/80 p-6 text-white shadow-[0_16px_40px_rgba(14,18,27,0.25)] backdrop-blur-md sm:p-7">
        <p className="font-heading text-lg font-semibold tracking-tight">
          {title}
        </p>
        <p className="mt-4 text-sm text-white/70">{cardLabel}</p>
        <dl className="mt-4 grid grid-cols-[5.5rem_1fr] gap-y-3 text-sm">
          {facts.map((fact) => (
            <div key={fact.label} className="contents">
              <dt className="text-white/60">{fact.label}</dt>
              <dd className="font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <div className="my-6 h-px bg-white/15" />
        {priceUsd != null ? (
          <>
            <p className="text-sm text-white/70">{priceLabel}</p>
            <p className="mt-2 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              {formatCataloguePrice(priceUsd)}
            </p>
          </>
        ) : null}
        <Link
          href={ctaHref}
          className={cn(
            "inline-flex cursor-pointer items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0E121B] shadow-[0_9px_10.7px_rgba(250,155,246,0.25)]",
            priceUsd != null && "mt-6",
            brandPinkHoverClass,
            brandPinkHoverInsetClass
          )}
        >
          {ctaLabel}
        </Link>
        {priceNote ? (
          <p className="mt-3 text-sm text-white/70">{priceNote}</p>
        ) : null}
      </aside>
    </div>
  )
}
