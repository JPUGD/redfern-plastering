/** Five-star row, inline SVG for reuse in cards and headers. */
export function Stars({
  className,
  count = 5,
}: {
  className?: string;
  count?: number;
}) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, s) => (
        <svg key={s} viewBox="0 0 20 20" className={className ?? "h-4 w-4 fill-paper"}>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}