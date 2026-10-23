"use client"

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react"

import { cn } from "@/lib/utils"

type HeadlineTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type AnimatedHeadlineProps = {
  as?: HeadlineTag
  className?: string
  stagger?: number
  initialDelay?: number
  animateOnView?: boolean
  lineTexts?: string[]
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLHeadingElement>, "children">

function lineStyle(
  index: number,
  stagger: number,
  initialDelay: number
): CSSProperties {
  return {
    "--headline-animation-delay": `${initialDelay + index * stagger}s`,
  } as CSSProperties
}

const emptySubscribe = () => () => {}

export function AnimatedHeadline({
  as: Tag = "h1",
  className,
  stagger = 0.3,
  initialDelay = 0.15,
  animateOnView = true,
  lineTexts,
  children,
  ...props
}: AnimatedHeadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isReady = useSyncExternalStore(emptySubscribe, () => true, () => false)
  const [hasIntersected, setHasIntersected] = useState(false)

  useEffect(() => {
    if (!animateOnView) return

    const node = ref.current
    if (!node) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setHasIntersected(true))
      return () => cancelAnimationFrame(id)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasIntersected(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [animateOnView])

  const isVisible = !animateOnView ? isReady : hasIntersected

  const content = lineTexts
    ? lineTexts.map((text, index) => (
        <span
          key={index}
          className="animated-headline-line"
          style={lineStyle(index, stagger, initialDelay)}
        >
          {text}
        </span>
      ))
    : children

  return (
    <Tag
      ref={ref}
      className={cn(
        "animated-headline",
        isReady && "animated-headline--ready",
        isVisible && "is-visible",
        className
      )}
      {...props}
    >
      {content}
    </Tag>
  )
}
