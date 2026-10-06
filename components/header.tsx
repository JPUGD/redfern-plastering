"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/plastering-costs-brisbane", label: "Costs" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open
          ? "border-b border-paper/10 bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="/#top" aria-label={`${site.name} — home`}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[12px] font-semibold uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-paper"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={site.phoneHref}
            className="hidden rounded-full px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink transition-transform hover:scale-105 sm:inline-flex"
            style={{ background: "var(--color-paper)" }}
          >
            {site.phoneDisplay}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-paper/20 text-paper lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
              {open ? (
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2 4h12M2 8h12M2 12h12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-6 pb-6 pt-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-paper/75 hover:bg-paper/5 hover:text-paper"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={site.phoneHref}
                className="mt-3 inline-flex w-fit rounded-full bg-paper px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.16em] text-ink"
              >
                Call {site.phoneDisplay}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}