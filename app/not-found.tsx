import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/logo";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Redfern Plastering" },
  description:
    "That address is not a page on the Redfern Plastering Solutions site.",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center lg:px-8">
      <LogoMark className="h-16 w-16 text-paper/40" />
      <p className="mt-10 font-display text-[18vw] font-black uppercase leading-none tracking-tighter text-outline sm:text-8xl">
        404
      </p>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/55">
        This page hasn&rsquo;t been plastered yet — it must&rsquo;ve been moved
        or never set. Nothing broken, just a blank sheet.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-paper px-7 py-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink transition-transform hover:scale-105"
        >
          Back to the home page
        </Link>
        <Link
          href="/services"
          className="rounded-full border border-paper/25 px-7 py-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:border-paper/60"
        >
          Browse services
        </Link>
        <Link
          href="/guides"
          className="rounded-full border border-paper/25 px-7 py-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:border-paper/60"
        >
          Plastering guides
        </Link>
      </div>
    </section>
  );
}