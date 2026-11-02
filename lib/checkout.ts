import {
  getCatalogueCourse,
  getCatalogueProduct,
  getCatalogueProgramme,
  type CatalogueKind as LocalCatalogueKind,
} from "@/lib/catalogue"
import {
  getPublicLander,
  type CatalogueCheckoutTarget,
  type CatalogueKind,
  type ProgrammePayDetails,
} from "@/lib/lander"
import { formatUsd, type Product } from "@/lib/products"

export type SalesCheckoutSummary = {
  kind: CatalogueKind
  /** Local timetable id used in the URL and back link. */
  localId: string
  title: string
  duration: string | null
  leader: string | null
  /** List / display price from the local catalogue (USD). */
  cataloguePriceUsd: number | null
  backHref: string
}

export type SalesCheckoutPage = {
  summary: SalesCheckoutSummary
  product: Product
  pay: ProgrammePayDetails
  catalogue: CatalogueCheckoutTarget
  terms: Array<6 | 12>
  selectedTerm?: 6 | 12
  matchError?: string
  /**
   * Product is not on the public lander (typically visibility=private).
   * Checkout still uses the lander product UUID; the API checks eligibility by email.
   */
  requiresEligibility?: boolean
}

export type LoadSalesCheckoutOptions = {
  /** Explicit lander product UUID (invite / private checkout). */
  productId?: string
  /** Optional display title when resolving by UUID only. */
  name?: string
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function isLanderUuid(value: string | undefined | null): boolean {
  return Boolean(value && UUID_RE.test(value.trim()))
}

function normalizeKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ")
}

function matchByTitleThenSlug<T extends { id: string; slug?: string | null }>(
  items: T[],
  titleOf: (item: T) => string,
  localTitle: string,
  localId: string
): T | undefined {
  const titleKey = normalizeKey(localTitle)
  const localSlug = normalizeKey(localId)
  const titleHits = items.filter((item) => normalizeKey(titleOf(item)) === titleKey)
  if (titleHits.length === 1) return titleHits[0]
  if (titleHits.length > 1) {
    // Duplicate lander names: prefer a slug that contains the local id (e.g. fellowship).
    const byLocalSlug = titleHits.filter(
      (item) => item.slug && normalizeKey(item.slug).includes(localSlug)
    )
    if (byLocalSlug.length === 1) return byLocalSlug[0]
    // Prefer the canonical slug without a numeric suffix (fairchild-fellowship over -2).
    const canonical = titleHits.find(
      (item) => item.slug && !/-\d+$/.test(item.slug.trim())
    )
    if (canonical) return canonical
    return titleHits[0]
  }

  const slugHits = items.filter(
    (item) =>
      (item.slug && normalizeKey(item.slug) === localSlug) ||
      normalizeKey(item.id) === localSlug
  )
  if (slugHits.length === 1) return slugHits[0]
  return undefined
}

/** Try timetable title, then lander name aliases, then slug — same idea as programmes/courses. */
function matchLanderProduct<
  T extends { id: string; name: string; slug?: string | null },
>(
  products: T[],
  localTitle: string,
  localId: string,
  aliases: string[] = []
): T | undefined {
  const titles = [localTitle, ...aliases]
    .map((value) => value.trim())
    .filter(Boolean)
  for (const title of titles) {
    const hit = matchByTitleThenSlug(products, (item) => item.name, title, localId)
    if (hit) return hit
  }
  return undefined
}

function asProduct(
  slug: string,
  name: string,
  summary: string,
  duration: string,
  type: Product["type"],
  offers: Array<{
    id: string
    label: string
    description: string
    scheduleNote?: string
    chargeNowCents: number
    totalCents: number
    highlighted?: boolean
    installmentCount?: number
  }>
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
    paymentOptions: offers.map((offer) => ({
      id: offer.id,
      label: offer.label,
      amountCents: offer.chargeNowCents,
      description: offer.description,
      scheduleNote: offer.scheduleNote,
      highlighted: offer.highlighted,
    })),
  }
}

function payFrom(
  offers: Array<{ id: string; totalCents: number; installmentCount?: number }>,
  baseFeeCents: number,
  listPriceCents?: number,
  termMonths?: 6 | 12
): ProgrammePayDetails {
  return {
    termMonths,
    baseFeeCents,
    listPriceCents,
    offers: offers.map((offer) => ({
      id: offer.id,
      totalCents: offer.totalCents,
      installmentCount: offer.installmentCount,
    })),
  }
}

