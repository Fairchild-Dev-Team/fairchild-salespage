"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe, type Stripe } from "@stripe/stripe-js"
import { Loader2 } from "lucide-react"

import { NonRefundableAgreement } from "@/components/product/non-refundable-agreement"
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
        clientSecret={clientSecret}
        paymentIntentId={paymentIntentId}
        amountCents={amountCents}
        onCancel={onCancel}
      />
    </Elements>
  )
}

function CardFields({
  clientSecret,
  paymentIntentId,
  amountCents,
  onCancel,
}: {
  clientSecret: string
  paymentIntentId: string
  amountCents: number
  onCancel: () => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [elementReady, setElementReady] = useState(false)
  const [nonRefundableAgreed, setNonRefundableAgreed] = useState(false)

  useEffect(() => {
    if (!submitting) return
    // Safety: if Stripe never redirects (network / modal cancel), unlock the button.
    const timer = window.setTimeout(() => {
      setSubmitting(false)
      setError("Payment is taking too long. Check your card details and try again.")
    }, 90_000)
    return () => window.clearTimeout(timer)
  }, [submitting])

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!stripe || !elements || submitting) return
    if (!nonRefundableAgreed) {
      setError("Confirm the non-refundable policy before paying.")
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setError(submitError.message ?? "Check your card details.")
        setSubmitting(false)
        return
      }

      const returnUrl = `${window.location.origin}/checkout/success?payment_intent=${paymentIntentId}`
      // Always redirect so the Pay button cannot hang on "Confirming…" after a successful charge.
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: returnUrl,
        },
        redirect: "always",
      })

      if (confirmError) {
        setError(confirmError.message ?? "Payment failed")
        setSubmitting(false)
      }
      // On success Stripe navigates away; keep submitting=true until unload.
    } catch {
      setError("Network error. Try again.")
      setSubmitting(false)
    }
  }

  const ready = Boolean(stripe && elements && elementReady)

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {!ready ? (
        <div
          className="flex min-h-[8rem] flex-col items-center justify-center gap-3 rounded-2xl border border-[#E8D5E6] bg-[#FEF5FE] px-4 py-8"
          role="status"
          aria-live="polite"
        >
          <Loader2 className="size-7 animate-spin text-[#AD14A7]" aria-hidden />
          <p className="text-sm font-medium text-[#631760]">Loading secure card form…</p>
        </div>
      ) : null}
      <div className={ready ? undefined : "sr-only"}>
        <PaymentElement onReady={() => setElementReady(true)} />
      </div>
      {ready ? (
        <NonRefundableAgreement
          agreed={nonRefundableAgreed}
          onAgreedChange={setNonRefundableAgreed}
        />
      ) : null}
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
          className="rounded-full border border-[#E8D5E6] px-4 py-3 text-sm font-medium text-[#0E121B] disabled:opacity-60"
        >
          Back
        </button>
        <GradientPillButton
          type="submit"
          disabled={!ready || submitting || !nonRefundableAgreed}
          showArrow={!submitting}
          className="flex-1 justify-center disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="size-5 animate-spin" aria-hidden />
              Confirming…
            </span>
          ) : (
            `Pay ${formatUsd(amountCents)}`
          )}
        </GradientPillButton>
      </div>
    </form>
  )
}
