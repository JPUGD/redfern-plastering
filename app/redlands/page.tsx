import type { Metadata } from "next";
import { AREA_PAGES } from "@/lib/pages-content";
import { AreaPage } from "@/components/area-page";

const page = AREA_PAGES["redlands"];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: `/${page.slug}` },
};

export default function Page() {
  return <AreaPage page={page} />;
}