/**
 * Whole-page film grain — a nod to the trade: fine plaster dust
 * settling over everything. Fixed, non-interactive, very low opacity.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="texture-rough pointer-events-none fixed inset-0 z-[65] opacity-[0.05] mix-blend-soft-light"
    />
  );
}