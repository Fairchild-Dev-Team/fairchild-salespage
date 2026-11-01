import { Sparkles } from "lucide-react"

export type CourseModule = {
  title: string
  subtitle?: string
  weeks: [start: number, end: number]
}

// One shade per module, light enough at the end to still read on white.
const moduleShades = [
  "#94008D",
  "#7A0A72",
  "#631760",
  "#4D0044",
  "#932784",
  "#AD14A7",
]

function weekSpan([start, end]: CourseModule["weeks"]) {
  return end - start + 1
}

export function CourseModules({
  heading,
  intro,
  modules,
  throughline,
  note,
}: {
  heading: string
  intro?: string
  modules: CourseModule[]
  /** A thread that runs under every module, such as tools used throughout. */
  throughline?: string
  note?: string
}) {
  const totalWeeks = Math.max(...modules.map((module) => module.weeks[1]))
  const weeks = Array.from({ length: totalWeeks }, (_, index) => index + 1)

  return (
    <section className="border-b border-[#E8D5E6] bg-white">
      <div className="mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-3xl font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-[#0E121B]">
              {heading}
            </h2>
            {intro ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#525866]">
                {intro}
              </p>
            ) : null}
          </div>
          <ul className="flex shrink-0 gap-8">
            {[
              { value: modules.length, label: "modules" },
              { value: totalWeeks, label: "weeks" },
            ].map((fact) => (
              <li key={fact.label}>
                <p className="font-heading text-3xl font-semibold tracking-[-0.04em] text-[#631760]">
                  {fact.value}
                </p>
                <p className="mt-1 text-sm text-[#525866]">{fact.label}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 rounded-[28px] border border-[#E8D5E6] bg-[#FEF5FE] p-4 sm:p-6">
          <div
            aria-hidden
            className="flex h-14 gap-1 overflow-hidden rounded-2xl"
          >
            {modules.map((module, index) => (
              <div
                key={module.title}
                className="flex items-center px-3 font-heading text-sm font-semibold text-white"
                style={{
                  flexGrow: weekSpan(module.weeks),
                  flexBasis: 0,
                  backgroundColor: moduleShades[index % moduleShades.length],
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
            ))}
          </div>

          {throughline ? (
            <div
              aria-hidden
              className="mt-2 flex h-9 items-center gap-2 rounded-xl border border-dashed border-[#FA9BF6] bg-white px-3 text-xs font-medium text-[#631760] sm:text-sm"
            >
              <Sparkles className="size-4 shrink-0" strokeWidth={1.5} />
              <span className="truncate">{throughline}</span>
            </div>
          ) : null}

          <ol
            aria-hidden
            className="mt-3 hidden text-center text-[11px] text-[#525866] md:flex"
          >
            {weeks.map((week) => (
              <li key={week} className="flex-1 basis-0 tabular-nums">
                {week}
              </li>
            ))}
          </ol>
          <div
            aria-hidden
            className="mt-3 flex justify-between text-xs text-[#525866] md:hidden"
          >
            <span>Week 1</span>
            <span>Week {totalWeeks}</span>
          </div>
        </div>

        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((module, index) => {
            const shade = moduleShades[index % moduleShades.length]
            const span = weekSpan(module.weeks)
            return (
              <li
                key={module.title}
                className="flex flex-col overflow-hidden rounded-[24px] border border-[#E8D5E6] bg-white"
              >
                <span
                  aria-hidden
                  className="h-1.5"
                  style={{ backgroundColor: shade }}
                />
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="flex size-10 items-center justify-center rounded-full font-heading text-sm font-semibold text-white"
                      style={{ backgroundColor: shade }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-[#FEF5FE] px-3 py-1 text-xs font-medium text-[#631760]">
                      {span} {span === 1 ? "week" : "weeks"}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-xl leading-tight font-semibold tracking-[-0.03em] text-[#0E121B]">
                    {module.title}
                  </h3>
                  {module.subtitle ? (
                    <p className="mt-2 text-sm leading-relaxed text-[#525866]">
                      {module.subtitle}
                    </p>
                  ) : null}
                  <p className="mt-auto pt-6 text-sm font-medium text-[#0E121B]">
                    Weeks {module.weeks[0]}–{module.weeks[1]}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>

        {note ? (
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[#525866]">
            {note}
          </p>
        ) : null}
      </div>
    </section>
  )
}
