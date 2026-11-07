import type { FlipbookTocEntry } from "../types";

type TableOfContentsProps = {
  entries: FlipbookTocEntry[];
  currentPage: number;
  onJump: (pageIndex: number) => void;
};

export function TableOfContents({
  entries,
  currentPage,
  onJump,
}: TableOfContentsProps) {
  if (!entries.length) {
    return <p className="flipbook-reader__status">No table of contents</p>;
  }

  return (
    <nav aria-label="Table of contents">
      {entries.map((entry, index) => (
        <button
          key={`${entry.title}-${entry.pageIndex}-${index}`}
          type="button"
          className="flipbook-reader__toc-item"
          aria-current={currentPage === entry.pageIndex + 1}
          onClick={() => onJump(entry.pageIndex + 1)}
        >
          <span>{entry.title}</span>
          <span className="flipbook-reader__toc-page">
            {entry.pageIndex + 1}
          </span>
        </button>
      ))}
    </nav>
  );
}
