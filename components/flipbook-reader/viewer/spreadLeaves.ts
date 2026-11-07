export type SpreadLeaf = {
  startPage: number
  pages: number[]
  label: string
}

function labelFor(pages: number[]): string {
  if (pages.length > 1) return `${pages[0]}-${pages[pages.length - 1]}`
  return String(pages[0] ?? "")
}

/**
 * Cover + paired interiors for `showCover` spreads.
 * No blank filler — odd-length PDFs may end with a single interior before the back.
 */
export function buildSpreadLeaves(
  pageCount: number,
  spread: boolean
): SpreadLeaf[] {
  if (pageCount < 1) return []
  if (!spread) {
    return Array.from({ length: pageCount }, (_, index) => {
      const page = index + 1
      return { startPage: page, pages: [page], label: String(page) }
    })
  }
  if (pageCount === 1) {
    return [{ startPage: 1, pages: [1], label: "1" }]
  }

  const leaves: SpreadLeaf[] = [{ startPage: 1, pages: [1], label: "1" }]
  for (let page = 2; page <= pageCount - 1; page += 2) {
    const partner = page + 1
    const pages = partner <= pageCount - 1 ? [page, partner] : [page]
    leaves.push({ startPage: page, pages, label: labelFor(pages) })
  }
  leaves.push({
    startPage: pageCount,
    pages: [pageCount],
    label: String(pageCount),
  })
  return leaves
}

export function leafForPage(
  leaves: SpreadLeaf[],
  page: number
): SpreadLeaf | undefined {
  return leaves.find((leaf) => leaf.pages.includes(page))
}

export function parsePageJump(
  raw: string,
  pageCount: number,
  spread: boolean
): number | null {
  const trimmed = raw.trim()
  const match = trimmed.match(/^(\d+)(?:\s*[-–—]\s*(\d+))?$/)
  if (!match) return null
  const first = Number(match[1])
  if (!Number.isFinite(first) || first < 1) return null
  const page = Math.min(Math.max(1, Math.floor(first)), Math.max(1, pageCount))
  if (!spread) return page
  return leafForPage(buildSpreadLeaves(pageCount, true), page)?.startPage ?? page
}
