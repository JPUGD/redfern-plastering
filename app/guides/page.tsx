import type { Metadata } from "next";
import Link from "next/link";
import { getGuides, formatGuideDate } from "@/lib/guides";
import { breadcrumbJsonLd } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Plastering Guides | Redfern" },
  description:
    "Practical notes on plaster repairs around Brisbane — leaks, ceilings, and what to check before anyone patches.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Plastering Guides | Redfern",
    description:
      "Practical notes on plaster repairs around Brisbane — leaks, ceilings, and what to check before anyone patches.",
    url: "/guides",
  },
};

const otherGuides = [
  {
    href: "/diy-plaster-repairs",
    title: "DIY plaster repairs: when to fix it yourself",
    text: "Nail holes and hairline cracks you can patch, and the ceilings, returning cracks and water damage that are not a weekend job.",
  },
  {
    href: "/plastering-costs-brisbane",
    title: "How much plastering costs in Brisbane",
    text: "What moves a quote: job size, coats, ceiling height, access and texture, and how to compare prices properly.",
  },
];

export default function GuidesPage() {
  const guides = getGuides();
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Plastering guides",
      url: `${site.url}/guides`,
      isPartOf: { "@id": `${site.url}/#business` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [
          ...guides.map((guide, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: guide.title,
            url: `${site.url}/guides/${guide.slug}`,
          })),
          ...otherGuides.map((guide, index) => ({
            "@type": "ListItem",
            position: guides.length + index + 1,
            name: guide.title,
            url: `${site.url}${guide.href}`,
          })),
        ],
      },
    },
  ];

  return (
    <>
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 pt-28 lg:px-8">
        <ol className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/40">
          <li>
            <Link href="/" className="transition-colors hover:text-paper">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-paper/70">Guides</li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-8">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50">
          <span className="h-px w-8 bg-paper/30" aria-hidden />
          Practical notes
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-paper sm:text-6xl">
          Plastering guides
        </h1>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-paper/65 sm:text-lg">
          Straight answers on plaster repairs around Brisbane — what to check
          after a leak, what you can patch yourself, and what a fair quote is
          actually based on.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-paper/10 bg-coal p-7 transition-colors hover:border-paper/30"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/40">
                <time dateTime={guide.date}>{formatGuideDate(guide.date)}</time>
              </p>
              <p className="mt-4 font-display text-lg font-black uppercase tracking-tight text-paper">
                {guide.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-paper/55">
                {guide.description}
              </p>
              <p className="mt-5 pt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/40 transition-colors group-hover:text-paper/70">
                Read the guide →
              </p>
            </Link>
          ))}
          {otherGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group flex h-full flex-col rounded-2xl border border-paper/10 bg-coal p-7 transition-colors hover:border-paper/30"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/40">
                On the site
              </p>
              <p className="mt-4 font-display text-lg font-black uppercase tracking-tight text-paper">
                {guide.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-paper/55">{guide.text}</p>
              <p className="mt-5 pt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/40 transition-colors group-hover:text-paper/70">
                Read the guide →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
