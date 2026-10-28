import Image from "next/image"
import Link from "next/link"
import { AnimatedHeadline } from "@/components/ui/animated-headline"
import { GradientPillButton } from "@/components/ui/gradient-pill-button"
import { salesHero } from "@/lib/sales-content"

export function SalesHero() {
  return (
    <section className="relative overflow-hidden text-white">
      <Image
        src="/images/sales/hero-mentee.jpg"
        alt="FairChild mentees collaborating during a cohort session"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-[#1A0A2E]/72" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(173,20,167,0.45),_transparent_58%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1A0A2E]/90 to-transparent" />

      <div className="relative mx-auto flex min-h-[min(88vh,52rem)] w-full max-w-page flex-col justify-center gap-6 px-4 py-16 lg:px-[120px] lg:py-24">
        <p className="font-miriam-libre text-sm font-semibold tracking-[0.14em] text-[#FA9BF6] uppercase">
          {salesHero.announcement}
        </p>
        <AnimatedHeadline
          as="h1"
          className="font-heading text-display max-w-5xl font-semibold tracking-tight"
          lineTexts={[...salesHero.headlineLines]}
        />
        <p className="max-w-xl text-lg text-white/85">{salesHero.support}</p>
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <GradientPillButton href="/#programmes">
            {salesHero.primaryCta}
          </GradientPillButton>
          <Link
            href="/#pricing"
            className="font-heading text-base font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
          >
            {salesHero.secondaryCta}
          </Link>
        </div>
        <ul className="flex flex-col gap-1 pt-1 sm:flex-row sm:flex-wrap sm:gap-x-6">
          {salesHero.qualifiers.map((item) => (
            <li
              key={item}
              className="font-miriam-libre text-sm text-[#FA9BF6] italic"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
