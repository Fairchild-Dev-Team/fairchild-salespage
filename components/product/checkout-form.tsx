"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Loader2 } from "lucide-react"

import { CheckoutOrderSummary } from "@/components/product/checkout-order-summary"
import { OfferCard, OfferSteps, offerSteps } from "@/components/product/offer-card"
import { PaymentDrawer } from "@/components/product/payment-drawer"
import { StripeLanderPayment } from "@/components/product/stripe-lander-payment"
import { GradientPillButton } from "@/components/ui/gradient-pill-button"
import type { SalesCheckoutSummary } from "@/lib/checkout"
import { checkoutHref } from "@/lib/checkout"
import type { CatalogueCheckoutTarget, ProgrammePayDetails } from "@/lib/lander"
import { formatUsd, type PaymentOption, type Product } from "@/lib/products"
import { cn } from "@/lib/utils"

type CheckoutFormProps = {
  product: Product
  pay?: ProgrammePayDetails | null
  catalogue?: CatalogueCheckoutTarget | null
  /** page opens the card in a right sidebar. panel keeps the card in the parent sidebar. wizard is the dedicated checkout page. */
  surface?: "page" | "panel" | "wizard"
  /** Program term switcher (6 / 12 months), shown under the checkout intro. */
  terms?: Array<6 | 12>
  selectedTerm?: 6 | 12
  /** Local catalogue display for the wizard order summary + back link. */
  summary?: SalesCheckoutSummary | null
  /** When lander UUID resolution failed. */
  matchError?: string | null
  /** Private / invite-only product — API checks eligible email at PaymentIntent time. */
  requiresEligibility?: boolean
}

