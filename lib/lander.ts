import { cache } from "react"

import {
  getPaymentOption,
  type PaymentOption,
  type Product,
} from "@/lib/products"

type LanderOffer = {
  id: string
  label: string
  description: string
  scheduleNote?: string
  chargeNowCents: number
  totalCents: number
  startsAccess: boolean
  highlighted?: boolean
  /** Plan offers: number of month-end instalments after the base fee. */
  installmentCount?: number
}

type LanderTerm = {
  months: 6 | 12
  listPriceCents: number
  offers: LanderOffer[]
  baseFeeCents?: number
}

export type ProgrammeCourseSummary = {
  id: string
  title: string
  shortDescription: string | null
  description: string | null
}

type PublicProgramme = {
  id: string
  title: string
  slug: string | null
  durationMonths: number | null
  price: number
  description?: string | null
  shortDescription?: string | null
  courses?: ProgrammeCourseSummary[]
  terms?: LanderTerm[]
}

export type CatalogueOffer = {
  id: string
  label: string
  description: string
  scheduleNote?: string
  chargeNowCents: number
  totalCents: number
  startsAccess: boolean
  highlighted?: boolean
  installmentCount?: number
}

export type CatalogueCourse = {
  id: string
  title: string
  slug: string | null
  description?: string | null
  shortDescription: string | null
  price: number
  duration: string | null
  /** Course checkout. Programmes are the only catalogue items with 6- and 12-month terms. */
  offers?: CatalogueOffer[]
}

export type CatalogueProduct = {
  id: string
  name: string
  slug: string | null
  shortDescription: string | null
  price: number
  offers?: CatalogueOffer[]
}

type PublicLander = {
  currency: string
  stripePublishableKey: string | null
  baseFeeCents?: number
  terms: LanderTerm[]
  programmes: PublicProgramme[]
  courses?: CatalogueCourse[]
  products?: CatalogueProduct[]
}

export type PayOffer = {
  id: string
  totalCents: number
  installmentCount?: number
}

export type ProgrammePayDetails = {
  termMonths?: 6 | 12
  baseFeeCents: number
  /** Programme terms only. Savings are measured against it. */
  listPriceCents?: number
  offers: PayOffer[]
}

export type CatalogueKind = "programme" | "course" | "product"

export type CatalogueCheckoutTarget = {
  kind: CatalogueKind
  id: string
  termMonths?: 6 | 12
}

type SuccessBody = {
  success?: boolean
  response?: PublicLander
}

export type ProgrammeCheckout = {
  product: Product
  option: PaymentOption
  programmeId?: string
  termMonths?: number
  startsAccess: boolean
}

const FULL_PAYMENT_OPTION_IDS = new Set(["full-pay", "one-time"])

function termMonthsFor(product: Product): 6 | 12 | null {
  if (product.type === "programme-1y") return 12
  if (product.type === "programme-6m") return 6
  return null
}

export const getPublicLander = cache(async function getPublicLander(): Promise<PublicLander | null> {
  const base = process.env.FAIRCHILD_API_URL?.trim()
  if (!base) return null

  const url = `${base.replace(/\/$/, "")}/api/v1/institution/public/lander`
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    })
    if (!response.ok) return null
    const body = (await response.json()) as SuccessBody
    if (!body.response?.terms) return null
    return body.response
  } catch {
    return null
  }
})

function matchProgramme(
  product: Product,
  programmes: PublicProgramme[]
): PublicProgramme | undefined {
  const bySlug = programmes.find((programme) => programme.slug === product.slug)
  if (bySlug) return bySlug
  if (programmes.length === 1) return programmes[0]
  return undefined
}

function termFor(
  months: 6 | 12,
  lander: PublicLander,
  programme?: PublicProgramme
): LanderTerm | undefined {
  return (
    programme?.terms?.find((term) => term.months === months) ??
    lander.terms.find((term) => term.months === months)
  )
}

function toPaymentOption(offer: LanderOffer): PaymentOption {
  return {
    id: offer.id,
    label: offer.label,
    amountCents: offer.chargeNowCents,
    description: offer.description,
    scheduleNote: offer.scheduleNote,
    highlighted: offer.highlighted,
  }
}

function toPayOffer(offer: LanderOffer): PayOffer {
  return {
    id: offer.id,
    totalCents: offer.totalCents,
    installmentCount: offer.installmentCount,
  }
}

