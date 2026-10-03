"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Bento card with a mouse-following spotlight: a soft radial light
 * tracks the cursor across the border and surface. 21st.dev idiom.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      style={
        {
          "--mx": `${pos.x}%`,
          "--my": `${pos.y}%`,
          "--spot-opacity": active ? "1" : "0",
        } as React.CSSProperties
      }
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-paper/10 bg-coal p-7",
        "transition-colors duration-500 hover:border-paper/25",
        className
      )}
    >
      {/* border spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[var(--spot-opacity)] transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at var(--mx) var(--my), rgba(246,245,241,0.12), transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}