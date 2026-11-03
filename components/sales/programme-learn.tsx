import { CircleCheck } from "lucide-react"

export function ProgrammeLearn({
  heading,
  items,
}: {
  heading: string
  items: string[]
}) {
  return (
    <section className="border-b border-[#E8D5E6] bg-[#FEF5FE]">
      <div className="mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20">
        <h2 className="max-w-3xl font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-[#0E121B]">
          {heading}
        </h2>
        <ul
          className={
            items.length <= 4
              ? "mt-12 grid max-w-4xl gap-x-12 gap-y-8 sm:grid-cols-2"
              : "mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CircleCheck
                className="mt-0.5 size-5 shrink-0 text-[#631760]"
                strokeWidth={1.5}
                aria-hidden
              />
              <p className="text-sm leading-relaxed text-[#0E121B]">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
