"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

/**
 * Mobile-only floating call button — trades sites convert on the
 * phone number, so it follows the user with a soft pulse ring.
 */
export function FloatingCall() {
  return (
    <motion.a
      href={site.phoneHref}
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-5 right-5 z-[60] flex items-center gap-2.5 rounded-full bg-paper py-3 pl-4 pr-5 font-display text-xs font-black uppercase tracking-[0.14em] text-ink shadow-2xl shadow-black/50 sm:hidden"
      aria-label={`Call ${site.name}`}
    >
      <span className="relative grid h-7 w-7 place-items-center">
        <span
          aria-hidden
          className="animate-pulse-soft absolute inset-0 rounded-full bg-ink/20"
        />
        <svg viewBox="0 0 16 16" className="relative h-3.5 w-3.5" aria-hidden>
          <path
            d="M3 2h3l1.5 3.5L6 7c.8 1.6 1.4 2.2 3 3l1.5-1.5L14 10v3H11C6.5 13 3 9.5 3 5V2Z"
            fill="currentColor"
          />
        </svg>
      </span>
      Call now
    </motion.a>
  );
}