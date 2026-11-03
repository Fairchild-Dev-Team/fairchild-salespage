import type { ProgrammeAudienceItem } from "@/components/sales/programme-audience"

/** Icon cards on a dark band, such as "For parents" or "What is included". */
export function ProgrammeHighlights({
  heading,
  intro,
  items,
}: {
  heading: string
  intro?: string
  items: ProgrammeAudienceItem[]
}) {
  return (
    <section className="border-b border-[#E8D5E6] bg-[#0E121B]">
      <div className="mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20">
        <h2 className="max-w-3xl font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-white">
          {heading}
        </h2>
        {intro ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
            {intro}
          </p>
        ) : null}
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <li
                key={item.title}
                className="flex flex-col rounded-2xl border border-[#E8D5E6] bg-[#FEF5FE] p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-[#631760]">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-5 font-heading text-xl leading-snug font-semibold tracking-[-0.03em] text-[#0E121B]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#525866]">
                  {item.body}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
