"use client"

import { useLenis } from "lenis/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
  const pathname = usePathname()
  const lenis = useLenis()

  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label="FairChild"
      onClick={(event) => {
        // Already on the home page: scroll back to the top instead of a no-op navigation.
        if (pathname !== "/") return
        event.preventDefault()
        window.history.replaceState(null, "", "/")
        if (lenis) lenis.scrollTo(0)
        else window.scrollTo({ top: 0, behavior: "smooth" })
      }}
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
