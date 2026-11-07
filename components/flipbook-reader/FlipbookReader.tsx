"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useSyncExternalStore } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import type {
  FlipbookLayoutMode,
  FlipbookOverlay,
  FlipbookReaderProps,
} from "./types";
import { loadPdfDocument } from "./document/loadPdfDocument";
import { createPageWindowStore } from "./document/pageWindowStore";
import { useGeometry } from "./document/useGeometry";
import {
  FlipbookViewer,
  type FlipbookViewerHandle,
} from "./viewer/FlipbookViewer";
import { isLandscapePage } from "./viewer/fitPageSize";
import { TableOfContents } from "./chrome/TableOfContents";
import { ThumbnailStrip } from "./chrome/ThumbnailStrip";
import { useDocumentSearch } from "./chrome/useDocumentSearch";
import { useOutline } from "./chrome/useOutline";
import { ReaderToolbar } from "./chrome/ReaderToolbar";
import { OverlayPanel } from "./chrome/OverlayPanel";
import { SearchPanel } from "./chrome/SearchPanel";
import { Icon } from "./chrome/icons";
import { playPageTurn, unlockAudio } from "./chrome/pageTurnSound";
import { writeSavedPage } from "./chrome/useBookmarks";
import { useNarrow } from "./chrome/useNarrow";
import { useTextSize } from "./chrome/useTextSize";
import "./theme.css";

const MIN_SCALE = 1;
const MAX_SCALE = 5;

function clampScale(value: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, Number(value.toFixed(2))));
}

