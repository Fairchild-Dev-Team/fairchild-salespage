"use client"

import Link from "next/link"
import { useRef } from "react"

import { LogoLottie, type LogoLottieHandle } from "@/components/ui/logo-lottie"
import type { LogoSurface } from "@/lib/lottie/logoAnimation"
import { cn } from "@/lib/utils"

export function Logo({
  className,
  surface = "nav",
}: {
  className?: string
  surface?: LogoSurface
}) {
  const lottieRef = useRef<LogoLottieHandle>(null)

  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label="FairChild"
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.pause()}
      onFocus={() => lottieRef.current?.play()}
      onBlur={() => lottieRef.current?.pause()}
    >
      <LogoLottie
        ref={lottieRef}
        surface={surface}
        className="h-8 w-[160px] sm:h-9 sm:w-[180px]"
      />
    </Link>
  )
}
