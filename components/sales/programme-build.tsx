import { Plus, X } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function ProgrammeBuild({
  heading,
  intro,
  projects,
}: {
  heading: string
  intro?: string
  projects: { title: string; summary: string; skills: string[] }[]
}) {
  return (
    <section className="border-b border-[#E8D5E6] bg-[linear-gradient(180deg,#94008D_0%,#94008D_43.55%,#4D0044_96.79%)]">
      <div className="mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20">
        <h2 className="max-w-3xl font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-white">
          {heading}
        </h2>
        {intro ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            {intro}
          </p>
        ) : null}
        <Accordion
          className="mt-10 gap-3"
          defaultValue={[projects[0]?.title ?? ""]}
        >
          {projects.map((project, index) => (
            <AccordionItem
              key={project.title}
              value={project.title}
              className="rounded-2xl border border-[#E8D5E6] bg-white px-5 not-last:border-b sm:px-6"
            >
              <AccordionTrigger className="cursor-pointer items-center py-5 font-heading text-lg font-medium text-[#0E121B] hover:no-underline sm:text-xl [&_[data-slot=accordion-trigger-icon]]:hidden">
                <span>{project.title}</span>
                <Plus
                  className="ml-auto size-5 shrink-0 text-[#525866] group-aria-expanded/accordion-trigger:hidden"
                  aria-hidden
                />
                <X
                  className="ml-auto hidden size-5 shrink-0 text-[#525866] group-aria-expanded/accordion-trigger:block"
                  aria-hidden
                />
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-[#0E121B]">
                <span className="inline-flex rounded-md bg-[#FEF5FE] px-2.5 py-1 text-xs font-medium text-[#631760]">
                  Project {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 max-w-3xl font-heading text-xl leading-snug font-medium tracking-[-0.03em] text-[#0E121B]">
                  {project.summary}
                </p>
                <div className="mt-6 rounded-xl bg-[#F6F4F5] p-5">
                  <p className="text-sm font-semibold text-[#0E121B]">
                    Skills shown
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-lg border border-[#E8D5E6] bg-white px-3 py-1.5 text-sm text-[#0E121B]"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
