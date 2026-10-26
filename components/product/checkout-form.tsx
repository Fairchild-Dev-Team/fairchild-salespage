"use client"

import { useEffect, useMemo, useState } from "react"

import { GradientPillButton } from "@/components/ui/gradient-pill-button"
import type { CatalogueCheckoutTarget, ProgrammePayDetails } from "@/lib/lander"
import { formatUsd, type PaymentOption, type Product } from "@/lib/products"
import { cn } from "@/lib/utils"
import { PaymentDrawer } from "@/components/product/payment-drawer"
import { StripeLanderPayment } from "@/components/product/stripe-lander-payment"

type CheckoutFormProps = {
  product: Product
  pay?: ProgrammePayDetails | null
  catalogue?: CatalogueCheckoutTarget | null
  /** page opens the card in a right sidebar. panel keeps the card in the parent sidebar. */
  surface?: "page" | "panel"
}

const FULL_PAYMENT_IDS = new Set(["full-pay", "one-time", "pay-in-full"])

function splitCents(balanceCents: number, count: number) {
  const each = Math.floor(balanceCents / count)
  const last = balanceCents - each * (count - 1)
  return { each, last }
}

function addDaysIso(iso: string, days: number): string {
  const [year, month, day] = iso.split("-").map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

function resizeDates(current: string[], count: number, intervalDays: number): string[] {
  const today = new Date().toISOString().slice(0, 10)
  const next = current.slice(0, count)
  while (next.length < count) {
    const previous = next[next.length - 1]
    next.push(previous ? addDaysIso(previous, intervalDays) : today)
  }
  return next
}

export function CheckoutForm({
  product,
  pay = null,
  catalogue = null,
  surface = "page",
}: CheckoutFormProps) {
  const [optionId, setOptionId] = useState(
    product.paymentOptions.find((o) => o.highlighted)?.id ??
      product.paymentOptions[0]?.id ??
      ""
  )
  const activeOptionId = product.paymentOptions.some((option) => option.id === optionId)
    ? optionId
    : (product.paymentOptions.find((option) => option.highlighted)?.id ??
      product.paymentOptions[0]?.id ??
      "")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [fullChoice, setFullChoice] = useState<"full" | "base">("full")
  const [installmentCount, setInstallmentCount] = useState(2)
  const [installmentDates, setInstallmentDates] = useState<string[]>([])
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

  const selected: PaymentOption | undefined = product.paymentOptions.find(
    (option) => option.id === activeOptionId
  )
  const offerTotal = pay?.offers.find((offer) => offer.id === selected?.id)?.totalCents
  const baseFee = pay?.baseFeeCents ?? 50_000
  const balance = offerTotal != null ? offerTotal - baseFee : null
  const isFull = Boolean(
    selected &&
      FULL_PAYMENT_IDS.has(selected.id) &&
      pay &&
      pay.allowsBaseQuote !== false &&
      balance != null &&
      balance > 0
  )
  const isPlan = Boolean(selected?.id === "payment-plan" && pay)

  const planCap = pay
    ? Math.min(pay.maxInstallments, pay.termMonths ?? pay.maxInstallments)
    : 2

  const allowedCounts = useMemo(() => {
    if (!pay) return []
    const counts: number[] = []
    for (let count = 2; count <= planCap; count += 1) {
      counts.push(count)
    }
    return counts
  }, [pay, planCap])

  const activeCount = allowedCounts.includes(installmentCount)
    ? installmentCount
    : (allowedCounts[allowedCounts.length - 1] ?? 2)

  const scheduleDates = pay
    ? resizeDates(installmentDates, activeCount, pay.defaultIntervalDays)
    : installmentDates

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSettledEmail(email.trim())
      setSettledFirstName(firstName.trim())
      setSettledLastName(lastName.trim())
    }, 350)
    return () => window.clearTimeout(timer)
  }, [email, firstName, lastName])

  const parts =
    isPlan && balance != null && balance > 0 && activeCount >= 2
      ? splitCents(balance, activeCount)
      : null

  const dueToday =
    isFull && fullChoice === "base"
      ? baseFee
      : isPlan
        ? baseFee
        : (selected?.amountCents ?? 0)

  const todayIso = new Date().toISOString().slice(0, 10)
  const selectionKey = [
    activeOptionId,
    isFull ? fullChoice : "",
    isPlan ? String(activeCount) : "",
    isPlan ? scheduleDates.join(",") : "",
    catalogue?.kind ?? "",
    catalogue?.id ?? "",
    catalogue?.termMonths ?? "",
    settledEmail,
    settledFirstName,
    settledLastName,
  ].join("|")

  function planDateError(): string | null {
    if (!isPlan) return null
    if (!allowedCounts.includes(activeCount)) return "Choose a valid number of payments."
    if (scheduleDates.length !== activeCount || scheduleDates.some((date) => !date)) {
      return "Set a date for each payment."
    }
    for (let index = 0; index < scheduleDates.length; index += 1) {
      const date = scheduleDates[index]
      if (date < todayIso) return `Payment ${index + 1} cannot be in the past.`
      if (index > 0 && date < scheduleDates[index - 1]) {
        return `Payment ${index + 1} must be on or after payment ${index}.`
      }
    }
    return null
  }

  useEffect(() => {
    if (!drawerOpen || !selected || !settledEmail || !settledFirstName || !settledLastName) {
      return
    }
    if (planDateError()) return

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
            ...(isFull ? { payMode: fullChoice } : {}),
            ...(isPlan ? { installmentCount: activeCount, installmentDates: scheduleDates } : {}),
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
    const dateError = planDateError()
    if (dateError) {
      setError({ message: dateError, key: selectionKey })
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
  const scheduleError = planDateError()
  const shownError =
    scheduleError ?? (error?.key === selectionKey ? error.message : null)
  const shownCard =
    identityReady && !scheduleError && card?.key === selectionKey ? card : null
  const shownCardLoading =
    drawerOpen && identityReady && !scheduleError && settledKey !== selectionKey

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
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-5">

      <fieldset className="flex flex-col gap-3">
        <legend className="sr-only">Payment options</legend>
        {product.paymentOptions.map((option) => {
          const active = option.id === activeOptionId
          return (
            <label
              key={option.id}
              className={cn(
                "cursor-pointer rounded-2xl border p-4 transition-colors",
                active
                  ? "border-[#AD14A7] bg-[#FEF5FE]"
                  : "border-[#E8D5E6] bg-white hover:border-[#AD14A7]/40"
              )}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="paymentOption"
                  value={option.id}
                  checked={active}
                  onChange={() => setOptionId(option.id)}
                  className="mt-1 size-4 accent-[#AD14A7]"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-heading text-base font-semibold text-[#0E121B]">
                      {option.label}
                    </span>
                    <span className="font-heading text-lg font-semibold text-[#631760]">
                      {formatUsd(option.amountCents)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-[#525866]">
                    {option.description}
                  </p>
                  {option.scheduleNote ? (
                    <p className="mt-2 text-xs leading-relaxed text-[#631760]/80">
                      {option.scheduleNote}
                    </p>
                  ) : null}
                </div>
              </div>
            </label>
          )
        })}
      </fieldset>

      {isFull && balance != null && offerTotal != null ? (
        <fieldset className="flex flex-col gap-3 rounded-2xl border border-[#E8D5E6] p-4">
          <legend className="px-1 font-heading text-sm font-semibold text-[#0E121B]">
            Pay the base fee or the full fee
          </legend>
          <label className="flex items-start gap-3 text-sm text-[#525866]">
            <input
              type="radio"
              name="fullChoice"
              checked={fullChoice === "base"}
              onChange={() => setFullChoice("base")}
              className="mt-1 size-4 accent-[#AD14A7]"
            />
            <span>
              Pay the {formatUsd(baseFee)} base fee now. A quote is issued for the balance.
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm text-[#525866]">
            <input
              type="radio"
              name="fullChoice"
              checked={fullChoice === "full"}
              onChange={() => setFullChoice("full")}
              className="mt-1 size-4 accent-[#AD14A7]"
            />
            <span>Pay the full fee of {formatUsd(offerTotal)} now.</span>
          </label>
          {fullChoice === "base" ? (
            <p className="rounded-xl bg-[#FEF5FE] px-3 py-2 text-sm text-[#631760]">
              {formatUsd(offerTotal)} full fee − {formatUsd(baseFee)} base fee ={" "}
              <strong>{formatUsd(balance)}</strong> quoted for later. You pay{" "}
              {formatUsd(baseFee)} today.
            </p>
          ) : null}
        </fieldset>
      ) : null}

      {isPlan && pay && balance != null && offerTotal != null ? (
        <div className="flex flex-col gap-3 rounded-2xl border border-[#E8D5E6] p-4">
          <p className="font-heading text-sm font-semibold text-[#0E121B]">
            Payment plan for the balance
          </p>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-[#0E121B]">Number of payments</span>
            <select
              value={activeCount}
              onChange={(event) => setInstallmentCount(Number(event.target.value))}
              className="rounded-xl border border-[#E8D5E6] bg-[#FEF5FE] px-3.5 py-3 text-sm text-[#0E121B] outline-none ring-[#AD14A7] focus:ring-2"
            >
              {allowedCounts.map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
            <span className="text-xs text-[#525866]">
              {pay.termMonths && pay.termMonths < pay.maxInstallments
                ? `A ${pay.termMonths}-month term allows 2 to ${planCap} payments.`
                : `The institution allows 2 to ${pay.maxInstallments} payments.`}
            </span>
          </label>
          {parts ? (
            <div className="flex flex-col gap-3">
              {scheduleDates.map((date, index) => {
                const amount = index === scheduleDates.length - 1 ? parts.last : parts.each
                return (
                  <label key={index} className="flex flex-col gap-1.5 text-sm">
                    <span className="font-medium text-[#0E121B]">
                      Payment {index + 1} of {activeCount} · {formatUsd(amount)}
                    </span>
                    <input
                      type="date"
                      min={index === 0 ? todayIso : scheduleDates[index - 1] || todayIso}
                      value={date}
                      onChange={(event) => {
                        const value = event.target.value
                        setInstallmentDates(
                          scheduleDates.map((item, itemIndex) =>
                            itemIndex === index ? value : item
                          )
                        )
                      }}
                      className="rounded-xl border border-[#E8D5E6] bg-[#FEF5FE] px-3.5 py-3 text-sm text-[#0E121B] outline-none ring-[#AD14A7] focus:ring-2"
                    />
                  </label>
                )
              })}
            </div>
          ) : null}
          {parts ? (
            <p className="rounded-xl bg-[#FEF5FE] px-3 py-2 text-sm text-[#631760]">
              {formatUsd(offerTotal)} plan total − {formatUsd(baseFee)} base fee ={" "}
              <strong>{formatUsd(balance)}</strong> balance. {formatUsd(balance)} ÷ {activeCount}{" "}
              = <strong>{formatUsd(parts.each)}</strong>
              {parts.last !== parts.each
                ? `, with the last payment at ${formatUsd(parts.last)} so the parts add up`
                : ""}
              . You pay {formatUsd(baseFee)} today.
            </p>
          ) : (
            <p className="text-sm text-[#525866]">
              This institution&apos;s payment-plan limit does not leave a valid number of payments
              for this term.
            </p>
          )}
        </div>
      ) : null}

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
        disabled={!selected || (isPlan && allowedCounts.length === 0)}
        className="w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
      >
        {shownCardLoading
          ? "Preparing card payment…"
          : selected
            ? `Continue to pay ${formatUsd(dueToday)}`
            : "Select an option"}
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
          <div className="mb-5 flex flex-col gap-2">
            {product.paymentOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setOptionId(option.id)}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-left text-sm",
                  option.id === activeOptionId
                    ? "border-[#AD14A7] bg-[#FEF5FE] text-[#631760]"
                    : "border-[#E8D5E6] text-[#525866]"
                )}
              >
                <span className="font-heading font-semibold text-[#0E121B]">{option.label}</span>
                <span className="mt-1 block font-semibold text-[#631760]">
                  {formatUsd(option.amountCents)}
                </span>
              </button>
            ))}
          </div>
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
