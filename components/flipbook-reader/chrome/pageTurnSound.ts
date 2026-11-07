const TURN_SOUND_URL = "/flipbook/turn.mp3"

let clip: HTMLAudioElement | null = null

function getClip(): HTMLAudioElement | null {
  if (typeof Audio === "undefined") return null
  if (!clip) {
    clip = new Audio(TURN_SOUND_URL)
    clip.preload = "auto"
  }
  return clip
}

export async function playPageTurn(): Promise<void> {
  const audio = getClip()
  if (!audio) return
  try {
    audio.currentTime = 0
    await audio.play()
  } catch {
    /* autoplay blocked until unmute */
  }
}

export function unlockAudio(): void {
  const audio = getClip()
  if (!audio) return
  audio.muted = true
  void audio
    .play()
    .then(() => {
      audio.pause()
      audio.currentTime = 0
      audio.muted = false
    })
    .catch(() => {
      audio.muted = false
    })
}
