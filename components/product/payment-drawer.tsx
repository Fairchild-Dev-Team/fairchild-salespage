"use client"

import { cn } from "@/lib/utils"

export function PaymentDrawer({
  open,
  title,
  onClose,
  wide = false,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  wide?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={cn("fixed inset-0 z-50", open ? "" : "pointer-events-none")}
      aria-hidden={open ? undefined : true}
    >
      <button
        type="button"
        aria-label="Close payment"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-[#0E121B]/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "absolute inset-y-0 right-0 flex w-full flex-col bg-white shadow-[0_0_40px_rgba(14,18,27,0.18)] transition-transform duration-300 ease-out",
          wide ? "max-w-[560px]" : "max-w-[440px]",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-[#E8D5E6] px-5 py-4">
          <h2 className="font-heading text-lg font-semibold text-[#0E121B]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#E8D5E6] px-3 py-1.5 text-sm font-medium text-[#0E121B]"
          >
            Close
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
      </aside>
    </div>
  )
}
