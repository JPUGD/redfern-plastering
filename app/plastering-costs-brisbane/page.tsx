import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { COST_FAQS } from "@/lib/pages-content";
import { SERVICE_PAGES, AREA_PAGES } from "@/lib/pages-content";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { CtaButton } from "@/components/cta-button";
import { SectionHeading } from "@/components/section-heading";
import { Accordion } from "@/components/accordion";
import { TiltImage } from "@/components/tilt-image";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "How Much Does Plastering Cost in Brisbane? | Redfern" },
  description:
    "What shapes a Brisbane plastering quote: job size, coats, ceiling height, access, texture matching. How we price, and how to compare quotes properly.",
  alternates: { canonical: "/plastering-costs-brisbane" },
  openGraph: { title: "How Much Does Plastering Cost in Brisbane? | Redfern", url: "/plastering-costs-brisbane" },
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
            Brisbane · How we price
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
            There&rsquo;s no single plastering rate — a fair quote reflects the
            job, not a flat hourly number. What moves it: <strong>job size</strong>{" "}
            (a door-handle punch and a full re-sheet are different animals),{" "}
            <strong>coats</strong> (three is the trade standard for a finish that
            lasts), <strong>ceiling height and access</strong>,{" "}
            <strong>texture matching</strong>, and whether the surface ends{" "}
            <strong>paint-ready</strong>. Every job gets a firm written quote
            before work starts — text photos of the damage and you&rsquo;ll have
            a price the same day.
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

      {/* price table replaced by real-job photo strip */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <Reveal>
          <SectionHeading
            label="Where the work goes"
            title="What your money buys"
            intro="No public price list — every job is quoted on its own surface. But every quote covers the same craft: taped joints, flat coats, and a finish that disappears under paint. This is what that looks like on site."
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Reveal>
            <TiltImage
              src="/images/work-tape-corner.jpg"
              alt="Redfern plasterer in branded polo taping the wall-to-ceiling junction during a Brisbane renovation"
              caption="Taping the wall-to-ceiling junction — the joint everyone sees first."
              tag="On site"
            />
          </Reveal>
          <Reveal delay={0.06}>
            <TiltImage
              src="/images/work-branded-ladder.jpg"
              alt="Plasterer on a platform ladder applying compound to a ceiling join, Redfern branded shirt visible"
              caption="Overhead work off the platform — coats built up, then checked against raking light."
              tag="On site"
            />
          </Reveal>
          <Reveal delay={0.12}>
            <TiltImage
              src="/images/work-vaulted-taping.jpg"
              alt="Compound coats mid-process on a raked ceiling with bulkheads and soffits"
              caption="A raked ceiling with bulkheads — more angles, more joints, more passes."
              tag="On site"
            />
          </Reveal>
          <Reveal delay={0.18}>
            <TiltImage
              src="/images/work-led-sander.jpg"
              alt="Power sander with LED ring light and dust extraction smoothing a wall before paint"
              caption="Machine sanding with dust extraction — the LED ring shows up every ridge."
              tag="Finishing"
            />
          </Reveal>
        </div>
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
            <Link
              href="/diy-plaster-repairs"
              className="rounded-full border border-paper/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-paper/70 transition-colors hover:border-paper/50 hover:text-paper"
            >
              DIY guide
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
    </>
  );
}