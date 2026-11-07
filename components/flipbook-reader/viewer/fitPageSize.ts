export function isLandscapePage(width: number, height: number): boolean {
  return width > height;
}

export function fitPageSize({
  pageWidth,
  pageHeight,
  viewportWidth,
  viewportHeight,
  spread,
  padding = 16,
  magnify = 1,
}: {
  pageWidth: number;
  pageHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  spread: boolean;
  padding?: number;
  magnify?: number;
}): { width: number; height: number } {
  const availW = Math.max(1, viewportWidth - padding * 2);
  const availH = Math.max(1, viewportHeight - padding * 2);
  const ratio = pageWidth / Math.max(1, pageHeight);
  const columns = spread ? 2 : 1;

  let width = availW / columns;
  let height = width / ratio;
  if (height > availH) {
    height = availH;
    width = height * ratio;
  }

  const boost = Number.isFinite(magnify) && magnify > 0 ? magnify : 1;
  return {
    width: Math.max(1, Math.round(width * boost)),
    height: Math.max(1, Math.round(height * boost)),
  };
}
