"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * The signature scroll section: as the page scrolls, a rough-cast
 * wall is skimmed, sanded and finished — rough texture dissolves
 * into a paint-ready surface while a trowel sweeps across.
 */
export function FinishScroll() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const noiseOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0.85, 0]);
  const blurPx = useTransform(scrollYProgress, [0.15, 0.55], [4, 0]);
  const blur = useMotionTemplate`blur(${blurPx}px)`;

  const trowelX = useTransform(scrollYProgress, [0.05, 0.6], ["-12%", "112%"]);
  const trowelRotate = useTransform(scrollYProgress, [0.05, 0.6], [-6, 8]);

  const roughOpacity = useTransform(scrollYProgress, [0.05, 0.35], [1, 0]);
  const roughY = useTransform(scrollYProgress, [0.05, 0.35], [0, -40]);
  const smoothOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const smoothY = useTransform(scrollYProgress, [0.4, 0.7], [40, 0]);

  return (
    <section
      ref={ref}
      id="finish"
      className="relative h-[200vh] scroll-mt-16"
      aria-label="How a Redfern finish comes together"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-paper">
        {/* clean wall base */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #faf9f6 0%, #f2f1ec 55%, #e6e5df 100%)",
          }}
        />

        {/* rough texture layer that dissolves with scroll */}
        <motion.div
          className="texture-rough absolute inset-0 bg-paper"
          style={{ opacity: noiseOpacity, filter: blur }}
        />

        {/* sweeping trowel */}
        <motion.div
          className="absolute top-[16%] left-0"
          style={{ x: trowelX, rotate: trowelRotate }}
          aria-hidden
        >
          <svg viewBox="0 0 96 96" className="h-14 w-14 opacity-90 sm:h-20 sm:w-20">
            <g transform="rotate(24 48 48)">
              <rect x="42" y="4" width="12" height="34" rx="5" fill="#1a1a1c" />
              <rect x="36" y="32" width="24" height="8" rx="3" fill="#0b0b0c" />
              <path
                d="M30 42 L66 42 L74 74 Q48 88 22 74 Z"
                fill="#3a3a3c"
                stroke="#0b0b0c"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </motion.div>

        {/* crossfading statements */}
        <div className="relative z-10 px-6 text-center">
          <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-ink/45">
            <span className="h-px w-8 bg-ink/30" aria-hidden />
            The finish
            <span className="h-px w-8 bg-ink/30" aria-hidden />
          </p>

          <motion.p
            className="mt-8 font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl"
            style={{ opacity: roughOpacity, y: roughY }}
          >
            Every wall
            <br />
            starts rough.
          </motion.p>

          <motion.p
            className="absolute inset-x-6 top-1/2 mt-8 font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl"
            style={{ opacity: smoothOpacity, y: smoothY }}
          >
            Ours end up
            <br />
              paint-ready.
          </motion.p>

          <p className="mt-10 text-sm font-medium uppercase tracking-[0.22em] text-ink/40">
            Keep scrolling — the wall smooths out
          </p>
        </div>
      </div>
    </section>
  );
}