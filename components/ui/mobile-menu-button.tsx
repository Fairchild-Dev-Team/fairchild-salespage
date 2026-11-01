"use client"

import { Menu, X } from "lucide-react"

import { brandPinkHoverClass } from "@/lib/buttonStyles"
import { cn } from "@/lib/utils"

export function MobileMenuButton({
  open,
  onClick,
  className,
}: {
  open: boolean
  onClick: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className={cn(
        "flex min-h-10 min-w-10 items-center justify-center gap-2.5 rounded-full border border-[#EEF6F7] bg-white px-4 py-3.5",
        "shadow-[0_9px_10.7px_0_rgba(250,155,246,0.25),inset_0_4px_6.4px_0_rgba(255,255,255,0.45)]",
        brandPinkHoverClass,
        className
      )}
    >
      {open ? (
        <X className="h-4 w-4 shrink-0 text-[#0E121B]" strokeWidth={2} />
      ) : (
        <Menu className="h-4 w-4 shrink-0 text-[#0E121B]" strokeWidth={2} />
      )}
    </button>
  )
}