function payFromOffers(
  offers: LanderOffer[],
  lander: PublicLander,
  term?: LanderTerm
): ProgrammePayDetails {
  return {
    termMonths: term?.months,
    baseFeeCents: term?.baseFeeCents ?? lander.baseFeeCents ?? 50_000,
    listPriceCents: term?.listPriceCents,
    offers: offers.map(toPayOffer),
  }
}

function asProduct(
  slug: string,
  name: string,
  summary: string,
  duration: string,
  type: Product["type"],
  offers: LanderOffer[]
): Product {
  return {
    slug,
    name,
    type,
    tagline: summary,
    summary,
    duration,
    outcomes: [],
    includes: [],
    paymentOptions: offers.map(toPaymentOption),
  }
}

export type CataloguePage = {
  title: string
  summary: string
  description: string | null
  courses: ProgrammeCourseSummary[]
  currency: string
  price: number
  terms: Array<6 | 12>
  selectedTerm?: 6 | 12
  product: Product
  pay: ProgrammePayDetails
  catalogue: CatalogueCheckoutTarget
}

export async function loadCataloguePage(
  kind: CatalogueKind,
  id: string,
  requestedTerm?: 6 | 12
): Promise<CataloguePage | null> {
  const lander = await getPublicLander()
  if (!lander) return null

  if (kind === "programme") {
    const programme = lander.programmes.find((item) => item.id === id)
    if (!programme) return null
    return catalogueTermPage({
      kind,
      id: programme.id,
      title: programme.title,
      summary:
        programme.shortDescription ??
        "6-month and 12-month offers on this programme.",
      description: programme.description ?? null,
      courses: programme.courses ?? [],
      slug: programme.slug ?? programme.id,
      duration: "Programme",
      type: "programme-1y",
      price: programme.price,
      lander,
      requestedTerm,
    })
  }

  if (kind === "course") {
    const course = (lander.courses ?? []).find((item) => item.id === id)
    if (!course) return null
    return catalogueOfferPage({
      kind,
      id: course.id,
      title: course.title,
      summary: course.shortDescription ?? "",
      description: course.description ?? course.shortDescription ?? null,
      slug: course.slug ?? course.id,
      duration: course.duration ?? "Course",
      type: "course",
      price: course.price,
      offers: course.offers ?? [],
      lander,
    })
  }

  const product = (lander.products ?? []).find((item) => item.id === id)
  if (!product) return null
  return catalogueOfferPage({
    kind,
    id: product.id,
    title: product.name,
    summary: product.shortDescription ?? "Product",
    description: product.shortDescription ?? null,
    slug: product.slug ?? product.id,
    duration: "Product",
    type: "course",
    price: product.price,
    offers: product.offers ?? [],
    lander,
  })
}

function catalogueOfferPage(input: {
  kind: CatalogueKind
  id: string
  title: string
  summary: string
  description: string | null
  slug: string
  duration: string
  type: Product["type"]
  price: number
  offers: LanderOffer[]
  lander: PublicLander
}): CataloguePage | null {
  if (input.offers.length === 0) return null
  return {
    title: input.title,
    summary: input.summary,
    description: input.description,
    courses: [],
    currency: input.lander.currency,
    price: input.price,
    terms: [],
    product: asProduct(
      input.slug,
      input.title,
      input.summary,
      input.duration,
      input.type,
      input.offers
    ),
    pay: payFromOffers(input.offers, input.lander),
    catalogue: { kind: input.kind, id: input.id },
  }
}

function catalogueTermPage(input: {
  kind: CatalogueKind
  id: string
  title: string
  summary: string
  description: string | null
  courses: ProgrammeCourseSummary[]
  slug: string
  duration: string
  type: Product["type"]
  price: number
  lander: PublicLander
  requestedTerm?: 6 | 12
}): CataloguePage | null {
  const terms = input.lander.terms
  const selected =
    terms.find((term) => term.months === input.requestedTerm) ??
    terms.find((term) => term.months === 12) ??
    terms[0]
  if (!selected) return null
  return {
    title: input.title,
    summary: input.summary,
    description: input.description,
    courses: input.courses,
    currency: input.lander.currency,
    price: input.price,
    terms: terms.map((term) => term.months),
    selectedTerm: selected.months,
    product: asProduct(
      input.slug,
      input.title,
      input.summary,
      input.duration,
      input.type,
      selected.offers
    ),
    pay: payFromOffers(selected.offers, input.lander, selected),
    catalogue: { kind: input.kind, id: input.id, termMonths: selected.months },
  }
}

