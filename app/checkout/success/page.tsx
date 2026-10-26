import type { Metadata } from "next"
import Link from "next/link"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { GradientPillButton } from "@/components/ui/gradient-pill-button"
import { confirmLanderPayment, getCheckoutSummary } from "@/lib/lander"

export const metadata: Metadata = {
  title: "Payment received",
  description: "Your FairChild checkout completed successfully.",
}

type PageProps = {
  searchParams: Promise<{ session_id?: string; payment_intent?: string; redirect_status?: string }>
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { session_id: sessionId, payment_intent: paymentIntentId, redirect_status: redirectStatus } =
    await searchParams

  let productName: string | undefined
  let paymentLabel: string | undefined
  let amountTotal: number | undefined
  let pending = false

  if (paymentIntentId && redirectStatus !== "failed") {
    const summary = await confirmLanderPayment(paymentIntentId)
    productName = summary?.productName
    paymentLabel = summary?.paymentLabel
    amountTotal = summary?.amountTotal ?? undefined
    pending = summary?.status === "processing"
  } else if (sessionId) {
    const summary = await getCheckoutSummary(sessionId)
    productName = summary?.productName
    paymentLabel = summary?.paymentLabel
    amountTotal = summary?.amountTotal ?? undefined
  }

  const amountDisplay =
    typeof amountTotal === "number"
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(amountTotal / 100)
      : null

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader showCta={false} />

      <section className="mx-auto w-full max-w-page px-4 py-16 lg:px-[120px]">
        <div className="cta-section-card mx-auto max-w-2xl border border-[#E8D5E6] text-center">
          <p className="text-sm font-semibold tracking-wide text-[#AD14A7] uppercase">
            Payment received
          </p>
          <h1 className="mt-3 font-heading text-heading font-semibold text-[#0E121B]">
            {redirectStatus === "failed"
              ? "Payment did not complete"
              : pending
                ? "Payment needs another step"
                : "You are one step closer to 2027"}
          </h1>
          <p className="mt-4 text-copy text-[#525866]">
            {redirectStatus === "failed"
              ? "The card payment did not complete. You can return and try again."
              : pending
                ? "Stripe is still processing the card. Access unlocks when it clears."
                : "Stripe confirmed your card payment"}
            {productName ? (
              <>
                {" "}
                for <strong className="text-[#631760]">{productName}</strong>
              </>
            ) : null}
            {paymentLabel ? <> — {paymentLabel}</> : null}
            {amountDisplay ? <> ({amountDisplay})</> : null}. Check your email for the
            receipt. Our team will follow up on next steps and any remaining schedule.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <GradientPillButton href="/#programmes">Back to programmes</GradientPillButton>
            <Link
              href="mailto:info@fairchildinstitute.com"
              className="inline-flex items-center justify-center rounded-full border border-[#E8D5E6] bg-white px-5 py-3 font-heading text-base font-medium text-[#0E121B]"
            >
              Contact FairChild
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-page px-4 pb-12 lg:px-[120px]">
        <SiteFooter />
      </div>
    </div>
  )
}
