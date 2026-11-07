export function readSavedPage(url: string): number | null {
  try {
    const raw = localStorage.getItem(`fairchild-flipbook:page:${url}`);
    const page = raw ? Number(raw) : NaN;
    return Number.isInteger(page) && page > 0 ? page : null;
  } catch {
    return null;
  }
}

export function writeSavedPage(url: string, page: number) {
  try {
    localStorage.setItem(`fairchild-flipbook:page:${url}`, String(page));
  } catch {
    /* private mode */
  }
}
