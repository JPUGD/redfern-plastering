"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryItem } from "@/lib/data";
import { TiltImage } from "@/components/tilt-image";

/**
 * Work gallery with click-to-lightbox: any photo opens full-screen
 * with caption + keyboard nav (←/→/Esc). Grid cards keep their
 * pointer-tilt behaviour.
 */
export function WorkGallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((o) => (o === null ? null : (o - 1 + items.length) % items.length)),
    [items.length]
  );
  const next = useCallback(
    () => setOpen((o) => (o === null ? null : (o + 1) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g, i) => (
          <motion.div
            key={g.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 * (i % 3), ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="block w-full text-left"
              aria-label={`Open photo: ${g.alt}`}
            >
              <TiltImage src={g.src} alt={g.alt} caption={g.caption} tag={g.tag} />
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && items[open] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-6"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={items[open].alt}
          >
            <motion.div
              initial={{ scale: 0.95, y: 14 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative overflow-hidden rounded-2xl border border-paper/15 bg-coal">
                <Image
                  src={items[open].src}
                  alt={items[open].alt}
                  width={1600}
                  height={1200}
                  className="max-h-[72vh] w-full object-contain"
                  priority
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="max-w-2xl text-xs leading-relaxed text-paper/65">
                  {items[open].caption}
                </p>
                <span className="shrink-0 rounded-full border border-paper/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-paper/70">
                  {items[open].tag} · {open + 1}/{items.length}
                </span>
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2 sm:px-3">
                <button
                  type="button"
                  onClick={prev}
                  className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full bg-ink/75 text-paper backdrop-blur transition-colors hover:bg-ink"
                  aria-label="Previous photo"
                >
                  <svg viewBox="0 0 12 12" className="h-4 w-4" aria-hidden>
                    <path d="M8 1L3 6l5 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full bg-ink/75 text-paper backdrop-blur transition-colors hover:bg-ink"
                  aria-label="Next photo"
                >
                  <svg viewBox="0 0 12 12" className="h-4 w-4" aria-hidden>
                    <path d="M4 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                onClick={close}
                className="absolute -top-2 right-0 grid h-10 w-10 -translate-y-full place-items-center rounded-full bg-ink/75 text-paper backdrop-blur transition-colors hover:bg-ink"
                aria-label="Close photo viewer"
              >
                <svg viewBox="0 0 12 12" className="h-4 w-4" aria-hidden>
                  <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}