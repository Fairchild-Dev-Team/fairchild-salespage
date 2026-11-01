import { ArrowRight } from "lucide-react"
import Link from "next/link"

export type RelatedProgramme = {
  title: string
  body: string
  href: string
}

export function ProgrammeRelated({
  heading,
  intro,
  programmes,
}: {
  heading: string
  intro?: string
  programmes: RelatedProgramme[]
}) {
  return (
    <section className="border-b border-[#E8D5E6] bg-white">
      <div className="mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20">
        <h2 className="max-w-3xl font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-[#0E121B]">
          {heading}
        </h2>
        {intro ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#525866]">
            {intro}
          </p>
        ) : null}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {programmes.map((programme) => (
            <li key={programme.href}>
              <Link
                href={programme.href}
                className="group flex h-full flex-col rounded-[24px] border border-[#E8D5E6] bg-[#FEF5FE] p-5 transition-colors hover:border-[#631760] sm:p-6"
              >
                <h3 className="font-heading text-xl leading-tight font-semibold tracking-[-0.03em] text-[#0E121B]">
                  {programme.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#525866]">
                  {programme.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#631760]">
                  View program
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
