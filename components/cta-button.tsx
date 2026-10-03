import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "solid" | "beam";

export function CtaButton({
  href,
  children,
  variant = "solid",
  external = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const base = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5",
    "font-display text-sm font-bold uppercase tracking-[0.18em]",
    "transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]",
    variant === "solid"
      ? "beam-border bg-paper text-ink"
      : "beam-border border border-paper/25 bg-transparent text-paper hover:border-paper/60",
    className
  );

  if (external) {
    return (
      <a href={href} className={base}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={base}>
      {children}
    </Link>
  );
}