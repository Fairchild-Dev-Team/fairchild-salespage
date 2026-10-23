"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import Lottie, { type LottieRefCurrentProps } from "lottie-react"

import {
  getLogoAnimation,
  LOGO_REST_FRAME,
  LOGO_START_FRAME,
  type LogoSurface,
} from "@/lib/lottie/logoAnimation"
import { cn } from "@/lib/utils"

type LogoLottieProps = {
  className?: string
  surface?: LogoSurface
  playOnMount?: boolean
}

export type LogoLottieHandle = {
  play: () => void
  pause: () => void
}

export const LogoLottie = forwardRef<LogoLottieHandle, LogoLottieProps>(
  function LogoLottie({ className, surface = "hero", playOnMount = true }, ref) {
    const lottieRef = useRef<LottieRefCurrentProps>(null)
    const [reduceMotion, setReduceMotion] = useState(false)
    const animationData = getLogoAnimation(surface)

    useEffect(() => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)")
      const update = () => setReduceMotion(media.matches)
      update()
      media.addEventListener("change", update)
      return () => media.removeEventListener("change", update)
    }, [])

    const goToRest = useCallback(() => {
      lottieRef.current?.goToAndStop(LOGO_REST_FRAME, true)
    }, [])

    useEffect(() => {
      if (reduceMotion) {
        goToRest()
      }
    }, [reduceMotion, goToRest, animationData])

    const prefersReducedMotion = useCallback(
      () =>
        reduceMotion ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      [reduceMotion]
    )

    const play = useCallback(() => {
      if (prefersReducedMotion()) return
      lottieRef.current?.goToAndStop(LOGO_START_FRAME, true)
      lottieRef.current?.play()
    }, [prefersReducedMotion])

    const pause = useCallback(() => {
      lottieRef.current?.pause()
      goToRest()
    }, [goToRest])

    const handleDOMLoaded = useCallback(() => {
      if (prefersReducedMotion()) {
        goToRest()
        return
      }
      if (playOnMount) {
        play()
      } else {
        goToRest()
      }
    }, [prefersReducedMotion, playOnMount, goToRest, play])

    const handleComplete = useCallback(() => {
      goToRest()
    }, [goToRest])

    useImperativeHandle(ref, () => ({ play, pause }), [play, pause])

    return (
      <span className={cn("inline-flex", className)} aria-hidden>
        <Lottie
          key={surface}
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={false}
          className="h-full w-full"
          onDOMLoaded={handleDOMLoaded}
          onComplete={handleComplete}
        />
      </span>
    )
  }
)
