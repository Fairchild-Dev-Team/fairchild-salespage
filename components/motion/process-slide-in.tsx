"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"

import {
  featureCardSlideDuration,
  featureCardSlideVariants,
  featureEase,
  type FeatureSlideDirection,
} from "@/lib/featureMotion"
import { cn } from "@/lib/utils"

type ProcessSlideInProps = {
  children: React.ReactNode
  direction: FeatureSlideDirection
  revealed: boolean
  className?: string
  delay?: number
}

function slideVariants(
  direction: FeatureSlideDirection,
  delay: number
): Variants {
  const base = featureCardSlideVariants(direction)
  const visible = base.visible
  if (typeof visible !== "object" || visible === null) {
    return base
  }
  return {
    ...base,
    visible: {
      ...visible,
      transition: {
        ...(typeof visible.transition === "object" ? visible.transition : {}),
        duration: featureCardSlideDuration,
        ease: featureEase,
        delay,
      },
    },
  }
}

export function ProcessSlideIn({
  children,
  direction,
  revealed,
  className,
  delay = 0,
}: ProcessSlideInProps) {
  const reduceMotion = useReducedMotion()
  const animate = reduceMotion || revealed ? "visible" : "hidden"

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : "hidden"}
      animate={animate}
      variants={slideVariants(direction, delay)}
    >
      {children}
    </motion.div>
  )
}
