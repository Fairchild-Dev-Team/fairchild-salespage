import { useCallback, useEffect, useState } from "react";

export const TEXT_SIZE_STEPS = [1, 1.15, 1.3, 1.5, 1.75, 2] as const;
const STORAGE_KEY = "fairchild-flipbook:textScale";

function nearestStep(value: number): number {
  return TEXT_SIZE_STEPS.reduce((best, step) =>
    Math.abs(step - value) < Math.abs(best - value) ? step : best,
  );
}

function readTextScale(): number {
  try {
    const raw = Number(localStorage.getItem(STORAGE_KEY));
    if (!Number.isFinite(raw) || raw <= 0) return 1;
    return nearestStep(raw);
  } catch {
    return 1;
  }
}

export function useTextSize() {
  const [textScale, setTextScale] = useState(readTextScale);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(textScale));
    } catch {
      /* private mode */
    }
  }, [textScale]);

  const bump = useCallback((direction: -1 | 1) => {
    setTextScale((current) => {
      const index = TEXT_SIZE_STEPS.indexOf(
        nearestStep(current) as (typeof TEXT_SIZE_STEPS)[number],
      );
      const next = TEXT_SIZE_STEPS[Math.min(
        TEXT_SIZE_STEPS.length - 1,
        Math.max(0, index + direction),
      )];
      return next ?? 1;
    });
  }, []);

  return {
    textScale,
    percent: Math.round(textScale * 100),
    canDecrease: textScale > TEXT_SIZE_STEPS[0],
    canIncrease: textScale < TEXT_SIZE_STEPS[TEXT_SIZE_STEPS.length - 1],
    decrease: () => bump(-1),
    increase: () => bump(1),
  };
}
