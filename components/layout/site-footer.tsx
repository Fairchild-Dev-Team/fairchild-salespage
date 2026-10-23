"use client"

import Image from "next/image"

import { ProcessSlideIn } from "@/components/motion/process-slide-in"
import { brandPinkHoverClass } from "@/lib/buttonStyles"
import { footerMeta, footerSocialLinks } from "@/lib/footer"
import { cn } from "@/lib/utils"

export function SiteFooter({ revealed = true }: { revealed?: boolean }) {
  return (
    <div className="flex w-full flex-col">
      <div className="h-px w-full bg-[#E1E4EA]" aria-hidden />

      <ProcessSlideIn
        revealed={revealed}
        direction="left"
        delay={0.18}
        className="flex w-full flex-col items-center gap-8 pt-8 text-center lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:pt-8 lg:text-left xl:gap-12"
      >
        <div className="flex flex-col items-center gap-3 lg:items-start">
          <Image
            src="/brand/logo-black.svg"
            alt="FairChild"
            width={185}
            height={39}
            className="h-auto w-[min(185px,50vw)]"
          />
          <p className="text-sm font-medium leading-[22px] tracking-[-0.084px] text-[#525866]">
            {footerMeta.copyright}
          </p>
        </div>

        <p className="max-w-[280px] text-sm font-medium leading-[22px] tracking-[-0.084px] text-[#525866] lg:max-w-none lg:flex-1 lg:text-center">
          {footerMeta.address}
        </p>

        <div className="flex items-center justify-center gap-4 lg:justify-end">
          {footerSocialLinks.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn(
                "flex size-10 items-center justify-center rounded-full border border-[#E1E4EA] bg-white/60 shadow-[0_4px_12px_rgba(250,155,246,0.15)]",
                brandPinkHoverClass
              )}
            >
              <Image src={icon} alt="" width={24} height={24} />
            </a>
          ))}
        </div>
      </ProcessSlideIn>
    </div>
  )
}
