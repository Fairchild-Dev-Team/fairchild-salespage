import { cn } from "@/lib/utils"

export function SectionShell({
  id,
  className,
  children,
  bleed,
}: {
  id?: string
  className?: string
  children: React.ReactNode
  bleed?: boolean
}) {
  return (
    <section
      id={id}
      className={cn(
        bleed
          ? "w-full"
          : "mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20",
        className
      )}
    >
      {bleed ? (
        <div className="mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  )
}
