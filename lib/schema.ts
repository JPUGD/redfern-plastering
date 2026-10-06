import { site } from "@/lib/site";
import type { Faq } from "@/lib/data";

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${site.url}/#business`,
      name: site.name,
      telephone: "+61 425 743 992",
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressRegion: site.state,
        addressCountry: site.country,
      },
      areaServed: ["Brisbane", "Logan", "Ipswich", "Redlands"],
    },
    areaServed: [
      { "@type": "City", name: "Brisbane" },
      { "@type": "City", name: "Logan" },
      { "@type": "City", name: "Ipswich" },
      { "@type": "City", name: "Redlands" },
    ],
    url: `${site.url}${opts.path}`,
    description: opts.description,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}