import Link from "next/link";
import { site } from "@/lib/site";
import type { ServicePageContent } from "@/lib/pages-content";
import { SERVICE_PAGES, AREA_PAGES } from "@/lib/pages-content";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { CtaButton } from "@/components/cta-button";
import { SectionHeading } from "@/components/section-heading";
import { Accordion } from "@/components/accordion";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/schema";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServicePage({ page }: { page: ServicePageContent }) {
  const siblings = Object.values(SERVICE_PAGES).filter((s) => s.slug !== page.slug);
  const areas = Object.values(AREA_PAGES);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: page.name,
          description: page.metaDescription,
          path: `/services/${page.slug}`,
        })}
      />
      <JsonLd data={faqJsonLd(page.faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: page.name, path: `/services/${page.slug}` },
        ])}
      />

      {/* breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-7xl px-6 pt-28 lg:px-8"
      >
        <ol className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/40">
          <li>
            <Link href="/" className="transition-colors hover:text-paper">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/services" className="transition-colors hover:text-paper">
              Services
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-paper/70">{page.name}</li>
        </ol>
      </nav>

      {/* hero */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div>
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50">
                <span className="h-px w-8 bg-paper/30" aria-hidden />
                Brisbane · Residential & Commercial
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-paper sm:text-6xl">
                {page.h1}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/65 sm:text-lg">
                {page.intro}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Magnetic>
                  <CtaButton href={site.phoneHref} external>
                    Call {site.phoneDisplay}
                  </CtaButton>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <CtaButton href={site.smsHref} external variant="beam">
                    Text photos for a price
                  </CtaButton>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* quick answer card — AEO direct-answer block */}
          <Reveal delay={0.1}>
            <aside className="beam-border rounded-2xl border border-paper/10 bg-coal p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-paper/50">
                Quick answer
              </p>
              <p className="mt-4 text-sm leading-relaxed text-paper/75">
                {page.intro}
              </p>
              <p className="mt-5 border-t border-paper/10 pt-5 text-xs leading-relaxed text-paper/50">
                Serving Brisbane, Logan, Ipswich and the Redlands. Indicative
                prices on our{" "}
                <Link
                  href="/plastering-costs-brisbane"
                  className="underline decoration-paper/40 underline-offset-4 transition-colors hover:text-paper"
                >
                  Brisbane plastering cost guide
                </Link>
                .
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* body sections */}
      <section className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {page.sections.map((s, i) => (
            <Reveal key={s.heading} delay={0.05 * i}>
              <div className="rounded-2xl border border-paper/10 bg-coal/50 p-8">
                <h2 className="font-display text-2xl font-black uppercase tracking-tight text-paper">
                  {s.heading}
                </h2>
                {s.paragraphs && (
                  <div className="mt-5 space-y-4">
                    {s.paragraphs.map((p, j) => (
                      <p key={j} className="text-sm leading-relaxed text-paper/60">
                        {p}
                      </p>
                    ))}
                  </div>
                )}
                {s.bullets && (
                  <ul className="mt-5 space-y-2.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-paper/60">
                        <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-paper/50" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {s.note && (
                  <p className="mt-5 rounded-xl border border-paper/10 bg-ink/60 p-4 text-xs leading-relaxed text-paper/55">
                    {s.note}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* areas strip */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50">
            Where we work
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              key="brisbane-all"
              href="/"
              className="rounded-full border border-paper/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-paper/70 transition-colors hover:border-paper/50 hover:text-paper"
            >
              All Brisbane
            </Link>
            {areas.map((a) => (
              <Link
                key={a.slug}
                href={`/${a.slug}`}
                className="rounded-full border border-paper/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-paper/70 transition-colors hover:border-paper/50 hover:text-paper"
              >
                {a.navLabel}
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <Reveal>
          <SectionHeading label="Questions" title={`${page.name} — FAQs`} />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10">
            <Accordion items={page.faqs} />
          </div>
        </Reveal>
      </section>

      {/* related services + CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50">
            Other work we do
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-2xl border border-paper/10 bg-coal/50 p-5 transition-colors hover:border-paper/30"
              >
                <p className="font-display text-sm font-bold uppercase tracking-[0.12em] text-paper/85 transition-colors group-hover:text-paper">
                  {s.name}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-paper/45">
                  {s.metaDescription.split(".")[0]}.
                </p>
              </Link>
            ))}
            <Link
              href="/plastering-costs-brisbane"
              className="group rounded-2xl border border-paper/10 bg-coal/50 p-5 transition-colors hover:border-paper/30"
            >
              <p className="font-display text-sm font-bold uppercase tracking-[0.12em] text-paper/85 transition-colors group-hover:text-paper">
                Brisbane cost guide
              </p>
              <p className="mt-2 text-xs leading-relaxed text-paper/45">
                Indicative prices for patches, ceilings, re-sheets and cornice.
              </p>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}