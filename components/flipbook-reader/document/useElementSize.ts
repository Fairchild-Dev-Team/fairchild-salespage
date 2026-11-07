import { useLayoutEffect, useState } from "react";
import type { RefObject } from "react";

export function useElementSize(ref: RefObject<HTMLElement | null>): {
  width: number;
  height: number;
} {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const readSize = (entry?: ResizeObserverEntry) => {
      const box = entry?.contentBoxSize?.[0];
      if (box) {
        return { width: box.inlineSize, height: box.blockSize };
      }
      if (entry) {
        return {
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        };
      }
      const style = getComputedStyle(node);
      const padX =
        (parseFloat(style.paddingLeft) || 0) +
        (parseFloat(style.paddingRight) || 0);
      const padY =
        (parseFloat(style.paddingTop) || 0) +
        (parseFloat(style.paddingBottom) || 0);
      return {
        width: Math.max(0, node.clientWidth - padX),
        height: Math.max(0, node.clientHeight - padY),
      };
    };

    const update = (entry?: ResizeObserverEntry) => {
      setSize(readSize(entry));
    };

    update();
    const observer = new ResizeObserver((entries) => update(entries[0]));
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}
