import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { SERVICE_PAGES, AREA_PAGES } from "@/lib/pages-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/plastering-costs-brisbane`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  for (const s of Object.values(SERVICE_PAGES)) {
    routes.push({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const a of Object.values(AREA_PAGES)) {
    routes.push({
      url: `${site.url}/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return routes;
}