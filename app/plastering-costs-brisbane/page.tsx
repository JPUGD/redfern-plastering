import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { COST_ROWS, COST_FAQS } from "@/lib/pages-content";
import { SERVICE_PAGES, AREA_PAGES } from "@/lib/pages-content";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { CtaButton } from "@/components/cta-button";
import { SectionHeading } from "@/components/section-heading";
import { Accordion } from "@/components/accordion";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "How Much Does Plastering Cost in Brisbane? (2026 Guide) | Redfern",
  description:
    "Indicative Brisbane plastering prices: wall patches, ceiling repairs, water damage re-lines, cornice, full-room re-sheets. What moves the price, and how to compare quotes.",
  alternates: { canonical: "/plastering-costs-brisbane" },
};

const jsonLds = [
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Brisbane plastering cost guide", path: "/plastering-costs-brisbane" },
  ]),
  faqJsonLd(COST_FAQS),
];

export default function CostGuidePage() {
  const services = Object.values(SERVICE_PAGES);
  const areas = Object.values(AREA_PAGES);

  return (
    <>
      {jsonLds.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

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
          <li className="text-paper/70">Cost guide</li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 lg:px-8">
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50">
            <span className="h-px w-8 bg-paper/30" aria-hidden />
            Brisbane · 2026 indicative prices
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-paper sm:text-6xl">
            How much does plastering cost in Brisbane?
          </h1>
        </Reveal>
        {/* AEO direct-answer block */}
        <Reveal delay={0.12}>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-paper/65 sm:text-lg">
            Most small plaster repairs in Brisbane cost between <strong>$100 and $550</strong>:
            wall patches $100–$300, ceiling access cut-outs $250–$600, and a
            single ceiling-sheet replacement $300–$550. Larger jobs scale by
            area and coats — a full bedroom re-sheet runs $1,600–$2,800 with a
            Level 4 finish. These are 2026 indicative ranges, not quotes; text
            photos of your job for a firm written price.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Magnetic>
              <CtaButton href={site.smsHref} external>
                Text photos for a firm price
              </CtaButton>
            </Magnetic>
          </div>
        </Reveal>
      </section>

      {/* price table */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <Reveal>
          <SectionHeading
            label="Indicative prices"
            title="Brisbane plastering price ranges"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-paper/10">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-paper/10 bg-coal">
                  <th className="p-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/50 sm:p-5">
                    Job
                  </th>
                  <th className="p-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/50 sm:p-5">
                    Indicative range
                  </th>
                  <th className="hidden p-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/50 sm:table-cell sm:p-5">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {COST_ROWS.map((r) => (
                  <tr
                    key={r.job}
                    className="border-b border-paper/5 transition-colors last:border-0 hover:bg-coal/60"
                  >
                    <td className="p-4 text-sm font-medium text-paper/85 sm:p-5">
                      {r.job}
                    </td>
                    <td className="p-4 font-display text-sm font-bold text-paper sm:p-5">
                      {r.range}
                    </td>
                    <td className="hidden p-4 text-xs leading-relaxed text-paper/45 sm:table-cell sm:p-5">
                      {r.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-5 text-xs leading-relaxed text-paper/40">
            Ranges reflect typical Brisbane residential work in 2026. Your
            written quote is the number that matters — board prices, access and
            coat counts move every job.
          </p>
        </Reveal>
      </section>

      {/* what moves the price */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <Reveal>
          <SectionHeading
            label="Reading a quote"
            title="What moves a plastering price"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Coats, not hours",
                d: "Three coats is the trade standard for a lasting finish. A one-coat quote is cheaper because you'll see it again in six months.",
              },
              {
                t: "Height and access",
                d: "Ceilings cost more than walls — overhead work, staging, and every pass checked against raking light.",
              },
              {
                t: "Batching",
                d: "Four patches in one visit cost less than four visits. If you have a list, send the whole list.",
              },
              {
                t: "Texture matching",
                d: "Smooth finishes disappear. Matching a 90s stipple ceiling takes more passes — priced honestly, not hidden.",
              },
              {
                t: "Who paints",
                d: "Our prices finish at paint-ready. Your painter's quote is separate — or ask us to scope a finish.",
              },
              {
                t: "Moisture first",
                d: "Water damage re-lined before the leak is properly dry means doing it twice. We check before we board.",
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={0.04 * i}>
                <div className="h-full rounded-2xl border border-paper/10 bg-coal/50 p-6">
                  <p className="font-display text-sm font-bold uppercase tracking-[0.12em] text-paper">
                    {c.t}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-paper/55">
                    {c.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <Reveal>
          <SectionHeading label="Cost questions" title="FAQs" />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10">
            <Accordion items={COST_FAQS} />
          </div>
        </Reveal>
      </section>

      {/* internal links */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50">
            Explore
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="rounded-full border border-paper/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-paper/70 transition-colors hover:border-paper/50 hover:text-paper"
              >
                {s.name}
              </Link>
            ))}
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
    </>
  );
}