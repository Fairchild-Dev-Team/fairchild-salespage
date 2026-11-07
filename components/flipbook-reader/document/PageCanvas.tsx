import { useEffect, useRef, useState } from "react";
import { useSyncExternalStore } from "react";
import type { PDFDocumentProxy, PDFPageProxy, RenderTask } from "pdfjs-dist";
import type { PageWindowStore } from "./pageWindowStore";
import type { FlipbookPageGeometry } from "../types";

const MAX_CONCURRENT_RENDERS = 3;
let activeRenders = 0;
const waiters: Array<() => void> = [];

async function acquireRenderSlot() {
  if (activeRenders < MAX_CONCURRENT_RENDERS) {
    activeRenders += 1;
    return;
  }
  await new Promise<void>((resolve) => waiters.push(resolve));
  activeRenders += 1;
}

function releaseRenderSlot() {
  activeRenders = Math.max(0, activeRenders - 1);
  const next = waiters.shift();
  next?.();
}

type PageCanvasProps = {
  pageNumber: number;
  pdf: PDFDocumentProxy | null;
  geometry?: FlipbookPageGeometry;
  store: PageWindowStore;
};

export function PageCanvas({
  pageNumber,
  pdf,
  geometry,
  store,
}: PageCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [displayWidth, setDisplayWidth] = useState(0);
  const [painted, setPainted] = useState(false);
  const rendered = useSyncExternalStore(
    store.subscribe,
    () => store.isRendered(pageNumber),
    () => false,
  );

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const update = () => setDisplayWidth(node.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [rendered]);

  useEffect(() => {
    if (!rendered || !pdf || displayWidth < 2) return
    const canvas = canvasRef.current
    const textLayerDiv = textRef.current
    const linksDiv = linksRef.current
    if (!canvas) return

    let cancelled = false
    let renderTask: RenderTask | null = null
    let page: PDFPageProxy | null = null

    void (async () => {
      // Defer state updates so they are not synchronous in the effect body.
      await Promise.resolve()
      if (cancelled) return
      setPainted(false)

      await acquireRenderSlot()
      if (cancelled) {
        releaseRenderSlot()
        return
      }
      try {
        page = await pdf.getPage(pageNumber)
        const rotation = geometry?.rotation ?? page.rotate
        const unscaled = page.getViewport({ scale: 1, rotation })
        const cssScale = displayWidth / unscaled.width
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const viewport = page.getViewport({
          scale: cssScale * dpr,
          rotation,
        })
        const context = canvas.getContext("2d")
        if (!context || cancelled) return

        canvas.width = viewport.width
        canvas.height = viewport.height
        renderTask = page.render({
          canvasContext: context,
          canvas,
          viewport,
        } as never)
        await renderTask.promise
        if (cancelled) return
        setPainted(true)

        const cssViewport = page.getViewport({ scale: cssScale, rotation })
        if (textLayerDiv) {
          textLayerDiv.replaceChildren()
          textLayerDiv.style.width = `${cssViewport.width}px`
          textLayerDiv.style.height = `${cssViewport.height}px`
          const textContent = await page.getTextContent()
          for (const item of textContent.items) {
            if (!("str" in item) || !item.str) continue
            const span = document.createElement("span")
            const tx = item.transform
            span.textContent = item.str
            span.style.left = `${tx[4] * cssScale}px`
            span.style.top = `${cssViewport.height - tx[5] * cssScale}px`
            span.style.fontSize = `${Math.abs(tx[3]) * cssScale}px`
            textLayerDiv.appendChild(span)
          }
        }

        if (linksDiv) {
          linksDiv.replaceChildren()
          const annotations = await page.getAnnotations()
          for (const annotation of annotations) {
            if (annotation.subtype !== "Link") continue
            const [x1, y1, x2, y2] = page
              .getViewport({ scale: cssScale, rotation })
              .convertToViewportRectangle(annotation.rect)
            const button = document.createElement("a")
            button.className = "flipbook-reader__link"
            button.style.left = `${Math.min(x1, x2)}px`
            button.style.top = `${Math.min(y1, y2)}px`
            button.style.width = `${Math.abs(x2 - x1)}px`
            button.style.height = `${Math.abs(y2 - y1)}px`
            if (annotation.url) {
              button.href = annotation.url
              button.target = "_blank"
              button.rel = "noopener noreferrer"
            } else if (annotation.dest) {
              button.href = "#"
              button.addEventListener("click", async (event) => {
                event.preventDefault()
                const dest = await pdf.getDestination(annotation.dest)
                const explicit = dest
                  ? await pdf.getPageIndex(dest[0])
                  : null
                if (explicit != null) store.setPage(explicit + 1)
              })
            }
            linksDiv.appendChild(button)
          }
        }
      } catch {
        if (!cancelled) setPainted(true)
      } finally {
        releaseRenderSlot()
      }
    })()

    return () => {
      cancelled = true
      renderTask?.cancel()
      textLayerDiv?.replaceChildren()
      linksDiv?.replaceChildren()
    }
  }, [displayWidth, geometry?.rotation, pageNumber, pdf, rendered, store])

  return (
    <div ref={wrapRef} className="flipbook-reader__page">
      {rendered ? (
        <>
          <canvas ref={canvasRef} />
          <div ref={textRef} className="flipbook-reader__text-layer" />
          <div ref={linksRef} />
        </>
      ) : null}
      {!painted ? (
        <div
          className="flipbook-reader__page-loader"
          aria-busy="true"
          aria-live="polite"
        >
          <span className="flipbook-reader__page-spinner" />
          <span className="flipbook-reader__page-loader-label">Loading page</span>
        </div>
      ) : null}
    </div>
  );
}
