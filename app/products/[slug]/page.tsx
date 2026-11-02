import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { GradientPillButton } from "@/components/ui/gradient-pill-button"
import { checkoutHref } from "@/lib/checkout"
import { loadProgrammePage } from "@/lib/lander"
import { getProduct, products, typeLabel } from "@/lib/products"

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ cancelled?: string }>
}

/** Legacy product slugs → local catalogue checkout targets. */
const LEGACY_CHECKOUT: Record<
  string,
  { kind: "programme" | "course" | "product"; id: string; term?: 6 | 12 }
> = {
  "interview-prep": { kind: "course", id: "interview-prep-series" },
  fellowship: { kind: "product", id: "fellowship" },
  "six-month-programme": { kind: "programme", id: "cybersecurity", term: 6 },
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: "Product" }
  return {
    title: product.name,
    description: product.summary,
  }
}

export default async function ProductPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { cancelled } = await searchParams
  const listed = getProduct(slug)
  if (!listed) notFound()
  const { product } = await loadProgrammePage(listed)
  const mapped = LEGACY_CHECKOUT[product.slug]
  const enrollHref = mapped
    ? checkoutHref(mapped.kind, mapped.id, mapped.term)
    : "/#programmes"

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader
        ctaHref={enrollHref}
        ctaLabel={mapped ? "Enroll Now" : "Browse programs"}
      />

      <section className="border-b border-[#E8D5E6] bg-gradient-hero text-white">
        <div className="mx-auto w-full max-w-page px-4 py-12 lg:px-[120px] lg:py-16">
          <Link
            href="/#programmes"
            className="text-sm text-[#FA9BF6] hover:text-white"
          >
            ← All programs
          </Link>
          <p className="mt-6 text-xs font-semibold tracking-wide text-[#FA9BF6] uppercase">
            {typeLabel[product.type]}
          </p>
          <h1 className="mt-3 font-heading text-hero max-w-3xl font-semibold tracking-tight">
            {product.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{product.tagline}</p>
          <p className="mt-2 text-sm text-white/70">{product.duration}</p>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-page gap-10 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-[120px] lg:py-16">
        <div className="space-y-8">
          {cancelled === "1" ? (
            <p
              className="rounded-2xl border border-[#E8D5E6] bg-[#FEF5FE] px-4 py-3 text-sm text-[#631760]"
              role="status"
            >
              Checkout cancelled. Your spot is not locked until payment completes — continue
              when you are ready.
            </p>
          ) : null}

          <div>
            <h2 className="font-heading text-2xl font-semibold text-[#0E121B]">Overview</h2>
            <p className="mt-3 text-copy leading-relaxed text-[#525866]">{product.summary}</p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-semibold text-[#0E121B]">
              What you will build toward
            </h2>
            <ul className="mt-4 space-y-2">
              {product.outcomes.map((item) => (
                <li key={item} className="flex gap-3 text-[#525866]">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#AD14A7]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-semibold text-[#0E121B]">Included</h2>
            <ul className="mt-4 space-y-2">
              {product.includes.map((item) => (
                <li key={item} className="flex gap-3 text-[#525866]">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#631760]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {product.alumniSalaryRange ? (
            <p className="rounded-2xl border border-[#E8D5E6] bg-[#FDF5F9] px-5 py-4 text-sm text-[#631760]">
              Alumni salary range cited on FairChild programs:{" "}
              <strong>{product.alumniSalaryRange}</strong>
            </p>
          ) : null}
        </div>

        <div id="checkout" className="lg:sticky lg:top-8 lg:self-start">
          <div className="flex flex-col gap-4 rounded-[1.5rem] border border-[#E8D5E6] bg-white p-5 shadow-[0_12px_40px_rgba(99,23,96,0.08)] sm:p-6">
            <h2 className="font-heading text-xl font-semibold tracking-tight text-[#0E121B]">
              Ready to enrol?
            </h2>
            <p className="text-sm leading-relaxed text-[#525866]">
              Pay $250 today to lock your 2027 spot.{" "}
              {mapped
                ? "Continue to secure checkout to choose your payment option and pay."
                : "Browse the 2027 catalogue, open your program or course, then Enroll Now."}
            </p>
            <GradientPillButton href={enrollHref} className="w-full justify-center">
              {mapped ? "Continue to checkout" : "Browse programs"}
            </GradientPillButton>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-page px-4 pb-12 lg:px-[120px]">
        <SiteFooter />
      </div>
    </div>
  )
}