const LOCK_OFFERS = [
  {
    id: "spot-lock",
    label: "Course fee",
    description: "Total $500.",
    scheduleNote: "Remaining $250 due before January 2027.",
    chargeNowCents: 25_000,
    totalCents: 50_000,
    highlighted: true as const,
  },
]

const PRODUCT_LOCK_OFFERS = LOCK_OFFERS.map((offer) => ({
  ...offer,
  label: "Product fee",
}))

/** Mirrors fairchild-api lander DEFAULT_TERMS so the UI works without a live lander. */
const DEFAULT_PROGRAMME_TERMS: Array<{
  months: 6 | 12
  listPriceCents: number
  baseFeeCents: number
  offers: Array<{
    id: string
    label: string
    description: string
    scheduleNote?: string
    chargeNowCents: number
    totalCents: number
    highlighted?: boolean
    installmentCount?: number
  }>
}> = [
  {
    months: 6,
    listPriceCents: 300_000,
    baseFeeCents: 50_000,
    offers: [
      {
        id: "one-time",
        label: "Full payment",
        description: "Total $1,250.",
        scheduleNote: "Balance of $750 due 28 February 2027.",
        chargeNowCents: 25_000,
        totalCents: 125_000,
        highlighted: true,
      },
      {
        id: "payment-plan",
        label: "Instalment plan",
        description: "Total $2,000.",
        scheduleNote: "Then 6 × $250 at the end of each month from January 2027.",
        chargeNowCents: 25_000,
        totalCents: 200_000,
        installmentCount: 6,
      },
    ],
  },
  {
    months: 12,
    listPriceCents: 500_000,
    baseFeeCents: 50_000,
    offers: [
      {
        id: "full-pay",
        label: "Full payment",
        description: "Total $2,000.",
        scheduleNote: "Balance of $1,500 due 28 February 2027.",
        chargeNowCents: 25_000,
        totalCents: 200_000,
        highlighted: true,
      },
      {
        id: "payment-plan",
        label: "Instalment plan",
        description: "Total $3,000.",
        scheduleNote: "Then 10 × $250 at the end of each month from January 2027.",
        chargeNowCents: 25_000,
        totalCents: 300_000,
        installmentCount: 10,
      },
    ],
  },
]

function pickProgrammeTerm<
  T extends {
    months: 6 | 12
    listPriceCents: number
    baseFeeCents: number
    offers: Array<{
      id: string
      label: string
      description: string
      scheduleNote?: string
      chargeNowCents: number
      totalCents: number
      highlighted?: boolean
      installmentCount?: number
    }>
  },
>(terms: T[], requestedTerm?: 6 | 12): T | undefined {
  return (
    terms.find((term) => term.months === requestedTerm) ??
    terms.find((term) => term.months === 12) ??
    terms[0]
  )
}

/** Build `/checkout?kind=&id=` (+ optional term) for Enroll Now links. */
export function checkoutHref(
  kind: LocalCatalogueKind,
  id: string,
  termMonths?: 6 | 12
): string {
  const params = new URLSearchParams({ kind, id })
  if (termMonths) params.set("term", String(termMonths))
  return `/checkout?${params.toString()}`
}

/**
 * Invite / private product checkout. `productId` is the lander UUID.
 * Optional `name` is display-only (private products are omitted from the public lander).
 */
export function checkoutProductInviteHref(productId: string, name?: string): string {
  const params = new URLSearchParams({
    kind: "product",
    id: productId.trim(),
  })
  if (name?.trim()) params.set("name", name.trim())
  return `/checkout?${params.toString()}`
}

export function parseCheckoutKind(value: string | undefined): CatalogueKind | null {
  if (value === "programme" || value === "course" || value === "product") return value
  return null
}

export function parseTermMonths(value: string | undefined): 6 | 12 | undefined {
  if (value === "6") return 6
  if (value === "12") return 12
  return undefined
}

function productCheckoutPage(input: {
  landerProductId: string
  title: string
  summaryText: string
  duration: string | null
  leader: string | null
  cataloguePriceUsd: number | null
  backHref: string
  localId: string
  slug: string
  baseFeeCents: number
  offers?: typeof PRODUCT_LOCK_OFFERS
  requiresEligibility?: boolean
}): SalesCheckoutPage {
  const offers = input.offers?.length ? input.offers : PRODUCT_LOCK_OFFERS
  return {
    summary: {
      kind: "product",
      localId: input.localId,
      title: input.title,
      duration: input.duration,
      leader: input.leader,
      cataloguePriceUsd: input.cataloguePriceUsd,
      backHref: input.backHref,
    },
    terms: [],
    requiresEligibility: input.requiresEligibility,
    product: asProduct(
      input.slug,
      input.title,
      input.summaryText,
      input.duration ?? "Product",
      "course",
      offers
    ),
    pay: payFrom(offers, input.baseFeeCents),
    catalogue: { kind: "product", id: input.landerProductId },
  }
}

