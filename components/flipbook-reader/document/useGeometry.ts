import { useEffect, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import type { FlipbookDescriptor, FlipbookPageGeometry } from "../types";

function geometryFromPage(
  width: number,
  height: number,
  rotation: number,
): FlipbookPageGeometry {
  return { width, height, rotation };
}

export function useGeometry(
  pdf: PDFDocumentProxy | null,
  descriptor?: FlipbookDescriptor,
): FlipbookPageGeometry[] {
  const [derived, setDerived] = useState<FlipbookPageGeometry[]>(
    descriptor?.pages ?? [],
  );

  useEffect(() => {
    if (descriptor?.pages?.length) {
      setDerived(descriptor.pages);
      return;
    }
    if (!pdf) return;

    let cancelled = false;
    (async () => {
      const first = await pdf.getPage(1);
      const firstView = first.getViewport({
        scale: 1,
        rotation: first.rotate,
      });
      if (cancelled) return;

      const seed = geometryFromPage(
        firstView.width,
        firstView.height,
        first.rotate,
      );
      setDerived(
        Array.from({ length: pdf.numPages }, () => ({ ...seed })),
      );

      const pages = [{ ...seed }];
      for (let index = 2; index <= pdf.numPages; index += 1) {
        const page = await pdf.getPage(index);
        const viewport = page.getViewport({
          scale: 1,
          rotation: page.rotate,
        });
        pages.push(
          geometryFromPage(viewport.width, viewport.height, page.rotate),
        );
      }
      if (!cancelled) setDerived(pages);
    })();

    return () => {
      cancelled = true;
    };
  }, [pdf, descriptor]);

  return derived;
}
