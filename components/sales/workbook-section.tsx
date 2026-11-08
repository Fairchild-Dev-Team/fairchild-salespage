"use client"

import dynamic from "next/dynamic"

import { FlipbookSplash } from "@/components/flipbook-reader"
import { SectionShell } from "@/components/sales/section-shell"
import { workbooks } from "@/lib/workbook"

const ThemedFlipbookReader = dynamic(
  () =>
    import("@/components/flipbook-reader").then(
      (mod) => mod.ThemedFlipbookReader
    ),
  {
    ssr: false,
    loading: () => (
      <FlipbookSplash title="FairChild workbook" message="Opening flipbook…" />
    ),
  }
)

export function WorkbookSection() {
  const workbook = workbooks[0]

  if (!workbook) {
    return (
      <SectionShell id="workbook" className="bg-[var(--section-pink)]">
        <p className="text-[#525866]">
          No workbook is configured yet. Add an entry in{" "}
          <code className="font-mono text-sm">lib/workbook.ts</code>.
        </p>
      </SectionShell>
    )
  }

  return (
    <SectionShell id="workbook" className="bg-[var(--section-pink)]">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold tracking-[0.14em] text-[var(--brand-magenta)] uppercase">
          Workbook
        </p>
        <h2 className="mt-3 font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-[#0E121B]">
          {workbook.name}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#525866]">
          Browse it as a book — drag a corner, use the arrows, or open the
          table of contents.
        </p>
      </div>

      <div className="mt-10 h-[min(78vh,720px)] overflow-hidden rounded-[var(--radius-lg)] border border-[#E8D5E6] shadow-[0_24px_60px_rgba(14,18,27,0.1)]">
        <ThemedFlipbookReader
          url={workbook.pdfUrl}
          title={workbook.name}
          storageKey={`workbook:${workbook.id}`}
          variant="tinted"
          className="h-full"
        />
      </div>
    </SectionShell>
  )
}
