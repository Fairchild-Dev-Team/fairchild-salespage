import { useEffect, useMemo, useState } from "react";
import type { FlipbookOverlay } from "../types";
import {
  buildSpreadLeaves,
  leafForPage,
  parsePageJump,
} from "../viewer/spreadLeaves";
import { Icon, type IconName } from "./icons";

type ReaderToolbarProps = {
  title?: string;
  currentPage: number;
  pageCount: number;
  scale: number;
  spread: boolean;
  overlay: FlipbookOverlay;
  muted: boolean;
  fullscreen: boolean;
  lite: boolean;
  onOverlay: (overlay: FlipbookOverlay) => void;
  onJump: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
  onZoom: (delta: number) => void;
  onFit: () => void;
  textScale: number;
  onTextSmaller: () => void;
  onTextLarger: () => void;
  canTextSmaller: boolean;
  canTextLarger: boolean;
  onLayout: () => void;
  onMute: () => void;
  onFullscreen: () => void;
};

function ToolButton({
  label,
  pressed,
  disabled,
  icon,
  onClick,
}: {
  label: string;
  icon: IconName;
  pressed?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="flipbook-reader__icon-btn"
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon name={icon} />
    </button>
  );
}

export function ReaderToolbar({
  title,
  currentPage,
  pageCount,
  scale,
  overlay,
  muted,
  fullscreen,
  lite,
  spread,
  onOverlay,
  onJump,
  onPrev,
  onNext,
  onFirst,
  onLast,
  onZoom,
  onFit,
  textScale,
  onTextSmaller,
  onTextLarger,
  canTextSmaller,
  canTextLarger,
  onLayout,
  onMute,
  onFullscreen,
}: ReaderToolbarProps) {
  const toggle = (next: Exclude<FlipbookOverlay, null>) => {
    onOverlay(overlay === next ? null : next);
  };

  return (
    <div className="flipbook-reader__bar">
      {!lite ? (
        <>
          <ToolButton
            label="Contents"
            icon="toc"
            pressed={overlay === "toc"}
            onClick={() => toggle("toc")}
          />
          <ToolButton
            label="Pages"
            icon="thumbs"
            pressed={overlay === "thumbs"}
            onClick={() => toggle("thumbs")}
          />
          <ToolButton
            label="Search"
            icon="search"
            pressed={overlay === "search"}
            onClick={() => toggle("search")}
          />
        </>
      ) : (
        <>
          <ToolButton
            label="Pages"
            icon="thumbs"
            pressed={overlay === "thumbs"}
            onClick={() => toggle("thumbs")}
          />
          <ToolButton
            label="Search"
            icon="search"
            pressed={overlay === "search"}
            onClick={() => toggle("search")}
          />
        </>
      )}

      <span className="flipbook-reader__bar-gap" />

      {!lite ? (
        <ToolButton
          label="First page"
          icon="first"
          disabled={currentPage <= 1}
          onClick={onFirst}
        />
      ) : null}
      <ToolButton
        label="Previous page"
        icon="prev"
        disabled={currentPage <= 1}
        onClick={onPrev}
      />
      <PageJumpField
        currentPage={currentPage}
        pageCount={pageCount}
        spread={spread}
        onJump={onJump}
      />
      <ToolButton
        label="Next page"
        icon="next"
        disabled={pageCount > 0 && currentPage >= pageCount}
        onClick={onNext}
      />
      {!lite ? (
        <ToolButton
          label="Last page"
          icon="last"
          disabled={pageCount > 0 && currentPage >= pageCount}
          onClick={onLast}
        />
      ) : null}

      <span className="flipbook-reader__bar-gap" />

      <div className="flipbook-reader__text-size" role="group" aria-label="Document text size">
        <ToolButton
          label="Smaller text"
          icon="textSmall"
          disabled={!canTextSmaller}
          onClick={onTextSmaller}
        />
        <span className="flipbook-reader__text-size-label">
          {Math.round(textScale * 100)}%
        </span>
        <ToolButton
          label="Larger text"
          icon="textLarge"
          disabled={!canTextLarger}
          onClick={onTextLarger}
        />
      </div>
      <ToolButton label="Zoom out" icon="minus" onClick={() => onZoom(-0.2)} />
      <ToolButton label="Fit page" icon="fit" pressed={scale === 1} onClick={onFit} />
      <ToolButton label="Zoom in" icon="plus" onClick={() => onZoom(0.2)} />
      {!lite ? (
        <ToolButton
          label={spread ? "Single page" : "Two-page spread"}
          icon={spread ? "single" : "spread"}
          pressed={spread}
          onClick={onLayout}
        />
      ) : null}
      {!lite ? (
        <ToolButton
          label={muted ? "Unmute page sound" : "Mute page sound"}
          icon={muted ? "mute" : "sound"}
          pressed={muted}
          onClick={onMute}
        />
      ) : null}
      <ToolButton
        label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
        icon={fullscreen ? "exitFullscreen" : "fullscreen"}
        pressed={fullscreen}
        onClick={onFullscreen}
      />
      {title && !lite ? (
        <span className="flipbook-reader__bar-title" title={title}>
          {title}
        </span>
      ) : null}
    </div>
  );
}

function PageJumpField({
  currentPage,
  pageCount,
  spread,
  onJump,
}: {
  currentPage: number;
  pageCount: number;
  spread: boolean;
  onJump: (page: number) => void;
}) {
  const leaves = useMemo(
    () => buildSpreadLeaves(pageCount, spread),
    [pageCount, spread],
  );
  const currentLabel =
    leafForPage(leaves, currentPage)?.label ?? String(currentPage);
  const [draft, setDraft] = useState(currentLabel);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setDraft(currentLabel);
  }, [currentLabel, focused]);

  const commit = () => {
    const page = parsePageJump(draft, pageCount, spread);
    if (page) onJump(page);
    setFocused(false);
  };

  return (
    <label className="flipbook-reader__page-label">
      <input
        className="flipbook-reader__page-input"
        type="text"
        inputMode={spread ? "text" : "numeric"}
        value={focused ? draft : currentLabel}
        aria-label={spread ? "Go to page or spread" : "Go to page"}
        onFocus={() => {
          setFocused(true);
          setDraft(currentLabel);
        }}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.currentTarget.blur();
        }}
      />
      <span>/ {pageCount || "…"}</span>
    </label>
  );
}
