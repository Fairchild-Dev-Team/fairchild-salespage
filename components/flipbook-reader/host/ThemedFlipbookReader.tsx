"use client"

import type { CSSProperties } from "react"

import { FlipbookReader } from "../FlipbookReader"
import type { FlipbookDescriptor, FlipbookTheme } from "../types"
import { useFlipbookTheme } from "./useFlipbookTheme"
import "../theme.css"

export type ThemedFlipbookReaderProps = {
  url: string
  title?: string
  descriptor?: FlipbookDescriptor
  /** Theme variant. `tinted` matches sales pink section surfaces. */
  variant?: "auto" | "light" | "dark" | "tinted"
  theme?: FlipbookTheme
  storageKey?: string
  /** Defaults to 1 so the book always opens on the front cover. */
  initialPage?: number
  className?: string
}

export function ThemedFlipbookReader({
  url,
  title,
  descriptor,
  variant = "tinted",
  theme: themeOverride,
  storageKey,
  initialPage = 1,
  className,
}: ThemedFlipbookReaderProps) {
  const themeTokens = useFlipbookTheme(variant)
  const theme = themeOverride ?? themeTokens

  return (
    <div className={className} style={{ height: "100%", minHeight: "inherit" }}>
      <FlipbookReader
        url={url}
        descriptor={{ title, ...descriptor }}
        theme={theme}
        storageKey={storageKey ?? url}
        initialPage={initialPage}
      />
    </div>
  )
}

export function FlipbookSplash({
  title,
  message = "Loading…",
  progress,
  variant = "tinted",
}: {
  title: string
  message?: string
  progress?: number
  variant?: "auto" | "light" | "dark" | "tinted"
}) {
  const theme = useFlipbookTheme(variant)
  return (
    <div className="flipbook-reader" style={theme as CSSProperties}>
      <div className="flipbook-reader__splash">
        <p className="flipbook-reader__splash-title">{title}</p>
        <div className="flipbook-reader__splash-bar">
          <span style={{ width: `${Math.round((progress ?? 0.35) * 100)}%` }} />
        </div>
        <p className="flipbook-reader__status">{message}</p>
      </div>
    </div>
  )
}
