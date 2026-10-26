import { resolveProgrammeCheckout } from "@/lib/lander"
import { getProduct } from "@/lib/products"
import { getAppUrl } from "@/lib/stripe"

type CheckoutBody = {
  slug?: string
  optionId?: string
  email?: string
  firstName?: string
  lastName?: string
  payMode?: "full" | "base"
  installmentCount?: number
  installmentDates?: string[]
  catalogueKind?: "programme" | "course" | "product"
  catalogueId?: string
  termMonths?: 6 | 12
}

export async function POST(request: Request) {
  let body: CheckoutBody
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const optionId = body.optionId?.trim()
  if (!optionId) {
    return Response.json({ error: "Missing product or payment option" }, { status: 400 })
  }

  const api = process.env.FAIRCHILD_API_URL?.trim()
  if (!api) {
    return Response.json(
      { error: "Payments are not configured. Set FAIRCHILD_API_URL to the tenant API." },
      { status: 503 }
    )
  }

  const origin = getAppUrl(request)
  let checkoutBody: Record<string, unknown>

  if (body.catalogueKind && body.catalogueId) {
    checkoutBody = {
      productSlug: body.catalogueId,
      productName: "Catalogue item",
      offerId: optionId,
      customerEmail: body.email?.trim() || undefined,
      firstName: body.firstName?.trim() || undefined,
      lastName: body.lastName?.trim() || undefined,
      successUrl: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/catalogue/${body.catalogueKind}/${body.catalogueId}?cancelled=1${body.termMonths ? `&term=${body.termMonths}` : ""}`,
      catalogueKind: body.catalogueKind,
      ...(body.catalogueKind === "programme"
        ? { programmeId: body.catalogueId }
        : {}),
      ...(body.catalogueKind === "course" ? { courseId: body.catalogueId } : {}),
      ...(body.catalogueKind === "product" ? { productId: body.catalogueId } : {}),
      ...(body.termMonths ? { termMonths: body.termMonths } : {}),
      ...(body.payMode ? { payMode: body.payMode } : {}),
      ...(body.installmentCount ? { installmentCount: body.installmentCount } : {}),
      ...(body.installmentDates?.length ? { installmentDates: body.installmentDates } : {}),
    }
  } else {
    const slug = body.slug?.trim()
    if (!slug) {
      return Response.json({ error: "Missing product or payment option" }, { status: 400 })
    }
    const listed = getProduct(slug)
    if (!listed) {
      return Response.json({ error: "Unknown product" }, { status: 404 })
    }
    const purchase = await resolveProgrammeCheckout(listed, optionId)
    if (!purchase) {
      return Response.json({ error: "Unknown payment option" }, { status: 404 })
    }
    const { product, option } = purchase
    checkoutBody = {
      productSlug: product.slug,
      productName: product.name,
      offerId: option.id,
      customerEmail: body.email?.trim() || undefined,
      firstName: body.firstName?.trim() || undefined,
      lastName: body.lastName?.trim() || undefined,
      successUrl: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/products/${product.slug}?cancelled=1`,
      ...(purchase.termMonths ? { termMonths: purchase.termMonths } : {}),
      ...(purchase.programmeId ? { programmeId: purchase.programmeId } : {}),
      ...(body.payMode ? { payMode: body.payMode } : {}),
      ...(body.installmentCount ? { installmentCount: body.installmentCount } : {}),
      ...(body.installmentDates?.length ? { installmentDates: body.installmentDates } : {}),
    }
  }

  try {
    const response = await fetch(`${api.replace(/\/$/, "")}/api/v1/institution/public/lander/checkout`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(checkoutBody),
      cache: "no-store",
    })

    const payload = (await response.json()) as {
      response?: {
        clientSecret?: string
        publishableKey?: string
        paymentIntentId?: string
        amountCents?: number
      }
      error?: { message?: string }
    }
    const card = payload.response
    if (!response.ok || !card?.clientSecret || !card.publishableKey || !card.paymentIntentId) {
      return Response.json(
        { error: payload.error?.message ?? "Unable to start checkout" },
        { status: response.status === 400 ? 400 : 502 }
      )
    }

    return Response.json({
      clientSecret: card.clientSecret,
      publishableKey: card.publishableKey,
      paymentIntentId: card.paymentIntentId,
      amountCents: card.amountCents,
    })
  } catch (error) {
    console.error("Stripe checkout error", error)
    return Response.json({ error: "Unable to start checkout" }, { status: 500 })
  }
}
