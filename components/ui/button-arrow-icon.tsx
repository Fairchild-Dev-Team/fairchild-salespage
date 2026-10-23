import { cn } from "@/lib/utils"

const ARROW_PATH =
  "M10 0C15.52 0 20 4.48 20 10C20 15.52 15.52 20 10 20C4.48 20 0 15.52 0 10C0 4.48 4.48 0 10 0ZM10 9H6V11H10V14L14 10L10 6V9Z"

export function ButtonArrowIcon({
  size = 20,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <path d={ARROW_PATH} fill="currentColor" />
    </svg>
  )
}
