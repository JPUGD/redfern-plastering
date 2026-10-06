import type { Metadata } from "next";
import Link from "next/link";
import { SERVICE_PAGES } from "@/lib/pages-content";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Plastering Services Brisbane — Repairs, Ceilings, Renovations | Redfern",
  description:
    "All aspects of plastering across Brisbane: repairs and patching, ceiling repairs, renovation re-sheets, water damage, new plasterboard and commercial work. Call 0425 743 992.",
  alternates: { canonical: "/services" },
};

const jsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
]);

export default function ServicesIndex() {
  const services = Object.values(SERVICE_PAGES);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-36 lg:px-8">
        <Reveal>
          <SectionHeading
            label="What we do"
            title="Plastering services"
            intro="All aspects of plastering — residential and commercial, repairs through renovations. Click through for detail, indicative pricing and FAQs on each."
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={0.05 * i}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-paper/10 bg-coal p-7 transition-colors hover:border-paper/30"
              >
                <p className="font-display text-lg font-black uppercase tracking-tight text-paper">
                  {s.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-paper/55">
                  {s.metaDescription.split(".")[0]}.
                </p>
                <p className="mt-5 pt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/40 transition-colors group-hover:text-paper/70">
                  Detail & pricing →
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}