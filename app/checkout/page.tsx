import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { CheckoutForm } from "@/components/product/checkout-form"
import { Logo } from "@/components/ui/logo"
import {
  loadSalesCheckout,
  parseCheckoutKind,
  parseTermMonths,
} from "@/lib/checkout"
import { financialAid } from "@/lib/sales-content"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure your FairChild 2027 spot with a $250 deposit.",
}

type PageProps = {
  searchParams: Promise<{
    kind?: string
    id?: string
    term?: string
    productId?: string
    name?: string
  }>
}

export default async function CheckoutPage({ searchParams }: PageProps) {
  const params = await searchParams
  const kind = parseCheckoutKind(params.kind)
  const id = params.id?.trim()
  const term = parseTermMonths(params.term)

  if (!kind || !id) notFound()

  const checkout = await loadSalesCheckout(kind, id, term, {
    productId: params.productId?.trim(),
    name: params.name?.trim(),
  })
  if (!checkout) notFound()

  return (
    <div className="min-h-screen bg-[#FDF5F9]">
      <header className="border-b border-[#E8D5E6] bg-white">
        <div className="mx-auto flex w-full max-w-page items-center justify-between gap-4 px-4 py-4 lg:px-[120px]">
          <Link
            href={checkout.summary.backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#631760] hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back
          </Link>
          <Logo />
          <span className="w-16" aria-hidden />
        </div>
      </header>

      <main className="mx-auto w-full max-w-page px-4 py-8 lg:px-[120px] lg:py-12">
        <div className="mb-8 max-w-2xl">
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-[#0E121B] sm:text-4xl">
            Secure your spot
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#525866] sm:text-base">
            {checkout.requiresEligibility
              ? "You must be enrolled in our program to purchase this product. Pay $250 today with the email you enrolled with to lock your spot."
              : "Pay $250 today to lock your 2027 place. The remaining base fee is due before January."}{" "}
            Questions?{" "}
            <a
              className="font-medium text-[#631760] underline-offset-2 hover:underline"
              href={`mailto:${financialAid.email}`}
            >
              {financialAid.email}
            </a>
          </p>
        </div>

        <CheckoutForm
          product={checkout.product}
          pay={checkout.pay}
          catalogue={checkout.matchError ? null : checkout.catalogue}
          surface="wizard"
          terms={checkout.terms}
          selectedTerm={checkout.selectedTerm}
          summary={checkout.summary}
          matchError={checkout.matchError}
          requiresEligibility={checkout.requiresEligibility}
        />
      </main>

      <div className="mx-auto w-full max-w-page px-4 pb-12 lg:px-[120px]">
        <SiteFooter />
      </div>
    </div>
  )
}
