import Image from "next/image"
import { ArrowUpRight, Play, Quote } from "lucide-react"

import { GradientPillButton } from "@/components/ui/gradient-pill-button"
import {
  linkedInProof,
  menteeStoryColumns,
  testimonialVideos,
  type MenteeStory,
} from "@/lib/sales-content"
import { cn } from "@/lib/utils"

const COLUMN_DURATIONS = ["46s", "54s", "50s"] as const

function initials(name: string) {
  const parts = name.split(" ")
  return `${parts[0]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`
}

function StoryCard({ story }: { story: MenteeStory }) {
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
          <p className="truncate font-heading text-base font-semibold text-[#0E121B]">
            {story.name}
          </p>
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
              <StoryCard key={`${copy}-${story.name}-${index}`} story={story} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function StoryVideos() {
  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-2">
      {testimonialVideos.map((video) => (
        <figure
          key={video.vimeoId}
          className="overflow-hidden rounded-[24px] border border-[#E8D5E6] bg-white shadow-[0_16px_40px_rgba(99,23,96,0.08)]"
        >
          <div className="relative aspect-video w-full bg-[#1A0614]">
            <iframe
              src={`https://player.vimeo.com/video/${video.vimeoId}?title=0&byline=0&portrait=0`}
              title={`${video.name} — FairChild mentee story`}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <figcaption className="flex items-start gap-4 px-5 py-5 sm:px-6">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#94008D_0%,#4D0044_100%)] text-white">
              <Play className="size-4 fill-current" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="font-heading text-lg font-semibold tracking-[-0.02em] text-[#0E121B]">
                {video.name}
              </p>
              <p className="text-sm text-[#631760]">{video.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#525866]">
                {video.caption}
              </p>
            </div>
          </figcaption>
        </figure>
      ))}
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

        <StoryVideos />

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
