// Fewer tools than this sit still; a moving strip would repeat the same few marks.
const MARQUEE_MIN_TOOLS = 4

function ToolMark({ name, logo }: { name: string; logo?: string }) {
  return (
    <span className="inline-flex h-14 shrink-0 items-center justify-center rounded-full border border-[#631760] bg-white px-5">
      {logo ? (
        // Simple brand marks stay as images so the carousel can move without a layout jump.
        // eslint-disable-next-line @next/next/no-img-element -- SVG logo; next/image does not optimise SVGs
        <img src={logo} alt={name} className="h-7 w-auto" />
      ) : (
        <span className="text-sm font-medium text-[#0E121B]">{name}</span>
      )}
    </span>
  )
}

export function ProgrammeSkills({
  heading,
  skills,
  tools,
}: {
  heading: string
  skills: string[]
  tools?: { name: string; logo?: string }[]
}) {
  return (
    <section className="border-b border-[#E8D5E6] bg-white">
      <div className="mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20">
        <h2 className="max-w-3xl font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-[#0E121B]">
          {heading}
        </h2>
        {skills.length ? (
          <ul className="mt-10 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-[#631760] bg-[#F3F4F6] px-4 py-2 text-sm font-medium text-[#0E121B]"
              >
                {skill}
              </li>
            ))}
          </ul>
        ) : null}
        {tools?.length && tools.length < MARQUEE_MIN_TOOLS ? (
          <ul className="mt-10 flex flex-wrap gap-4" aria-label="Tools">
            {tools.map((tool) => (
              <li key={tool.name}>
                <ToolMark name={tool.name} logo={tool.logo} />
              </li>
            ))}
          </ul>
        ) : tools?.length ? (
          <div className="tool-marquee mt-10" aria-label="Tools">
            <div className="tool-marquee-track">
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  className="flex shrink-0 items-center gap-6 pr-6"
                  aria-hidden={copy === 1}
                >
                  {tools.map((tool) => (
                    <li key={`${copy}-${tool.name}`}>
                      <ToolMark name={tool.name} logo={tool.logo} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