export function FlipbookReader({
  url,
  descriptor,
  initialPage,
  theme,
  storageKey,
  onPageChange,
  onLoad,
  onError,
  onProgress,
}: FlipbookReaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<FlipbookViewerHandle>(null);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageCount, setPageCount] = useState(descriptor?.pages?.length ?? 0);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [query, setQuery] = useState("");
  const [overlay, setOverlay] = useState<FlipbookOverlay>(null);
  const [layoutMode, setLayoutMode] = useState<FlipbookLayoutMode>("auto");
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const persistKey = storageKey ?? url;
  const lite = useNarrow();
  const {
    textScale,
    canDecrease: canTextSmaller,
    canIncrease: canTextLarger,
    decrease: decreaseText,
    increase: increaseText,
  } = useTextSize();

  const onLoadRef = useRef(onLoad);
  const onErrorRef = useRef(onError);
  const onProgressRef = useRef(onProgress);
  const onPageChangeRef = useRef(onPageChange);
  onLoadRef.current = onLoad;
  onErrorRef.current = onError;
  onProgressRef.current = onProgress;
  onPageChangeRef.current = onPageChange;

  const store = useMemo(
    () =>
      createPageWindowStore({
        currentPage: 1,
        pageCount,
        spread: true,
      }),
    [url],
  );

  const currentPage = useSyncExternalStore(
    store.subscribe,
    () => store.getSnapshot().currentPage,
    () => initialPage ?? 1,
  );
  const geometry = useGeometry(pdf, descriptor);
  const outline = useOutline(pdf, descriptor);
  const searchQuery = overlay === "search" ? query : "";
  const { hits, indexing } = useDocumentSearch(pdf, searchQuery);
  const pageBox = geometry[0];
  const autoSpread = pageBox
    ? !isLandscapePage(pageBox.width, pageBox.height)
    : true;
  const spread =
    layoutMode === "spread"
      ? true
      : layoutMode === "single"
        ? false
        : lite
          ? false
          : autoSpread;

  useEffect(() => {
    let destroyed = false;
    let doc: PDFDocumentProxy | null = null;
    setError(null);
    setProgress(0);
    setScale(1);
    setPan({ x: 0, y: 0 });
    loadPdfDocument({
      url,
      onProgress: (ratio) => {
        if (destroyed) return;
        setProgress(ratio);
        onProgressRef.current?.({ ratio });
      },
      onError: (next) => {
        if (destroyed) return;
        setError(next.message);
        onErrorRef.current?.(next);
      },
    }).then((loaded) => {
      if (destroyed) {
        loaded?.destroy();
        return;
      }
      if (!loaded) return;
      doc = loaded;
      setPageCount(loaded.numPages);
      // Always open on the front cover (page 1) unless a caller sets initialPage.
      const start = Math.min(
        loaded.numPages,
        Math.max(1, initialPage ?? 1),
      );
      store.setPage(start);
      setPdf(loaded);
      onLoadRef.current?.({ pageCount: loaded.numPages });
    });

    return () => {
      destroyed = true;
      doc?.destroy();
      setPdf(null);
      setPageCount(descriptor?.pages?.length ?? 0);
      setError(null);
    };
  }, [url, store, initialPage, persistKey]);

  useEffect(() => {
    store.setMeta(pageCount, spread);
  }, [pageCount, spread, store]);


  useEffect(() => {
    writeSavedPage(persistKey, currentPage);
  }, [currentPage, persistKey]);

  useEffect(() => {
    rootRef.current?.focus();
  }, [url]);

  useEffect(() => {
    const onFull = () =>
      setFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", onFull);
    return () => document.removeEventListener("fullscreenchange", onFull);
  }, []);

  const fit = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const jump = useCallback(
    (page: number) => {
      store.setPage(page);
      fit();
      onPageChangeRef.current?.({
        page: store.getSnapshot().currentPage,
        pageCount,
      });
    },
    [fit, pageCount, store],
  );

  const emitPage = useCallback(
    (page: number) => {
      fit();
      onPageChangeRef.current?.({ page, pageCount });
    },
    [fit, pageCount],
  );

  const handleFlipSound = useCallback(() => {
    if (!muted) void playPageTurn();
  }, [muted]);

  const zoomBy = useCallback((delta: number) => {
    setScale((value) => {
      const next = clampScale(value + delta);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const cycleLayout = useCallback(() => {
    setLayoutMode((mode) => {
      if (mode === "auto") return spread ? "single" : "spread";
      if (mode === "single") return "spread";
      return "single";
    });
    fit();
  }, [fit, spread]);

  const toggleFullscreen = useCallback(async () => {
    const root = rootRef.current;
    if (!root) return;
    try {
      if (document.fullscreenElement === root) {
        await document.exitFullscreen();
      } else {
        await root.requestFullscreen();
      }
    } catch {
      /* browser blocked */
    }
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (event.key === "Escape") {
        if (overlay) {
          event.preventDefault();
          setOverlay(null);
        }
        return;
      }
      if (event.key === "/" && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setOverlay("search");
        return;
      }
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        viewerRef.current?.next();
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        viewerRef.current?.prev();
      }
      if (event.key === "Home") {
        event.preventDefault();
        jump(1);
      }
      if (event.key === "End") {
        event.preventDefault();
        jump(pageCount);
      }
      if (event.key === "[" || event.key === "{") {
        event.preventDefault();
        decreaseText();
        setPan({ x: 0, y: 0 });
      }
      if (event.key === "]" || event.key === "}") {
        event.preventDefault();
        increaseText();
        setPan({ x: 0, y: 0 });
      }
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        zoomBy(0.2);
      }
      if (event.key === "-" || event.key === "_") {
        event.preventDefault();
        zoomBy(-0.2);
      }
      if (event.key === "0" || event.key.toLowerCase() === "f") {
        if (event.key.toLowerCase() === "f" && event.ctrlKey) return;
        event.preventDefault();
        if (event.key.toLowerCase() === "f" && !event.shiftKey) fit();
        if (event.key === "0") fit();
      }
    };
    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [decreaseText, fit, increaseText, jump, overlay, pageCount, zoomBy]);

  const ready = Boolean(pdf && pageBox);

  return (
    <div
      ref={rootRef}
      className="flipbook-reader"
      style={theme as CSSProperties}
      tabIndex={0}
      data-lite={lite ? "true" : "false"}
      data-lenis-prevent
    >
      <div className="flipbook-reader__stage">
        <button
          type="button"
          className="flipbook-reader__edge flipbook-reader__edge--prev"
          aria-label="Previous page"
          disabled={currentPage <= 1}
          onClick={() => viewerRef.current?.prev()}
        >
          <Icon name="prev" size={28} />
        </button>
        <button
          type="button"
          className="flipbook-reader__edge flipbook-reader__edge--next"
          aria-label="Next page"
          disabled={pageCount > 0 && currentPage >= pageCount}
          onClick={() => viewerRef.current?.next()}
        >
          <Icon name="next" size={28} />
        </button>

        {error ? (
          <p className="flipbook-reader__error">{error}</p>
        ) : !ready ? (
          <div className="flipbook-reader__splash">
            <p className="flipbook-reader__splash-title">
              {descriptor?.title ?? "Course reading"}
            </p>
            <div className="flipbook-reader__splash-bar">
              <span style={{ width: `${Math.round(progress * 100)}%` }} />
            </div>
            <p className="flipbook-reader__status">
              Loading
              {progress > 0 ? ` ${Math.round(progress * 100)}%` : "…"}
            </p>
          </div>
        ) : (
          <FlipbookViewer
            ref={viewerRef}
            pdf={pdf}
            store={store}
            geometry={geometry}
            pageCount={pageCount}
            spread={spread}
            scale={scale}
            textScale={textScale}
            pan={pan}
            onPan={setPan}
            onScale={zoomBy}
            onPageChange={emitPage}
            onFlip={handleFlipSound}
          />
        )}

        {overlay === "toc" ? (
          <OverlayPanel title="Contents" onClose={() => setOverlay(null)}>
            <TableOfContents
              entries={outline}
              currentPage={currentPage}
              onJump={(page) => {
                jump(page);
                setOverlay(null);
              }}
            />
          </OverlayPanel>
        ) : null}
        {overlay === "thumbs" ? (
          <OverlayPanel
            title="Pages"
            wide
            onClose={() => setOverlay(null)}
          >
            <ThumbnailStrip
              pdf={pdf}
              pageCount={pageCount}
              currentPage={currentPage}
              spread={spread}
              onJump={(page) => {
                jump(page);
                setOverlay(null);
              }}
            />
          </OverlayPanel>
        ) : null}
        {overlay === "search" ? (
          <OverlayPanel title="Search" onClose={() => setOverlay(null)}>
            <SearchPanel
              query={query}
              indexing={indexing}
              hits={hits}
              onQuery={setQuery}
              onJump={(page) => {
                jump(page);
                setOverlay(null);
              }}
            />
          </OverlayPanel>
        ) : null}

        {ready && !fullscreen ? (
          <button
            type="button"
            className="flipbook-reader__fs-fab"
            onClick={() => void toggleFullscreen()}
            aria-label="Expand to fullscreen for a better view"
          >
            <span className="flipbook-reader__fs-fab-icon" aria-hidden>
              <Icon name="fullscreen" size={18} />
            </span>
            <span className="flipbook-reader__fs-fab-label">
              Expand for a better view
            </span>
          </button>
        ) : null}
      </div>

      <ReaderToolbar
        title={descriptor?.title}
        currentPage={currentPage}
        pageCount={pageCount}
        scale={scale}
        spread={spread}
        overlay={overlay}
        muted={muted}
        fullscreen={fullscreen}
        lite={lite}
        onOverlay={setOverlay}
        onJump={jump}
        onPrev={() => viewerRef.current?.prev()}
        onNext={() => viewerRef.current?.next()}
        onFirst={() => jump(1)}
        onLast={() => jump(pageCount)}
        onZoom={zoomBy}
        onFit={fit}
        textScale={textScale}
        onTextSmaller={() => {
          decreaseText();
          setPan({ x: 0, y: 0 });
        }}
        onTextLarger={() => {
          increaseText();
          setPan({ x: 0, y: 0 });
        }}
        canTextSmaller={canTextSmaller}
        canTextLarger={canTextLarger}
        onLayout={cycleLayout}
        onMute={() => {
          unlockAudio();
          setMuted((value) => !value);
        }}
        onFullscreen={() => void toggleFullscreen()}
      />
    </div>
  );
}
