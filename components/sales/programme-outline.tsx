import Link from "next/link"

import { formatCataloguePrice } from "@/lib/catalogue"

export function ProgrammeOutline({
  heading,
  intro,
  facts = [],
  courses,
  tone = "pink",
}: {
  heading: string
  intro?: string
  facts?: { value: string; label: string }[]
  /** Entries without an id are modules, shown without a course link. */
  courses: {
    id?: string
    title: string
    priceUsd: number | null
    summary: string
  }[]
  /** Background, so two outline-style sections can sit next to other pink ones. */
  tone?: "pink" | "white"
}) {
  return (
    <section
      className={
        tone === "white"
          ? "border-b border-[#E8D5E6] bg-white"
          : "border-b border-[#E8D5E6] bg-[#FEF5FE]"
      }
    >
      <div className="mx-auto grid w-full max-w-page gap-10 px-4 py-14 lg:grid-cols-[16rem_1fr] lg:items-start lg:gap-16 lg:px-[120px] lg:py-20">
        <div className="lg:sticky lg:top-8">
          <h2 className="max-w-3xl font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-[#0E121B]">
            {heading}
          </h2>
          {intro ? (
            <p className="mt-4 text-sm leading-relaxed text-[#525866]">
              {intro}
            </p>
          ) : null}
          {facts.length ? (
            <ul className="mt-8 grid grid-cols-3 gap-3 lg:grid-cols-1">
              {facts.map((fact) => (
                <li key={fact.label}>
                  <p className="font-heading text-3xl font-semibold tracking-[-0.04em] text-[#631760]">
                    {fact.value}
                  </p>
                  <p className="mt-1 text-sm text-[#525866]">{fact.label}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <ol>
          {courses.map((course, index) => (
            <li
              key={course.id ?? course.title}
              className="grid grid-cols-[2.5rem_1fr] gap-4 pb-5 last:pb-0"
            >
              <div className="relative flex items-center justify-center">
                <span
                  aria-hidden
                  className={
                    index === 0
                      ? "absolute top-1/2 -bottom-5 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,#94008D_0%,#4D0044_100%)]"
                      : index === courses.length - 1
                        ? "absolute top-0 bottom-1/2 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,#94008D_0%,#4D0044_100%)]"
                        : "absolute top-0 -bottom-5 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,#94008D_0%,#4D0044_100%)]"
                  }
                />
                <span className="relative z-10 flex size-10 items-center justify-center rounded-full border border-[#631760] bg-white font-heading text-sm font-semibold text-[#631760]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="rounded-2xl border border-[#E8D5E6] bg-white px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-heading text-lg font-semibold tracking-[-0.03em] text-[#0E121B]">
                    {course.id ? (
                      <Link
                        href={`/catalogue/course/${course.id}`}
                        className="cursor-pointer hover:text-[#631760]"
                      >
                        {course.title}
                      </Link>
                    ) : (
                      course.title
                    )}
                  </h3>
                  {course.priceUsd != null ? (
                    <p className="shrink-0 font-heading text-base font-semibold text-[#631760]">
                      {formatCataloguePrice(course.priceUsd)}
                    </p>
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#525866]">
                  {course.summary}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
