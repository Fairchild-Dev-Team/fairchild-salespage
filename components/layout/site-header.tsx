"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { Logo } from "@/components/ui/logo"
import { GradientPillButton } from "@/components/ui/gradient-pill-button"
import {
  brandPinkHoverClass,
  brandPinkHoverInsetClass,
} from "@/lib/buttonStyles"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/#programmes", label: "Institutes" },
  { href: "/brochure", label: "Brochure" },
  { href: "/#stories", label: "Stories" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
] as const

export function SiteHeader({
  showCta = true,
  ctaHref = "/#programmes",
  ctaLabel = "Save my seat",
  sticky = true,
  tone = "light",
}: {
  showCta?: boolean
  ctaHref?: string
  ctaLabel?: string
  sticky?: boolean
  /** `hero` sits over the dark sales hero until the page scrolls. */
  tone?: "light" | "hero"
}) {
  const [scrolled, setScrolled] = useState(false)
  const overHero = tone === "hero" && !scrolled

  useEffect(() => {
    if (!sticky) return
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [sticky])

  const inner = (
    <div className="mx-auto flex w-full max-w-page items-center justify-between gap-4 px-4 lg:px-[120px]">
      <Logo surface={overHero ? "hero" : "nav"} />
      <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "font-sans text-sm tracking-nav transition-colors",
              overHero
                ? "text-white/85 hover:text-white"
                : "text-[#0E121B]/80 hover:text-[#AD14A7]"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      {showCta ? (
        overHero ? (
          <Link
            href={ctaHref}
            className={cn(
              "box-border inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-[#99A0AE] bg-white px-4 font-heading text-[20px] font-medium leading-none tracking-[-1.2px] text-[#0E121B] shadow-[0_9px_10.7px_rgba(250,155,246,0.25),inset_0_4px_6.4px_0_rgba(255,255,255,0.45)]",
              brandPinkHoverClass,
              brandPinkHoverInsetClass
            )}
          >
            {ctaLabel}
          </Link>
        ) : (
          <GradientPillButton
            href={ctaHref}
            className={cn("px-3.5 py-2.5 [&>span]:text-base [&>span]:tracking-[-0.96px]")}
            arrowSize={18}
          >
            {ctaLabel}
          </GradientPillButton>
        )
      ) : (
        <span className="w-[120px]" aria-hidden />
      )}
    </div>
  )

  if (!sticky) {
    return <header className="py-4 lg:py-6">{inner}</header>
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 py-3 transition-[background,box-shadow,backdrop-filter,border-color] lg:py-4",
        scrolled
          ? "border-b border-[#E8D5E6]/80 bg-white/90 shadow-[0_8px_30px_rgba(99,23,96,0.06)] backdrop-blur-md"
          : tone === "hero"
            ? "border-b border-transparent bg-transparent"
            : "bg-white/70 backdrop-blur-sm"
      )}
    >
      {inner}
    </header>
  )
}
