import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type ProgrammeAudienceItem = {
  title: string
  body: string
  icon: LucideIcon
}

export function ProgrammeAudience({
  heading,
  audiences,
  note,
}: {
  heading: string
  audiences: ProgrammeAudienceItem[]
  note?: string
}) {
  return (
    <section className="border-b border-[#E8D5E6] bg-white">
      <div className="mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20">
        <h2 className="max-w-3xl font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-[#0E121B]">
          {heading}
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
          {audiences.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className={cn(
                  "md:px-8",
                  index === 0 && "md:pl-0",
                  index === audiences.length - 1 && "md:pr-0",
                  index > 0 && "md:border-l md:border-[#E1E4EA]"
                )}
              >
                <Icon
                  className="size-6 text-[#631760]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="mt-5 font-heading text-xl leading-tight font-semibold tracking-[-0.03em] text-[#0E121B]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#525866]">
                  {item.body}
                </p>
              </div>
            )
          })}
        </div>
        {note ? (
          <p className="mt-12 max-w-3xl text-sm leading-relaxed text-[#525866]">
            {note}
          </p>
        ) : null}
      </div>
    </section>
  )
}
