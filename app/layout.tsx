import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { GrainOverlay } from "@/components/grain-overlay";
import { FloatingCall } from "@/components/floating-call";

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
    default:
      "Redfern Plastering Solutions | Brisbane Plasterer — Repairs, Patching & Renovations",
    template: "%s | Redfern Plastering Solutions",
  },
  description: site.seoDescription,
  keywords: [
    "plasterer Brisbane",
    "plaster repairs Brisbane",
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
        <Header />
        <ScrollProgress />
        <GrainOverlay />
        <FloatingCall />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}