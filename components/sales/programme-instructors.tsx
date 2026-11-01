"use client"

import Image from "next/image"
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { cn } from "@/lib/utils"
import type { Instructor } from "@/components/sales/fairchild-instructors"

const AUTO_ADVANCE_MS = 5000

function InstructorBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex w-fit items-center self-start rounded-md bg-[#FEF5FE] px-1 py-0.5 text-[10px] leading-3 font-semibold tracking-[0.4px] text-[#932784] uppercase sm:h-6 sm:px-1.5 sm:py-1 sm:text-xs sm:leading-4 sm:tracking-[0.48px]">
      {label}
    </span>
  )
}

function InstructorInfoCard({ instructor }: { instructor: Instructor }) {
  return (
    <div className="flex w-full flex-col gap-1.5 rounded-lg border border-[#EEF6F7] bg-white p-3 shadow-sm sm:max-w-[339px] sm:gap-2.5 sm:rounded-2xl sm:p-5">
      <div className="flex flex-col gap-1 sm:gap-2">
        <InstructorBadge label={instructor.badge} />
        <p className="font-heading text-lg leading-6 font-semibold tracking-[-0.18px] text-[#0E121B] sm:text-2xl sm:leading-[30px] sm:tracking-[-0.24px]">
          {instructor.name}
        </p>
      </div>
      <p className="line-clamp-2 text-xs leading-[18px] text-[#525866] sm:line-clamp-none sm:text-base sm:leading-6">
        {instructor.quote}
      </p>
    </div>
  )
}

function InstructorPortrait({
  instructor,
  isActive,
  cardRef,
  onSelect,
}: {
  instructor: Instructor
  isActive: boolean
  cardRef?: (el: HTMLElement | null) => void
  onSelect: () => void
}) {
  return (
    <article
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`Show ${instructor.name}`}
      aria-current={isActive ? "true" : undefined}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onSelect()
        }
      }}
      className={cn(
        "shrink-0 cursor-pointer snap-center transition-all duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-[#FA9BF6] focus-visible:ring-offset-4",
        isActive
          ? "z-10 scale-100 opacity-100"
          : "z-0 scale-[0.97] opacity-[0.18] grayscale hover:scale-[0.99] hover:opacity-65 hover:grayscale-[40%]"
      )}
    >
      <div
        className={cn(
          "relative h-[min(400px,62dvh)] w-[min(300px,calc(100vw-3rem))] overflow-hidden rounded-[24px] transition-[border-color,box-shadow] duration-500 sm:h-[min(547px,85vw)] sm:w-[min(401px,88vw)] sm:rounded-[32px]",
          isActive
            ? "border border-[#FA9BF6] shadow-[-3px_31px_42px_24px_rgba(250,155,246,0.25)]"
            : "border border-transparent hover:border-[#FA9BF6]/40 hover:shadow-[0_12px_32px_rgba(250,155,246,0.2)]"
        )}
      >
        <Image
          src={instructor.image}
          alt=""
          fill
          className={cn(
            "bg-[#E8E8E8] object-cover",
            instructor.imagePosition ?? "object-top"
          )}
          sizes="(max-width: 640px) 85vw, 401px"
          aria-hidden
        />
        <div className="absolute inset-x-2 bottom-2 z-10 flex justify-center sm:inset-x-5 sm:bottom-5">
          <InstructorInfoCard instructor={instructor} />
        </div>
      </div>
    </article>
  )
}

