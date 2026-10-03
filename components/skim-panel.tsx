"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

/**
 * Signature hero interaction: a rough-cast wall that the visitor
 * smooths with the trowel. The clean finish is revealed through a
 * spring-eased circle that follows the pointer — skim-coat motion.
 */
export function SkimPanel() {
  const wrapRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(18);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 240, damping: 26, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 240, damping: 26, mass: 0.6 });

  const clip = useMotionTemplate`circle(46% at ${sx}% ${sy}%)`;
  const trowelLeft = useMotionTemplate`${sx}%`;
  const trowelTop = useMotionTemplate`${sy}%`;

  // one automatic skim pass on mount, so the effect demos itself
  useEffect(() => {
    const ax = animate(mx, 74, {
      duration: 2.4,
      delay: 0.7,
      ease: [0.45, 0, 0.55, 1],
    });
    const ay = animate(my, 62, {
      duration: 2.4,
      delay: 0.7,
      ease: [0.45, 0, 0.55, 1],
    });
    return () => {
      ax.stop();
      ay.stop();
    };
  }, [mx, my]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={onMove}
      className="relative aspect-square w-full max-w-[520px] cursor-none touch-none select-none overflow-hidden rounded-2xl border border-paper/15"
      aria-label="Interactive finish demo: move your cursor to smooth the wall"
      role="img"
    >
      {/* rough-cast layer */}
      <div className="absolute inset-0 bg-paper">
        <div className="texture-rough absolute inset-0 opacity-80" />
        <div className="absolute inset-0 grid place-items-center p-8">
          <div className="text-center">
            <p className="font-display text-6xl font-black uppercase tracking-tight text-ink/25 sm:text-7xl">
              Rough
              <br />
              Cast
            </p>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/40">
              Before the trowel
            </p>
          </div>
        </div>
      </div>

      {/* smooth finish layer, revealed by the skim */}
      <motion.div
        className="absolute inset-0 bg-paper"
        style={{ clipPath: clip }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(230,229,222,0) 45%, rgba(208,206,198,0.35) 100%)",
          }}
        />
        <div className="absolute inset-0 grid place-items-center p-8">
          <div className="text-center">
            <p className="font-display text-6xl font-black uppercase tracking-tight text-ink sm:text-7xl">
              Smooth
              <br />
              Finish
            </p>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/50">
              Ready for paint
            </p>
          </div>
        </div>
      </motion.div>

      {/* the trowel */}
      <motion.div
        className="pointer-events-none absolute z-10"
        style={{ left: trowelLeft, top: trowelTop }}
        aria-hidden
      >
        <div className="-translate-x-1/2 -translate-y-[85%] rotate-[18deg]">
          <svg viewBox="0 0 96 96" className="h-16 w-16 drop-shadow-xl">
            <g transform="rotate(24 48 48)">
              {/* handle */}
              <rect
                x="42"
                y="4"
                width="12"
                height="34"
                rx="5"
                fill="#1a1a1c"
                stroke="#f6f5f1"
                strokeWidth="1.5"
              />
              {/* ferrule */}
              <rect
                x="36"
                y="32"
                width="24"
                height="8"
                rx="3"
                fill="#0b0b0c"
                stroke="#f6f5f1"
                strokeWidth="1.5"
              />
              {/* blade */}
              <path
                d="M30 42 L66 42 L74 74 Q48 88 22 74 Z"
                fill="#e8e7e1"
                stroke="#0b0b0c"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </motion.div>

      {/* corner label */}
      <div className="absolute bottom-4 left-4 z-10 rounded-full bg-ink/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-paper/80 backdrop-blur">
        Run the trowel over it
      </div>
    </div>
  );
}