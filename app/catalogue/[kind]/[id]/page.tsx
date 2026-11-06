import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { CourseHero } from "@/components/sales/course-hero"
import { CourseModules } from "@/components/sales/course-modules"
import { fairchildInstructors } from "@/components/sales/fairchild-instructors"
import { ProgrammeAudience } from "@/components/sales/programme-audience"
import { ProgrammeBuild } from "@/components/sales/programme-build"
import { ProgrammeCertifications } from "@/components/sales/programme-certifications"
import { ProgrammeFaq } from "@/components/sales/programme-faq"
import {
  fairchildLearning,
  ProgrammeLearning,
  ProgrammeRequirements,
} from "@/components/sales/programme-foundations"
import { ProgrammeHero } from "@/components/sales/programme-hero"
import { ProgrammeHighlights } from "@/components/sales/programme-highlights"
import { ProgrammeInstructors } from "@/components/sales/programme-instructors"
import { ProgrammeLearn } from "@/components/sales/programme-learn"
import { ProgrammeOutcomes } from "@/components/sales/programme-outcomes"
import { ProgrammeOutline } from "@/components/sales/programme-outline"
import { ProgrammeRelated } from "@/components/sales/programme-related"
import { ProgrammeSkills } from "@/components/sales/programme-skills"
import { ProgrammeSteps } from "@/components/sales/programme-steps"
import DotGrid from "@/components/ui/dot-grid"
import { financialAid } from "@/lib/sales-content"
import {
  formatCataloguePrice,
  getCatalogueCourse,
  getCatalogueProduct,
  getCatalogueProgramme,
  type CatalogueKind,
} from "@/lib/catalogue"
import { checkoutHref, loadProgrammePricing } from "@/lib/checkout"
import { getCoursePage, getProgrammePage } from "@/lib/programmes"
import {
  courseIncludes,
  fairchildFaq,
  programmeIncludes,
  SALE_ENDS_AT,
} from "@/lib/programmes/shared"
import { CoursePricing } from "@/components/sales/course-pricing"
import { ProgrammePricing } from "@/components/sales/programme-pricing"
import { GradientPillButton } from "@/components/ui/gradient-pill-button"

type PageProps = {
  params: Promise<{ kind: string; id: string }>
}

const KINDS = new Set<CatalogueKind>(["programme", "course", "product"])

const kindLabel: Record<CatalogueKind, string> = {
  programme: "Program",
  course: "Course",
  product: "Product",
}

function asKind(value: string): CatalogueKind | null {
  return KINDS.has(value as CatalogueKind) ? (value as CatalogueKind) : null
}

function loadEntry(kind: CatalogueKind, id: string) {
  if (kind === "programme") {
    const programme = getCatalogueProgramme(id)
    if (!programme) return null
    const track = programme.track === programme.title ? null : programme.track
    return {
      kind,
      title: programme.title,
      summary:
        [track, `Led by ${programme.leader}`].filter(Boolean).join(". ") + ".",
      priceUsd: programme.priceUsd,
      duration: programme.duration,
      leader: programme.leader,
      parent: null as { href: string; title: string } | null,
      lines: programme.courses.map((course) => ({
        key: course.id,
        title: course.title,
        href: `/catalogue/course/${course.id}`,
        summary: course.summary,
        priceUsd: course.priceUsd,
      })),
      linesHeading: "Courses in this program",
    }
  }

  if (kind === "course") {
    const course = getCatalogueCourse(id)
    if (!course) return null
    const programme = course.programmeId
      ? getCatalogueProgramme(course.programmeId)
      : undefined
    const product = course.productId
      ? getCatalogueProduct(course.productId)
      : undefined
    const parent = programme ?? product
    if (!parent) return null
    return {
      kind,
      title: course.title,
      summary:
        course.summary ??
        getCoursePage(course.id)?.summary ??
        (product
          ? `Available on its own, and included in ${product.title}.`
          : `Part of ${programme?.title}.`),
      priceUsd: course.priceUsd,
      duration: parent.duration,
      leader: parent.leader,
      parent: programme
        ? {
            href: `/catalogue/programme/${programme.id}`,
            title: programme.title,
          }
        : {
            href: `/catalogue/product/${product?.id ?? ""}`,
            title: parent.title,
          },
      lines: [],
      linesHeading: "",
    }
  }

  const product = getCatalogueProduct(id)
  if (!product) return null
  return {
    kind,
    title: product.title,
    summary: product.summary,
    priceUsd: product.priceUsd,
    duration: product.duration,
    leader: product.leader,
    parent: null,
    lines: product.includes.map((item) => ({
      key: item.courseId ?? item.title,
      title: item.title,
      href: item.courseId ? `/catalogue/course/${item.courseId}` : null,
      summary: null as string | null,
      priceUsd: item.priceUsd,
    })),
    linesHeading: product.includes.some((item) => item.courseId)
      ? "Courses you can take on their own"
      : "Included",
  }
}

