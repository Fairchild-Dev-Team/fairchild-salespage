import Image from "next/image"
import Link from "next/link"

import { AnimatedHeadline } from "@/components/ui/animated-headline"
import { ButtonArrowIcon } from "@/components/ui/button-arrow-icon"
import {
  brandPinkHoverClass,
  brandPinkHoverInsetClass,
} from "@/lib/buttonStyles"
import { salesHero } from "@/lib/sales-content"
import { cn } from "@/lib/utils"

function StatusDot() {
  return (
    <span
      className="flex aspect-square size-4 shrink-0 items-center justify-center rounded-full bg-[rgba(147,39,132,0.3)]"
      aria-hidden
    >
      <span className="size-[5px] shrink-0 rounded-full bg-[#fa9bf6] shadow-[0_0_8px_#fa9bf6]" />
    </span>
  )
}

export function SalesHero() {
  const { visual } = salesHero

  return (
    <section className="hero-section relative flex min-h-0 w-full flex-col overflow-x-hidden text-[#0E121B] lg:min-h-svh">
      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-page flex-1 flex-col px-6 lg:px-[120px]">
        {/* Room for the sticky SalesHeroNav that the page lays over the hero. */}
        <div className="h-[100px] shrink-0 sm:h-[76px]" aria-hidden />

        <div className="relative mx-auto grid min-h-0 w-full max-w-[1200px] flex-1 grid-cols-1 gap-8 pt-4 pb-12 sm:gap-10 sm:pt-6 sm:pb-16 lg:grid-cols-2 lg:items-center lg:gap-8 lg:pt-6 lg:pb-10 xl:gap-10">
          <div className="min-w-0">
            <div className="hero-enrolling-badge mb-4 sm:mb-6">
              <StatusDot />
              <span className="text-xs font-semibold tracking-widest text-[#0E121B] uppercase">
                {salesHero.announcement}
              </span>
            </div>

            <AnimatedHeadline
              className="hero-headline max-w-none sm:max-w-2xl"
              stagger={0.26}
              initialDelay={0.16}
            >
              <span className="animated-headline-line">
                <span className="hero-headline-gradient">
                  {salesHero.headline.line1}
                </span>
              </span>
              <span className="animated-headline-line">
                <span className="hero-headline-gradient">
                  {salesHero.headline.line2Lead}
                  {salesHero.headline.line2Accent}
                </span>
              </span>
              <span className="animated-headline-line">
                <span className="hero-headline-gradient">
                  {salesHero.headline.line3Accent}
                </span>
              </span>
            </AnimatedHeadline>

            <p className="mt-4 max-w-lg font-sans text-base leading-relaxed text-[#525866] sm:mt-6 sm:text-lg">
              {salesHero.subhead.lead}
              <span className="text-[#932784]">{salesHero.subhead.accent}</span>
            </p>

            <p className="mt-3 max-w-lg font-sans text-base leading-relaxed text-[#525866] sm:mt-4 sm:text-lg">
              {salesHero.support}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:w-fit sm:grid-cols-2 sm:gap-4">
              <Link
                href="/#programmes"
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0E121B] px-6 py-3 text-sm font-semibold text-white shadow-[0_9px_10.7px_rgba(250,155,246,0.25)]",
                  brandPinkHoverClass,
                  brandPinkHoverInsetClass
                )}
              >
                <span>{salesHero.primaryCta}</span>
                <ButtonArrowIcon className="text-white" />
              </Link>
              <Link
                href="/#programmes"
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#0E121B] bg-transparent px-6 py-3 text-sm font-semibold text-[#0E121B] shadow-none",
                  brandPinkHoverClass
                )}
              >
                {salesHero.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[520px] min-w-0 items-center justify-center justify-self-center overflow-visible lg:max-w-none lg:justify-self-end">
            <div className="relative mx-auto w-full max-w-[min(520px,100%)] min-w-0 py-8 sm:py-10 lg:py-4">
              <div className="hero-image-frame relative mx-auto h-[min(360px,52vh)] w-full max-w-[520px] min-w-0 overflow-visible sm:h-[min(440px,58vh)] md:h-[min(520px,65vh)] lg:h-[min(593px,72vh)] lg:w-full">
                <div className="hero-image-media absolute inset-0 overflow-hidden rounded-[inherit]">
                  <Image
                    src={visual.image.src}
                    alt={visual.image.alt}
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 1024px) 90vw, 520px"
                  />
                </div>

                <div className="hero-float-card hero-job-card">
                  <div className="flex items-center gap-2">
                    <StatusDot />
                    <span className="hero-card-label">
                      {visual.outcomeCard.eyebrow}
                    </span>
                  </div>
                  <p className="font-heading text-base leading-tight font-semibold tracking-[-0.6px] text-white sm:text-[20px] sm:leading-none">
                    {visual.outcomeCard.title}
                  </p>
                  <p className="text-xs leading-relaxed text-white">
                    {visual.outcomeCard.meta}
                  </p>
                </div>

                <div className="hero-float-card hero-score-card">
                  <div className="flex items-center gap-2">
                    <StatusDot />
                    <span className="hero-card-label">
                      {visual.salaryCard.eyebrow}
                    </span>
                  </div>
                  <p className="font-heading text-[36px] leading-none font-medium tracking-[-1.08px] text-white sm:text-[48px] sm:tracking-[-1.44px]">
                    {visual.salaryCard.value}
                  </p>
                  <div className="h-[4px] w-full overflow-hidden rounded-full bg-white/[0.08]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "94%",
                        borderRadius: "99px",
                        background: "#FA9BF6",
                        boxShadow: "0 4px 19.8px 2px rgba(250, 155, 246, 0.35)",
                      }}
                    />
                  </div>
                  <p className="text-xs leading-relaxed text-[#525866]">
                    {visual.salaryCard.meta}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
