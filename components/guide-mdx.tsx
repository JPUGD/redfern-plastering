import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const linkClass =
  "underline decoration-paper/40 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper";

function GuideLink({ href = "", children }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={linkClass}>
        {children}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={linkClass}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export const guideMdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-12 font-display text-2xl font-black uppercase leading-tight tracking-tight text-paper sm:text-3xl"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-8 font-display text-lg font-black uppercase tracking-tight text-paper"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-5 text-base leading-relaxed text-paper/70" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed text-paper/70 marker:text-paper/50"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-5 text-base leading-relaxed text-paper/70 marker:text-paper/50"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="pl-1" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-paper" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-6 border-l border-paper/25 pl-5 text-base leading-relaxed text-paper/60"
      {...props}
    />
  ),
  a: GuideLink,
};
