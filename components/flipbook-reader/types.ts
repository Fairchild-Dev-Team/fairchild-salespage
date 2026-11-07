export type FlipbookPageGeometry = {
  width: number;
  height: number;
  rotation?: number;
};

export type FlipbookTocEntry = {
  title: string;
  pageIndex: number;
};

export type FlipbookDescriptor = {
  title?: string;
  pages?: FlipbookPageGeometry[];
  toc?: FlipbookTocEntry[];
};

export type FlipbookTheme = {
  [token: string]: string;
};

export type FlipbookPageChangeEvent = {
  page: number;
  pageCount: number;
};

export type FlipbookLoadEvent = {
  pageCount: number;
};

export type FlipbookProgressEvent = {
  ratio: number;
};

export type FlipbookLayoutMode = "auto" | "single" | "spread";

export type FlipbookOverlay = "toc" | "thumbs" | "search" | null;

export type FlipbookReaderProps = {
  url: string;
  descriptor?: FlipbookDescriptor;
  initialPage?: number;
  theme?: FlipbookTheme;
  /** Stable key for last-page resume. Defaults to `url`. */
  storageKey?: string;
  onPageChange?: (event: FlipbookPageChangeEvent) => void;
  onLoad?: (event: FlipbookLoadEvent) => void;
  onError?: (error: Error) => void;
  onProgress?: (event: FlipbookProgressEvent) => void;
};
