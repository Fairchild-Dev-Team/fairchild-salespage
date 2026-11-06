import Image from "next/image"
import { ArrowUpRight, Quote } from "lucide-react"

import { MenteeVideo } from "@/components/sales/mentee-video"
import { GradientPillButton } from "@/components/ui/gradient-pill-button"
import {
  linkedInProof,
  menteeLinkedIn,
  menteeStoryColumns,
  type MenteeStory,
} from "@/lib/sales-content"
import { cn } from "@/lib/utils"

const COLUMN_DURATIONS = ["46s", "54s", "50s"] as const

function initials(name: string) {
  const parts = name.split(" ")
  return `${parts[0]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect width="18" height="18" rx="3" fill="#0077B5" />
      <path
        d="M4.5 7H6.5V13.5H4.5V7ZM5.5 6C4.948 6 4.5 5.552 4.5 5C4.5 4.448 4.948 4 5.5 4C6.052 4 6.5 4.448 6.5 5C6.5 5.552 6.052 6 5.5 6Z"
        fill="white"
      />
      <path
        d="M8 7H9.9V7.9C10.2 7.3 11 6.9 11.9 6.9C13.6 6.9 14 8 14 9.4V13.5H12V9.8C12 9.1 11.8 8.5 11 8.5C10.1 8.5 9.9 9.2 9.9 9.8V13.5H8V7Z"
        fill="white"
      />
    </svg>
  )
}

/** `duplicate` marks the looping copy, whose links stay out of the tab order. */
function StoryCard({
  story,
  duplicate = false,
}: {
  story: MenteeStory
  duplicate?: boolean
}) {
  const linkedin = menteeLinkedIn[story.name]

  return (
    <article className="rounded-2xl border border-[#E8D5E6] bg-white p-5 shadow-[0_1px_12px_rgba(99,23,96,0.06)]">
      <Quote className="size-5 text-[#FA9BF6]" strokeWidth={1.75} aria-hidden />
      <p className="mt-3 text-[15px] leading-relaxed text-[#0E121B]">
        {story.quote}
      </p>
      <footer className="mt-5 flex items-center gap-3">
        {story.portrait ? (
          <Image
            src={story.portrait}
            alt=""
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-full object-cover ring-2 ring-[#FA9BF6]/40"
          />
        ) : (
          <span
            aria-hidden
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#FEF5FE] font-heading text-sm font-semibold text-[#631760] ring-2 ring-[#FA9BF6]/40"
          >
            {initials(story.name)}
          </span>
        )}
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-1.5">
            <p className="truncate font-heading text-base font-semibold text-[#0E121B]">
              {story.name}
            </p>
            {linkedin ? (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${story.name} on LinkedIn`}
                tabIndex={duplicate ? -1 : undefined}
                className="shrink-0 transition-opacity hover:opacity-80"
              >
                <LinkedInIcon />
              </a>
            ) : null}
          </div>
          <p className="truncate text-sm text-[#525866]">{story.role}</p>
        </div>
      </footer>
    </article>
  )
}

function StoryColumn({
  stories,
  duration,
  direction,
}: {
  stories: MenteeStory[]
  duration: string
  direction: "up" | "down"
}) {
  return (
    <div className="min-w-0 flex-1 overflow-hidden">
      <div
        className={cn(
          "flex flex-col",
          direction === "up"
            ? "animate-mentees-scroll-up"
            : "animate-mentees-scroll-down"
        )}
        style={{ animationDuration: duration }}
      >
        {/* Two copies so the column loops; each ends with gap-sized padding so half the track is exactly one copy. */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex flex-col gap-3 pb-3"
            aria-hidden={copy === 1}
          >
            {stories.map((story, index) => (
              <StoryCard
                key={`${copy}-${story.name}-${index}`}
                story={story}
                duplicate={copy === 1}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function MenteeStories() {
  const allStories = menteeStoryColumns.flat()

  return (
    <section
      id="stories"
      aria-labelledby="stories-heading"
      className="w-full bg-[linear-gradient(180deg,#FFFFFF_0%,#FEF5FE_100%)]"
    >
      <div className="mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20">
        <header className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2
            id="stories-heading"
            className="bg-[linear-gradient(269.47deg,#0E121B_0%,#FA9BF6_99.92%)] bg-clip-text font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-balance text-transparent"
          >
            Hear it from mentees who got the offer
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#525866] sm:text-lg">
            Here&apos;s what happens when you learn in the right order with the
            right support.
          </p>
        </header>

        <MenteeVideo />

        <div
          className="mentees-grid-mask relative mt-12 h-[min(560px,64vh)] overflow-hidden lg:hidden"
          aria-label="Mentee testimonials"
        >
          <StoryColumn stories={allStories} duration="70s" direction="up" />
        </div>

        <div
          className="mentees-grid-mask relative mt-12 hidden h-[min(720px,72vh)] gap-3 overflow-hidden lg:flex"
          aria-label="Mentee testimonials"
        >
          {menteeStoryColumns.map((stories, index) => (
            <StoryColumn
              key={index}
              stories={stories}
              duration={COLUMN_DURATIONS[index]}
              direction={index === 1 ? "up" : "down"}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 rounded-[28px] bg-[linear-gradient(180deg,#94008D_0%,#94008D_43.55%,#4D0044_96.79%)] p-6 text-white sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-3xl">
            <h3 className="font-heading text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
              {linkedInProof.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
              {linkedInProof.body}
            </p>
          </div>
          <a
            href={linkedInProof.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0E121B] transition-transform hover:-translate-y-0.5 lg:self-center"
          >
            {linkedInProof.linkLabel}
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>

        <div className="mt-10 flex justify-center">
          <GradientPillButton href="/#programmes">
            Save my seat
          </GradientPillButton>
        </div>
      </div>
    </section>
  )
}
