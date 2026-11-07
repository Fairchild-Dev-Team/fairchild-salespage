import { useEffect, useState } from "react"
import type { PDFDocumentProxy } from "pdfjs-dist"
import type { FlipbookDescriptor, FlipbookTocEntry } from "../types"

type OutlineItem = {
  title: string
  dest?: string | unknown[] | null
  items?: OutlineItem[]
}

async function walkOutline(
  pdf: PDFDocumentProxy,
  items: OutlineItem[],
  entries: FlipbookTocEntry[]
) {
  for (const item of items) {
    let pageIndex = 0
    try {
      const dest =
        typeof item.dest === "string"
          ? await pdf.getDestination(item.dest)
          : item.dest
      if (dest?.[0]) {
        pageIndex = await pdf.getPageIndex(dest[0])
      }
    } catch {
      pageIndex = entries.at(-1)?.pageIndex ?? 0
    }
    entries.push({ title: item.title, pageIndex })
    if (item.items?.length) {
      await walkOutline(pdf, item.items, entries)
    }
  }
}

export function useOutline(
  pdf: PDFDocumentProxy | null,
  descriptor?: FlipbookDescriptor
): FlipbookTocEntry[] {
  const descriptorToc = descriptor?.toc
  const [asyncOutline, setAsyncOutline] = useState<FlipbookTocEntry[]>([])

  useEffect(() => {
    if (descriptorToc) return
    if (!pdf) return

    let cancelled = false
    void (async () => {
      const raw = await pdf.getOutline()
      if (!raw || cancelled) {
        if (!cancelled) setAsyncOutline([])
        return
      }
      const entries: FlipbookTocEntry[] = []
      await walkOutline(pdf, raw as OutlineItem[], entries)
      if (!cancelled) setAsyncOutline(entries)
    })()

    return () => {
      cancelled = true
    }
  }, [descriptorToc, pdf])

  if (descriptorToc) return descriptorToc
  if (!pdf) return []
  return asyncOutline
}
