import { AnimatedHeadline } from "@/components/ui/animated-headline"
import { GradientPillButton } from "@/components/ui/gradient-pill-button"
import { salesHero } from "@/lib/sales-content"

export function SalesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(250,155,246,0.28),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1A0A2E]/40 to-transparent" />
      <div className="relative mx-auto flex min-h-[min(88vh,52rem)] w-full max-w-page flex-col justify-center gap-7 px-4 py-16 lg:px-[120px] lg:py-24">
        <p className="font-miriam-libre text-sm font-semibold tracking-[0.08em] text-[#FA9BF6] uppercase">
          {salesHero.announcement}
        </p>
        <AnimatedHeadline
          as="h1"
          className="font-heading text-hero max-w-4xl font-semibold tracking-tight"
          lineTexts={[...salesHero.headlineLines]}
        />
        <p className="max-w-xl text-copy text-white/85">{salesHero.support}</p>
        <div className="flex flex-wrap items-center gap-3">
          <GradientPillButton href="/#programmes">
            {salesHero.primaryCta}
          </GradientPillButton>
          <GradientPillButton href="/#pricing" variant="outline">
            {salesHero.secondaryCta}
          </GradientPillButton>
        </div>
        <p className="text-sm font-medium tracking-tight text-[#FA9BF6]/90">
          {salesHero.proofLine}
        </p>
      </div>
    </section>
  )
}
