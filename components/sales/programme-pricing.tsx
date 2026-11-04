"use client"

import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { SaleCountdown } from "@/components/sales/sale-countdown"
import {
  brandPinkHoverClass,
  brandPinkHoverInsetClass,
} from "@/lib/buttonStyles"
import type { ProgrammePricingTerm } from "@/lib/checkout"
import { formatUsd } from "@/lib/products"
import { cn } from "@/lib/utils"

const termLabel = (months: 6 | 12) => (months === 12 ? "1 year" : "6 months")

/** Program pricing box: term toggle, full payment vs instalments, what is included, countdown. */
export function ProgrammePricing({
  programmeId,
  depositCents,
  terms,
  includes,
  saleEndsAt,
}: {
  programmeId: string
  depositCents: number
  terms: ProgrammePricingTerm[]
  includes: string[]
  saleEndsAt: string
}) {
  const [months, setMonths] = useState<6 | 12>(
    terms.some((term) => term.months === 12) ? 12 : terms[0].months
  )
  const term = terms.find((item) => item.months === months) ?? terms[0]
  const [optionId, setOptionId] = useState<string | null>(null)
  const selected =
    term.options.find((option) => option.id === optionId) ??
    term.options.find((option) => option.recommended) ??
    term.options[0]

  return (
    <section
      id="pricing"
      className="border-b border-[#E8D5E6] bg-[#FEF5FE]"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto w-full max-w-page px-4 py-14 lg:px-[120px] lg:py-20">
        <p className="text-sm font-medium tracking-[0.08em] text-[#631760] uppercase">
          Pricing
        </p>
        <h2
          id="pricing-heading"
          className="mt-3 max-w-3xl font-heading text-[clamp(1.85rem,0.9rem+1.9vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.045em] text-[#0E121B]"
        >
          Secure your spot with {formatUsd(depositCents)}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#525866]">
          Pay {formatUsd(depositCents)} today to lock your place in the Class of
          2027. Choose how long you want to study and how you want to pay the
          rest.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="rounded-[28px] border border-[#E8D5E6] bg-white p-5 sm:p-7">
            {terms.length > 1 ? (
              <div
                role="radiogroup"
                aria-label="Program length"
                className="grid grid-cols-2 gap-1 rounded-full bg-[#FEF5FE] p-1"
              >
                {terms.map((item) => (
                  <button
                    key={item.months}
                    type="button"
                    role="radio"
                    aria-checked={item.months === months}
                    onClick={() => {
                      setMonths(item.months)
                      setOptionId(null)
                    }}
                    className={cn(
                      "cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
                      item.months === months
                        ? "bg-[#0E121B] text-white"
                        : "text-[#525866] hover:text-[#0E121B]"
                    )}
                  >
                    {termLabel(item.months)}
                  </button>
                ))}
              </div>
            ) : (
              <p className="font-heading text-lg font-semibold text-[#0E121B]">
                {term.months === 12 ? "1-year" : "6-month"} program
              </p>
            )}

            <div
              role="radiogroup"
              aria-label="Payment option"
              className="mt-5 flex flex-col gap-3"
            >
              {term.options.map((option) => {
                const active = option.id === selected.id
                const savings = term.listPriceCents - option.totalCents
                return (
                  <label
                    key={option.id}
                    className={cn(
                      "block cursor-pointer overflow-hidden rounded-2xl border transition-colors",
                      active
                        ? "border-[#AD14A7] bg-[#FEF5FE]"
                        : "border-[#E8D5E6] bg-white hover:border-[#AD14A7]/40"
                    )}
                  >
                    {option.recommended ? (
                      <p className="bg-gradient-purple px-4 py-1.5 text-center text-xs font-semibold tracking-wide text-white uppercase">
                        Recommended
                      </p>
                    ) : null}
                    <div className="flex items-center gap-3 p-4">
                      <input
                        type="radio"
                        name={`pricing-${programmeId}`}
                        value={option.id}
                        checked={active}
                        onChange={() => setOptionId(option.id)}
                        className="size-4 shrink-0 accent-[#AD14A7]"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-heading text-base font-semibold text-[#0E121B]">
                          {option.monthly
                            ? "Monthly instalments"
                            : option.label}
                        </p>
                        <p className="mt-0.5 text-sm text-[#525866]">
                          {option.monthly
                            ? `${formatUsd(term.baseFeeCents)} base fee, then ${option.monthly.count} × ${formatUsd(option.monthly.amountCents)}. Total ${formatUsd(option.totalCents)}.`
                            : (option.note ??
                              `Total ${formatUsd(option.totalCents)}.`)}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        {savings > 0 ? (
                          <div className="flex items-center justify-end gap-2">
                            <s className="text-sm text-[#525866]">
                              {formatUsd(term.listPriceCents)}
                            </s>
                            <span className="rounded-md bg-[#FA9BF6] px-1.5 py-0.5 text-xs font-semibold text-[#631760]">
                              {Math.round(
                                (savings / term.listPriceCents) * 100
                              )}
                              % off
                            </span>
                          </div>
                        ) : null}
                        <p className="font-heading text-2xl font-semibold text-[#0E121B]">
                          {option.monthly
                            ? formatUsd(option.monthly.amountCents)
                            : formatUsd(option.totalCents)}
                          {option.monthly ? (
                            <span className="text-sm font-medium text-[#525866]">
                              /mo
                            </span>
                          ) : null}
                        </p>
                      </div>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col rounded-[28px] border border-[#E8D5E6] bg-white p-5 sm:p-7">
            <h3 className="font-heading text-lg font-semibold text-[#0E121B]">
              What&apos;s included
            </h3>
            <ul className="mt-4 flex flex-1 flex-col gap-3">
              {includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-[#0E121B]"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-[#AD14A7]"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
            <SaleCountdown endsAt={saleEndsAt} className="mt-6" />
            <Link
              href={`/checkout?kind=programme&id=${encodeURIComponent(programmeId)}&term=${term.months}`}
              className={cn(
                "mt-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0E121B] px-6 py-3.5 text-sm font-semibold text-white",
                brandPinkHoverClass,
                brandPinkHoverInsetClass
              )}
            >
              Enroll now
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <p className="mt-3 text-center text-xs text-[#525866]">
              {formatUsd(depositCents)} today locks your spot for the{" "}
              {term.months === 12 ? "1-year" : "6-month"} program.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
