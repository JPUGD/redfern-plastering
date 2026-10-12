import type { Metadata } from "next";
import { SERVICE_PAGES } from "@/lib/pages-content";
import { ServicePage } from "@/components/service-page";

const page = SERVICE_PAGES["cornice-repairs"];

export const metadata: Metadata = {
  title: { absolute: page.metaTitle },
  description: page.metaDescription,
  alternates: { canonical: `/services/${page.slug}` },
  openGraph: { title: page.metaTitle, url: `/services/${page.slug}` },
};

export default function Page() {
  return <ServicePage page={page} />;
}