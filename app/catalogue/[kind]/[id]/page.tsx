import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { CheckoutForm } from "@/components/product/checkout-form"
import {
  loadCataloguePage,
  type CatalogueKind,
} from "@/lib/lander"

type PageProps = {
  params: Promise<{ kind: string; id: string }>
  searchParams: Promise<{ term?: string; cancelled?: string }>
}

const KINDS = new Set<CatalogueKind>(["programme", "course", "product"])

function asKind(value: string): CatalogueKind | null {
  return KINDS.has(value as CatalogueKind) ? (value as CatalogueKind) : null
}

function asTerm(value: string | undefined): 6 | 12 | undefined {
  if (value === "6") return 6
  if (value === "12") return 12
  return undefined
}

const kindLabel: Record<CatalogueKind, string> = {
  programme: "Programme",
  course: "Course",
  product: "Product",
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { kind, id } = await params
  const { term } = await searchParams
  const catalogueKind = asKind(kind)
  if (!catalogueKind) return { title: "Catalogue" }
  const page = await loadCataloguePage(catalogueKind, id, asTerm(term))
  if (!page) return { title: "Catalogue" }
  return { title: page.title, description: page.summary }
}

export default async function CatalogueItemPage({ params, searchParams }: PageProps) {
  const { kind, id } = await params
  const { term, cancelled } = await searchParams
  const catalogueKind = asKind(kind)
  if (!catalogueKind) notFound()

  const page = await loadCataloguePage(catalogueKind, id, asTerm(term))
  if (!page) notFound()

  const courseInstructors = page.instructors.filter((instructor) =>
    instructor.name?.trim(),
  )

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader ctaHref="#checkout" ctaLabel="Choose how to pay" />

      <section className="border-b border-[#E8D5E6] bg-gradient-hero text-white">
        <div className="mx-auto w-full max-w-page px-4 py-12 lg:px-[120px] lg:py-16">
          <Link href="/#programmes" className="text-sm text-[#FA9BF6] hover:text-white">
            ← Catalogue
          </Link>
          <p className="mt-6 text-xs font-semibold tracking-wide text-[#FA9BF6] uppercase">
            {kindLabel[catalogueKind]}
          </p>
          <h1 className="mt-3 font-heading text-hero max-w-3xl font-semibold tracking-tight">
            {page.title}
          </h1>
          {page.summary ? (
            <p className="mt-4 max-w-2xl text-lg text-white/85">{page.summary}</p>
          ) : null}
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-page gap-10 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-[120px] lg:py-16">
        <div className="space-y-8">
          {cancelled === "1" ? (
            <p
              className="rounded-2xl border border-[#E8D5E6] bg-[#FEF5FE] px-4 py-3 text-sm text-[#631760]"
              role="status"
            >
              Checkout cancelled. Your spot is not locked until payment completes.
            </p>
          ) : null}

          {page.description ? (
            <div>
              <h2 className="font-heading text-2xl font-semibold text-[#0E121B]">
                {catalogueKind === "programme"
                  ? "About this programme"
                  : catalogueKind === "course"
                    ? "About this course"
                    : "About this product"}
              </h2>
              <p className="mt-3 text-copy leading-relaxed text-[#525866]">{page.description}</p>
            </div>
          ) : null}

          {catalogueKind === "programme" && page.courses.length > 0 ? (
            <div>
              <h2 className="font-heading text-2xl font-semibold text-[#0E121B]">
                Courses in this programme
              </h2>
              <ul className="mt-4 space-y-4">
                {page.courses.map((course) => {
                  const instructors = (course.instructors ?? []).filter((instructor) =>
                    instructor.name?.trim(),
                  )
                  return (
                    <li key={course.id} className="rounded-2xl border border-[#E8D5E6] bg-white p-5">
                      <Link
                        href={`/catalogue/course/${course.id}`}
                        className="font-heading text-lg font-semibold text-[#631760] hover:underline"
                      >
                        {course.title}
                      </Link>
                      {course.description || course.shortDescription ? (
                        <p className="mt-2 text-sm leading-relaxed text-[#525866]">
                          {course.description || course.shortDescription}
                        </p>
                      ) : null}
                      {instructors.length > 0 ? (
                        <p className="mt-3 text-sm text-[#525866]">
                          <span className="font-medium text-[#0E121B]">
                            {instructors.length === 1 ? "Instructor" : "Instructors"}:
                          </span>{" "}
                          {instructors.map((instructor) => instructor.name.trim()).join(", ")}
                        </p>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : null}

          {catalogueKind === "course" && courseInstructors.length > 0 ? (
            <div>
              <h2 className="font-heading text-2xl font-semibold text-[#0E121B]">
                {courseInstructors.length === 1 ? "Instructor" : "Instructors"}
              </h2>
              <ul className="mt-4 space-y-2">
                {courseInstructors.map((instructor) => (
                  <li key={instructor.id} className="flex gap-3 text-[#525866]">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#AD14A7]" />
                    <span>{instructor.name.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

        </div>

        <div id="checkout" className="lg:sticky lg:top-8 lg:self-start">
          {page.product.paymentOptions.length > 0 ? (
            <CheckoutForm
              product={page.product}
              pay={page.pay}
              catalogue={page.catalogue}
              terms={page.terms}
              selectedTerm={page.selectedTerm}
            />
          ) : (
            <p className="rounded-[1.5rem] border border-[#E8D5E6] bg-white p-6 text-sm text-[#525866]">
              This item does not have an online price yet.
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto w-full max-w-page px-4 pb-12 lg:px-[120px]">
        <SiteFooter />
      </div>
    </div>
  )
}
