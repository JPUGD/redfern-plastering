import { cn } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  intro,
  className,
  align = "left",
}: {
  label: string;
  title: string;
  intro?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p
        className={cn(
          "flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-px w-8 bg-paper/30" aria-hidden />
        {label}
        <span className="h-px w-8 bg-paper/30" aria-hidden />
      </p>
      <h2 className="mt-5 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-paper sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-6 text-base leading-relaxed text-paper/60 sm:text-lg">
          {intro}
        </p>
      )}
    </div>
  );
}