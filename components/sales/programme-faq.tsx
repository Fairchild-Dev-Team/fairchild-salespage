import { Plus, X } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export type ProgrammeFaqItem = {
  question: string
  answer: string
}

export function ProgrammeFaq({
  heading,
  items,
}: {
  heading: string
  items: ProgrammeFaqItem[]
}) {
  return (
    <section className="border-b border-[#E8D5E6] bg-[#FEF5FE]">
      <div className="mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20">
        <h2 className="max-w-3xl font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-[#0E121B]">
          {heading}
        </h2>
        <Accordion
          className="mt-10 gap-3"
          defaultValue={[items[0]?.question ?? ""]}
        >
          {items.map((item) => (
            <AccordionItem
              key={item.question}
              value={item.question}
              className="rounded-2xl border border-[#E8D5E6] bg-white px-5 not-last:border-b sm:px-6"
            >
              <AccordionTrigger className="cursor-pointer items-center py-5 font-heading text-lg font-medium text-[#0E121B] hover:no-underline sm:text-xl [&_[data-slot=accordion-trigger-icon]]:hidden">
                <span>{item.question}</span>
                <Plus
                  className="ml-auto size-5 shrink-0 text-[#525866] group-aria-expanded/accordion-trigger:hidden"
                  aria-hidden
                />
                <X
                  className="ml-auto hidden size-5 shrink-0 text-[#525866] group-aria-expanded/accordion-trigger:block"
                  aria-hidden
                />
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-[#525866]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
