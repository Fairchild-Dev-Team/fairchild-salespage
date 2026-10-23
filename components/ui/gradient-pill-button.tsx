import Link from "next/link"

import { ButtonArrowIcon } from "@/components/ui/button-arrow-icon"
import {
  brandPinkHoverClass,
  brandPinkHoverInsetClass,
} from "@/lib/buttonStyles"
import { cn } from "@/lib/utils"

type GradientPillButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "gradient" | "outline"
  showArrow?: boolean
  href?: string
  arrowSize?: number
}

export function GradientPillButton({
  children,
  className,
  variant = "gradient",
  showArrow = true,
  href,
  arrowSize = 20,
  ...props
}: GradientPillButtonProps) {
  const isGradient = variant === "gradient"

  const classes = cn(
    "relative flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-4 py-3.5",
    brandPinkHoverClass,
    !isGradient && brandPinkHoverInsetClass,
    isGradient
      ? "border border-[#FA9BF6] shadow-[0_9px_10.7px_rgba(250,155,246,0.25)]"
      : "border border-[#EEF6F7] bg-white shadow-[0_9px_10.7px_rgba(71,194,255,0.16)]",
    className
  )

  const content = (
    <>
      {isGradient && (
        <>
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(95.72deg, #F233EA 43.24%, #FA9BF6 98.17%)",
            }}
            aria-hidden
          />
          <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_4px_6.4px_rgba(255,255,255,0.45)]" />
        </>
      )}
      {!isGradient && (
        <span className="pointer-events-none absolute inset-0 rounded-full bg-white shadow-[inset_0_4px_6.4px_rgba(255,255,255,0.45)]" />
      )}
      <span
        className={cn(
          "relative z-10 text-center font-heading text-lg font-medium leading-none tracking-[-0.08em] sm:text-xl sm:tracking-[-1.2px]",
          isGradient ? "text-white" : "text-[#0E121B]"
        )}
      >
        {children}
      </span>
      {showArrow && isGradient && (
        <ButtonArrowIcon
          size={arrowSize}
          className="relative z-10 text-white"
        />
      )}
    </>
  )

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:")
    if (external) {
      return (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={classes}
        >
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