/**
 * Resolve a local catalogue selection to lander UUIDs + offers for Stripe checkout.
 * Match: exact title/name (case-insensitive), then slug/local id. Fail closed on ambiguity.
 * Products: same title → slug match against lander.products[].name; UUID invite as fallback.
 */
export async function loadSalesCheckout(
  kind: CatalogueKind,
  localId: string,
  requestedTerm?: 6 | 12,
  options: LoadSalesCheckoutOptions = {}
): Promise<SalesCheckoutPage | null> {
  if (kind === "programme") {
    const local = getCatalogueProgramme(localId)
    if (!local) return null
    const summary: SalesCheckoutSummary = {
      kind,
      localId,
      title: local.title,
      duration: local.duration,
      leader: local.leader,
      cataloguePriceUsd: local.priceUsd,
      backHref: `/catalogue/programme/${local.id}${requestedTerm ? `?term=${requestedTerm}` : ""}`,
    }

    const lander = await getPublicLander()
    const hit = lander
      ? matchByTitleThenSlug(
          lander.programmes,
          (item) => item.title,
          local.title,
          local.id
        )
      : undefined

    const sourceTerms =
      hit?.terms && hit.terms.length > 0
        ? hit.terms.map((term) => ({
            months: term.months,
            listPriceCents: term.listPriceCents,
            baseFeeCents: term.baseFeeCents ?? lander?.baseFeeCents ?? 50_000,
            offers: term.offers,
          }))
        : lander?.terms?.length
          ? lander.terms.map((term) => ({
              months: term.months,
              listPriceCents: term.listPriceCents,
              baseFeeCents: term.baseFeeCents ?? lander.baseFeeCents ?? 50_000,
              offers: term.offers,
            }))
          : DEFAULT_PROGRAMME_TERMS

    const term = pickProgrammeTerm(sourceTerms, requestedTerm)
    if (!term) {
      return unmatched(summary, "No payment terms are available for this program.")
    }

    const matchError = !lander
      ? "Payments are unavailable right now. Try again shortly."
      : !hit
        ? "This program is not linked for checkout yet. Email support if you need to enrol."
        : undefined

    return {
      summary,
      matchError,
      terms: sourceTerms.map((item) => item.months),
      selectedTerm: term.months,
      product: asProduct(
        hit?.slug ?? hit?.id ?? local.id,
        hit?.title ?? local.title,
        hit?.shortDescription ?? local.title,
        local.duration ?? "Program",
        term.months === 6 ? "programme-6m" : "programme-1y",
        term.offers
      ),
      pay: payFrom(
        term.offers,
        term.baseFeeCents,
        term.listPriceCents,
        term.months
      ),
      catalogue: {
        kind: "programme",
        id: hit?.id ?? local.id,
        termMonths: term.months,
      },
    }
  }

  if (kind === "course") {
    const local = getCatalogueCourse(localId)
    if (!local) return null
    const parentProgramme = local.programmeId
      ? getCatalogueProgramme(local.programmeId)
      : undefined
    const summary: SalesCheckoutSummary = {
      kind,
      localId,
      title: local.title,
      duration: parentProgramme?.duration ?? null,
      leader: parentProgramme?.leader ?? null,
      cataloguePriceUsd: local.priceUsd,
      backHref: `/catalogue/course/${local.id}`,
    }

    const lander = await getPublicLander()
    if (!lander) {
      return unmatched(summary, "Payments are unavailable right now. Try again shortly.")
    }

    const pool = [
      ...(lander.courses ?? []),
      ...lander.programmes.flatMap((programme) =>
        (programme.courses ?? []).map((course) => ({
          id: course.id,
          title: course.title,
          slug: null as string | null,
          offers: undefined as typeof LOCK_OFFERS | undefined,
        }))
      ),
    ]
    // Prefer standalone published courses (with offers) over nested duplicates.
    const standalone = matchByTitleThenSlug(
      lander.courses ?? [],
      (item) => item.title,
      local.title,
      local.id
    )
    const hit =
      standalone ??
      matchByTitleThenSlug(pool, (item) => item.title, local.title, local.id)
    if (!hit) {
      return unmatched(
        summary,
        "This course is not linked for checkout yet. Email support if you need to enrol."
      )
    }

    const offers =
      ("offers" in hit && hit.offers && hit.offers.length > 0
        ? hit.offers
        : LOCK_OFFERS) ?? LOCK_OFFERS

    return {
      summary,
      terms: [],
      product: asProduct(
        ("slug" in hit && hit.slug) || hit.id,
        hit.title,
        local.summary ?? local.title,
        "Course",
        "course",
        offers
      ),
      pay: payFrom(offers, lander.baseFeeCents ?? 50_000),
      catalogue: { kind: "course", id: hit.id },
    }
  }

  // Same resolution order as programmes/courses: title → slug/local id → explicit UUID.
  const local = getCatalogueProduct(localId)
  const inviteProductId = isLanderUuid(options.productId)
    ? options.productId!.trim()
    : isLanderUuid(localId)
      ? localId.trim()
      : undefined
  const matchTitle = (options.name?.trim() || local?.title || "").trim()
  const matchSlug = local?.id ?? localId

  const summary: SalesCheckoutSummary = local
    ? {
        kind,
        localId: local.id,
        title: local.title,
        duration: local.duration,
        leader: local.leader,
        cataloguePriceUsd: local.priceUsd,
        backHref: `/catalogue/product/${local.id}`,
      }
    : {
        kind,
        localId,
        title: matchTitle || "Product",
        duration: null,
        leader: null,
        cataloguePriceUsd: null,
        backHref: "/#programmes",
      }

  const lander = await getPublicLander()
  const baseFeeCents = lander?.baseFeeCents ?? 50_000

  if (!lander && !inviteProductId) {
    if (!local) return null
    return unmatched(summary, "Payments are unavailable right now. Try again shortly.")
  }

  const hit = lander
    ? matchLanderProduct(
        lander.products ?? [],
        matchTitle || matchSlug,
        matchSlug,
        local?.landerNames ?? []
      )
    : undefined

  if (hit) {
    const offers = hit.offers?.length ? hit.offers : PRODUCT_LOCK_OFFERS
    return productCheckoutPage({
      landerProductId: hit.id,
      // Prefer the sales-page / timetable title when we have one.
      title: local?.title ?? hit.name,
      summaryText:
        local?.summary ??
        hit.shortDescription ??
        (hit.visibility === "private"
          ? "You must be enrolled in our program to purchase this product."
          : hit.name),
      duration: local?.duration ?? null,
      leader: local?.leader ?? null,
      cataloguePriceUsd: local?.priceUsd ?? hit.price,
      backHref: summary.backHref,
      localId: local?.id ?? hit.id,
      slug: hit.slug ?? hit.id,
      baseFeeCents,
      offers,
      requiresEligibility: hit.visibility === "private",
    })
  }

  // Title/slug miss — allow direct UUID checkout (invite links).
  if (inviteProductId) {
    const invited = lander?.products?.find((item) => item.id === inviteProductId)
    return productCheckoutPage({
      landerProductId: inviteProductId,
      title:
        invited?.name ??
        options.name?.trim() ??
        local?.title ??
        "Private product",
      summaryText:
        invited?.shortDescription ??
        local?.summary ??
        "You must be enrolled in our program to purchase this product.",
      duration: local?.duration ?? null,
      leader: local?.leader ?? null,
      cataloguePriceUsd:
        local?.priceUsd ?? (invited?.price != null ? invited.price : null),
      backHref: summary.backHref,
      localId: local?.id ?? inviteProductId,
      slug: invited?.slug ?? inviteProductId,
      baseFeeCents,
      offers: invited?.offers?.length ? invited.offers : PRODUCT_LOCK_OFFERS,
      requiresEligibility: invited ? invited.visibility === "private" : true,
    })
  }

  if (!local) return null
  return unmatched(
    summary,
    "This product is not linked for checkout yet. Email support if you need to enrol."
  )
}

function unmatched(
  summary: SalesCheckoutSummary,
  matchError: string
): SalesCheckoutPage {
  return {
    summary,
    matchError,
    terms: [],
    product: asProduct(
      summary.localId,
      summary.title,
      summary.title,
      summary.duration ?? "",
      summary.kind === "programme" ? "programme-1y" : "course",
      LOCK_OFFERS
    ),
    pay: payFrom(LOCK_OFFERS, 50_000),
    catalogue: { kind: summary.kind, id: summary.localId },
  }
}

export function dueTodayLabel(cents: number): string {
  return formatUsd(cents)
}
