import { NextResponse } from "next/server"

export async function POST(request: Request) {
  let body: { paymentIntentId?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const paymentIntentId = body.paymentIntentId?.trim()
  if (!paymentIntentId || !/^pi_[A-Za-z0-9_]+$/.test(paymentIntentId)) {
    return Response.json({ error: "Invalid payment" }, { status: 400 })
  }

  const api = process.env.FAIRCHILD_API_URL?.trim()
  if (!api) {
    return Response.json(
      { error: "Payments are not configured. Set FAIRCHILD_API_URL to the tenant API." },
      { status: 503 }
    )
  }

  try {
    const response = await fetch(
      `${api.replace(/\/$/, "")}/api/v1/institution/public/lander/checkout/confirm`,
      {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId }),
        cache: "no-store",
      }
    )
    const payload = (await response.json()) as {
      response?: {
        status?: string
        productName?: string
        paymentLabel?: string
        amountTotal?: number
      }
      error?: { message?: string }
    }
    if (!response.ok || !payload.response) {
      return Response.json(
        { error: payload.error?.message ?? "Unable to confirm payment" },
        { status: response.status === 400 ? 400 : 502 }
      )
    }
    return NextResponse.json(payload.response)
  } catch (error) {
    console.error("Confirm payment error", error)
    return Response.json({ error: "Unable to confirm payment" }, { status: 500 })
  }
}
