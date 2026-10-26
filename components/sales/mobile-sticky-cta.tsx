"use client"

import { useEffect, useState } from "react"

import { GradientPillButton } from "@/components/ui/gradient-pill-button"

export function MobileStickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E8D5E6] bg-white/95 p-3 shadow-[0_-8px_30px_rgba(99,23,96,0.1)] backdrop-blur-md md:hidden">
      <GradientPillButton href="/#programmes" className="w-full justify-center">
        Save my seat
      </GradientPillButton>
    </div>
  )
}
