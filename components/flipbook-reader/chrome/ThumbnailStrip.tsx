import { useEffect, useMemo, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { buildSpreadLeaves, leafForPage } from "../viewer/spreadLeaves";

type ThumbnailStripProps = {
  pdf: PDFDocumentProxy | null;
  pageCount: number;
  currentPage: number;
  spread: boolean;
  onJump: (page: number) => void;
};

export function ThumbnailStrip({
  pdf,
  pageCount,
  currentPage,
  spread,
  onJump,
}: ThumbnailStripProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const leaves = useMemo(
    () => buildSpreadLeaves(pageCount, spread),
    [pageCount, spread],
  );
  const currentLeaf = leafForPage(leaves, currentPage);

  useEffect(() => {
    const current = listRef.current?.querySelector("[aria-current='true']");
    current?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [currentPage]);

  return (
    <div
      ref={listRef}
      className="flipbook-reader__thumbs"
      data-spread={spread ? "true" : "false"}
    >
      {leaves.map((leaf) => (
        <Thumbnail
          key={leaf.label}
          pdf={pdf}
          pages={leaf.pages}
          label={leaf.label}
          current={leaf.startPage === currentLeaf?.startPage}
          onJump={() => onJump(leaf.startPage)}
        />
      ))}
    </div>
  );
}

type ThumbnailProps = {
  pdf: PDFDocumentProxy | null;
  pages: number[];
  label: string;
  current: boolean;
  onJump: () => void;
};

function Thumbnail({ pdf, pages, label, current, onJump }: ThumbnailProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = buttonRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { rootMargin: "120px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      className="flipbook-reader__thumb"
      data-pages={pages.length}
      aria-current={current}
      aria-label={`Page ${label}`}
      onClick={onJump}
    >
      <span className="flipbook-reader__thumb-faces">
        {pages.map((pageNumber) => (
          <ThumbFace
            key={pageNumber}
            pdf={pdf}
            pageNumber={pageNumber}
            visible={visible}
          />
        ))}
      </span>
      <span className="flipbook-reader__thumb-label">{label}</span>
    </button>
  );
}

function ThumbFace({
  pdf,
  pageNumber,
  visible,
}: {
  pdf: PDFDocumentProxy | null;
  pageNumber: number;
  visible: boolean;
}) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!pdf || !visible) return;
    let cancelled = false;
    (async () => {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 0.22 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) return;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: context, canvas, viewport } as never)
        .promise;
      if (!cancelled) setUrl(canvas.toDataURL("image/jpeg", 0.72));
    })();
    return () => {
      cancelled = true;
    };
  }, [pageNumber, pdf, visible]);

  if (url) return <img src={url} alt="" />;
  return <span className="flipbook-reader__thumb-shell">{pageNumber}</span>;
}
