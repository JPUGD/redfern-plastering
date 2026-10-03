"use client";

import { useRef, useState, type PointerEvent, type KeyboardEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Before/after comparison slider — a draggable trowel-handle reveals
 * the finished wall over the rough cast. Pattern after diceui's
 * Compare Slider (21st.dev #20282), rebuilt lean for this design.
 */
export function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Rough cast",
  afterLabel = "Paint-ready",
  className,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const setFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDragging(true);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging) setFromClientX(e.clientX);
  };
  const end = () => setDragging(false);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      onPointerLeave={end}
      className={cn(
        "group relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-2xl border border-paper/15",
        className
      )}
      role="slider"
      aria-label="Compare the rough cast with the finished surface"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* BEFORE (rough) */}
      <Image
        src={beforeSrc}
        alt={beforeAlt}
        fill
        sizes="(min-width: 1024px) 900px, 100vw"
        className="object-cover"
        draggable={false}
      />
      {/* AFTER (smooth), clipped by the handle position */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes="(min-width: 1024px) 900px, 100vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* labels */}
      <span className="absolute left-4 top-4 z-10 rounded-full bg-ink/80 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-paper/85 backdrop-blur">
        {beforeLabel}
      </span>
      <span className="absolute right-4 top-4 z-10 rounded-full bg-paper/90 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink backdrop-blur">
        {afterLabel}
      </span>

      {/* handle: the trowel */}
      <motion.div
        className="absolute inset-y-0 z-20"
        style={{ left: `${pos}%` }}
        animate={{ scale: dragging ? 1.06 : 1 }}
        transition={{ duration: 0.2 }}
        aria-hidden
      >
        <div className="absolute inset-y-0 -left-px w-[2px] bg-paper shadow-[0_0_20px_rgba(246,245,241,0.45)]" />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="grid h-12 w-12 cursor-ew-resize place-items-center rounded-full border-2 border-ink bg-paper shadow-xl">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink" fill="none">
              <path
                d="M9 6 4 12l5 6M15 6l5 6-5 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* hint */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-ink/75 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-paper/75 opacity-100 backdrop-blur transition-opacity duration-500 group-hover:opacity-0">
        Drag the handle
      </div>
    </div>
  );
}