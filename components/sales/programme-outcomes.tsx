import type { LucideIcon } from "lucide-react"

export type ProgrammeOutcome = {
  title: string
  icon: LucideIcon
}

export function ProgrammeOutcomes({
  heading,
  intro,
  roles = [],
  note,
}: {
  heading: string
  intro: string
  roles?: ProgrammeOutcome[]
  note?: string
}) {
  return (
    <section className="border-b border-[#E8D5E6] bg-[#FEF5FE]">
      <div className="mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20">
        <h2 className="max-w-3xl font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-[#0E121B]">
          {heading}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#525866] sm:text-lg">
          {intro}
        </p>
        {roles.length ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => {
              const Icon = role.icon
              return (
                <li
                  key={role.title}
                  className="flex items-center gap-4 rounded-[24px] border border-[#E8D5E6] bg-white px-5 py-5"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#FEF5FE] text-[#631760]">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="font-heading text-lg leading-snug font-semibold tracking-[-0.03em] text-[#0E121B]">
                    {role.title}
                  </h3>
                </li>
              )
            })}
          </ul>
        ) : null}
        {note ? (
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#525866]">
            {note}
          </p>
        ) : null}
      </div>
    </section>
  )
}
