"use client"

import { useEffect, useState } from "react"
import { MessageCircle, X } from "lucide-react"

import { cn } from "@/lib/utils"

const WHATSAPP_NUMBER = "13477661809"
const PREFILL_MESSAGE =
  "I am contacting from Fairchild Institute Sales page"

const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILL_MESSAGE)}`

export function WhatsAppChatFab() {
  const [calloutOpen, setCalloutOpen] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setCalloutOpen(true), 900)
    return () => window.clearTimeout(timer)
  }, [])

  function dismissCallout() {
    setCalloutOpen(false)
  }

  return (
    <div
      className={cn(
        "pointer-events-none fixed right-4 z-[60] flex flex-col items-end gap-0",
        // Clear the mobile sticky “Save my seat” bar
        "bottom-24 md:right-6 md:bottom-6"
      )}
    >
      {calloutOpen ? (
        <div className="pointer-events-auto mb-1 flex flex-col items-end">
          <div className="relative flex items-center gap-2 rounded-full border border-[#E8D5E6] bg-white py-2.5 pr-2.5 pl-4 shadow-[0_8px_28px_rgba(99,23,96,0.16)]">
            <p className="font-heading text-sm font-semibold whitespace-nowrap text-[#0E121B]">
              Chat with us
            </p>
            <button
              type="button"
              onClick={dismissCallout}
              aria-label="Dismiss chat callout"
              className="flex size-7 shrink-0 items-center justify-center rounded-full text-[#525866] transition-colors hover:bg-[#FEF5FE] hover:text-[#631760]"
            >
              <X className="size-4" strokeWidth={2} aria-hidden />
            </button>
          </div>
          {/* Thought-bubble connectors toward the FAB */}
          <span
            className="mt-1.5 mr-5 size-2.5 rounded-full border border-[#E8D5E6] bg-white shadow-sm"
            aria-hidden
          />
          <span
            className="mt-1 mr-3 size-1.5 rounded-full border border-[#E8D5E6] bg-white shadow-sm"
            aria-hidden
          />
        </div>
      ) : null}

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={cn(
          "pointer-events-auto flex size-14 items-center justify-center rounded-full",
          "bg-[var(--brand-magenta)] text-white",
          "shadow-[0_10px_28px_rgba(173,20,167,0.4)]",
          "transition-transform duration-200 hover:scale-105 hover:bg-[var(--brand-purple)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-pink)] focus-visible:ring-offset-2"
        )}
      >
        <MessageCircle className="size-7 fill-white text-white" aria-hidden />
      </a>
    </div>
  )
}
