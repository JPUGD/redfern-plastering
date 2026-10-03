"use client";

import { useRef, useState, type PointerEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Pointer-tilt image card: 3D perspective tilt + glare that follows
 * the pointer. The modern gallery hover.
 */
export function TiltImage({
  src,
  alt,
  caption,
  tag,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  tag?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({
      rx: (0.5 - py) * 7,
      ry: (px - 0.5) * 9,
      gx: px * 100,
      gy: py * 100,
      on: true,
    });
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setT((s) => ({ ...s, rx: 0, ry: 0, on: false }))}
      animate={{ rotateX: t.rx, rotateY: t.ry }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      style={{ transformStyle: "preserve-3d", perspective: 900 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-paper/10",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={880}
        height={660}
        className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      {/* pointer glare */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: t.on ? 1 : 0,
          background: `radial-gradient(360px circle at ${t.gx}% ${t.gy}%, rgba(246,245,241,0.14), transparent 65%)`,
        }}
      />
      {(caption || tag) && (
        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/95 via-ink/60 to-transparent p-5 pt-16">
          {caption && (
            <p className="max-w-[75%] text-xs leading-relaxed text-paper/80">
              {caption}
            </p>
          )}
          {tag && (
            <span className="shrink-0 rounded-full border border-paper/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-paper/70">
              {tag}
            </span>
          )}
        </figcaption>
      )}
    </motion.div>
  );
}