export function CheckoutForm({
  product,
  pay = null,
  catalogue = null,
  surface = "page",
  terms = [],
  selectedTerm,
  summary = null,
  matchError = null,
  requiresEligibility = false,
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
  const [step, setStep] = useState<1 | 2>(1)
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
  const [preparing, setPreparing] = useState(false)

  const visibleOptions =
    product.paymentOptions.some((option) => option.id !== "spot-lock")
      ? product.paymentOptions.filter((option) => option.id !== "spot-lock")
      : product.paymentOptions
  const selected: PaymentOption | undefined =
    visibleOptions.find((option) => option.id === optionId) ?? visibleOptions[0]
  const baseFeeCents = pay?.baseFeeCents ?? 50_000
  const pricingFor = (option: PaymentOption) => ({
    option,
    offer: pay?.offers.find((offer) => offer.id === option.id),
    listPriceCents: pay?.listPriceCents,
    baseFeeCents,
  })
  const dueToday = selected?.amountCents ?? 0
  const showRibbon = visibleOptions.length > 1
  const isWizard = surface === "wizard"
  const paymentOpen = isWizard ? step === 2 : drawerOpen

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

  function checkoutKey(input: {
    optionId: string
    email: string
    firstName: string
    lastName: string
  }) {
    return [
      input.optionId,
      catalogue?.kind ?? "",
      catalogue?.id ?? "",
      catalogue?.termMonths ?? "",
      input.email,
      input.firstName,
      input.lastName,
    ].join("|")
  }

  async function createCheckoutIntent(input: {
    optionId: string
    email: string
    firstName: string
    lastName: string
    signal?: AbortSignal
  }): Promise<
    | {
        ok: true
        card: {
          clientSecret: string
          publishableKey: string
          paymentIntentId: string
          amountCents: number
        }
      }
    | { ok: false; status: number; error: string }
  > {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: product.slug,
        productName: product.name,
        optionId: input.optionId,
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        ...(catalogue
          ? {
              catalogueKind: catalogue.kind,
              catalogueId: catalogue.id,
              ...(summary?.localId ? { localCatalogueId: summary.localId } : {}),
              ...(catalogue.termMonths ? { termMonths: catalogue.termMonths } : {}),
            }
          : {}),
      }),
      signal: input.signal,
    })
    const data = (await response.json()) as {
      clientSecret?: string
      publishableKey?: string
      paymentIntentId?: string
      amountCents?: number
      error?: string
    }
    if (
      !response.ok ||
      !data.clientSecret ||
      !data.publishableKey ||
      !data.paymentIntentId
    ) {
      const fallback =
        response.status === 403
          ? "You must be enrolled in our program to purchase this product. Use the email you enrolled with."
          : "Checkout failed. Try again."
      return {
        ok: false,
        status: response.status,
        error: data.error?.trim() || fallback,
      }
    }
    return {
      ok: true,
      card: {
        clientSecret: data.clientSecret,
        publishableKey: data.publishableKey,
        paymentIntentId: data.paymentIntentId,
        amountCents: data.amountCents ?? dueToday,
      },
    }
  }

  useEffect(() => {
    // Wizard prepares the intent on Proceed (so private eligibility fails before the card UI).
    if (isWizard) return
    if (!paymentOpen || !selected || !settledEmail || !settledFirstName || !settledLastName) {
      return
    }
    if (matchError) return
    if (card?.key === selectionKey) return

    const controller = new AbortController()
    const requestKey = selectionKey
    void (async () => {
      try {
        const result = await createCheckoutIntent({
          optionId: selected.id,
          email: settledEmail,
          firstName: settledFirstName,
          lastName: settledLastName,
          signal: controller.signal,
        })
        if (controller.signal.aborted) return
        if (!result.ok) {
          setError({ message: result.error, key: requestKey })
          setCard(null)
          setSettledKey(requestKey)
          return
        }
        setError(null)
        setSettledKey(requestKey)
        setCard({ ...result.card, key: requestKey })
      } catch (cause) {
        if (
          controller.signal.aborted ||
          (cause instanceof DOMException && cause.name === "AbortError")
        ) {
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
  }, [paymentOpen, selectionKey, matchError, isWizard])

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (preparing) return
    if (matchError) {
      setError({ message: matchError, key: selectionKey })
      return
    }
    if (!selected) return
    const nextFirst = firstName.trim()
    const nextLast = lastName.trim()
    const nextEmail = email.trim()
    if (!nextFirst || !nextLast) {
      setError({ message: "Enter your first and last name.", key: selectionKey })
      return
    }
    if (!nextEmail) {
      setError({ message: "Enter your email.", key: selectionKey })
      return
    }

    setError(null)
    setSettledFirstName(nextFirst)
    setSettledLastName(nextLast)
    setSettledEmail(nextEmail)

    // Wizard: verify email eligibility (and create the PaymentIntent) before Secure Payment.
    if (isWizard) {
      const requestKey = checkoutKey({
        optionId: selected.id,
        email: nextEmail,
        firstName: nextFirst,
        lastName: nextLast,
      })
      setPreparing(true)
      setCard(null)
      try {
        const result = await createCheckoutIntent({
          optionId: selected.id,
          email: nextEmail,
          firstName: nextFirst,
          lastName: nextLast,
        })
        if (!result.ok) {
          setError({ message: result.error, key: requestKey })
          setSettledKey(requestKey)
          setCard(null)
          return
        }
        setSettledKey(requestKey)
        setCard({ ...result.card, key: requestKey })
        setStep(2)
      } catch {
        setError({ message: "Network error. Try again.", key: requestKey })
        setCard(null)
        setSettledKey(requestKey)
      } finally {
        setPreparing(false)
      }
      return
    }

    setDrawerOpen(true)
  }

  function closeCard() {
    if (isWizard) {
      setStep(1)
    } else {
      setDrawerOpen(false)
    }
    setCard(null)
    setSettledKey(null)
  }

  const identityReady = Boolean(settledEmail && settledFirstName && settledLastName)
  const shownError = error?.key === selectionKey ? error.message : null
  const shownCard = identityReady && card?.key === selectionKey ? card : null
  const shownCardLoading = paymentOpen && identityReady && settledKey !== selectionKey

  const cardLoader = (
    <div
      className="flex min-h-[10rem] flex-col items-center justify-center gap-3 rounded-2xl border border-[#E8D5E6] bg-[#FEF5FE] px-4 py-10"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="size-8 animate-spin text-[#AD14A7]" aria-hidden />
      <p className="text-sm font-medium text-[#631760]">
        Preparing card for {formatUsd(dueToday)}…
      </p>
      <p className="text-xs text-[#525866]">This usually takes a few seconds.</p>
    </div>
  )

  const cardFields = shownCard ? (
    <StripeLanderPayment
      key={shownCard.paymentIntentId}
      clientSecret={shownCard.clientSecret}
      publishableKey={shownCard.publishableKey}
      paymentIntentId={shownCard.paymentIntentId}
      amountCents={shownCard.amountCents}
      onCancel={closeCard}
    />
  ) : shownCardLoading ? (
    cardLoader
  ) : (
    <p className="text-sm text-[#525866]">Choose an offer to load the card.</p>
  )

  const termLinks =
    terms.length > 0 &&
    (summary?.kind === "programme" || catalogue?.kind === "programme") ? (
      <div className="mt-4 flex flex-wrap gap-3">
        {terms.map((months) => (
          <Link
            key={months}
            href={
              summary?.localId
                ? checkoutHref("programme", summary.localId, months)
                : catalogue?.id
                  ? `/checkout?kind=programme&id=${encodeURIComponent(catalogue.id)}&term=${months}`
                  : "#"
            }
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
    ) : null

  const identityFields = (
    <>
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
            disabled={(isWizard && step === 2) || preparing}
            className="rounded-xl border border-[#E8D5E6] bg-[#FEF5FE] px-3.5 py-3 text-sm text-[#0E121B] outline-none ring-[#AD14A7] placeholder:text-[#525866]/70 focus:ring-2 disabled:opacity-70"
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
            disabled={(isWizard && step === 2) || preparing}
            className="rounded-xl border border-[#E8D5E6] bg-[#FEF5FE] px-3.5 py-3 text-sm text-[#0E121B] outline-none ring-[#AD14A7] placeholder:text-[#525866]/70 focus:ring-2 disabled:opacity-70"
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
          disabled={(isWizard && step === 2) || preparing}
          className="rounded-xl border border-[#E8D5E6] bg-[#FEF5FE] px-3.5 py-3 text-sm text-[#0E121B] outline-none ring-[#AD14A7] placeholder:text-[#525866]/70 focus:ring-2 disabled:opacity-70"
        />
      </label>
    </>
  )

  const optionsFieldset = (
    <fieldset className="flex flex-col gap-3" disabled={(isWizard && step === 2) || preparing}>
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
  )

  if (isWizard && summary) {
    return (
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(17rem,0.85fr)] lg:items-start">
        <div className="flex flex-col gap-4">
          <section className="overflow-hidden rounded-[1.5rem] border border-[#E8D5E6] bg-white shadow-[0_12px_40px_rgba(99,23,96,0.08)]">
            {step === 2 ? (
              <button
                type="button"
                onClick={closeCard}
                className="flex w-full items-center justify-between gap-3 bg-[#FEF5FE] px-5 py-3 text-left sm:px-6"
              >
                <span className="inline-flex items-center gap-2 font-heading text-base font-semibold text-[#631760]">
                  <Check className="size-4 shrink-0 text-[#AD14A7]" aria-hidden />
                  1. Basic Details
                </span>
                <span className="text-sm font-medium text-[#AD14A7]">Edit</span>
              </button>
            ) : (
              <>
                <div className="bg-gradient-purple px-5 py-3 font-heading text-base font-semibold text-white sm:px-6">
                  1. Basic Details
                </div>
                <form onSubmit={onSubmit} className="flex flex-col gap-5 p-5 sm:p-6">
                  {matchError ? (
                    <p
                      className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900"
                      role="alert"
                    >
                      {matchError}
                    </p>
                  ) : null}
                  {requiresEligibility && !matchError ? (
                    <p className="rounded-xl border border-[#E8D5E6] bg-[#FEF5FE] px-3 py-2 text-sm text-[#631760]">
                      You must be enrolled in our program to purchase this product. Enter the{" "}
                      <strong>exact email</strong> you enrolled with.
                    </p>
                  ) : null}

                  <div>
                    <h2 className="font-heading text-xl font-semibold tracking-tight text-[#0E121B]">
                      {catalogue?.kind === "programme" || visibleOptions.length > 1
                        ? "Choose how to pay"
                        : "Lock your spot"}
                    </h2>
                    <p className="mt-1 text-sm text-[#525866]">
                      Secure checkout powered by Stripe. You only pay{" "}
                      {formatUsd(dueToday || 25_000)} today.
                    </p>
                    {termLinks}
                  </div>

                  {optionsFieldset}
                  {selected ? <OfferSteps steps={offerSteps(pricingFor(selected))} /> : null}
                  {identityFields}

                  {shownError ? (
                    <p
                      className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700"
                      role="alert"
                    >
                      {shownError}
                    </p>
                  ) : null}

                  <GradientPillButton
                    type="submit"
                    disabled={!selected || Boolean(matchError) || preparing}
                    showArrow={!preparing}
                    className="w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {preparing ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="size-5 animate-spin" aria-hidden />
                        {requiresEligibility
                          ? "Checking eligibility…"
                          : "Preparing payment…"}
                      </span>
                    ) : (
                      "Proceed"
                    )}
                  </GradientPillButton>
                </form>
              </>
            )}
          </section>

          <section className="overflow-hidden rounded-[1.5rem] border border-[#E8D5E6] bg-white shadow-[0_12px_40px_rgba(99,23,96,0.08)]">
            <div
              className={cn(
                "px-5 py-3 font-heading text-base font-semibold sm:px-6",
                step === 2
                  ? "bg-gradient-purple text-white"
                  : "bg-white text-[#99A0AE]"
              )}
            >
              2. Secure Payment
            </div>
            {step === 2 ? (
              <div className="flex flex-col gap-4 p-5 sm:p-6">
                {selected && !shownCardLoading ? (
                  <div className="rounded-2xl border border-[#E8D5E6] bg-[#FEF5FE] p-4">
                    <p className="mb-3 font-heading text-base font-semibold text-[#0E121B]">
                      Pay {formatUsd(dueToday)} to lock my spot
                    </p>
                    <OfferSteps steps={offerSteps(pricingFor(selected))} />
                  </div>
                ) : null}
                {shownError ? (
                  <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                    {shownError}
                  </p>
                ) : null}
                {cardFields}
              </div>
            ) : (
              <p className="px-5 py-4 text-sm text-[#99A0AE] sm:px-6">
                Complete basic details to continue to card payment.
              </p>
            )}
          </section>

          <Link
            href={summary.backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#631760] hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Go back to {summary.kind === "course" ? "course" : summary.kind === "product" ? "product" : "program"}
          </Link>
        </div>

        <CheckoutOrderSummary
          summary={summary}
          selected={selected}
          pay={pay}
          offer={selected ? pay?.offers.find((offer) => offer.id === selected.id) : undefined}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 rounded-[1.5rem] border border-[#E8D5E6] bg-white p-5 shadow-[0_12px_40px_rgba(99,23,96,0.08)] sm:p-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight text-[#0E121B] sm:text-2xl">
          Choose how to pay
        </h2>
        <p className="mt-1 text-sm text-[#525866]">
          Secure checkout powered by Stripe. You only pay the selected amount today.
        </p>
        {termLinks}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {optionsFieldset}
        {selected ? <OfferSteps steps={offerSteps(pricingFor(selected))} /> : null}
        {identityFields}

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