function loadCourseView(id: string) {
  const content = getCoursePage(id)
  const course = getCatalogueCourse(id)
  const programme = course?.programmeId
    ? getCatalogueProgramme(course.programmeId)
    : undefined
  if (!content || !course || !programme) return null
  return { content, course, programme, priceUsd: course.priceUsd }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { kind, id } = await params
  const catalogueKind = asKind(kind)
  if (!catalogueKind) return { title: "Catalogue" }
  const entry = loadEntry(catalogueKind, id)
  if (!entry) return { title: "Catalogue" }
  return { title: entry.title, description: entry.summary }
}

export default async function CatalogueItemPage({ params }: PageProps) {
  const { kind, id } = await params
  const catalogueKind = asKind(kind)
  if (!catalogueKind) notFound()

  const entry = loadEntry(catalogueKind, id)
  if (!entry) notFound()

  const courseView = catalogueKind === "course" ? loadCourseView(id) : null
  if (catalogueKind === "course" && !courseView) {
    // A program's only course is covered by the program page itself.
    const programmeId = getCatalogueCourse(id)?.programmeId
    const programme = programmeId
      ? getCatalogueProgramme(programmeId)
      : undefined
    if (programme?.courses.length === 1 && getProgrammePage(programme.id)) {
      redirect(`/catalogue/programme/${programme.id}`)
    }
  }
  const programmePage =
    catalogueKind === "course" ? undefined : getProgrammePage(id)
  const purpleHero =
    catalogueKind === "programme" || programmePage != null || courseView != null
  const compactHero = programmePage != null || courseView != null
  const enrollHref = checkoutHref(catalogueKind, id)
  const programmeEntry =
    catalogueKind === "programme" ? getCatalogueProgramme(id) : undefined
  const pricing =
    programmeEntry?.priceUsd != null ? await loadProgrammePricing(id) : null
  // Show only the terms the program's documented length allows; no length means both.
  const pricingTerms = pricing?.terms.filter(
    (term) =>
      !programmeEntry?.duration ||
      !/\b(6|12)\b/.test(programmeEntry.duration) ||
      new RegExp(`\\b${term.months}\\b`).test(programmeEntry.duration)
  )

  return (
    <div className="min-h-screen bg-white">
      {purpleHero ? (
        // Zero-height sticky layer, so the header sits over the hero and follows the scroll.
        <div className="sticky top-0 z-50 h-0">
          <SiteHeader ctaHref={enrollHref} ctaLabel="Enroll Now" tone="hero" />
        </div>
      ) : (
        <SiteHeader ctaHref={enrollHref} ctaLabel="Enroll Now" />
      )}

      <section
        className={
          compactHero
            ? "relative min-h-[504px] overflow-hidden border-b border-[#E8D5E6] bg-[linear-gradient(180deg,#94008D_0%,#94008D_43.55%,#4D0044_96.79%)] text-white sm:min-h-[574px] lg:min-h-[644px]"
            : purpleHero
              ? "relative min-h-[720px] overflow-hidden border-b border-[#E8D5E6] bg-[linear-gradient(180deg,#94008D_0%,#94008D_43.55%,#4D0044_96.79%)] text-white sm:min-h-[820px] lg:min-h-[920px]"
              : "bg-gradient-hero relative overflow-hidden border-b border-[#E8D5E6] text-white"
        }
      >
        {purpleHero ? (
          <>
            <DotGrid
              className="pointer-events-none absolute inset-0"
              baseColor="#A9A9A9"
              activeColor="#FFFFFF"
              dotSize={5}
              gap={24}
              proximity={130}
              opacity={0.42}
              fade={0.85}
              glow={0}
            />
            {/* Room for the sticky header above. */}
            <div className="h-[68px] lg:h-[76px]" aria-hidden />
          </>
        ) : null}
        <div
          className={
            compactHero
              ? "relative z-10 mx-auto w-full max-w-page px-4 pt-10 pb-12 sm:pt-12 lg:px-[120px] lg:pt-16 lg:pb-16"
              : purpleHero
                ? "relative z-10 mx-auto w-full max-w-page px-4 pt-2 pb-12 lg:px-[120px] lg:pt-4 lg:pb-16"
                : "relative z-10 mx-auto w-full max-w-page px-4 py-12 lg:px-[120px] lg:py-16"
          }
        >
          {programmePage ? (
            <ProgrammeHero
              title={entry.title}
              priceUsd={entry.priceUsd}
              {...programmePage.hero}
              ctaHref={enrollHref}
              depositUsd={
                pricing && pricingTerms?.length
                  ? pricing.depositCents / 100
                  : undefined
              }
            />
          ) : courseView ? (
            <CourseHero
              title={courseView.course.title}
              summary={courseView.content.summary}
              pills={courseView.content.pills}
              ctaHref={enrollHref}
              programme={{
                title: courseView.programme.title,
                href: `/catalogue/programme/${courseView.programme.id}`,
                priceUsd: courseView.programme.priceUsd,
              }}
              position={{
                index: courseView.programme.courses.findIndex(
                  (course) => course.id === courseView.course.id
                ),
                total: courseView.programme.courses.length,
              }}
              facts={[
                ...(courseView.content.modules
                  ? [
                      {
                        label: "Modules",
                        value: String(
                          courseView.content.modules.modules.length
                        ),
                      },
                      {
                        label: "Length",
                        value: `${Math.max(
                          ...courseView.content.modules.modules.map(
                            (module) => module.weeks[1]
                          )
                        )} weeks`,
                      },
                    ]
                  : []),
                { label: "Format", value: "100% online, self-paced" },
              ]}
              priceUsd={courseView.priceUsd}
            />
          ) : (
            <>
              <Link
                href="/#programmes"
                className="text-sm text-[#FA9BF6] hover:text-white"
              >
                ← Catalogue
              </Link>
              <p className="mt-6 text-xs font-semibold tracking-wide text-[#FA9BF6] uppercase">
                {kindLabel[catalogueKind]}
              </p>
              <h1 className="mt-3 max-w-3xl font-heading text-hero font-semibold tracking-tight">
                {entry.title}
              </h1>
              {entry.summary ? (
                <p className="mt-4 max-w-2xl text-lg text-white/85">
                  {entry.summary}
                </p>
              ) : null}
            </>
          )}
        </div>
      </section>

      {courseView ? (
        <>
          {courseView.content.learn ? (
            <ProgrammeLearn {...courseView.content.learn} />
          ) : null}
          {courseView.content.modules ? (
            <CourseModules {...courseView.content.modules} />
          ) : null}
          {courseView.content.build ? (
            <ProgrammeBuild {...courseView.content.build} />
          ) : null}
          {courseView.content.skills ? (
            <ProgrammeSkills {...courseView.content.skills} />
          ) : null}
          {courseView.content.certifications ? (
            <ProgrammeCertifications {...courseView.content.certifications} />
          ) : null}
          {courseView.content.requirements ? (
            <ProgrammeRequirements {...courseView.content.requirements} />
          ) : null}
          <ProgrammeLearning {...fairchildLearning} />
          <CoursePricing
            title={courseView.course.title}
            priceUsd={courseView.priceUsd}
            includes={courseIncludes}
            saleEndsAt={SALE_ENDS_AT}
            ctaHref={enrollHref}
            programme={{
              title: courseView.programme.title,
              href: `/catalogue/programme/${courseView.programme.id}`,
              courseCount: courseView.programme.courses.length,
            }}
          />
          <ProgrammeInstructors {...fairchildInstructors} />
          <ProgrammeFaq {...fairchildFaq} />
        </>
      ) : programmePage ? (
        <>
          {/* A copy of the pricing box right after the hero, so mobile visitors see the price without scrolling. */}
          {pricing && programmeEntry && pricingTerms?.length ? (
            <ProgrammePricing
              programmeId={programmeEntry.id}
              depositCents={pricing.depositCents}
              terms={pricingTerms}
              includes={programmeIncludes(programmeEntry.courses.length)}
              saleEndsAt={SALE_ENDS_AT}
            />
          ) : null}
          {programmePage.audience ? (
            <ProgrammeAudience {...programmePage.audience} />
          ) : null}
          {programmePage.learn ? (
            <ProgrammeLearn {...programmePage.learn} />
          ) : null}
          {programmePage.build ? (
            <ProgrammeBuild {...programmePage.build} />
          ) : null}
          {programmePage.skills ? (
            <ProgrammeSkills {...programmePage.skills} />
          ) : null}
          {programmePage.outline ? (
            <ProgrammeOutline {...programmePage.outline} />
          ) : null}
          {programmePage.highlights ? (
            <ProgrammeHighlights {...programmePage.highlights} />
          ) : null}
          {programmePage.steps ? (
            <ProgrammeSteps {...programmePage.steps} />
          ) : null}
          {programmePage.choose ? (
            <ProgrammeRelated {...programmePage.choose} />
          ) : null}
          {programmePage.certifications ? (
            <ProgrammeCertifications {...programmePage.certifications} />
          ) : null}
          {programmePage.requirements ? (
            <ProgrammeRequirements {...programmePage.requirements} />
          ) : null}
          <ProgrammeLearning
            heading={fairchildLearning.heading}
            items={fairchildLearning.items.filter(
              (item) =>
                !programmePage.hideShared?.learning?.includes(item.title)
            )}
          />
          {programmePage.outcomes ? (
            <ProgrammeOutcomes {...programmePage.outcomes} />
          ) : null}
          {pricing && programmeEntry && pricingTerms?.length ? (
            <ProgrammePricing
              id="pricing-breakdown"
              programmeId={programmeEntry.id}
              depositCents={pricing.depositCents}
              terms={pricingTerms}
              includes={programmeIncludes(programmeEntry.courses.length)}
              saleEndsAt={SALE_ENDS_AT}
            />
          ) : null}
          <ProgrammeInstructors {...fairchildInstructors} />
          <ProgrammeFaq
            heading={fairchildFaq.heading}
            items={fairchildFaq.items.filter(
              (item) => !programmePage.hideShared?.faq?.includes(item.question)
            )}
          />
          {programmePage.related ? (
            <ProgrammeRelated {...programmePage.related} />
          ) : null}
        </>
      ) : (
        <div className="mx-auto grid w-full max-w-page gap-10 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-[120px] lg:py-16">
          <div className="space-y-8">
            {entry.parent ? (
              <p className="text-sm text-[#525866]">
                Part of{" "}
                <Link
                  href={entry.parent.href}
                  className="font-medium text-[#631760] hover:underline"
                >
                  {entry.parent.title}
                </Link>
              </p>
            ) : null}

            {entry.lines.length > 0 ? (
              <div>
                <h2 className="font-heading text-2xl font-semibold text-[#0E121B]">
                  {entry.linesHeading}
                </h2>
                <ul className="mt-4 space-y-4">
                  {entry.lines.map((line) => (
                    <li
                      key={line.key}
                      className="rounded-2xl border border-[#E8D5E6] bg-white p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        {line.href ? (
                          <Link
                            href={line.href}
                            className="font-heading text-lg font-semibold text-[#631760] hover:underline"
                          >
                            {line.title}
                          </Link>
                        ) : (
                          <p className="font-heading text-lg font-semibold text-[#0E121B]">
                            {line.title}
                          </p>
                        )}
                        {line.priceUsd != null ? (
                          <p className="shrink-0 font-heading text-base font-semibold text-[#631760]">
                            {formatCataloguePrice(line.priceUsd)}
                          </p>
                        ) : null}
                      </div>
                      {line.summary ? (
                        <p className="mt-2 text-sm leading-relaxed text-[#525866]">
                          {line.summary}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-[1.5rem] border border-[#E8D5E6] bg-white p-6 shadow-[0_12px_40px_rgba(99,23,96,0.08)]">
              <p className="text-sm font-medium text-[#525866]">
                Timetable price
              </p>
              <p className="mt-2 font-heading text-4xl font-semibold tracking-tight text-[#0E121B]">
                {entry.priceUsd != null
                  ? formatCataloguePrice(entry.priceUsd)
                  : "Price to be set"}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#525866]">
                {entry.duration ? <li>{entry.duration}</li> : null}
                {entry.leader ? <li>Led by {entry.leader}</li> : null}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-[#525866]">
                Pay $250 today to lock your spot. Questions? Email{" "}
                <a
                  className="font-medium text-[#631760]"
                  href={`mailto:${financialAid.email}`}
                >
                  {financialAid.email}
                </a>
                .
              </p>
              <GradientPillButton
                href={enrollHref}
                className="mt-5 w-full justify-center"
              >
                Enroll Now
              </GradientPillButton>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-page px-4 pb-12 lg:px-[120px]">
        <SiteFooter />
      </div>
    </div>
  )
}
