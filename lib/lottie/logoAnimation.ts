import fairchildLogoAnimation from "@/assets/animations/FairChild Logo.json"

/** Brand ink #0E121B — for logo on light backgrounds */
const BRAND_INK_RGB: [number, number, number] = [
  14 / 255,
  18 / 255,
  27 / 255,
]

type LottieObject = Record<string, unknown>

function replaceWhiteFillsWithInk(animation: LottieObject): LottieObject {
  const clone = structuredClone(animation) as LottieObject

  function walk(node: LottieObject) {
    if (
      node.ty === "fl" &&
      node.c &&
      typeof node.c === "object" &&
      "k" in node.c
    ) {
      const color = (node.c as { k: number[] }).k
      if (
        color.length === 3 &&
        color[0] === 1 &&
        color[1] === 1 &&
        color[2] === 1
      ) {
        ;(node.c as { k: number[] }).k = [...BRAND_INK_RGB]
      }
    }

    for (const value of Object.values(node)) {
      if (value && typeof value === "object") {
        walk(value as LottieObject)
      }
    }
  }

  walk(clone)
  return clone
}

const logoOnDarkBg = fairchildLogoAnimation
const logoOnLightBg = replaceWhiteFillsWithInk(
  fairchildLogoAnimation as LottieObject
)

/** `hero` = dark background (white wordmark). `nav` = light background (ink wordmark). */
export type LogoSurface = "hero" | "nav"

export function getLogoAnimation(surface: LogoSurface) {
  return surface === "nav" ? logoOnLightBg : logoOnDarkBg
}

export const LOGO_REST_FRAME = fairchildLogoAnimation.op - 1
export const LOGO_START_FRAME = fairchildLogoAnimation.ip ?? 0
