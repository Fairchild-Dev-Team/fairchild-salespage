"use client"

import { ChevronDown } from "lucide-react"
import dynamic from "next/dynamic"
import { useMemo, useState } from "react"

import { FlipbookSplash } from "@/components/flipbook-reader"
import { SectionShell } from "@/components/sales/section-shell"
import {
  brochureInstitutes,
  type BrochureInstitute,
} from "@/lib/brochure"
import { cn } from "@/lib/utils"

const ThemedFlipbookReader = dynamic(
  () =>
    import("@/components/flipbook-reader").then(
      (mod) => mod.ThemedFlipbookReader
    ),
  {
    ssr: false,
    loading: () => (
      <FlipbookSplash title="FairChild" message="Opening flipbook…" />
    ),
  }
)

export function FlipbookSection({
  items = brochureInstitutes,
  initialId,
  sectionId = "brochure",
  eyebrow = "Brochure",
  heading = "Flip through the institute",
  description = "Pick an institute, then browse it as a book — drag a corner, use the arrows, or open the table of contents.",
  selectLabel = "Institute",
  showSelect = true,
  storageKeyPrefix = "brochure",
  emptyHint = "lib/brochure.ts",
}: {
  items?: BrochureInstitute[]
  /** Defaults to the first document in the list. */
  initialId?: string
  sectionId?: string
  eyebrow?: string
  heading?: string
  description?: string
  selectLabel?: string
  showSelect?: boolean
  storageKeyPrefix?: string
  emptyHint?: string
}) {
  const fallback = items[0]
  const [selectedId, setSelectedId] = useState(
    () => initialId ?? fallback?.id ?? ""
  )

  const selected = useMemo(
    () => items.find((item) => item.id === selectedId) ?? fallback ?? null,
    [items, selectedId, fallback]
  )

  if (!selected) {
    return (
      <SectionShell id={sectionId} className="bg-[var(--section-pink)]">
        <p className="text-[var(--muted-foreground)]">
          Nothing is configured yet. Add entries in{" "}
          <code className="font-mono text-sm">{emptyHint}</code>.
        </p>
      </SectionShell>
    )
  }

  return (
    <SectionShell id={sectionId} className="bg-[var(--section-pink)]">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.14em] text-[var(--brand-magenta)] uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-[var(--foreground)]">
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted-foreground)]">
            {description}
          </p>
        </div>

        {showSelect ? (
          <label className="flex w-full max-w-md flex-col gap-2">
            <span className="text-sm font-medium text-[var(--foreground)]">
              {selectLabel}
            </span>
            <div className="relative">
              <select
                value={selected.id}
                onChange={(event) => setSelectedId(event.target.value)}
                className={cn(
                  "w-full appearance-none rounded-full border border-[var(--border)] bg-white",
                  "px-5 py-3.5 pr-12 text-sm font-semibold text-[var(--foreground)]",
                  "shadow-[0_9px_10.7px_rgba(250,155,246,0.12)]",
                  "outline-none transition-colors",
                  "hover:border-[var(--brand-magenta)]",
                  "focus-visible:border-[var(--brand-magenta)] focus-visible:ring-2 focus-visible:ring-[var(--brand-pink-bright)]/40"
                )}
              >
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[var(--brand-magenta)]"
                aria-hidden
              />
            </div>
          </label>
        ) : null}
      </div>

      <div className="mt-10 h-[min(78vh,720px)] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[0_24px_60px_color-mix(in_srgb,var(--foreground)_10%,transparent)]">
        <ThemedFlipbookReader
          key={selected.id}
          url={selected.pdfUrl}
          title={selected.name}
          storageKey={`${storageKeyPrefix}:${selected.id}`}
          variant="tinted"
          className="h-full"
        />
      </div>
    </SectionShell>
  )
}
