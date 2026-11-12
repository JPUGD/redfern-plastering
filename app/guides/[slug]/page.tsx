import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { guideMdxComponents } from "@/components/guide-mdx";
import { CtaButton } from "@/components/cta-button";
import { ContactSection } from "@/components/contact-section";
import { formatGuideDate, getGuide, getGuides } from "@/lib/guides";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getGuides().map((guide) => ({ slug: guide.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: { absolute: guide.metaTitle },
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle,
      description: guide.description,
      url: `/guides/${guide.slug}`,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: guide.title, path: `/guides/${guide.slug}` },
    ]),
    articleJsonLd({
      title: guide.title,
      description: guide.description,
      path: `/guides/${guide.slug}`,
      datePublished: guide.date,
    }),
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
          <li>
            <Link href="/guides" className="transition-colors hover:text-paper">
              Guides
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-paper/70">{guide.title}</li>
        </ol>
      </nav>

      <article className="mx-auto max-w-3xl px-6 pb-24 pt-10 lg:px-8">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50">
          <span className="h-px w-8 bg-paper/30" aria-hidden />
          A practical guide
        </p>
        <h1 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-paper sm:text-5xl">
          {guide.title}
        </h1>
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/40">
          <time dateTime={guide.date}>{formatGuideDate(guide.date)}</time>
          <span aria-hidden> · </span>
          {site.name}
        </p>
        <p className="mt-8 text-base leading-relaxed text-paper/65 sm:text-lg">
          {guide.description}
        </p>

        <div className="mt-2">
          <MDXRemote source={guide.content} components={guideMdxComponents} />
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-5 border-t border-paper/10 pt-10">
          <CtaButton href={site.phoneHref} external>
            Call {site.phoneDisplay}
          </CtaButton>
          <CtaButton href={site.smsHref} external variant="beam">
            Text photos for a quote
          </CtaButton>
          <CtaButton href="#contact" variant="beam">
            Get a quote
          </CtaButton>
        </div>
      </article>
      <ContactSection />
    </>
  );
}
