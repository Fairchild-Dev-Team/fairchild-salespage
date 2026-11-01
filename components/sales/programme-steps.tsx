/** Numbered steps on the purple band, such as "How it works". */
export function ProgrammeSteps({
  heading,
  intro,
  steps,
}: {
  heading: string
  intro?: string
  steps: { title: string; body: string }[]
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
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="flex flex-col rounded-2xl border border-white/15 bg-white p-6"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-[#631760] font-heading text-sm font-semibold text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-heading text-xl leading-snug font-semibold tracking-[-0.03em] text-[#0E121B]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#525866]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
