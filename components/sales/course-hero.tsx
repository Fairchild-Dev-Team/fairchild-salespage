import Link from "next/link"

import {
  brandPinkHoverClass,
  brandPinkHoverInsetClass,
} from "@/lib/buttonStyles"
import { formatCataloguePrice } from "@/lib/catalogue"
import { COURSE_DEPOSIT_USD, courseOffer } from "@/lib/programmes/shared"
import { cn } from "@/lib/utils"

export type CourseHeroProps = {
  title: string
  summary: string
  pills: string[]
  programme: { title: string; href: string; priceUsd: number | null }
  position: { index: number; total: number }
  facts: { label: string; value: string }[]
  priceUsd: number | null
  ctaHref: string
}

export function CourseHero({
  title,
  summary,
  pills,
  programme,
  position,
  facts,
  priceUsd,
  ctaHref,
}: CourseHeroProps) {
  const offer = courseOffer(priceUsd)
  const courseNumber = String(position.index + 1).padStart(2, "0")
  const courseTotal = String(position.total).padStart(2, "0")

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.72fr)] lg:gap-12">
      <div>
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm"
        >
          <Link
            href={programme.href}
            className="cursor-pointer font-medium text-[#FA9BF6] underline-offset-4 hover:underline"
          >
            {programme.title}
          </Link>
          <span aria-hidden className="text-white/40">
            /
          </span>
          <span className="text-white/70">
            Course {courseNumber} of {courseTotal}
          </span>
        </nav>

        <div className="mt-6 flex flex-wrap gap-2">
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full bg-[#FEF5FE] px-3.5 py-1.5 text-sm font-medium text-[#0E121B]"
            >
              {pill}
            </span>
          ))}
        </div>

        <h1 className="hero-headline mt-6 max-w-3xl text-white">{title}</h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          {summary}
        </p>
      </div>

      <aside className="rounded-[1.5rem] border border-white/10 bg-[#1A0614]/80 p-6 text-white shadow-[0_16px_40px_rgba(14,18,27,0.25)] backdrop-blur-md sm:p-7">
        <p className="font-heading text-lg font-semibold tracking-tight">
          {title}
        </p>
        <p className="mt-4 text-sm text-white/70">Course outline</p>
        <dl className="mt-4 grid grid-cols-[5.5rem_1fr] gap-y-3 text-sm">
          {facts.map((fact) => (
            <div key={fact.label} className="contents">
              <dt className="text-white/60">{fact.label}</dt>
              <dd className="font-medium">{fact.value}</dd>
            </div>
          ))}
          <dt className="text-white/60">Program</dt>
          <dd className="font-medium">
            <Link
              href={programme.href}
              className="cursor-pointer underline decoration-white/30 underline-offset-4 hover:decoration-[#FA9BF6]"
            >
              {programme.title}
            </Link>
          </dd>
        </dl>
        <div className="my-6 h-px bg-white/15" />
        <p className="flex items-center gap-2 text-sm text-white/70">
          This course
          {offer.percentOff != null ? (
            <span className="rounded-md bg-[#FA9BF6] px-1.5 py-0.5 text-xs font-semibold text-[#631760]">
              {offer.percentOff}% off
            </span>
          ) : null}
        </p>
        <p className="mt-2 flex items-baseline gap-3 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          {formatCataloguePrice(offer.offerUsd)}
          {offer.struckUsd != null ? (
            <s className="text-xl font-medium text-white/55">
              {formatCataloguePrice(offer.struckUsd)}
            </s>
          ) : null}
        </p>
        <p className="mt-2 text-sm text-white/70">
          Secure your spot with {formatCataloguePrice(COURSE_DEPOSIT_USD)}.
        </p>
        <Link
          href={ctaHref}
          className={cn(
            "mt-6",
            "inline-flex cursor-pointer items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0E121B] shadow-[0_9px_10.7px_rgba(250,155,246,0.25)]",
            brandPinkHoverClass,
            brandPinkHoverInsetClass
          )}
        >
          Enroll Now
        </Link>
        {programme.priceUsd != null ? (
          <p className="mt-3 text-sm text-white/70">
            or get all {position.total} courses in the{" "}
            <Link
              href={`${programme.href}#pricing`}
              className="cursor-pointer font-medium text-[#FA9BF6] underline underline-offset-4 hover:text-white"
            >
              full program
            </Link>
            .
          </p>
        ) : null}
      </aside>
    </div>
  )
}
