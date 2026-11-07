export function pagesInWindow(
  currentPage: number,
  pageCount: number,
  spread: boolean,
  radius = 2,
): number[] {
  if (pageCount <= 0) return [];
  const spreadSize = spread ? 2 : 1;
  const spreadIndex = Math.floor((Math.max(1, currentPage) - 1) / spreadSize);
  const start = Math.max(1, spreadIndex * spreadSize + 1 - radius * spreadSize);
  const end = Math.min(
    pageCount,
    (spreadIndex + 1) * spreadSize + radius * spreadSize,
  );
  const pages: number[] = [];
  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }
  return pages;
}

type Listener = () => void;

export type PageWindowState = {
  currentPage: number;
  pageCount: number;
  spread: boolean;
  rendered: ReadonlySet<number>;
};

export function createPageWindowStore(initial: Omit<PageWindowState, "rendered">) {
  let state: PageWindowState = {
    ...initial,
    rendered: new Set(pagesInWindow(initial.currentPage, initial.pageCount, initial.spread)),
  };
  const listeners = new Set<Listener>();

  const emit = () => {
    for (const listener of listeners) listener();
  };

  return {
    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot(): PageWindowState {
      return state;
    },
    setPage(page: number) {
      const currentPage = Math.min(Math.max(1, page), Math.max(1, state.pageCount));
      if (currentPage === state.currentPage) return;
      state = {
        ...state,
        currentPage,
        rendered: new Set(
          pagesInWindow(currentPage, state.pageCount, state.spread),
        ),
      };
      emit();
    },
    setMeta(pageCount: number, spread: boolean) {
      state = {
        ...state,
        pageCount,
        spread,
        rendered: new Set(pagesInWindow(state.currentPage, pageCount, spread)),
      };
      emit();
    },
    isRendered(page: number) {
      return state.rendered.has(page);
    },
  };
}

export type PageWindowStore = ReturnType<typeof createPageWindowStore>;
