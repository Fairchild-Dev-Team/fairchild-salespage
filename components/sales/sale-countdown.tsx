"use client"

import { useSyncExternalStore } from "react"

import { cn } from "@/lib/utils"

function subscribeToSeconds(onTick: () => void) {
  const interval = setInterval(onTick, 1000)
  return () => clearInterval(interval)
}

/** Whole seconds, so the snapshot stays the same within a second. The server renders no time. */
function useNowSeconds() {
  return useSyncExternalStore(
    subscribeToSeconds,
    () => Math.floor(Date.now() / 1000),
    () => null
  )
}

function unitsFrom(seconds: number) {
  return [
    { label: "Days", value: Math.floor(seconds / 86400) },
    { label: "Hrs", value: Math.floor(seconds / 3600) % 24 },
    { label: "Min", value: Math.floor(seconds / 60) % 60 },
    { label: "Sec", value: seconds % 60 },
  ]
}

/** "Sale ends soon" banner with a live countdown to `endsAt`. */
export function SaleCountdown({
  endsAt,
  className,
}: {
  endsAt: string
  className?: string
}) {
  const now = useNowSeconds()
  const remaining =
    now === null
      ? null
      : Math.max(0, Math.floor(Date.parse(endsAt) / 1000) - now)
  if (remaining === 0) return null

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#1A0614] px-4 py-3 text-white",
        className
      )}
    >
      <p className="flex items-center gap-2 text-sm font-semibold">
        <span
          className="size-2 animate-pulse rounded-full bg-[#FA9BF6]"
          aria-hidden
        />
        Sale ends soon
      </p>
      <div
        className="flex gap-1.5"
        role="timer"
        aria-label={
          remaining === null
            ? "Time left in the sale"
            : `${unitsFrom(remaining)
                .map((unit) => `${unit.value} ${unit.label}`)
                .join(", ")} left in the sale`
        }
      >
        {unitsFrom(remaining ?? 0).map((unit) => (
          <span
            key={unit.label}
            className="flex min-w-11 flex-col items-center rounded-lg bg-white/10 px-2 py-1"
            aria-hidden
          >
            <span className="font-heading text-base leading-tight font-semibold tabular-nums">
              {remaining === null ? "--" : String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] tracking-wide text-white/60 uppercase">
              {unit.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
