"use client"

import { useState, useTransition } from "react"

import { GradientPillButton } from "@/components/ui/gradient-pill-button"
import { formatUsd, type PaymentOption, type Product } from "@/lib/products"
import { cn } from "@/lib/utils"

type CheckoutFormProps = {
  product: Product
}

export function CheckoutForm({ product }: CheckoutFormProps) {
  const [optionId, setOptionId] = useState(
    product.paymentOptions.find((o) => o.highlighted)?.id ??
      product.paymentOptions[0]?.id ??
      ""
  )
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const selected: PaymentOption | undefined = product.paymentOptions.find(
    (option) => option.id === optionId
  )

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!selected) return

    setError(null)
    startTransition(async () => {
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: product.slug,
            optionId: selected.id,
            email: email.trim() || undefined,
          }),
        })
        const data = (await response.json()) as { url?: string; error?: string }
        if (!response.ok || !data.url) {
          setError(data.error ?? "Checkout failed. Try again.")
          return
        }
        window.location.assign(data.url)
      } catch {
        setError("Network error. Try again.")
      }
    })
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-[1.5rem] border border-[#E8D5E6] bg-white p-5 shadow-[0_12px_40px_rgba(99,23,96,0.08)] sm:p-6"
    >
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight text-[#0E121B] sm:text-2xl">
          Choose how to pay
        </h2>
        <p className="mt-1 text-sm text-[#525866]">
          Secure checkout powered by Stripe. You only pay the selected amount today.
        </p>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="sr-only">Payment options</legend>
        {product.paymentOptions.map((option) => {
          const active = option.id === optionId
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

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-[#0E121B]">Email (optional)</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@email.com"
          className="rounded-xl border border-[#E8D5E6] bg-[#FEF5FE] px-3.5 py-3 text-sm text-[#0E121B] outline-none ring-[#AD14A7] placeholder:text-[#525866]/70 focus:ring-2"
        />
      </label>

      {error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <GradientPillButton
        type="submit"
        disabled={pending || !selected}
        className="w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending
          ? "Redirecting to Stripe…"
          : selected
            ? `Pay ${formatUsd(selected.amountCents)} with Stripe`
            : "Select an option"}
      </GradientPillButton>
    </form>
  )
}
