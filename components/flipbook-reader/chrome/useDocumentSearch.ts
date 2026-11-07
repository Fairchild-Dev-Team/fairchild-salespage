import { useEffect, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

export type SearchHit = {
  page: number;
  preview: string;
};

function snippet(text: string, term: string): string {
  const index = text.toLowerCase().indexOf(term);
  if (index < 0) return text.slice(0, 96);
  const start = Math.max(0, index - 28);
  const chunk = text.slice(start, start + 110).replace(/\s+/g, " ").trim();
  return `${start > 0 ? "…" : ""}${chunk}${start + 110 < text.length ? "…" : ""}`;
}

function textItemStr(item: unknown): string {
  if (!item || typeof item !== "object" || !("str" in item)) return "";
  const value = (item as { str?: unknown }).str;
  return typeof value === "string" ? value : "";
}

export function useDocumentSearch(pdf: PDFDocumentProxy | null, query: string) {
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [indexing, setIndexing] = useState(false);

  useEffect(() => {
    const term = query.trim().toLowerCase();
    if (!pdf || term.length < 2) {
      setHits([]);
      setIndexing(false);
      return;
    }

    let cancelled = false;
    setIndexing(true);
    setHits([]);

    (async () => {
      const next: SearchHit[] = [];
      for (let page = 1; page <= pdf.numPages; page += 1) {
        const pdfPage = await pdf.getPage(page);
        const content = await pdfPage.getTextContent();
        const text = content.items.map(textItemStr).join(" ");
        if (text.toLowerCase().includes(term)) {
          next.push({ page, preview: snippet(text, term) });
          if (!cancelled) setHits([...next]);
        }
        if (cancelled || next.length >= 40) break;
      }
      if (!cancelled) setIndexing(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [pdf, query]);

  return { hits, indexing };
}
