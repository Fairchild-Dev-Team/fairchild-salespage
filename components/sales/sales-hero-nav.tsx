"use client"

import Link from "next/link"
import { useState } from "react"

import { Logo } from "@/components/ui/logo"
import { MobileMenuButton } from "@/components/ui/mobile-menu-button"
import { MobileNavOverlay } from "@/components/ui/mobile-nav-overlay"
import {
  brandPinkHoverClass,
  brandPinkHoverInsetClass,
} from "@/lib/buttonStyles"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/#programmes", label: "Programs" },
  { href: "/#stories", label: "Stories" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
] as const

function HeroNavCta({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "box-border inline-flex h-11 shrink-0 appearance-none items-center justify-center rounded-full border border-[#99A0AE] bg-white px-4 font-heading text-[20px] font-medium leading-none tracking-[-1.2px] text-[#0E121B] shadow-[0_9px_10.7px_rgba(250,155,246,0.25),inset_0_4px_6.4px_0_rgba(255,255,255,0.45)] [font-variation-settings:'opsz'_14,'wdth'_100]",
        brandPinkHoverClass,
        brandPinkHoverInsetClass,
        className
      )}
    >
      {children}
    </Link>
  )
}

export function SalesHeroNav({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <nav
      className={cn(
        "relative z-30 w-full rounded-full px-0 py-3 sm:px-2 sm:py-4 lg:px-5",
        className
      )}
      aria-label="Primary"
    >
      <div className="flex min-w-0 items-center justify-between gap-4 lg:gap-6">
        <Logo surface="nav" />
        <div className="hidden min-w-0 items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 font-sans text-base text-[#0E121B] transition hover:text-[#932784]"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <HeroNavCta href="/#programmes" className="hidden lg:inline-flex">
          Save my seat
        </HeroNavCta>
        <MobileMenuButton
          open={open}
          onClick={() => setOpen(!open)}
          className="lg:hidden"
        />
      </div>
      <MobileNavOverlay
        open={open}
        onClose={() => setOpen(false)}
        variant="light"
        className="lg:hidden"
        panelClassName="lg:hidden"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-base text-[#0E121B]"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <HeroNavCta
          href="/#programmes"
          className="h-10 w-fit text-base tracking-[-0.96px]"
        >
          Save my seat
        </HeroNavCta>
      </MobileNavOverlay>
    </nav>
  )
}
