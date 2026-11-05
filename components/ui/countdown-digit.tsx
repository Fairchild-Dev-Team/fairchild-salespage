"use client"

import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

type CountdownDigitProps = {
  char: string
  inverted?: boolean
  reduceMotion: boolean
  /** "sm" for the compact countdown band and closing card. */
  size?: "lg" | "sm"
}

const faceSize = {
  lg: "text-[clamp(3.5rem,11vw,10.5rem)]",
  sm: "text-[24px]",
}

function DigitFace({
  char,
  inverted,
  size,
}: {
  char: string
  inverted: boolean
  size: "lg" | "sm"
}) {
  return (
    <span
      className={cn(
        "flex size-full items-center justify-center font-heading leading-none font-bold",
        faceSize[size],
        inverted ? "bg-[#AD14A7] text-white" : "bg-white text-[#AD14A7]"
      )}
    >
      {char}
    </span>
  )
}

export function CountdownDigit({
  char,
  inverted = false,
  reduceMotion,
  size = "lg",
}: CountdownDigitProps) {
  return (
    <div className="relative aspect-[3/4] flex-1" style={{ perspective: 1000 }}>
      <div
        className={cn(
          "relative size-full overflow-hidden rounded-md border border-[#1B1826]",
          size === "lg"
            ? "shadow-[0_16px_24px_rgba(0,0,0,0.45)]"
            : "shadow-[0_8px_14px_rgba(0,0,0,0.35)]",
          inverted ? "bg-[#AD14A7]" : "bg-white"
        )}
      >
        {/* Static bottom half of the current digit */}
        <div className="absolute inset-x-0 top-1/2 bottom-0 overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-[200%]">
            <DigitFace char={char} inverted={inverted} size={size} />
          </div>
        </div>

        {/* Static top half of the current digit (under the flipping flap) */}
        <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[200%]">
            <DigitFace char={char} inverted={inverted} size={size} />
          </div>
        </div>

        {/* Flipping top flap */}
        <AnimatePresence initial={false}>
          {!reduceMotion && (
            <motion.div
              key={char}
              initial={{ rotateX: -90 }}
              animate={{ rotateX: 0 }}
              exit={{ rotateX: 90 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transformOrigin: "50% 100%",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
              className="absolute inset-x-0 top-0 z-10 h-1/2 overflow-hidden rounded-t-md will-change-transform"
            >
              <div className="absolute inset-x-0 top-0 h-[200%]">
                <DigitFace char={char} inverted={inverted} size={size} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-1/2 z-30 h-px",
            inverted ? "bg-white/40" : "bg-[#1B1826]/30"
          )}
        />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-1/2 left-0 z-30 h-4 w-1.5 -translate-y-1/2 rounded-r-sm",
            size === "sm" && "hidden",
            inverted ? "bg-white" : "bg-[#AD14A7]"
          )}
        />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-1/2 right-0 z-30 h-4 w-1.5 -translate-y-1/2 rounded-l-sm",
            size === "sm" && "hidden",
            inverted ? "bg-white" : "bg-[#AD14A7]"
          )}
        />
      </div>
    </div>
  )
}
