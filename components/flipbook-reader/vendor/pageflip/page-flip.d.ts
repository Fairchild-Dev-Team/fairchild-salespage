declare module "page-flip" {
  export class PageFlip {
    constructor(
      element: HTMLElement,
      settings: {
        width: number;
        height: number;
        size?: "fixed" | "stretch";
        minWidth?: number;
        maxWidth?: number;
        minHeight?: number;
        maxHeight?: number;
        drawShadow?: boolean;
        flippingTime?: number;
        usePortrait?: boolean;
        startZIndex?: number;
        autoSize?: boolean;
        maxShadowOpacity?: number;
        showCover?: boolean;
        mobileScrollSupport?: boolean;
        swipeDistance?: number;
        clickEventForward?: boolean;
        useMouseEvents?: boolean;
        showPageCorners?: boolean;
        disableFlipByClick?: boolean;
        startPage?: number;
      },
    );
    loadFromHTML(items: ArrayLike<HTMLElement>): void;
    destroy(): void;
    clear(): void;
    on(event: string, callback: (event: { data: number }) => void): this;
    flip(page: number, corner?: "top" | "bottom"): void;
    flipNext(corner?: "top" | "bottom"): void;
    flipPrev(corner?: "top" | "bottom"): void;
    turnToPage(page: number): void;
    update(): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    getSettings(): { width: number; height: number };
  }
}
