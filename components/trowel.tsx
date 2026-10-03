import { cn } from "@/lib/utils";

/** Tiny trowel glyph used as a marquee separator. */
export function TrowelGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={cn("h-3 w-3 shrink-0", className)}
      aria-hidden="true"
    >
      <path
        d="M2 14 L6 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6 10 L14 2 L12.5 8.5 L8.5 12.5 Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}