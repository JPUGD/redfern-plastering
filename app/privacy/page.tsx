import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Redfern Plastering Solutions, a Brisbane plasterer, uses this website, including Google Analytics cookies, and how to get in touch.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy | Redfern Plastering",
    description:
      "How Redfern Plastering Solutions uses this website, including Google Analytics cookies, and how to get in touch.",
    url: "/privacy",
  },
};

const linkClass =
  "text-paper underline decoration-paper/40 underline-offset-4 transition-colors hover:decoration-paper";

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 pb-28 pt-32 lg:px-8">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/40">
          <li>
            <Link href="/" className="transition-colors hover:text-paper">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-paper/70">Privacy</li>
        </ol>
      </nav>

      <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50">
        Last updated 12 November 2026
      </p>
      <h1 className="mt-5 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-paper sm:text-6xl">
        Privacy
      </h1>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-paper/65">
        <p>
          {site.name} is a Brisbane plasterer. This page explains how this
          website handles information.
        </p>
        <p>
          The site may use Google Analytics to understand how people use it,
          such as which pages are visited. Google Analytics may set cookies on
          your browser. You can block or delete cookies in your browser
          settings. Google describes how it handles that information in its{" "}
          <a
            href="https://policies.google.com/privacy"
            className={linkClass}
            rel="noopener noreferrer"
          >
            privacy policy
          </a>
          .
        </p>
        <p>
          If you ask for a quote, we receive the details you send: your name,
          phone number, email address, suburb, a description of the work, and a
          photo if you attach one. We use those details to reply to your
          enquiry.
        </p>
        <p>
          To get in touch, call{" "}
          <a href={site.phoneHref} className={linkClass}>
            {site.phoneDisplay}
          </a>
          ,{" "}
          <a href={site.smsHref} className={linkClass}>
            send a text
          </a>
          , or{" "}
          <a
            href={site.whatsappHref}
            className={linkClass}
            rel="noopener noreferrer"
          >
            message us on WhatsApp
          </a>
          .
        </p>
        <p>ABN {site.abn}</p>
      </div>
    </article>
  );
}
