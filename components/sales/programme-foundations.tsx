export type IllustratedPoint = {
  title: string
  body: string
  illustration: string
}

export const fairchildLearning = {
  heading: "How learning works at FairChild",
  items: [
    {
      title: "Fully online and self-paced",
      body: "Study from anywhere, on your own schedule, through the FairChild learning portal.",
      illustration: "/images/sales/details/lock.svg",
    },
    {
      title: "Learn by doing",
      body: "Every course ends with practical work, and the projects build a portfolio employers can review.",
      illustration: "/images/sales/path/practice.svg",
    },
    {
      title: "Choose your pace",
      body: "Finish in 6 months on the accelerated track or spread the work over 12 months.",
      illustration: "/images/sales/details/choose.svg",
    },
    {
      title: "Join the fellows community",
      body: "Connect with other FairChild fellows working through the same courses.",
      illustration: "/images/sales/path/offer.svg",
    },
    {
      title: "Add mentorship and career support",
      body: "Pair the institute with Guided Mentorship & Career Development, or join through the FairChild Fellowship, for interview preparation and career coaching.",
      illustration: "/images/sales/path/proof.svg",
    },
  ],
}

function IllustratedCards({
  heading,
  items,
  className,
  cardClassName,
}: {
  heading: string
  items: IllustratedPoint[]
  className: string
  cardClassName: string
}) {
  return (
    <section className={className}>
      <div className="mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20">
        <h2 className="max-w-3xl font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-[#0E121B]">
          {heading}
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.title} className={cardClassName}>
              <div className="flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-white px-3">
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG illustration; next/image does not optimise SVGs */}
                <img
                  src={item.illustration}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="mt-4 font-heading text-xl leading-tight font-semibold tracking-[-0.03em] text-[#0E121B]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#525866]">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ProgrammeRequirements({
  heading,
  items,
}: {
  heading: string
  items: IllustratedPoint[]
}) {
  return (
    <IllustratedCards
      heading={heading}
      items={items}
      className="border-b border-[#E8D5E6] bg-[#FEF5FE]"
      cardClassName="flex flex-col rounded-[28px] border border-[#E8D5E6] bg-white p-4 sm:p-5"
    />
  )
}

export function ProgrammeLearning({
  heading,
  items,
}: {
  heading: string
  items: IllustratedPoint[]
}) {
  return (
    <IllustratedCards
      heading={heading}
      items={items}
      className="border-b border-[#E8D5E6] bg-white"
      cardClassName="flex flex-col rounded-[28px] bg-[#FEF5FE] p-4 sm:p-5"
    />
  )
}
