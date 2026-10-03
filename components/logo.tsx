import { cn } from "@/lib/utils";

/**
 * Brand mark: gable roofline over an RP monogram with a trowel base —
 * the Redfern Plastering Solutions logo, redrawn as clean geometry.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={cn("h-10 w-10", className)}
      role="img"
      aria-label="Redfern Plastering Solutions"
    >
      {/* gable roofline */}
      <path
        d="M6 30 L32 8 L58 30"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* RP monogram — white on dark, solid for weight */}
      <text
        x="32"
        y="47"
        textAnchor="middle"
        fontSize="27"
        fontWeight="900"
        letterSpacing="-2.5"
        fill="currentColor"
        style={{ fontFamily: "var(--font-archivo), sans-serif" }}
      >
        RP
      </text>
      {/* trowel base */}
      <path
        d="M14 54 H50"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M27 51 h10 v3 h-10 z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-black uppercase tracking-[0.28em]">
          Redfern
        </span>
        <span className="mt-1 flex items-center gap-2">
          <span className="h-px w-4 bg-current opacity-40" />
          <span className="text-[9px] font-medium uppercase tracking-[0.22em] opacity-70">
            Plastering Solutions
          </span>
          <span className="h-px w-4 bg-current opacity-40" />
        </span>
      </span>
    </span>
  );
}