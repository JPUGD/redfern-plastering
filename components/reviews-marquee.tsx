"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Review } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Google-reviews marquee: real reviews drift horizontally in an
 * infinite scroll (21st.dev marquee idiom), each card carrying the
 * five-star mark and the reviewer's first name. When no reviews
 * exist yet, renders the "be the first" state instead.
 */
export function ReviewsMarquee({ reviews }: { reviews: Review[] }) {
  const [enabled, setEnabled] = useState(true);
  const prefersReduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReduced.current = mq.matches;
    setEnabled(!mq.matches);
  }, []);

  if (reviews.length === 0) {
    return null;
  }

  const row = [...reviews, ...reviews];

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent"
      />
      <div
        className={cn(
          "flex w-max items-stretch gap-5 py-2 pr-5",
          enabled && "animate-marquee"
        )}
        style={enabled ? undefined : { animation: "none" }}
      >
        {row.map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} review={r} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex w-[320px] shrink-0 flex-col justify-between rounded-2xl border border-paper/10 bg-coal p-6">
      <div>
        <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: review.rating }).map((_, s) => (
            <svg key={s} viewBox="0 0 20 20" className="h-4 w-4 fill-paper">
              <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
            </svg>
          ))}
        </div>
        <blockquote className="mt-4 text-sm leading-relaxed text-paper/75">
          &ldquo;{review.text}&rdquo;
        </blockquote>
      </div>
      <figcaption className="mt-6 flex items-center justify-between">
        <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-paper">
          {review.name}
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-paper/40">
          {review.date}
        </span>
      </figcaption>
    </figure>
  );
}