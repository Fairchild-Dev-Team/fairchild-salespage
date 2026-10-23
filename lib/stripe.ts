import Stripe from "stripe"

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured")
  }

  return new Stripe(key, {
    // Use the account default API version pinned by the installed stripe SDK.
    typescript: true,
  })
}

export function getAppUrl(request: Request) {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "")
  if (fromEnv) return fromEnv

  const url = new URL(request.url)
  return `${url.protocol}//${url.host}`
}
