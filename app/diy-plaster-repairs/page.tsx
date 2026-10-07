import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { DIY_GUIDE } from "@/lib/guide-content";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { CtaButton } from "@/components/cta-button";
import { SectionHeading } from "@/components/section-heading";
import { Accordion } from "@/components/accordion";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: DIY_GUIDE.metaTitle,
  description: DIY_GUIDE.metaDescription,
  alternates: { canonical: "/diy-plaster-repairs" },
};

const jsonLds = [
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "DIY plaster repairs guide", path: "/diy-plaster-repairs" },
  ]),
  faqJsonLd(DIY_GUIDE.faqs),
];

export default function DiyGuidePage() {
  return (
    <>
      {jsonLds.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
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
          <li className="text-paper/70">DIY guide</li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 lg:px-8">
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50">
            <span className="h-px w-8 bg-paper/30" aria-hidden />
            An honest guide
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-paper sm:text-6xl">
            {DIY_GUIDE.h1}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-paper/65 sm:text-lg">
            {DIY_GUIDE.quickAnswer}
          </p>
        </Reveal>
      </section>

      {/* OK vs not OK */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-paper/10 bg-coal/50 p-8">
              <p className="font-display text-xl font-black uppercase tracking-tight text-paper">
                Patch it yourself if it&rsquo;s…
              </p>
              <ul className="mt-5 space-y-3">
                {DIY_GUIDE.diyOk.map((x) => (
                  <li key={x} className="flex items-start gap-3 text-sm leading-relaxed text-paper/60">
                    <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0" aria-hidden>
                      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-paper" />
                    </svg>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="h-full rounded-2xl border border-paper/10 bg-coal/50 p-8">
              <p className="font-display text-xl font-black uppercase tracking-tight text-paper">
                Call us if it&rsquo;s…
              </p>
              <ul className="mt-5 space-y-3">
                {DIY_GUIDE.diyNo.map((x) => (
                  <li key={x} className="flex items-start gap-3 text-sm leading-relaxed text-paper/60">
                    <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-paper" aria-hidden>
                      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-paper/10 pt-5">
                <Magnetic strength={0.2}>
                  <CtaButton href={site.smsHref} external variant="beam">
                    Text a photo — we&rsquo;ll tell you straight
                  </CtaButton>
                </Magnetic>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* the kit + steps */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <Reveal>
          <SectionHeading
            label="If you do it yourself"
            title="The kit & the three fixes"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
            <div className="h-fit rounded-2xl border border-paper/10 bg-coal/50 p-8">
              <p className="font-display text-lg font-black uppercase tracking-tight text-paper">
                The kit
              </p>
              <ul className="mt-5 space-y-2.5">
                {DIY_GUIDE.kit.map((k) => (
                  <li key={k} className="flex items-start gap-3 text-sm leading-relaxed text-paper/60">
                    <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-paper/50" />
                    {k}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4">
              {DIY_GUIDE.steps.map((s, i) => (
                <Reveal key={s.n} delay={0.05 * i}>
                  <div className="rounded-2xl border border-paper/10 bg-coal/50 p-7">
                    <p className="font-display text-4xl font-black text-paper/15">
                      {s.n}
                    </p>
                    <p className="mt-3 font-display text-lg font-black uppercase tracking-tight text-paper">
                      {s.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-paper/55">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* honest note */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <Reveal>
          <div className="beam-border rounded-2xl border border-paper/10 bg-coal p-8 sm:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-paper/50">
              The trade truth
            </p>
            <p className="mt-5 text-base leading-relaxed text-paper/75">
              {DIY_GUIDE.honestNote}
            </p>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <Reveal>
          <SectionHeading label="DIY questions" title="FAQs" />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10">
            <Accordion items={DIY_GUIDE.faqs} />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50">
            Explore
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              href="/services/plaster-repairs"
              className="rounded-full border border-paper/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-paper/70 transition-colors hover:border-paper/50 hover:text-paper"
            >
              Professional repairs
            </Link>
            <Link
              href="/plastering-costs-brisbane"
              className="rounded-full border border-paper/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-paper/70 transition-colors hover:border-paper/50 hover:text-paper"
            >
              Brisbane cost guide
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}