import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { reviews } from "@/lib/data";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { GrainOverlay } from "@/components/grain-overlay";
import { FloatingCall } from "@/components/floating-call";
import { MotionProvider } from "@/components/motion-provider";
import { Analytics } from "@vercel/analytics/react";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Redfern Plastering Solutions | Brisbane Plasterer",
    template: "%s | Redfern Plastering",
  },
  alternates: { canonical: "/" },
  description: site.seoDescription,
  keywords: [
    "plasterer Brisbane",
    "plaster repairs Brisbane",
    "gyprock repairs Brisbane",
    "plastering Brisbane",
    "ceiling repairs Brisbane",
    "plaster patching",
    "plasterboard installation Brisbane",
    "renovation plastering",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    title: "Redfern Plastering Solutions | Brisbane Plasterer",
    description: site.seoDescription,
    url: site.url,
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Redfern Plastering",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  description: site.description,
  telephone: "+61 425 743 992",
  url: site.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.state,
    addressCountry: site.country,
  },
  areaServed: {
    "@type": "City",
    name: "Brisbane",
  },
  knowsAbout: [
    "plaster repairs",
    "patching",
    "plasterboard installation",
    "ceiling repairs",
    "renovations",
    "commercial plastering",
  ],
  identifier: {
    "@type": "PropertyValue",
    name: "ABN",
    value: site.abn,
  },
  ...(reviews.length > 0
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: (
            reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
          ).toFixed(1),
          reviewCount: reviews.length,
          bestRating: 5,
          worstRating: 1,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>
          <Header />
          <ScrollProgress />
          <GrainOverlay />
          <FloatingCall />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}