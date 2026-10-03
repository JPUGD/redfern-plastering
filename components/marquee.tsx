import { TrowelGlyph } from "@/components/trowel";

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-paper/10 py-5">
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 whitespace-nowrap"
            aria-hidden={i >= items.length}
          >
            <span className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-paper/60">
              {item}
            </span>
            <TrowelGlyph className="text-paper/30" />
          </span>
        ))}
      </div>
    </div>
  );
}