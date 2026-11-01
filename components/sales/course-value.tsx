import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"

import {
  brandPinkHoverClass,
  brandPinkHoverInsetClass,
} from "@/lib/buttonStyles"
import { formatCataloguePrice } from "@/lib/catalogue"
import { cn } from "@/lib/utils"

export type CourseValueCourse = {
  id: string
  title: string
  priceUsd: number | null
}

export function CourseValue({
  heading,
  course,
  courseIncludes,
  programme,
}: {
  heading: string
  course: CourseValueCourse
  courseIncludes: string
  programme: {
    title: string
    href: string
    priceUsd: number
    includes: string
    courses: CourseValueCourse[]
  }
}) {
  // With any course unpriced the separate total is unknown, so no saving is shown.
  const allPriced = programme.courses.every((item) => item.priceUsd != null)
  const separateTotal = programme.courses.reduce(
    (total, item) => total + (item.priceUsd ?? 0),
    0
  )
  const saving = allPriced ? separateTotal - programme.priceUsd : 0

  return (
    <section className="border-b border-[#E8D5E6] bg-[#FEF5FE]">
      <div className="mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20">
        <h2 className="max-w-3xl font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-[#0E121B]">
          {heading}
        </h2>

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <article className="flex flex-col rounded-[28px] border border-[#E8D5E6] bg-white p-6 sm:p-8">
            <p className="text-sm font-medium text-[#631760]">This course</p>
            <h3 className="mt-3 font-heading text-2xl leading-tight font-semibold tracking-[-0.03em] text-[#0E121B]">
              {course.title}
            </h3>
            <p className="mt-6 font-heading text-5xl font-semibold tracking-[-0.04em] text-[#0E121B]">
              {course.priceUsd != null
                ? formatCataloguePrice(course.priceUsd)
                : "Price to be set"}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#525866]">
              {courseIncludes}
            </p>
            <div className="mt-auto pt-8">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#0E121B] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Enroll Now
              </button>
            </div>
          </article>

          <article className="flex flex-col rounded-[28px] bg-[linear-gradient(180deg,#94008D_0%,#94008D_43.55%,#4D0044_96.79%)] p-6 text-white sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#FA9BF6]">
                  Full program
                </p>
                <h3 className="mt-3 font-heading text-2xl leading-tight font-semibold tracking-[-0.03em]">
                  {programme.title}
                </h3>
              </div>
              {saving > 0 ? (
                <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-[#631760]">
                  Save {formatCataloguePrice(saving)}
                </span>
              ) : null}
            </div>
            <p className="mt-6 flex flex-wrap items-baseline gap-x-3 font-heading text-5xl font-semibold tracking-[-0.04em]">
              {formatCataloguePrice(programme.priceUsd)}
              {saving > 0 ? (
                <span className="text-xl font-medium tracking-[-0.02em] text-white/55 line-through">
                  {formatCataloguePrice(separateTotal)}
                </span>
              ) : null}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              {programme.includes}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {programme.courses.map((item) => {
                const isCurrent = item.id === course.id
                return (
                  <li key={item.id}>
                    {isCurrent ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#631760]">
                        <Check className="size-3.5" aria-hidden />
                        {item.title}
                        <span className="sr-only">(this course)</span>
                      </span>
                    ) : (
                      <Link
                        href={`/catalogue/course/${item.id}`}
                        className="inline-flex cursor-pointer rounded-full border border-white/25 px-3 py-1.5 text-xs font-medium text-white/90 transition-colors hover:border-[#FA9BF6] hover:text-white"
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>

            <Link
              href={programme.href}
              className={cn(
                "mt-8 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0E121B] shadow-[0_9px_10.7px_rgba(250,155,246,0.25)]",
                brandPinkHoverClass,
                brandPinkHoverInsetClass
              )}
            >
              View program
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
