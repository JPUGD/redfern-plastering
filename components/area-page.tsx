import Link from "next/link";
import { site } from "@/lib/site";
import type { AreaPageContent } from "@/lib/pages-content";
import { SERVICE_PAGES, AREA_PAGES } from "@/lib/pages-content";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { CtaButton } from "@/components/cta-button";
import { breadcrumbJsonLd } from "@/lib/schema";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function AreaPage({ page }: { page: AreaPageContent }) {
  const services = Object.values(SERVICE_PAGES);
  const siblings = Object.values(AREA_PAGES).filter((a) => a.slug !== page.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: page.area, path: `/${page.slug}` },
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
          <li className="text-paper/70">{page.area}</li>
        </ol>
      </nav>

      {/* hero */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div>
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50">
                <span className="h-px w-8 bg-paper/30" aria-hidden />
                Brisbane plasterer · Local pages
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

          {/* suburbs served — geo signals */}
          <Reveal delay={0.1}>
            <aside className="beam-border rounded-2xl border border-paper/10 bg-coal p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-paper/50">
                Suburbs we cover
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {page.suburbs.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-paper/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-paper/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-5 border-t border-paper/10 pt-5 text-xs leading-relaxed text-paper/50">
                Not sure if you&rsquo;re in range? You&rsquo;re one text away
                from finding out — send a photo of the job.
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* common jobs */}
      <section className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-paper/10 bg-coal/50 p-8">
              <h2 className="font-display text-2xl font-black uppercase tracking-tight text-paper">
                Common {page.area} jobs
              </h2>
              <ul className="mt-5 space-y-2.5">
                {page.commonJobs.map((j) => (
                  <li key={j} className="flex items-start gap-3 text-sm leading-relaxed text-paper/60">
                    <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-paper/50" />
                    {j}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="rounded-2xl border border-paper/10 bg-coal/50 p-8">
              <h2 className="font-display text-2xl font-black uppercase tracking-tight text-paper">
                Working locally
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-paper/60">
                {page.extra}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-paper/60">
                Every job starts with a written price — and small repairs are
                usually quoted the same day from photos. Indicative pricing is
                on our{" "}
                <Link
                  href="/plastering-costs-brisbane"
                  className="underline decoration-paper/40 underline-offset-4 transition-colors hover:text-paper"
                >
                  Brisbane plastering cost guide
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* services in this area */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50">
            Services in {page.area}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
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
          </div>
        </Reveal>
      </section>

      {/* nearby areas */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50">
            Nearby areas
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {siblings.map((a) => (
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
    </>
  );
}