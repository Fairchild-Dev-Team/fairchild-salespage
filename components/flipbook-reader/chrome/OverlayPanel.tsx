import type { ReactNode } from "react";
import { Icon } from "./icons";

type OverlayPanelProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
};

export function OverlayPanel({
  title,
  onClose,
  children,
  wide,
}: OverlayPanelProps) {
  return (
    <div
      className={
        wide
          ? "flipbook-reader__scrim flipbook-reader__scrim--bottom"
          : "flipbook-reader__scrim"
      }
      onClick={onClose}
    >
      <aside
        className={
          wide
            ? "flipbook-reader__drawer flipbook-reader__drawer--wide"
            : "flipbook-reader__drawer"
        }
        role="dialog"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flipbook-reader__drawer-head">
          <h3>{title}</h3>
          <button
            type="button"
            className="flipbook-reader__icon-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <Icon name="close" />
          </button>
        </header>
        <div className="flipbook-reader__drawer-body">{children}</div>
      </aside>
    </div>
  );
}
