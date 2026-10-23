import type { Variants } from "framer-motion"

export const featureEase = [0.22, 1, 0.36, 1] as const

export const featureCardSlideDuration = 1.2
export const featureCardStagger = 0.16

export type FeatureSlideDirection = "left" | "right" | "top" | "bottom"

function slideOffset(
  direction: FeatureSlideDirection,
  distance: number
): { x?: number; y?: number } {
  switch (direction) {
    case "left":
      return { x: -distance }
    case "right":
      return { x: distance }
    case "bottom":
      return { y: distance }
    case "top":
    default:
      return { y: -distance }
  }
}

export function featureCardSlideVariants(
  direction: FeatureSlideDirection = "bottom",
  distance = 40
): Variants {
  return {
    hidden: {
      ...slideOffset(direction, distance),
      visibility: "hidden",
    },
    visible: {
      x: 0,
      y: 0,
      visibility: "visible",
      transition: { duration: featureCardSlideDuration, ease: featureEase },
    },
  }
}

export const featureGridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: featureCardStagger, delayChildren: 0 },
  },
}

export const featureListItemVariants: Variants = {
  hidden: { x: -28, opacity: 1 },
  visible: {
    x: 0,
    transition: { duration: 0.55, ease: featureEase },
  },
}
