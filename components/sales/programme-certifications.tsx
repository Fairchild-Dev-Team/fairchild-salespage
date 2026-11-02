import Link from "next/link"
import { Award } from "lucide-react"

export function ProgrammeCertifications({
  heading,
  intro,
  note,
  certifications,
}: {
  heading: string
  intro: string
  note?: string
  certifications: {
    name: string
    body: string
    /** Defaults to "Prepared in". */
    preparedInLabel?: string
    /** Entries without an id are shown as plain text. */
    preparedIn: { id?: string; title: string }[]
  }[]
}) {
  return (
    <section className="border-b border-[#E8D5E6] bg-[#0E121B]">
      <div className="mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20">
        <h2 className="flex max-w-3xl items-center gap-3 font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-white">
          <Award
            className="size-8 shrink-0 text-[#FA9BF6] sm:size-10"
            aria-hidden
          />
          {heading}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
          {intro}
        </p>
        <ul
          className={
            certifications.length === 1
              ? "mt-10 grid max-w-xl gap-4"
              : "mt-10 grid gap-4 lg:grid-cols-3"
          }
        >
          {certifications.map((certification) => (
            <li
              key={certification.name}
              className="flex flex-col rounded-2xl border border-[#E8D5E6] bg-[#FEF5FE] p-6"
            >
              <p className="text-sm font-medium text-[#631760]">
                {certification.body}
              </p>
              <h3 className="mt-3 font-heading text-xl leading-snug font-semibold tracking-[-0.03em] text-[#0E121B]">
                {certification.name}
              </h3>
              <p className="mt-6 text-sm text-[#525866]">
                {certification.preparedInLabel ?? "Prepared in"}
              </p>
              <ul className="mt-2 space-y-1">
                {certification.preparedIn.map((course) => (
                  <li key={course.id ?? course.title}>
                    {course.id ? (
                      <Link
                        href={`/catalogue/course/${course.id}`}
                        className="cursor-pointer text-sm font-medium text-[#631760] hover:underline"
                      >
                        {course.title}
                      </Link>
                    ) : (
                      <span className="text-sm font-medium text-[#0E121B]">
                        {course.title}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        {note ? (
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/70">
            {note}
          </p>
        ) : null}
      </div>
    </section>
  )
}
