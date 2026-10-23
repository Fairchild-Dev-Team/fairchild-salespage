import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { CheckoutForm } from "@/components/product/checkout-form"
import { getProduct, products, typeLabel } from "@/lib/products"

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ cancelled?: string }>
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
  const product = getProduct(slug)
  if (!product) notFound()

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader
        ctaHref={`/products/${product.slug}#checkout`}
        ctaLabel="Pay with Stripe"
      />

      <section className="border-b border-[#E8D5E6] bg-gradient-hero text-white">
        <div className="mx-auto w-full max-w-page px-4 py-12 lg:px-[120px] lg:py-16">
          <Link
            href="/#programmes"
            className="text-sm text-[#FA9BF6] hover:text-white"
          >
            ← All programmes
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
              Checkout cancelled. Your spot is not locked until payment completes — pick an
              option below when you are ready.
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
              Alumni salary range cited on FairChild programmes:{" "}
              <strong>{product.alumniSalaryRange}</strong>
            </p>
          ) : null}
        </div>

        <div id="checkout" className="lg:sticky lg:top-8 lg:self-start">
          <CheckoutForm product={product} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-page px-4 pb-12 lg:px-[120px]">
        <SiteFooter />
      </div>
    </div>
  )
}
