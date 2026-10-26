import { getCloudflareContext } from "@opennextjs/cloudflare"

const PRODUCTION_PORTAL = "https://application.fairchildinstitute.com"
const STAGING_PORTAL = "https://application-staging.fairchildinstitute.com"

declare global {
  interface CloudflareEnv {
    APPLICATION_PORTAL_URL?: string
  }
}

function normalize(url: string) {
  return url.replace(/\/$/, "")
}

/** Staging Worker and local dev use the staging portal. Production uses the live portal. */
export async function applicationPortalUrl(): Promise<string> {
  try {
    const { env } = await getCloudflareContext({ async: true })
    const configured = env.APPLICATION_PORTAL_URL?.trim()
    if (configured) return normalize(configured)
  } catch {
    // next dev can render before the Cloudflare proxy is ready
  }

  const fromProcess = process.env.APPLICATION_PORTAL_URL?.trim()
  if (fromProcess) return normalize(fromProcess)
  if (process.env.FAIRCHILD_ENV === "production") return PRODUCTION_PORTAL
  return STAGING_PORTAL
}
