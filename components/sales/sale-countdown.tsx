"use client"

import { useReducedMotion } from "framer-motion"
import { useSyncExternalStore } from "react"

import { CountdownDigit } from "@/components/ui/countdown-digit"
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
    { label: "DAYS", value: Math.floor(seconds / 86400) },
    { label: "HOURS", value: Math.floor(seconds / 3600) % 24 },
    { label: "MINUTES", value: Math.floor(seconds / 60) % 60 },
    { label: "SECONDS", value: seconds % 60 },
  ]
}

/** "Sale ends soon" card with the event page's flip-digit countdown to `endsAt`. */
export function SaleCountdown({
  endsAt,
  className,
}: {
  endsAt: string
  className?: string
}) {
  const reduceMotion = useReducedMotion() ?? false
  const now = useNowSeconds()
  const remaining =
    now === null
      ? null
      : Math.max(0, Math.floor(Date.parse(endsAt) / 1000) - now)
  if (remaining === 0) return null

  const units = unitsFrom(remaining ?? 0)
  const accessibleText =
    remaining === null
      ? "Time left in the sale is loading."
      : `${units[0].value} days, ${units[1].value} hours, ${units[2].value} minutes and ${units[3].value} seconds left in the sale.`

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[20px] border border-white/10 bg-[linear-gradient(117deg,#310130_0%,#950392_50%,#40143F_100%)] px-5 py-4 text-white",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[80%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(250,155,246,0.28)_0%,rgba(173,20,167,0.18)_42%,transparent_70%)] blur-2xl"
      />
      <p className="relative flex items-center gap-2 text-sm font-semibold">
        <span
          className="size-2 animate-pulse rounded-full bg-[#FA9BF6] shadow-[0_0_8px_#FA9BF6]"
          aria-hidden
        />
        Sale ends soon
      </p>
      <div
        role="timer"
        aria-label={accessibleText}
        className="relative mt-3 flex gap-3 sm:gap-4"
      >
        <p className="sr-only">{accessibleText}</p>
        {units.map((unit) => {
          const text =
            remaining === null ? "--" : String(unit.value).padStart(2, "0")
          return (
            <div key={unit.label} className="flex flex-col items-center gap-2">
              <div
                aria-hidden
                className="flex gap-1"
                style={{
                  width: `${text.length * 30 + (text.length - 1) * 4}px`,
                }}
              >
                {text.split("").map((char, index) => (
                  <CountdownDigit
                    key={`${unit.label}-${index}`}
                    char={char}
                    size="sm"
                    inverted={unit.label === "SECONDS"}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>
              <p className="text-[10px] font-semibold tracking-[0.18em] text-white/70">
                {unit.label}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
