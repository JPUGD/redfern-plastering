"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";

/**
 * Full-bleed parallax banner: a close-up of wet plaster under the
 * trowel with the business's own words over it. The image drifts
 * slower than the page as you scroll past.
 */
export function ParallaxBanner({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-paper/10"
      aria-label="Why Redfern"
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-ink/80"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink/60"
      />

      <div className="relative mx-auto max-w-5xl px-6 py-32 text-center lg:py-44">
        <Reveal>
          <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50">
            <span className="h-px w-8 bg-paper/30" aria-hidden />
            Why Redfern
            <span className="h-px w-8 bg-paper/30" aria-hidden />
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="mt-8 font-display text-3xl font-black uppercase leading-[1.02] tracking-tight text-paper sm:text-5xl lg:text-6xl">
            &ldquo;Professional workmanship and friendly service from start to
            finish.&rdquo;
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-paper/60 sm:text-base">
            Every job completed to a high standard, on time and with minimal
            disruption. We take pride in the finish — because the finish is
            the job. Based in {site.city}, {site.state}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}