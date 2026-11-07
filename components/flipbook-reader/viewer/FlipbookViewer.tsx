import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { PageFlip } from "page-flip";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { PageCanvas } from "../document/PageCanvas";
import { useElementSize } from "../document/useElementSize";
import type { PageWindowStore } from "../document/pageWindowStore";
import type { FlipbookPageGeometry } from "../types";
import { fitPageSize } from "./fitPageSize";

export type FlipbookViewerHandle = {
  next: () => void;
  prev: () => void;
};

type FlipbookViewerProps = {
  pdf: PDFDocumentProxy | null;
  store: PageWindowStore;
  geometry: FlipbookPageGeometry[];
  pageCount: number;
  spread: boolean;
  scale: number;
  textScale?: number;
  pan: { x: number; y: number };
  onPan: (pan: { x: number; y: number }) => void;
  onScale: (delta: number) => void;
  onPageChange?: (page: number) => void;
  onFlip?: () => void;
};

/** One HTML flip leaf per PDF page — no blank filler for cover alignment. */
function buildSlots(pageCount: number): Array<{ pdfPage: number }> {
  return Array.from({ length: pageCount }, (_, index) => ({
    pdfPage: index + 1,
  }))
}

function pdfPageFromHtmlIndex(
  slots: Array<{ pdfPage: number }>,
  htmlIndex: number
): number {
  return slots[htmlIndex]?.pdfPage ?? 1
}

function htmlIndexFromPdfPage(
  slots: Array<{ pdfPage: number }>,
  pdfPage: number
): number {
  const index = slots.findIndex((slot) => slot.pdfPage === pdfPage)
  return index >= 0 ? index : 0
}

function coverAlignOffset(
  coverFace: "front" | "back" | "open",
  pageWidth: number
): number {
  if (coverFace === "front") return -pageWidth / 2
  if (coverFace === "back") return pageWidth / 2
  return 0
}

export const FlipbookViewer = forwardRef<
  FlipbookViewerHandle,
  FlipbookViewerProps
