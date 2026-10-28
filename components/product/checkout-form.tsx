"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { GradientPillButton } from "@/components/ui/gradient-pill-button"
import type { CatalogueCheckoutTarget, ProgrammePayDetails } from "@/lib/lander"
import { formatUsd, type PaymentOption, type Product } from "@/lib/products"
import { cn } from "@/lib/utils"
import { OfferCard, OfferSteps, offerSteps } from "@/components/product/offer-card"
import { PaymentDrawer } from "@/components/product/payment-drawer"
import { StripeLanderPayment } from "@/components/product/stripe-lander-payment"

type CheckoutFormProps = {
  product: Product
  pay?: ProgrammePayDetails | null
  catalogue?: CatalogueCheckoutTarget | null
  /** page opens the card in a right sidebar. panel keeps the card in the parent sidebar. */
  surface?: "page" | "panel"
  /** Programme term switcher (6 / 12 months), shown under the checkout intro. */
  terms?: Array<6 | 12>
  selectedTerm?: 6 | 12
}

export function CheckoutForm({
  product,
  pay = null,
  catalogue = null,
  surface = "page",
  terms = [],
  selectedTerm,
}: CheckoutFormProps) {
  const [optionId, setOptionId] = useState(
    product.paymentOptions.find((o) => o.highlighted && o.id !== "spot-lock")?.id ??
      product.paymentOptions.find((o) => o.id !== "spot-lock")?.id ??
      product.paymentOptions[0]?.id ??
      ""
  )
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState<{ message: string; key: string } | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [settledEmail, setSettledEmail] = useState("")
  const [settledFirstName, setSettledFirstName] = useState("")
  const [settledLastName, setSettledLastName] = useState("")
  const [card, setCard] = useState<{
    clientSecret: string
    publishableKey: string
    paymentIntentId: string
    amountCents: number
    key: string
  } | null>(null)
  const [settledKey, setSettledKey] = useState<string | null>(null)

  const visibleOptions =
    product.paymentOptions.some((option) => option.id !== "spot-lock")
      ? product.paymentOptions.filter((option) => option.id !== "spot-lock")
      : product.paymentOptions
  const selected: PaymentOption | undefined = visibleOptions.find(
    (option) => option.id === optionId
  ) ?? visibleOptions[0]
  const baseFeeCents = pay?.baseFeeCents ?? 50_000
  const pricingFor = (option: PaymentOption) => ({
    option,
    offer: pay?.offers.find((offer) => offer.id === option.id),
    listPriceCents: pay?.listPriceCents,
    baseFeeCents,
  })
  const dueToday = selected?.amountCents ?? 0
  const showRibbon = visibleOptions.length > 1

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSettledEmail(email.trim())
      setSettledFirstName(firstName.trim())
      setSettledLastName(lastName.trim())
    }, 350)
    return () => window.clearTimeout(timer)
  }, [email, firstName, lastName])

  const selectionKey = [
    selected?.id ?? "",
    catalogue?.kind ?? "",
    catalogue?.id ?? "",
    catalogue?.termMonths ?? "",
    settledEmail,
    settledFirstName,
    settledLastName,
  ].join("|")

  useEffect(() => {
    if (!drawerOpen || !selected || !settledEmail || !settledFirstName || !settledLastName) {
      return
    }

    const controller = new AbortController()
    const requestKey = selectionKey
    void (async () => {
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: product.slug,
            optionId: selected.id,
            email: settledEmail,
            firstName: settledFirstName,
            lastName: settledLastName,
            ...(catalogue
              ? {
                  catalogueKind: catalogue.kind,
                  catalogueId: catalogue.id,
                  ...(catalogue.termMonths ? { termMonths: catalogue.termMonths } : {}),
                }
              : {}),
          }),
          signal: controller.signal,
        })
        const data = (await response.json()) as {
          clientSecret?: string
          publishableKey?: string
          paymentIntentId?: string
          amountCents?: number
          error?: string
        }
        if (controller.signal.aborted) return
        if (
          !response.ok ||
          !data.clientSecret ||
          !data.publishableKey ||
          !data.paymentIntentId
        ) {
          setError({
            message: data.error ?? "Checkout failed. Try again.",
            key: requestKey,
          })
          setCard(null)
          setSettledKey(requestKey)
          return
        }
        setError(null)
        setSettledKey(requestKey)
        setCard({
          clientSecret: data.clientSecret,
          publishableKey: data.publishableKey,
          paymentIntentId: data.paymentIntentId,
          amountCents: data.amountCents ?? dueToday,
          key: requestKey,
        })
      } catch (cause) {
        if (controller.signal.aborted || (cause instanceof DOMException && cause.name === "AbortError")) {
          return
        }
        setError({ message: "Network error. Try again.", key: requestKey })
        setCard(null)
        setSettledKey(requestKey)
      }
    })()

    return () => controller.abort()
    // selectionKey already tracks the checkout inputs that must recreate the PaymentIntent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen, selectionKey])

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!selected) return
    if (!firstName.trim() || !lastName.trim()) {
      setError({ message: "Enter your first and last name.", key: selectionKey })
      return
    }
    if (!email.trim()) {
      setError({ message: "Enter your email.", key: selectionKey })
      return
    }
    setError(null)
    setSettledFirstName(firstName.trim())
    setSettledLastName(lastName.trim())
    setSettledEmail(email.trim())
    setDrawerOpen(true)
  }

  function closeCard() {
    setDrawerOpen(false)
    setCard(null)
    setSettledKey(null)
  }

  const identityReady = Boolean(settledEmail && settledFirstName && settledLastName)
  const shownError = error?.key === selectionKey ? error.message : null
  const shownCard = identityReady && card?.key === selectionKey ? card : null
  const shownCardLoading = drawerOpen && identityReady && settledKey !== selectionKey

  const cardFields = shownCard ? (
    <StripeLanderPayment
      key={shownCard.paymentIntentId}
      clientSecret={shownCard.clientSecret}
      publishableKey={shownCard.publishableKey}
      paymentIntentId={shownCard.paymentIntentId}
      amountCents={shownCard.amountCents}
      onCancel={closeCard}
    />
  ) : (
    <p className="text-sm text-[#525866]">
      {shownCardLoading ? `Preparing card for ${formatUsd(dueToday)}…` : "Choose an offer to load the card."}
    </p>
  )

  return (
    <div className="flex flex-col gap-5 rounded-[1.5rem] border border-[#E8D5E6] bg-white p-5 shadow-[0_12px_40px_rgba(99,23,96,0.08)] sm:p-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight text-[#0E121B] sm:text-2xl">
          Choose how to pay
        </h2>
        <p className="mt-1 text-sm text-[#525866]">
          Secure checkout powered by Stripe. You only pay the selected amount today.
        </p>
        {terms.length > 0 && catalogue?.kind === "programme" && catalogue.id ? (
          <div className="mt-4 flex flex-wrap gap-3">
            {terms.map((months) => (
              <Link
                key={months}
                href={`/catalogue/programme/${catalogue.id}?term=${months}`}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium",
                  selectedTerm === months
                    ? "border-[#AD14A7] bg-[#FEF5FE] text-[#631760]"
                    : "border-[#E8D5E6] text-[#525866] hover:border-[#AD14A7]"
                )}
              >
                {months} months
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <fieldset className="flex flex-col gap-3">
          <legend className="sr-only">Payment options</legend>
          {visibleOptions.map((option) => (
            <OfferCard
              key={option.id}
              {...pricingFor(option)}
              active={option.id === selected?.id}
              ribbon={showRibbon && Boolean(option.highlighted)}
              onSelect={() => setOptionId(option.id)}
            />
          ))}
        </fieldset>

        {selected ? <OfferSteps steps={offerSteps(pricingFor(selected))} /> : null}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-[#0E121B]">First name</span>
            <input
              type="text"
              name="firstName"
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Ada"
              required
              className="rounded-xl border border-[#E8D5E6] bg-[#FEF5FE] px-3.5 py-3 text-sm text-[#0E121B] outline-none ring-[#AD14A7] placeholder:text-[#525866]/70 focus:ring-2"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-[#0E121B]">Last name</span>
            <input
              type="text"
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Lovelace"
              required
              className="rounded-xl border border-[#E8D5E6] bg-[#FEF5FE] px-3.5 py-3 text-sm text-[#0E121B] outline-none ring-[#AD14A7] placeholder:text-[#525866]/70 focus:ring-2"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-[#0E121B]">Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@email.com"
            required
            className="rounded-xl border border-[#E8D5E6] bg-[#FEF5FE] px-3.5 py-3 text-sm text-[#0E121B] outline-none ring-[#AD14A7] placeholder:text-[#525866]/70 focus:ring-2"
          />
        </label>

        {shownError ? (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {shownError}
          </p>
        ) : null}

        <GradientPillButton
          type="submit"
          disabled={!selected}
          className="w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
        >
          {shownCardLoading
            ? "Preparing card payment…"
            : !selected
              ? "Select an option"
              : dueToday < baseFeeCents
                ? `Pay ${formatUsd(dueToday)} to lock my spot`
                : `Continue to pay ${formatUsd(dueToday)}`}
        </GradientPillButton>
      </form>
      {surface === "panel" && drawerOpen ? (
        <div className="border-t border-[#E8D5E6] pt-5">{cardFields}</div>
      ) : null}
      {surface === "page" ? (
        <PaymentDrawer
          open={drawerOpen}
          title={selected ? `Pay ${formatUsd(dueToday)}` : "Pay"}
          onClose={closeCard}
        >
          {selected ? (
            <div className="mb-5 rounded-2xl border border-[#E8D5E6] bg-[#FEF5FE] p-4">
              <p className="mb-3 font-heading text-base font-semibold text-[#0E121B]">
                {selected.label}
              </p>
              <OfferSteps steps={offerSteps(pricingFor(selected))} />
            </div>
          ) : null}
          {shownError ? (
            <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {shownError}
            </p>
          ) : null}
          {cardFields}
        </PaymentDrawer>
      ) : null}
    </div>
  )
}
