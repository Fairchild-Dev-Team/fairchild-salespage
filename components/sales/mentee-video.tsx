"use client"

import type Player from "@vimeo/player"
import { Volume2, VolumeX } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { testimonialVideo } from "@/lib/sales-content"

/**
 * Mentee video: plays muted once scrolled into view (browsers block autoplay with sound),
 * pauses when scrolled away, and offers an unmute button.
 */
export function MenteeVideo() {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const playerRef = useRef<Player | null>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    let player: Player | null = null
    let observer: IntersectionObserver | null = null
    let disposed = false
    // Our own scroll-out pauses, so they are not mistaken for the viewer pausing.
    let autoPausing = false
    let viewerPaused = false

    import("@vimeo/player").then(({ default: VimeoPlayer }) => {
      if (disposed) return
      player = new VimeoPlayer(frame)
      playerRef.current = player

      player.on("volumechange", ({ volume }) => setMuted(volume === 0))
      player.on("play", () => {
        viewerPaused = false
      })
      player.on("pause", () => {
        if (!autoPausing) viewerPaused = true
        autoPausing = false
      })

      // Leave motion off for people who ask for it; they can still press play.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!player) return
          if (entry.isIntersecting) {
            if (!viewerPaused) player.play().catch(() => {})
          } else {
            player.getPaused().then((paused) => {
              if (paused || !player) return
              autoPausing = true
              player.pause().catch(() => {})
            })
          }
        },
        { threshold: 0.5 }
      )
      observer.observe(frame)
    })

    return () => {
      disposed = true
      observer?.disconnect()
      player?.destroy().catch(() => {})
      playerRef.current = null
    }
  }, [])

  async function toggleSound() {
    const player = playerRef.current
    if (!player) return
    if (muted) {
      await player.setMuted(false)
      await player.setVolume(1)
      // Unmuting is a clear request to watch, so start it if it is paused.
      if (await player.getPaused()) await player.play().catch(() => {})
    } else {
      await player.setMuted(true)
    }
  }

  return (
    <figure className="mx-auto mt-12 w-full max-w-[380px]">
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[24px] border border-[#E8D5E6] bg-[#1A0614] shadow-[0_16px_40px_rgba(99,23,96,0.12)]">
        <iframe
          ref={frameRef}
          src={`https://player.vimeo.com/video/${testimonialVideo.vimeoId}?muted=1&playsinline=1&title=0&byline=0&portrait=0&dnt=1`}
          title={testimonialVideo.title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute top-3 right-3 z-10 inline-flex items-center gap-2 rounded-full bg-[#0E121B]/70 px-3.5 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-[#0E121B]/85"
        >
          {muted ? (
            <VolumeX className="size-4" aria-hidden />
          ) : (
            <Volume2 className="size-4" aria-hidden />
          )}
          {muted ? "Tap to unmute" : "Sound on"}
        </button>
      </div>
    </figure>
  )
}
