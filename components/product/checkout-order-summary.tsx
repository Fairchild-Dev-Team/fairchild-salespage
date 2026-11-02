import { Calendar, CheckCircle2, ClipboardList, Clock } from "lucide-react"

import type { SalesCheckoutSummary } from "@/lib/checkout"
import type { PayOffer, ProgrammePayDetails } from "@/lib/lander"
import { formatUsd, type PaymentOption } from "@/lib/products"
import { formatCataloguePrice } from "@/lib/catalogue"
import { cn } from "@/lib/utils"

type CheckoutOrderSummaryProps = {
  summary: SalesCheckoutSummary
  selected?: PaymentOption
  pay: ProgrammePayDetails | null
  offer?: PayOffer
}

const kindBadge: Record<SalesCheckoutSummary["kind"], string> = {
  programme: "Program",
  course: "Course",
  product: "Product",
}

export function CheckoutOrderSummary({
  summary,
  selected,
  pay,
  offer,
}: CheckoutOrderSummaryProps) {
  const dueToday = selected?.amountCents ?? 25_000
  const planTotal = offer?.totalCents ?? selected?.amountCents ?? dueToday
  const listFromPay = pay?.listPriceCents
  const listFromCatalogue =
    summary.cataloguePriceUsd != null ? summary.cataloguePriceUsd * 100 : undefined
  const listCents =
    summary.kind === "programme" ? listFromPay ?? listFromCatalogue : listFromCatalogue
  const savings =
    listCents != null && listCents > planTotal ? listCents - planTotal : 0

  return (
    <aside className="flex flex-col gap-4 rounded-[1.5rem] border border-[#E8D5E6] bg-white p-5 shadow-[0_12px_40px_rgba(99,23,96,0.08)] sm:p-6">
      <div className="flex items-center gap-2">
        <ClipboardList className="size-5 text-[#AD14A7]" aria-hidden />
        <h2 className="font-heading text-lg font-semibold text-[#0E121B]">
          Order Summary
        </h2>
      </div>

      <span className="w-fit rounded-full bg-[#FEF5FE] px-3 py-1 text-xs font-semibold text-[#631760]">
        {kindBadge[summary.kind]}
      </span>

      <div>
        <p className="font-heading text-xl font-semibold tracking-tight text-[#0E121B]">
          {summary.title}
        </p>
        <ul className="mt-3 space-y-2 text-sm text-[#525866]">
          {summary.duration ? (
            <li className="flex items-start gap-2">
              <Calendar className="mt-0.5 size-4 shrink-0 text-[#AD14A7]" aria-hidden />
              <span>{summary.duration}</span>
            </li>
          ) : null}
          {summary.leader ? (
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-[#AD14A7]" aria-hidden />
              <span>Led by {summary.leader}</span>
            </li>
          ) : null}
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#AD14A7]" aria-hidden />
            <span>
              Spot lock{" "}
              <span className="ml-1 rounded-full bg-[#E8D5E6]/70 px-2 py-0.5 text-xs text-[#525866]">
                $250 today
              </span>
            </span>
          </li>
        </ul>
      </div>

      <div className="h-px bg-[#E8D5E6]" />

      <div className="flex items-start justify-between gap-3 text-sm">
        <span className="text-[#525866]">
          {summary.kind === "programme" ? "Program fees" : "Course / product fees"}
        </span>
        <div className="text-right">
          {savings > 0 && listCents != null ? (
            <div className="mb-1 flex items-center justify-end gap-2">
              <span className="rounded-md bg-[#FA9BF6] px-1.5 py-0.5 text-xs font-semibold text-[#631760]">
                {Math.round((savings / listCents) * 100)}% off
              </span>
              <s className="text-[#525866]">{formatUsd(listCents)}</s>
            </div>
          ) : listCents != null && summary.kind !== "programme" ? (
            <p className="mb-1 text-[#525866]">
              {formatCataloguePrice(summary.cataloguePriceUsd ?? listCents / 100)}
            </p>
          ) : null}
          <p className="font-heading text-lg font-semibold text-[#0E121B]">
            {formatUsd(planTotal)}
          </p>
        </div>
      </div>

      {selected ? (
        <p className="text-sm text-[#525866]">
          Selected: <span className="font-medium text-[#0E121B]">{selected.label}</span>
        </p>
      ) : null}

      <div className="h-px bg-[#E8D5E6]" />

      <div className="flex items-center justify-between text-sm">
        <span className="text-[#525866]">Due today</span>
        <span className="font-medium text-[#0E121B]">{formatUsd(dueToday)}</span>
      </div>
      <div
        className={cn(
          "flex items-center justify-between border-t border-[#E8D5E6] pt-3",
          "font-heading text-base font-semibold text-[#0E121B]"
        )}
      >
        <span>Grand total today</span>
        <span>{formatUsd(dueToday)}</span>
      </div>
    </aside>
  )
}
