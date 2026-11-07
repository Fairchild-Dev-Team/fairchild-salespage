"use client"

import { useMemo } from "react"
import { useTheme } from "next-themes"

import type { FlipbookTheme } from "../types"

/**
 * Maps salespage design tokens onto the flipbook CSS custom properties.
 * Fonts resolve through next/font variables on <html>.
 */
const shared: FlipbookTheme = {
  "--fb-accent": "var(--brand-pink-bright)",
  "--fb-danger": "var(--destructive)",
  "--fb-font": "var(--font-sans)",
  "--fb-title-font": "var(--font-heading)",
  "--fb-page": "#fbfbfd",
}

const themes: Record<"light" | "dark", FlipbookTheme> = {
  light: {
    ...shared,
    "--fb-bg": "var(--background)",
    "--fb-bg-subtle": "var(--section-pink)",
    "--fb-text": "var(--foreground)",
    "--fb-muted": "var(--muted-foreground)",
    "--fb-border": "color-mix(in srgb, var(--foreground) 12%, transparent)",
    "--fb-shell": "color-mix(in srgb, var(--background) 92%, transparent)",
    "--fb-shadow": "0 24px 60px color-mix(in srgb, var(--foreground) 12%, transparent)",
    "--fb-drawer": "var(--background)",
    "--fb-hover": "color-mix(in srgb, var(--foreground) 6%, transparent)",
    "--fb-edge": "color-mix(in srgb, var(--foreground) 48%, transparent)",
    "--fb-edge-hover": "color-mix(in srgb, var(--foreground) 72%, transparent)",
    "--fb-input-bg": "color-mix(in srgb, var(--foreground) 4%, transparent)",
    "--fb-scrim": "color-mix(in srgb, var(--foreground) 35%, transparent)",
    "--fb-thumb-bg": "var(--muted)",
    "--fb-splash-track": "color-mix(in srgb, var(--foreground) 8%, transparent)",
    "--fb-wash":
      "radial-gradient(1200px 500px at 50% 0%, color-mix(in srgb, var(--brand-pink-bright) 16%, transparent), transparent 55%)",
  },
  dark: {
    ...shared,
    "--fb-bg": "var(--background)",
    "--fb-bg-subtle": "var(--card)",
    "--fb-text": "var(--foreground)",
    "--fb-muted": "var(--muted-foreground)",
    "--fb-border": "color-mix(in srgb, var(--foreground) 12%, transparent)",
    "--fb-shell": "color-mix(in srgb, var(--background) 92%, transparent)",
    "--fb-shadow": "0 24px 60px rgb(0 0 0 / 0.45)",
    "--fb-drawer": "var(--card)",
    "--fb-hover": "color-mix(in srgb, var(--foreground) 10%, transparent)",
    "--fb-edge": "color-mix(in srgb, var(--foreground) 55%, transparent)",
    "--fb-edge-hover": "color-mix(in srgb, var(--foreground) 78%, transparent)",
    "--fb-input-bg": "color-mix(in srgb, var(--foreground) 6%, transparent)",
    "--fb-scrim": "rgb(8 10 14 / 0.45)",
    "--fb-thumb-bg": "var(--card)",
    "--fb-splash-track": "color-mix(in srgb, var(--foreground) 12%, transparent)",
    "--fb-wash":
      "radial-gradient(1200px 500px at 50% 0%, color-mix(in srgb, var(--brand-pink-bright) 8%, transparent), transparent 55%)",
  },
}

/** Soft pink wash for sales sections (matches card / section-pink surfaces). */
export const tintedFlipbookTheme: FlipbookTheme = {
  ...shared,
  "--fb-bg": "var(--section-pink)",
  "--fb-bg-subtle": "var(--primary-pink-10)",
  "--fb-text": "var(--foreground)",
  "--fb-muted": "var(--muted-foreground)",
  "--fb-border": "var(--border)",
  "--fb-shell": "color-mix(in srgb, var(--background) 88%, transparent)",
  "--fb-shadow": "0 24px 60px color-mix(in srgb, var(--foreground) 12%, transparent)",
  "--fb-drawer": "var(--background)",
  "--fb-hover": "color-mix(in srgb, var(--brand-purple) 6%, transparent)",
  "--fb-edge": "color-mix(in srgb, var(--foreground) 40%, transparent)",
  "--fb-edge-hover": "color-mix(in srgb, var(--foreground) 62%, transparent)",
  "--fb-input-bg": "color-mix(in srgb, var(--foreground) 4%, transparent)",
  "--fb-scrim": "color-mix(in srgb, var(--foreground) 30%, transparent)",
  "--fb-thumb-bg": "var(--muted)",
  "--fb-splash-track": "color-mix(in srgb, var(--foreground) 8%, transparent)",
  "--fb-wash":
    "radial-gradient(1200px 500px at 50% 0%, color-mix(in srgb, var(--brand-pink-bright) 22%, transparent), transparent 55%)",
}

export function useFlipbookTheme(
  variant: "auto" | "light" | "dark" | "tinted" = "auto"
): FlipbookTheme {
  const { resolvedTheme } = useTheme()

  return useMemo(() => {
    if (variant === "tinted") return tintedFlipbookTheme
    if (variant === "light") return themes.light
    if (variant === "dark") return themes.dark
    return themes[resolvedTheme === "dark" ? "dark" : "light"]
  }, [resolvedTheme, variant])
}
