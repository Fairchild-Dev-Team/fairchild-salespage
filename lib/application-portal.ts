const PRODUCTION_PORTAL = "https://application.fairchildinstitute.com"
const STAGING_PORTAL = "https://application-staging.fairchildinstitute.com"

function normalize(url: string) {
  return url.replace(/\/$/, "")
}

/**
 * OpenNext copies wrangler `vars` onto `process.env` for each request.
 * Staging sets the staging portal. Production (`--env production`) sets the live portal.
 * Avoid `getCloudflareContext` here: catching its render bailout turns the homepage into a 500.
 */
export function applicationPortalUrl(): string {
  const configured = process.env.APPLICATION_PORTAL_URL?.trim()
  if (configured) return normalize(configured)
  if (process.env.FAIRCHILD_ENV === "production") return PRODUCTION_PORTAL
  return STAGING_PORTAL
}
