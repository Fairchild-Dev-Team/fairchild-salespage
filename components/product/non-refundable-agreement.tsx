"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"

import { financialAid } from "@/lib/sales-content"
import { cn } from "@/lib/utils"

type NonRefundableAgreementProps = {
  agreed: boolean
  onAgreedChange: (agreed: boolean) => void
  className?: string
}

const SECTIONS = [
  {
    title: "Final sale",
    body: "All payments for programmes, courses, products, and services are strictly non-refundable, regardless of usage or participation.",
  },
  {
    title: "Digital access",
    body: "Because digital materials cannot be returned, no refunds will be issued once access has been granted.",
  },
  {
    title: "Service commitments",
    body: "Fees for mentorship, coaching, and service-based offerings are non-refundable due to the allocation of time, resources, and proprietary content.",
  },
  {
    title: "Chargebacks prohibited",
    body: "You agree not to initiate chargebacks. Any attempt to dispute a completed payment may result in suspension of access and recovery of associated fees.",
  },
  {
    title: "Exceptions",
    body: "Refunds are only considered for duplicate payments or verified technical errors, and approval is at the sole discretion of FairChild Institute Inc.",
  },
] as const

export function NonRefundableAgreement({
  agreed,
  onAgreedChange,
  className,
}: NonRefundableAgreementProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight
    if (remaining <= 12) setHasScrolledToEnd(true)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    // Short content (or large screens) may already fit without scrolling.
    if (el.scrollHeight <= el.clientHeight + 4) setHasScrolledToEnd(true)
  }, [])

  useEffect(() => {
    if (!hasScrolledToEnd && agreed) onAgreedChange(false)
  }, [hasScrolledToEnd, agreed, onAgreedChange])

  // Keep wheel/trackpad scrolling inside this box (Lenis otherwise steals it).
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onWheel = (event: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const atTop = scrollTop <= 0
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1
      const scrollingDown = event.deltaY > 0
      const scrollingUp = event.deltaY < 0
      if ((scrollingDown && !atBottom) || (scrollingUp && !atTop)) {
        event.stopPropagation()
        event.preventDefault()
        el.scrollTop += event.deltaY
        checkScroll()
      }
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [checkScroll])

  return (
    <div className={cn("space-y-3", className)}>
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        data-lenis-prevent
        tabIndex={0}
        role="region"
        aria-label="Non-refundable policy"
        className={cn(
          "max-h-52 overflow-y-auto overscroll-contain rounded-xl border border-[#E8D5E6] bg-[#FEF5FE] p-4 sm:max-h-60 sm:p-5",
          "[scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:#AD14A7_#E8D5E6]",
          "[&::-webkit-scrollbar]:w-2.5",
          "[&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#E8D5E6]/60",
          "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#AD14A7]/55",
          "hover:[&::-webkit-scrollbar-thumb]:bg-[#AD14A7]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD14A7]"
        )}
      >
        <h3 className="font-heading text-base font-semibold text-[#0E121B] sm:text-lg">
          Non-refundable policy
        </h3>
        <div className="mt-3 space-y-4 text-sm leading-relaxed text-[#525866]">
          <p>
            All purchases from FairChild Institute Inc. are final and
            non-refundable. By completing a transaction, you acknowledge and
            agree to the following terms:
          </p>
          <div className="space-y-3">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h4 className="mb-1 font-heading text-sm font-semibold text-[#631760]">
                  {section.title}
                </h4>
                <p>{section.body}</p>
              </div>
            ))}
          </div>
          <p>
            Full details are in our{" "}
            <Link
              href="/terms-of-service"
              className="font-medium text-[#631760] underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </Link>
            . Questions?{" "}
            <a
              href={`mailto:${financialAid.email}`}
              className="font-medium text-[#631760] underline-offset-2 hover:underline"
            >
              {financialAid.email}
            </a>
          </p>
        </div>
      </div>

      {!hasScrolledToEnd ? (
        <p
          className="rounded-xl border border-[#E8D5E6] bg-white px-3 py-2 text-sm text-[#631760]"
          role="status"
        >
          Scroll to the end of the policy to continue.
        </p>
      ) : null}

      <label
        htmlFor="non-refundable-agreed"
        className={cn(
          "flex items-start gap-3 rounded-xl border border-[#E8D5E6] bg-white px-3 py-3",
          hasScrolledToEnd ? "cursor-pointer" : "cursor-not-allowed opacity-60"
        )}
      >
        <input
          id="non-refundable-agreed"
          name="nonRefundableAgreed"
          type="checkbox"
          checked={agreed}
          disabled={!hasScrolledToEnd}
          onChange={(event) => onAgreedChange(event.target.checked)}
          className="mt-0.5 size-4 shrink-0 rounded border-[#CACFD8] text-[#AD14A7] accent-[#AD14A7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD14A7] disabled:cursor-not-allowed"
          required
        />
        <span className="text-sm leading-snug text-[#0E121B]">
          I understand this payment is non-refundable and I agree to the policy
          above. <span className="text-[#AD14A7]">*</span>
        </span>
      </label>
    </div>
  )
}
