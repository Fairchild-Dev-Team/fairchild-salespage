"use client"

import { useLenis } from "lenis/react"

import { GradientPillButton } from "@/components/ui/gradient-pill-button"

/** Event the institute browser listens for to open a product. */
export const CATALOGUE_SELECT_PRODUCT = "catalogue:select-product"

/** Opens a product in the "Choose an institute" browser and scrolls to it. */
export function CatalogueProductButton({
  productId,
  children,
  className,
}: {
  productId: string
  children: React.ReactNode
  className?: string
}) {
  const lenis = useLenis()

  return (
    <GradientPillButton
      className={className}
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent<string>(CATALOGUE_SELECT_PRODUCT, {
            detail: productId,
          })
        )
        // Keeps a shareable URL; the browser also reads this hash on load.
        window.history.replaceState(null, "", `#product-${productId}`)
        const target = document.getElementById("programmes")
        if (!target) return
        if (lenis) lenis.scrollTo(target)
        else target.scrollIntoView({ behavior: "smooth", block: "start" })
      }}
    >
      {children}
    </GradientPillButton>
  )
}
