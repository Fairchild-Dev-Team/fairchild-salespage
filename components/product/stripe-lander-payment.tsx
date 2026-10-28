"use client"

import { FormEvent, useMemo, useState } from "react"
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe, type Stripe } from "@stripe/stripe-js"

import { GradientPillButton } from "@/components/ui/gradient-pill-button"
import { formatUsd } from "@/lib/products"

export function StripeLanderPayment({
  clientSecret,
  publishableKey,
  paymentIntentId,
  amountCents,
  onCancel,
}: {
  clientSecret: string
  publishableKey: string
  paymentIntentId: string
  amountCents: number
  onCancel: () => void
}) {
  const stripePromise = useMemo(
    () => loadStripe(publishableKey) as Promise<Stripe | null>,
    [publishableKey]
  )

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
      <CardFields
        paymentIntentId={paymentIntentId}
        amountCents={amountCents}
        onCancel={onCancel}
      />
    </Elements>
  )
}

function CardFields({
  paymentIntentId,
  amountCents,
  onCancel,
}: {
  paymentIntentId: string
  amountCents: number
  onCancel: () => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!stripe || !elements) return
    setSubmitting(true)
    setError(null)
    try {
      const returnUrl = `${window.location.origin}/checkout/success?payment_intent=${paymentIntentId}`
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
        redirect: "if_required",
      })
      if (result.error) {
        setError(result.error.message ?? "Payment failed")
        setSubmitting(false)
        return
      }
      const status = result.paymentIntent?.status
      if (status !== "succeeded" && status !== "processing") {
        setError("Payment was not completed. Please try again.")
        setSubmitting(false)
        return
      }
      // Confirm on the success page — do not block navigation on the API.
      window.location.assign(returnUrl)
    } catch {
      setError("Network error. Try again.")
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <PaymentElement />
      {error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="rounded-full border border-[#E8D5E6] px-4 py-3 text-sm font-medium text-[#0E121B]"
        >
          Back
        </button>
        <GradientPillButton
          type="submit"
          disabled={!stripe || !elements || submitting}
          className="flex-1 justify-center disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Confirming…" : `Pay ${formatUsd(amountCents)}`}
        </GradientPillButton>
      </div>
    </form>
  )
}
