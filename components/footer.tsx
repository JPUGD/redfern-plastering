import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-paper/10 bg-coal">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/50">
              {site.tagline}. {site.scope}. Based in {site.city}, working across
              the greater region.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <a
              href={site.phoneHref}
              className="font-display text-2xl font-black uppercase tracking-tight text-paper transition-opacity hover:opacity-70 sm:text-3xl"
            >
              {site.phoneDisplay}
            </a>
            <p className="text-xs uppercase tracking-[0.22em] text-paper/40">
              ABN {site.abn}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/10 pt-8 text-[11px] uppercase tracking-[0.2em] text-paper/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p>
            {site.city} {site.state} · {site.country}
          </p>
        </div>
      </div>
    </footer>
  );
}