>(function FlipbookViewer(
  {
    pdf,
    store,
    geometry,
    pageCount,
    spread,
    scale,
    textScale = 1,
    pan,
    onPan,
    onScale,
    onPageChange,
    onFlip,
  },
  ref,
) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const stashRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<PageFlip | null>(null);
  const syncingFromFlip = useRef(false);
  const suppressFlipSound = useRef(false);
  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    panX: number;
    panY: number;
  } | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ distance: number; scale: number } | null>(null);
  const onPageChangeRef = useRef(onPageChange);
  const onFlipRef = useRef(onFlip);
  const onPanRef = useRef(onPan);
  const onScaleRef = useRef(onScale);
  const scaleRef = useRef(scale);
  const panRef = useRef(pan);
  onPageChangeRef.current = onPageChange;
  onFlipRef.current = onFlip;
  onPanRef.current = onPan;
  onScaleRef.current = onScale;
  scaleRef.current = scale;
  panRef.current = pan;

  const viewport = useElementSize(viewportRef);
  const pageBox = geometry[0] ?? { width: 612, height: 792 };
  const fitted = fitPageSize({
    pageWidth: pageBox.width,
    pageHeight: pageBox.height,
    viewportWidth: viewport.width,
    viewportHeight: viewport.height,
    spread,
    padding: 28,
    magnify: textScale,
  });
  const bookWidth = fitted.width * (spread ? 2 : 1);
  const fittedRef = useRef(fitted);
  fittedRef.current = fitted;
  const slots = useMemo(() => buildSlots(pageCount), [pageCount])
  const ready = viewport.width > 32 && viewport.height > 32
  const zoomed = scale > 1.02 || textScale > 1.02
  const [panning, setPanning] = useState(false)
  const currentPage = useSyncExternalStore(
    store.subscribe,
    () => store.getSnapshot().currentPage
  )
  // Spread mode uses showCover: page 1 is the front cover, last page the back.
  const coverFace =
    spread && currentPage <= 1
      ? "front"
      : spread && pageCount > 0 && currentPage >= pageCount
        ? "back"
        : "open"
  const coverShiftX = coverAlignOffset(coverFace, fitted.width)
  const engineConfig = useRef({ spread, pageCount })
  if (
    stashRef.current &&
    (engineConfig.current.spread !== spread ||
      engineConfig.current.pageCount !== pageCount)
  ) {
    const stash = stashRef.current;
    const host = hostRef.current;
    if (host) {
      for (const node of Array.from(
        host.querySelectorAll<HTMLElement>("[data-pdf-page]"),
      )) {
        try {
          stash.appendChild(node);
        } catch {
          /* already parked */
        }
      }
      for (const node of Array.from(
        host.querySelectorAll("[data-flip-page]:not([data-pdf-page])"),
      )) {
        node.remove();
      }
    }
    if (flipRef.current) {
      try {
        flipRef.current.destroy();
      } catch {
        /* engine already gone */
      }
      flipRef.current = null;
    }
    host?.querySelector(".flipbook-reader__flip-engine")?.remove();
    engineConfig.current = { spread, pageCount };
  }

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      onScaleRef.current(event.deltaY > 0 ? -0.12 : 0.12);
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, []);

  useImperativeHandle(ref, () => ({
    next: () => flipRef.current?.flipNext("top"),
    prev: () => flipRef.current?.flipPrev("top"),
  }));

  useLayoutEffect(() => {
    const host = hostRef.current;
    const stash = stashRef.current;
    if (!ready || !host || !stash || pageCount < 1) return;

    const pageNodes = Array.from(
      stash.querySelectorAll<HTMLElement>("[data-flip-page][data-pdf-page]")
    )
    if (pageNodes.length !== pageCount) return

    const nodes = [...pageNodes]

    const block = document.createElement("div")
    block.className = "flipbook-reader__flip-engine"
    const syncEngineBox = () => {
      block.style.minWidth = "0"
      block.style.minHeight = "0"
      block.style.maxWidth = "none"
      block.style.width = "100%"
      block.style.height = "100%"
    }
    syncEngineBox()
    host.appendChild(block)

    const first = fittedRef.current
    const pageFlip = new PageFlip(block, {
      width: first.width,
      height: first.height,
      size: "fixed",
      drawShadow: true,
      flippingTime: 720,
      usePortrait: !spread,
      startZIndex: 2,
      autoSize: false,
      maxShadowOpacity: 0.45,
      // Front cover alone on open; no blank filler pages inserted.
      showCover: spread,
      mobileScrollSupport: true,
      swipeDistance: 28,
      clickEventForward: true,
      useMouseEvents: true,
      showPageCorners: true,
      disableFlipByClick: false,
      startPage: 0,
    })
    //suppress flip sound when adjusting font size
    let quietDepth = 0;
    const runQuiet = (fn: () => void) => {
      quietDepth += 1;
      suppressFlipSound.current = true;
      try {
        fn();
      } finally {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            quietDepth = Math.max(0, quietDepth - 1);
            if (quietDepth === 0) suppressFlipSound.current = false;
          });
        });
      }
    };

    pageFlip.loadFromHTML(nodes)
    syncEngineBox()
    runQuiet(() => {
      try {
        // Prefer the front cover on first paint whenever the store is on page 1.
        const target = htmlIndexFromPdfPage(
          slots,
          store.getSnapshot().currentPage
        )
        pageFlip.turnToPage(target)
      } catch {
        /* first paint */
      }
    })

    const applyPageSize = () => {
      runQuiet(() => {
        const next = fittedRef.current;
        const settings = pageFlip.getSettings();
        settings.width = next.width;
        settings.height = next.height;
        syncEngineBox();
        pageFlip.update();
      });
    };

    requestAnimationFrame(applyPageSize);
    pageFlip.on("flip", (event: { data: number }) => {
      const page = pdfPageFromHtmlIndex(slots, event.data);
      const previous = store.getSnapshot().currentPage;
      syncingFromFlip.current = true;
      store.setPage(page);
      onPageChangeRef.current?.(page);
      if (!suppressFlipSound.current && page !== previous) {
        onFlipRef.current?.();
      }
      queueMicrotask(() => {
        syncingFromFlip.current = false;
      });
    });

    flipRef.current = pageFlip;

    const unsubscribe = store.subscribe(() => {
      if (syncingFromFlip.current) return;
      const target = htmlIndexFromPdfPage(
        slots,
        store.getSnapshot().currentPage,
      );
      if (pageFlip.getCurrentPageIndex() === target) return;
      const distance = Math.abs(pageFlip.getCurrentPageIndex() - target);
      try {
        if (suppressFlipSound.current || distance > 2) {
          runQuiet(() => pageFlip.turnToPage(target));
        } else {
          pageFlip.flip(target, "top");
        }
      } catch {
        runQuiet(() => pageFlip.turnToPage(target));
      }
    });

    const observer = new ResizeObserver(applyPageSize);
    observer.observe(host);

    return () => {
      observer.disconnect();
      unsubscribe();
      flipRef.current = null;
      for (const node of nodes) {
        if (!node.hasAttribute("data-pdf-page")) {
          node.remove();
          continue;
        }
        try {
          stash.appendChild(node);
        } catch {
          /* already detached */
        }
      }
      try {
        pageFlip.destroy();
      } catch {
        block.remove();
      }
    };
  }, [pageBox.height, pageBox.width, pageCount, ready, slots, spread, store]);

  if (pageCount < 1) return <div className="flipbook-reader__viewport" />;

  return (
    <div
      ref={viewportRef}
      className="flipbook-reader__viewport"
      data-zoomed={zoomed ? "true" : "false"}
      tabIndex={0}
      onPointerDown={(event) => {
        pointers.current.set(event.pointerId, {
          x: event.clientX,
          y: event.clientY,
        });
        if (pointers.current.size === 2) {
          const [a, b] = Array.from(pointers.current.values());
          if (!a || !b) return;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          pinch.current = {
            distance: Math.hypot(dx, dy),
            scale: scaleRef.current,
          };
          drag.current = null;
          return;
        }
        if (!zoomed) return;
        drag.current = {
          id: event.pointerId,
          x: event.clientX,
          y: event.clientY,
          panX: panRef.current.x,
          panY: panRef.current.y,
        };
        setPanning(true);
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (pointers.current.has(event.pointerId)) {
          pointers.current.set(event.pointerId, {
            x: event.clientX,
            y: event.clientY,
          });
        }
        if (pinch.current && pointers.current.size === 2) {
          const [a, b] = Array.from(pointers.current.values());
          if (!a || !b) return;
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          const ratio = distance / Math.max(1, pinch.current.distance);
          onScaleRef.current(pinch.current.scale * ratio - scaleRef.current);
          return;
        }
        if (!drag.current || drag.current.id !== event.pointerId) return;
        onPanRef.current({
          x: drag.current.panX + event.clientX - drag.current.x,
          y: drag.current.panY + event.clientY - drag.current.y,
        });
      }}
      onPointerUp={(event) => {
        pointers.current.delete(event.pointerId);
        if (pointers.current.size < 2) pinch.current = null;
        if (drag.current?.id === event.pointerId) {
          drag.current = null;
          setPanning(false);
        }
      }}
      onPointerCancel={(event) => {
        pointers.current.delete(event.pointerId);
        pinch.current = null;
        drag.current = null;
        setPanning(false);
      }}
    >
      <div
        className="flipbook-reader__book"
        style={{
          transform: `translate3d(calc(-50% + ${pan.x + coverShiftX * scale}px), calc(-50% + ${pan.y}px), 0) scale(${scale})`,
          transition: panning ? "none" : "transform 160ms ease",
        }}
      >
        <div
          ref={hostRef}
          className="flipbook-reader__flip"
          data-cover={coverFace}
          data-spread={spread ? "true" : "false"}
          style={{
            width: bookWidth,
            height: fitted.height,
            visibility: ready ? "visible" : "hidden",
          }}
        />
        <div
          ref={stashRef}
          className="flipbook-reader__page-stash"
          hidden
          aria-hidden="true"
        >
          {Array.from({ length: pageCount }, (_, index) => {
            const pdfPage = index + 1
            const isCover = spread && (pdfPage === 1 || pdfPage === pageCount)
            return (
              <div
                key={pdfPage}
                data-flip-page
                data-pdf-page={pdfPage}
                data-density={isCover ? "hard" : "soft"}
                className={
                  isCover
                    ? "flipbook-reader__flip-page flipbook-reader__flip-page--cover"
                    : "flipbook-reader__flip-page"
                }
              >
                <PageCanvas
                  pageNumber={pdfPage}
                  pdf={pdf}
                  geometry={geometry[pdfPage - 1]}
                  store={store}
                />
              </div>
            )
          })}
        </div>
      </div>
      {zoomed ? <div className="flipbook-reader__pan-layer" /> : null}
    </div>
  );
});
