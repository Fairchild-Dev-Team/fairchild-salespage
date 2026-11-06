"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

import {
  catalogueProducts,
  catalogueProgrammes,
  formatCataloguePrice,
  type CatalogueProduct,
  type CatalogueProgramme,
} from "@/lib/catalogue"
import { CATALOGUE_SELECT_PRODUCT } from "@/components/sales/catalogue-product-button"
import { courseOffer, programmeOffers } from "@/lib/programmes/shared"
import { cn } from "@/lib/utils"

type Selection =
  { kind: "programme"; id: string } | { kind: "product"; id: string }

export function ProgrammeBrowser() {
  const first = catalogueProgrammes[0]
  const [mode, setMode] = useState<"browse" | "all">("all")
  const [selection, setSelection] = useState<Selection>(
    first
      ? { kind: "programme", id: first.id }
      : { kind: "product", id: catalogueProducts[0]?.id ?? "" }
  )

  const programme =
    selection.kind === "programme"
      ? catalogueProgrammes.find((item) => item.id === selection.id)
      : undefined
  const product =
    selection.kind === "product"
      ? catalogueProducts.find((item) => item.id === selection.id)
      : undefined

  function selectProgramme(id: string) {
    setSelection({ kind: "programme", id })
    setMode("browse")
  }

  function selectProduct(id: string) {
    setSelection({ kind: "product", id })
    setMode("browse")
  }

  useEffect(() => {
    // Other sections open a product here, by event on this page or #product-<id> from a link.
    const open = (id: string) => {
      if (!catalogueProducts.some((item) => item.id === id)) return
      setSelection({ kind: "product", id })
      setMode("browse")
    }
    const fromHash = window.location.hash.match(/^#product-(.+)$/)
    if (fromHash) {
      open(decodeURIComponent(fromHash[1]))
      document.getElementById("programmes")?.scrollIntoView({ block: "start" })
    }
    const onSelect = (event: Event) =>
      open((event as CustomEvent<string>).detail)
    window.addEventListener(CATALOGUE_SELECT_PRODUCT, onSelect)
    return () => window.removeEventListener(CATALOGUE_SELECT_PRODUCT, onSelect)
  }, [])

  const browsingProgramme = mode === "browse" && programme != null
  const navRef = useRef<HTMLElement>(null)
  const courseListRef = useRef<HTMLUListElement>(null)
  const [navHeight, setNavHeight] = useState<number | null>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const measure = () => setNavHeight(nav.getBoundingClientRect().height)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(nav)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const list = courseListRef.current
    if (!list) return
    const onWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return
      const maxScroll = list.scrollHeight - list.clientHeight
      const canScroll =
        event.deltaY > 0 ? list.scrollTop < maxScroll - 1 : list.scrollTop > 1
      if (canScroll) event.stopPropagation()
    }
    list.addEventListener("wheel", onWheel)
    return () => list.removeEventListener("wheel", onWheel)
  }, [programme?.id, mode])

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:items-start lg:gap-8">
      <nav
        ref={navRef}
        aria-label="Programs"
        className="flex flex-col gap-2 rounded-[1.25rem] bg-[#F3DCF0] p-2"
      >
        {catalogueProgrammes.map((item) => (
          <ListButton
            key={item.id}
            active={
              mode === "browse" &&
              selection.kind === "programme" &&
              selection.id === item.id
            }
            onClick={() => selectProgramme(item.id)}
          >
            {item.title}
          </ListButton>
        ))}
        {catalogueProducts.length > 0 ? (
          <>
            <p className="mt-4 px-4 text-xs font-semibold tracking-[0.12em] text-[#AD14A7] uppercase">
              Products
            </p>
            {catalogueProducts.map((item) => (
              <ListButton
                key={item.id}
                active={
                  mode === "browse" &&
                  selection.kind === "product" &&
                  selection.id === item.id
                }
                onClick={() => selectProduct(item.id)}
              >
                {item.title}
              </ListButton>
            ))}
          </>
        ) : null}
      </nav>

      <div
        className={cn(
          "flex min-w-0 flex-col rounded-[1.5rem] bg-[#F3DCF0] p-4 sm:p-6",
          browsingProgramme && "lg:h-[var(--programme-list-h)]"
        )}
        style={
          browsingProgramme && navHeight
            ? ({
                "--programme-list-h": `${navHeight}px`,
              } as React.CSSProperties)
            : undefined
        }
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-xl">
            <h3 className="font-heading text-2xl font-semibold tracking-tight text-[#0E121B]">
              {mode === "all"
                ? "All programs"
                : (programme?.title ?? product?.title)}
            </h3>
            {mode === "browse" && programme ? (
              <>
                <p className="mt-1 text-sm text-[#525866]">
                  {metaLine([
                    programme.track === programme.title
                      ? null
                      : programme.track,
                    programme.duration,
                    `Led by ${programme.leader}`,
                  ])}
                </p>
                <ProgrammePrices programme={programme} className="mt-2" />
              </>
            ) : null}
            {mode === "browse" && product ? (
              <p className="mt-1 text-sm text-[#525866]">
                {metaLine([
                  product.priceUsd != null
                    ? formatCataloguePrice(product.priceUsd)
                    : null,
                  product.duration,
                  `Led by ${product.leader}`,
                ])}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {browsingProgramme ? (
              <Link
                href={`/catalogue/programme/${programme.id}`}
                className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#AD14A7] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#631760]"
              >
                View program
              </Link>
            ) : null}
            <button
              type="button"
              onClick={() => setMode("all")}
              aria-pressed={mode === "all"}
              className={cn(
                "shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                mode === "all"
                  ? "bg-[#AD14A7] text-white"
                  : "border border-[#E8D5E6] bg-white text-[#631760] hover:border-[#AD14A7]"
              )}
            >
              View all programs
            </button>
          </div>
        </div>

        {mode === "all" ? (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {catalogueProgrammes.map((item) => (
              <li key={item.id}>
                <ProgrammeBox
                  programme={item}
                  onOpen={() => selectProgramme(item.id)}
                />
              </li>
            ))}
          </ul>
        ) : programme ? (
          <div className="mt-6 flex min-h-0 flex-1 flex-col">
            <ul
              key={programme.id}
              ref={courseListRef}
              className="grid min-h-0 flex-1 [scrollbar-width:none] content-start gap-4 overflow-y-auto max-lg:max-h-[28rem] sm:grid-cols-2 xl:grid-cols-3 [&::-webkit-scrollbar]:hidden"
            >
              {programme.courses.map((course) => (
                <li key={course.id}>
                  <article className="flex h-full flex-col rounded-2xl border border-[#E8D5E6] bg-white p-5">
                    <CoursePrice listUsd={course.priceUsd} />
                    <h4 className="mt-3 font-heading text-lg leading-snug font-semibold text-[#0E121B]">
                      {course.title}
                    </h4>
                    {course.summary ? (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#525866]">
                        {course.summary}
                      </p>
                    ) : (
                      <div className="flex-1" />
                    )}
                    <Link
                      href={`/catalogue/course/${course.id}`}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-[#E8D5E6] px-3 py-2.5 text-sm font-medium text-[#AD14A7] transition-colors hover:border-[#AD14A7] hover:bg-[#FEF5FE]"
                    >
                      View course
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
            <div className="mt-6 shrink-0 rounded-2xl border border-[#E8D5E6] bg-white px-5 py-4">
              <p className="text-sm leading-relaxed text-[#525866]">
                These prices are for the individual courses.{" "}
                {programme.priceUsd != null ? (
                  <>
                    The full program is{" "}
                    <span className="font-semibold text-[#0E121B]">
                      {programmeOffers(programme.duration)
                        .map(
                          (offer) =>
                            `${formatCataloguePrice(offer.offerUsd)} for ${offer.label}`
                        )
                        .join(" or ")}
                    </span>{" "}
                    when paid in full.{" "}
                  </>
                ) : (
                  "The full program price is not listed yet. "
                )}
                <Link
                  href={`/catalogue/programme/${programme.id}`}
                  className="cursor-pointer font-medium text-[#631760] underline decoration-[#631760] underline-offset-4"
                >
                  View program
                </Link>
              </p>
            </div>
          </div>
        ) : product ? (
          <ProductIncludes product={product} />
        ) : null}
      </div>
    </div>
  )
}

function ListButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "cursor-pointer rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
        active
          ? "bg-[#AD14A7] text-white shadow-[0_6px_16px_rgba(173,20,167,0.25)]"
          : "bg-white text-[#0E121B] shadow-[0_1px_3px_rgba(99,23,96,0.12)] hover:bg-[#FEF5FE]"
      )}
    >
      {children}
    </button>
  )
}

