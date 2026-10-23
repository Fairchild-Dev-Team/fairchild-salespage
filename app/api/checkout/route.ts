import { getPaymentOption, getProduct } from "@/lib/products"
import { getAppUrl, getStripe } from "@/lib/stripe"

export async function POST(request: Request) {
  let body: { slug?: string; optionId?: string; email?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const slug = body.slug?.trim()
  const optionId = body.optionId?.trim()
  if (!slug || !optionId) {
    return Response.json({ error: "Missing product or payment option" }, { status: 400 })
  }

  const product = getProduct(slug)
  if (!product) {
    return Response.json({ error: "Unknown product" }, { status: 404 })
  }

  const option = getPaymentOption(product, optionId)
  if (!option) {
    return Response.json({ error: "Unknown payment option" }, { status: 404 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json(
      { error: "Payments are not configured. Set STRIPE_SECRET_KEY." },
      { status: 503 }
    )
  }

  try {
    const stripe = getStripe()
    const origin = getAppUrl(request)

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: body.email?.trim() || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: option.amountCents,
            product_data: {
              name: `${product.name} — ${option.label}`,
              description: option.description.slice(0, 500),
              metadata: {
                product_slug: product.slug,
                payment_option: option.id,
              },
            },
          },
        },
      ],
      metadata: {
        product_slug: product.slug,
        product_name: product.name,
        payment_option: option.id,
        payment_label: option.label,
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products/${product.slug}?cancelled=1`,
    })

    if (!session.url) {
      return Response.json({ error: "Checkout session missing URL" }, { status: 500 })
    }

    return Response.json({ url: session.url })
  } catch (error) {
    console.error("Stripe checkout error", error)
    return Response.json({ error: "Unable to start checkout" }, { status: 500 })
  }
}
