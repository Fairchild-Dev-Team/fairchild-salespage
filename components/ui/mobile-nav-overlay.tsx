"use client"

import { useSyncExternalStore } from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

const subscribeToNothing = () => () => {}

export function MobileNavOverlay({
  open,
  onClose,
  variant = "light",
  mode = "dropdown",
  className,
  panelClassName,
  children,
}: {
  open: boolean
  onClose: () => void
  variant?: "light" | "dark"
  mode?: "dropdown" | "fixed"
  className?: string
  panelClassName?: string
  children: React.ReactNode
}) {
  // The portal needs document, so render only in the browser: false on the server, true on the client.
  const mounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  )

  if (!open || !mounted) return null

  const isDark = variant === "dark"
  const useFixed = mode === "fixed"

  const overlay = (
    <>
      <button
        type="button"
        className={cn(
          "fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]",
          className
        )}
        onClick={onClose}
        aria-label="Close menu"
      />
      <div
        className={cn(
          "z-50 flex flex-col gap-4 rounded-[20px] border p-4 shadow-[0_9px_77.7px_rgba(250,155,246,0.25)] backdrop-blur-md",
          "[&_nav]:flex [&_nav]:flex-col [&_nav]:gap-4",
          useFixed
            ? "fixed top-[88px] right-6 left-6 sm:right-6 sm:left-6"
            : "absolute top-[calc(100%+12px)] right-0 left-0",
          isDark
            ? "border-white/15 bg-[#0E121B]/92 text-white"
            : "border-[#EEF6F7] bg-white/95 text-[#0E121B]",
          panelClassName
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {children}
      </div>
    </>
  )

  if (useFixed) {
    return createPortal(overlay, document.body)
  }

  return overlay
}
