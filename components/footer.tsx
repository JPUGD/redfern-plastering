import Link from "next/link";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";
import { SERVICE_PAGES, AREA_PAGES } from "@/lib/pages-content";

export function Footer() {
  const year = new Date().getFullYear();
  const services = Object.values(SERVICE_PAGES);
  const areas = Object.values(AREA_PAGES);
  return (
    <footer className="border-t border-paper/10 bg-coal">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/50">
              {site.tagline}. {site.scope}. Based in {site.city}, working across
              Brisbane, Logan, Ipswich and the Redlands.
            </p>
            <a
              href={site.phoneHref}
              className="mt-6 inline-block font-display text-2xl font-black uppercase tracking-tight text-paper transition-opacity hover:opacity-70"
            >
              {site.phoneDisplay}
            </a>
            <p className="mt-3 text-xs uppercase tracking-[0.22em] text-paper/40">
              ABN {site.abn}
            </p>
          </div>

          <nav aria-label="Services">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-paper/45">
              Services
            </p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link
                  href="/services"
                  className="text-sm text-paper/60 transition-colors hover:text-paper"
                >
                  All plastering services
                </Link>
              </li>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-paper/60 transition-colors hover:text-paper"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/plastering-costs-brisbane"
                  className="text-sm text-paper/60 transition-colors hover:text-paper"
                >
                  Brisbane cost guide
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Areas">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-paper/45">
              Areas
            </p>
            <ul className="mt-5 space-y-2.5">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/${a.slug}`}
                    className="text-sm text-paper/60 transition-colors hover:text-paper"
                  >
                    {a.area}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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