export function ProgrammeInstructors({
  heading,
  subtitle,
  instructors,
}: {
  heading: string
  subtitle: string
  instructors: Instructor[]
}) {
  const headingId = useId()
  const slideCount = instructors.length
  const startIndex = slideCount
  const slides = [...instructors, ...instructors, ...instructors]
  const carouselRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const physicalIndexRef = useRef(startIndex)
  const isJumpingRef = useRef(false)
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const centerPhysicalCard = useCallback(
    (physicalIndex: number, behavior: ScrollBehavior = "auto") => {
      const carousel = carouselRef.current
      const card = cardRefs.current[physicalIndex]
      if (!carousel || !card || slideCount === 0) return

      const targetScrollLeft =
        card.offsetLeft - (carousel.clientWidth - card.offsetWidth) / 2
      carousel.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior,
      })
      physicalIndexRef.current = physicalIndex
      setActive(physicalIndex % slideCount)
    },
    [slideCount]
  )

  const goToInstructor = useCallback(
    (logicalIndex: number) => {
      centerPhysicalCard(slideCount + logicalIndex, "smooth")
    },
    [centerPhysicalCard, slideCount]
  )

  const normalizeInfiniteScroll = useCallback(() => {
    const physical = physicalIndexRef.current
    if (physical < slideCount) {
      isJumpingRef.current = true
      centerPhysicalCard(physical + slideCount, "auto")
      isJumpingRef.current = false
    } else if (physical >= slideCount * 2) {
      isJumpingRef.current = true
      centerPhysicalCard(physical - slideCount, "auto")
      isJumpingRef.current = false
    }
  }, [centerPhysicalCard, slideCount])

  const handleScroll = useCallback(() => {
    if (isJumpingRef.current) return
    const el = carouselRef.current
    if (!el) return

    const viewportCenter = el.scrollLeft + el.clientWidth / 2
    let closestPhysical = 0
    let closestDistance = Number.POSITIVE_INFINITY

    cardRefs.current.forEach((card, index) => {
      if (!card) return
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(cardCenter - viewportCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        closestPhysical = index
      }
    })

    physicalIndexRef.current = closestPhysical
    setActive(closestPhysical % slideCount)

    if (closestPhysical < slideCount || closestPhysical >= slideCount * 2) {
      requestAnimationFrame(normalizeInfiniteScroll)
    }
  }, [normalizeInfiniteScroll, slideCount])

  useLayoutEffect(() => {
    const run = () => centerPhysicalCard(startIndex, "auto")
    run()
    requestAnimationFrame(run)
    // Mobile browsers fire resize while the address bar hides on scroll;
    // only re-center when the width actually changes.
    let lastWidth = window.innerWidth
    const onResize = () => {
      if (window.innerWidth === lastWidth) return
      lastWidth = window.innerWidth
      run()
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [centerPhysicalCard, startIndex])

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const onScrollEnd = () => normalizeInfiniteScroll()
    el.addEventListener("scrollend", onScrollEnd)
    return () => el.removeEventListener("scrollend", onScrollEnd)
  }, [normalizeInfiniteScroll])

  useEffect(() => {
    if (isPaused || slideCount === 0) return
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reducedMotion.matches) return

    const intervalId = window.setInterval(() => {
      centerPhysicalCard(physicalIndexRef.current + 1, "smooth")
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(intervalId)
  }, [isPaused, centerPhysicalCard, slideCount])

  return (
    <section
      className="flex w-full flex-col items-center gap-6 overflow-visible border-b border-[#E8D5E6] bg-white py-14 sm:gap-8 lg:py-20"
      aria-labelledby={headingId}
    >
      <div className="mx-auto flex w-full max-w-page flex-col items-center gap-3 px-4 text-center sm:gap-4 lg:px-[120px]">
        <h2
          id={headingId}
          className="max-w-3xl font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-[#0E121B]"
        >
          {heading}
        </h2>
        <p className="max-w-[492px] text-base leading-6 text-[#525866]">
          {subtitle}
        </p>
      </div>

      <div
        className="relative flex w-full flex-col items-center gap-3 overflow-hidden px-1 pt-2 sm:gap-5 sm:px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (
            !event.currentTarget.contains(event.relatedTarget as Node | null)
          ) {
            setIsPaused(false)
          }
        }}
      >
        <div
          ref={carouselRef}
          data-lenis-prevent-horizontal
          onScroll={handleScroll}
          className="flex min-h-[min(400px,64svh)] w-full snap-x snap-mandatory [scroll-padding-inline:calc(50%-min(300px,(100vw-3rem))/2+0.5rem)] [scrollbar-width:none] items-center gap-8 overflow-x-auto overflow-y-hidden scroll-smooth pt-2 pb-1 [-ms-overflow-style:none] sm:min-h-0 sm:[scroll-padding-inline:calc(50%-min(401px,88vw)/2+10px)] sm:gap-14 sm:pt-0 sm:pb-[100px] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((instructor, physicalIndex) => (
            <InstructorPortrait
              key={`${instructor.id}-${physicalIndex}`}
              instructor={instructor}
              isActive={physicalIndex % slideCount === active}
              onSelect={() => centerPhysicalCard(physicalIndex, "smooth")}
              cardRef={(el) => {
                cardRefs.current[physicalIndex] = el
              }}
            />
          ))}
        </div>

        <div
          className="relative z-10 flex items-center justify-center gap-2 px-2 sm:absolute sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:gap-2.5"
          role="tablist"
          aria-label="Instructor carousel"
        >
          {instructors.map((instructor, index) => (
            <button
              key={instructor.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Show ${instructor.name}`}
              onClick={() => goToInstructor(index)}
              className={cn(
                "h-2.5 shrink-0 cursor-pointer rounded-full transition-all duration-300 ease-out",
                index === active
                  ? "w-5 bg-[#932784]"
                  : "w-2.5 bg-[#932784]/30 hover:bg-[#932784]/45"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
