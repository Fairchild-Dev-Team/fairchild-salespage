import { useEffect, useRef } from "react";
import type { SearchHit } from "./useDocumentSearch";

type SearchPanelProps = {
  query: string;
  indexing: boolean;
  hits: SearchHit[];
  onQuery: (value: string) => void;
  onJump: (page: number) => void;
};

export function SearchPanel({
  query,
  indexing,
  hits,
  onQuery,
  onJump,
}: SearchPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flipbook-reader__search-panel">
      <input
        ref={inputRef}
        className="flipbook-reader__search"
        value={query}
        placeholder={indexing ? "Searching…" : "Search this reading"}
        onChange={(event) => onQuery(event.target.value)}
        aria-label="Search document"
      />
      <ul className="flipbook-reader__hit-list">
        {query.trim() && !indexing && hits.length === 0 ? (
          <li className="flipbook-reader__status">No matches</li>
        ) : null}
        {hits.map((hit) => (
          <li key={`${hit.page}-${hit.preview}`}>
            <button
              type="button"
              className="flipbook-reader__hit"
              onClick={() => onJump(hit.page)}
            >
              <span className="flipbook-reader__hit-page">p.{hit.page}</span>
              <span>{hit.preview}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
