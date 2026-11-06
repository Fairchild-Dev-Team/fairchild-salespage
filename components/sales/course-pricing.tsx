import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"

import { SaleCountdown } from "@/components/sales/sale-countdown"
import {
  brandPinkHoverClass,
  brandPinkHoverInsetClass,
} from "@/lib/buttonStyles"
import { formatCataloguePrice } from "@/lib/catalogue"
import { COURSE_DEPOSIT_USD, courseOffer } from "@/lib/programmes/shared"
import { cn } from "@/lib/utils"

/** Course pricing box: one price, the sheet price struck through when higher, a countdown. */
export function CoursePricing({
  title,
  priceUsd,
  includes,
  saleEndsAt,
  ctaHref,
  programme,
}: {
  title: string
  priceUsd: number | null
  includes: string[]
  saleEndsAt: string
  ctaHref: string
  programme: { title: string; href: string; courseCount: number }
}) {
  const offer = courseOffer(priceUsd)

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
          Take {title} on its own
        </h2>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="flex flex-col rounded-[28px] border border-[#AD14A7] bg-white p-6 ring-1 ring-[#AD14A7]/20 sm:p-8">
            <p className="text-sm font-medium text-[#631760]">This course</p>
            {offer.struckUsd != null ? (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <s className="text-lg text-[#525866]">
                  {formatCataloguePrice(offer.struckUsd)}
                </s>
                <span className="rounded-md bg-[#FA9BF6] px-2 py-0.5 text-sm font-semibold text-[#631760]">
                  {offer.percentOff}% off
                </span>
              </div>
            ) : null}
            <p className="mt-2 font-heading text-5xl font-semibold tracking-[-0.04em] text-[#0E121B]">
              {formatCataloguePrice(offer.offerUsd)}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#525866]">
              Secure your spot with{" "}
              <span className="font-semibold text-[#0E121B]">
                {formatCataloguePrice(COURSE_DEPOSIT_USD)}
              </span>{" "}
              today. The other{" "}
              {formatCataloguePrice(offer.offerUsd - COURSE_DEPOSIT_USD)} is
              paid before the class starts.
            </p>
            <SaleCountdown endsAt={saleEndsAt} className="mt-6" />
            <Link
              href={ctaHref}
              className={cn(
                "mt-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0E121B] px-6 py-3.5 text-sm font-semibold text-white",
                brandPinkHoverClass,
                brandPinkHoverInsetClass
              )}
            >
              Enroll now
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <p className="mt-4 text-sm text-[#525866]">
              Want all {programme.courseCount} courses? See the{" "}
              <Link
                href={`${programme.href}#pricing`}
                className="font-medium text-[#AD14A7] underline underline-offset-4"
              >
                {programme.title}
              </Link>
              .
            </p>
          </div>

          <div className="rounded-[28px] border border-[#E8D5E6] bg-white p-6 sm:p-8">
            <h3 className="font-heading text-lg font-semibold text-[#0E121B]">
              What&apos;s included
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
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
          </div>
        </div>
      </div>
    </section>
  )
}