function ProgrammeBox({
  programme,
  onOpen,
}: {
  programme: CatalogueProgramme
  onOpen: () => void
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#E8D5E6] bg-white p-5">
      <h4 className="font-heading text-lg leading-snug font-semibold text-[#0E121B]">
        {programme.title}
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-[#525866]">
        {metaLine([
          programme.duration,
          `${programme.courses.length} ${programme.courses.length === 1 ? "course" : "courses"}`,
        ])}
      </p>
      <ProgrammePrices programme={programme} className="mt-3 flex-1" />
      <button
        type="button"
        onClick={onOpen}
        className="mt-5 inline-flex w-full cursor-pointer items-center justify-center rounded-xl border border-[#E8D5E6] px-3 py-2.5 text-sm font-medium text-[#AD14A7] transition-colors hover:border-[#AD14A7] hover:bg-[#FEF5FE]"
      >
        View courses
      </button>
      <Link
        href={`/catalogue/programme/${programme.id}`}
        className="mt-2 inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#AD14A7] px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#631760]"
      >
        View program
      </Link>
    </article>
  )
}

function ProductIncludes({ product }: { product: CatalogueProduct }) {
  return (
    <div className="mt-6">
      <p className="max-w-xl text-sm leading-relaxed text-[#525866]">
        {product.summary}
      </p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {product.includes.map((item) => (
          <li key={item.courseId ?? item.title}>
            <article className="flex h-full flex-col rounded-2xl border border-[#E8D5E6] bg-white p-5">
              <p className="text-sm font-semibold text-[#AD14A7]">
                {item.priceUsd != null
                  ? formatCataloguePrice(item.priceUsd)
                  : "Included"}
              </p>
              <h4 className="mt-3 font-heading text-lg leading-snug font-semibold text-[#0E121B]">
                {item.title}
              </h4>
              {item.courseId ? (
                <Link
                  href={`/catalogue/course/${item.courseId}`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-[#E8D5E6] px-3 py-2.5 text-sm font-medium text-[#AD14A7] transition-colors hover:border-[#AD14A7] hover:bg-[#FEF5FE]"
                >
                  View course
                </Link>
              ) : null}
            </article>
          </li>
        ))}
      </ul>
      <Link
        href={`/catalogue/product/${product.id}`}
        className="mt-5 inline-flex items-center justify-center rounded-xl border border-[#E8D5E6] bg-white px-4 py-2.5 text-sm font-medium text-[#AD14A7] transition-colors hover:border-[#AD14A7] hover:bg-[#FEF5FE]"
      >
        View product
      </Link>
    </div>
  )
}

function metaLine(parts: Array<string | null | undefined>): string {
  return parts.filter(Boolean).join(" · ")
}

function CoursePrice({ listUsd }: { listUsd: number | null }) {
  const offer = courseOffer(listUsd)
  return (
    <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#AD14A7]">
      {formatCataloguePrice(offer.offerUsd)}
      {offer.struckUsd != null ? (
        <>
          <s className="font-medium text-[#525866]">
            {formatCataloguePrice(offer.struckUsd)}
          </s>
          <span className="rounded-md bg-[#FA9BF6] px-1.5 py-0.5 text-xs text-[#631760]">
            {offer.percentOff}% off
          </span>
        </>
      ) : null}
    </p>
  )
}

/** Program offer prices, full price struck through; nothing for unpriced programs. */
function ProgrammePrices({
  programme,
  className,
}: {
  programme: CatalogueProgramme
  className?: string
}) {
  if (programme.priceUsd == null) return null
  return (
    <ul className={cn("flex flex-col gap-1 text-sm", className)}>
      {programmeOffers(programme.duration).map((offer) => (
        <li key={offer.months} className="flex flex-wrap items-baseline gap-2">
          <span className="font-semibold text-[#AD14A7]">
            {formatCataloguePrice(offer.offerUsd)}
          </span>
          <s className="text-[#525866]">
            {formatCataloguePrice(offer.listUsd)}
          </s>
          <span className="text-[#525866]">{offer.label}</span>
        </li>
      ))}
    </ul>
  )
}
