import type { Metadata } from "next";
import { SERVICE_PAGES } from "@/lib/pages-content";
import { ServicePage } from "@/components/service-page";

const page = SERVICE_PAGES["commercial-plastering"];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: `/services/${page.slug}` },
};

export default function Page() {
  return <ServicePage page={page} />;
}