import type { PayOffer } from "@/lib/lander"
import { formatUsd, type PaymentOption } from "@/lib/products"
import { cn } from "@/lib/utils"

const FULL_PAYMENT_IDS = new Set(["full-pay", "one-time", "pay-in-full"])

type OfferPricing = {
  option: PaymentOption
  offer?: PayOffer
  listPriceCents?: number
  baseFeeCents: number
}

function offerTotal({ option, offer }: OfferPricing) {
  return offer?.totalCents ?? option.amountCents
}

function offerSubtitle(pricing: OfferPricing): string | null {
  const total = offerTotal(pricing)
  const balance = total - pricing.baseFeeCents
  const count = pricing.offer?.installmentCount
  if (count && balance > 0) {
    return `Prepay ${count} months · ${formatUsd(Math.floor(balance / count))}/month (${formatUsd(balance)})`
  }
  return null
}

/** What the buyer pays and when, for the selected offer. */
export function offerSteps(pricing: OfferPricing): string[] {
  const { option, baseFeeCents } = pricing
  const today = option.amountCents
  const total = offerTotal(pricing)
  if (today >= total) return [`Pay ${formatUsd(today)} today.`]

  const steps: string[] = []
  if (today < baseFeeCents) {
    steps.push(`Pay ${formatUsd(today)} today to lock your spot.`)
    steps.push(
      `Must pay ${formatUsd(baseFeeCents - today)} before class starts in January (sent as a quote).`
    )
  } else {
    steps.push(`Pay ${formatUsd(today)} today.`)
  }

  const remainder = total - baseFeeCents
  const count = pricing.offer?.installmentCount
  if (count && remainder > 0) {
    steps.push(
      `Then ${formatUsd(Math.floor(remainder / count))}/month for ${count} months (${formatUsd(remainder)}), due at the end of each month from January 2027.`
    )
  } else if (FULL_PAYMENT_IDS.has(option.id) && remainder > 0) {
    steps.push(
      `The remaining ${formatUsd(remainder)} is due by 28 February 2027 (sent as a quote).`
    )
  }
  return steps
}

export function OfferSteps({ steps }: { steps: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {steps.map((step) => (
        <li key={step} className="flex items-start gap-2.5 text-sm text-[#0E121B]">
          <span
            className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center font-semibold text-[#AD14A7]"
            aria-hidden
          >
            ✓
          </span>
          <span>{step}</span>
        </li>
      ))}
    </ul>
  )
}

type OfferCardProps = OfferPricing & {
  active: boolean
  ribbon: boolean
  onSelect: () => void
}

export function OfferCard({ active, ribbon, onSelect, ...pricing }: OfferCardProps) {
  const total = offerTotal(pricing)
  const list = pricing.listPriceCents
  const savings = list != null && list > total ? list - total : 0
  const subtitle = offerSubtitle(pricing)

  return (
    <label
      className={cn(
        "block cursor-pointer overflow-hidden rounded-2xl border transition-colors",
        active
          ? "border-[#AD14A7] bg-[#FEF5FE]"
          : "border-[#E8D5E6] bg-white hover:border-[#AD14A7]/40"
      )}
    >
      {ribbon ? (
        <p className="bg-gradient-purple px-4 py-1.5 text-center text-xs font-semibold tracking-wide text-white uppercase">
          Recommended
        </p>
      ) : null}
      <div className="flex items-center gap-3 p-4">
        <input
          type="radio"
          name="paymentOption"
          value={pricing.option.id}
          checked={active}
          onChange={onSelect}
          className="size-4 shrink-0 accent-[#AD14A7]"
        />
        <div className="min-w-0 flex-1">
          <p className="font-heading text-base font-semibold text-[#0E121B]">
            {pricing.option.label}
          </p>
          {subtitle ? <p className="mt-0.5 text-sm text-[#525866]">{subtitle}</p> : null}
        </div>
        <div className="shrink-0 text-right">
          {savings > 0 && list != null ? (
            <div className="flex items-center justify-end gap-2">
              <s className="text-sm text-[#525866]">{formatUsd(list)}</s>
              <span className="rounded-md bg-[#FA9BF6] px-1.5 py-0.5 text-xs font-semibold text-[#631760]">
                {Math.round((savings / list) * 100)}% off
              </span>
            </div>
          ) : null}
          <p className="font-heading text-2xl font-semibold text-[#0E121B]">{formatUsd(total)}</p>
          {savings > 0 ? (
            <p className="text-xs font-medium text-[#631760]">You save {formatUsd(savings)}</p>
          ) : null}
        </div>
      </div>
    </label>
  )
}