/**
 * Programme pages stay on the local catalogue when the API is unavailable.
 * A 6-month page and a 12-month page are terms of one programme, not two records.
 */
function fallbackPay(months: 6 | 12, product: Product): ProgrammePayDetails {
  return {
    termMonths: months,
    baseFeeCents: 50_000,
    listPriceCents: months === 6 ? 300_000 : 500_000,
    offers: product.paymentOptions.map((option) => ({
      id: option.id,
      totalCents:
        option.id === "payment-plan"
          ? months === 6
            ? 200_000
            : 300_000
          : option.id === "one-time"
            ? 125_000
            : option.id === "full-pay"
              ? 200_000
              : option.amountCents,
      installmentCount:
        option.id === "payment-plan" ? (months === 6 ? 6 : 10) : undefined,
    })),
  }
}

export async function loadProgrammePage(product: Product): Promise<{
  product: Product
  pay: ProgrammePayDetails | null
}> {
  const months = termMonthsFor(product)
  if (months == null) return { product, pay: null }

  const lander = await getPublicLander()
  const fallback = fallbackPay(months, product)
  if (!lander) return { product, pay: fallback }

  const programme = matchProgramme(product, lander.programmes)
  const term = termFor(months, lander, programme)
  if (!term) return { product, pay: fallback }

  return {
    product: {
      ...product,
      paymentOptions: term.offers.map(toPaymentOption),
    },
    pay: payFromOffers(term.offers, lander, term),
  }
}

export async function confirmLanderPayment(paymentIntentId: string): Promise<{
  productName?: string
  paymentLabel?: string
  amountTotal: number | null
  status?: string
} | null> {
  const base = process.env.FAIRCHILD_API_URL?.trim()
  if (!base || !/^pi_[A-Za-z0-9_]+$/.test(paymentIntentId)) return null

  try {
    const response = await fetch(
      `${base.replace(/\/$/, "")}/api/v1/institution/public/lander/checkout/confirm`,
      {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId }),
        cache: "no-store",
      }
    )
    if (!response.ok) return null
    const body = (await response.json()) as {
      response?: {
        productName?: string
        paymentLabel?: string
        amountTotal?: number | null
        status?: string
      }
    }
    if (!body.response) return null
    return {
      productName: body.response.productName,
      paymentLabel: body.response.paymentLabel,
      amountTotal: body.response.amountTotal ?? null,
      status: body.response.status,
    }
  } catch {
    return null
  }
}

export async function getCheckoutSummary(sessionId: string): Promise<{
  productName?: string
  paymentLabel?: string
  amountTotal: number | null
} | null> {
  const base = process.env.FAIRCHILD_API_URL?.trim()
  if (!base || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return null

  try {
    const response = await fetch(
      `${base.replace(/\/$/, "")}/api/v1/institution/public/lander/checkout/${sessionId}`,
      { headers: { Accept: "application/json" }, cache: "no-store" }
    )
    if (!response.ok) return null
    const body = (await response.json()) as {
      response?: {
        productName?: string
        paymentLabel?: string
        amountTotal?: number | null
      }
    }
    if (!body.response) return null
    return {
      productName: body.response.productName,
      paymentLabel: body.response.paymentLabel,
      amountTotal: body.response.amountTotal ?? null,
    }
  } catch {
    return null
  }
}

export async function resolveProgrammeCheckout(
  product: Product,
  optionId: string
): Promise<ProgrammeCheckout | undefined> {
  const localOption = getPaymentOption(product, optionId)
  if (!localOption) return undefined

  const months = termMonthsFor(product)
  if (months == null) {
    return { product, option: localOption, startsAccess: false }
  }

  const lander = await getPublicLander()
  const programme = lander
    ? matchProgramme(product, lander.programmes)
    : undefined
  const term = lander ? termFor(months, lander, programme) : undefined
  const apiOffer = term?.offers.find((offer) => offer.id === optionId)
  const priced = apiOffer
    ? {
        ...product,
        paymentOptions: term!.offers.map(toPaymentOption),
      }
    : product
  const option = getPaymentOption(priced, optionId) ?? localOption

  return {
    product: priced,
    option,
    programmeId: programme?.id,
    termMonths: months,
    startsAccess: apiOffer
      ? apiOffer.startsAccess
      : FULL_PAYMENT_OPTION_IDS.has(option.id),
  }
}
