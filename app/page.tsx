import { site } from "@/lib/site";
import { services, faqs, gallery, processSteps, marqueeItems } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { CtaButton } from "@/components/cta-button";
import { Marquee } from "@/components/marquee";
import { SpotlightCard } from "@/components/spotlight-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/icon";
import { SkimPanel } from "@/components/skim-panel";
import { FinishScroll } from "@/components/finish-scroll";
import { Accordion } from "@/components/accordion";
import { LineReveal } from "@/components/line-reveal";
import { TiltImage } from "@/components/tilt-image";
import { ParallaxBanner } from "@/components/parallax-banner";
import { CompareSlider } from "@/components/compare-slider";

export default function HomePage() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section id="top" className="relative overflow-hidden">
        {/* backdrop: giant outline word + grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(246,245,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(246,245,241,0.04)_1px,transparent_1px)] [background-size:64px_64px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-24 select-none font-display text-[26vw] font-black uppercase leading-none tracking-tighter text-outline opacity-60"
        >
          RPS
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-36 sm:pt-40 lg:px-8 lg:pb-32">
          <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <Reveal>
                <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50">
                  <span className="h-px w-8 bg-paper/30" aria-hidden />
                  Brisbane · Residential & Commercial
                </p>
              </Reveal>

              <LineReveal
                className="mt-6 font-display text-[13.5vw] font-black uppercase leading-[0.88] tracking-tight text-paper sm:text-7xl lg:text-[5.6rem]"
                lines={[
                  "Every",
                  "surface",
                  <span key="f" className="text-paper/35">finished</span>,
                  "properly.",
                ]}
              />

              <Reveal delay={0.16}>
                <p className="mt-8 max-w-md text-base leading-relaxed text-paper/60 sm:text-lg">
                  {site.scope} — repairs, patching, renovations and small to
                  medium residential &amp; commercial projects across{" "}
                  {site.city}. Craftsmanship, reliability and a seamless finish,
                  every job.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <Magnetic>
                    <CtaButton href={site.phoneHref} external>
                      Call {site.phoneDisplay}
                    </CtaButton>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <CtaButton href="#contact" variant="beam">
                      Get a quote
                    </CtaButton>
                  </Magnetic>
                </div>
              </Reveal>

              <Reveal delay={0.32}>
                <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.26em] text-paper/35">
                  ABN {site.abn} · Fully insured workmanship
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2} y={40}>
              <SkimPanel />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- MARQUEE ---------- */}
      <Marquee items={marqueeItems} />

      {/* ---------- SERVICES (bento) ---------- */}
      <section id="services" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <Reveal>
            <SectionHeading
              label="What we do"
              title="All aspects of plastering"
              intro="From a single door-handle punch to a full renovation — small jobs get the same care as big ones. That's the point."
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-6">
            {services.map((s, i) => (
              <Reveal
                key={s.slug}
                delay={0.05 * i}
                className={s.span}
              >
                <SpotlightCard className="h-full">
                  <div className="flex h-full flex-col">
                    <ServiceIcon
                      name={s.icon}
                      className="text-paper/70 transition-transform duration-500 group-hover:scale-110"
                    />
                    <h3 className="mt-5 font-display text-xl font-black uppercase tracking-tight text-paper">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-paper/55">
                      {s.short}
                    </p>
                    <ul className="mt-5 space-y-2 border-t border-paper/10 pt-5">
                      {s.includes.map((inc) => (
                        <li
                          key={inc}
                          className="flex items-start gap-2.5 text-[13px] text-paper/50"
                        >
                          <span
                            aria-hidden
                            className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-paper/50"
                          />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CRAFT STRIP (tilt cards + before/after) ---------- */}
      <section id="craft" className="scroll-mt-24 border-t border-paper/10">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <Reveal>
            <SectionHeading
              label="The craft"
              title="It's all in the finish"
              intro="Plastering is one of the last trades where the finished job either disappears or shouts at you. We make it disappear."
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Reveal>
              <TiltImage
                src="/images/stock-trowel-wall.jpg"
                alt="Gloved hand working a wall smooth with a trowel"
                caption="The skim — compound worked flat and tight with the trowel."
                tag="Finishing"
              />
            </Reveal>
            <Reveal delay={0.08}>
              <TiltImage
                src="/images/stock-trowel-cement.jpg"
                alt="Close-up of a trowel loaded with compound"
                caption="Loaded and ready — the right amount on the blade, every pass."
                tag="Finishing"
              />
            </Reveal>
            <Reveal delay={0.16}>
              <TiltImage
                src="/images/stock-power-sander.jpg"
                alt="Wall being power-sanded under bright light before paint"
                caption="Machine sanding under raking light — the last pass before primer."
                tag="Finishing"
              />
            </Reveal>
          </div>

          {/* before/after: drag the trowel */}
          <Reveal delay={0.1}>
            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr] lg:items-center">
              <CompareSlider
                beforeSrc="/images/stock-stucco-texture.jpg"
                afterSrc="/images/stock-spiral-texture.jpg"
                beforeAlt="Wall with rough textured stucco before plastering"
                afterAlt="The same wall finished smooth and ready for paint"
                className="max-h-[520px] w-full"
              />
              <div className="lg:pl-4">
                <p className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-paper sm:text-3xl">
                  Drag it.
                  <br />
                  Rough in,
                  <br />
                  smooth out.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-paper/55">
                  This is the whole job in one gesture — what starts as a
                  textured, imperfect surface ends flat, tight and invisible
                  under paint. If the finish doesn't disappear, it isn't
                  finished.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- WORK ---------- */}
      <section id="work" className="scroll-mt-24 border-t border-paper/10">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <Reveal>
            <SectionHeading
              label="On the trowel"
              title="Recent work"
              intro="Real jobs from around Brisbane — mid-process and finished. Photos of your job help us quote faster, so send them through."
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g, i) => (
              <Reveal key={g.src} delay={0.05 * (i % 3)}>
                <TiltImage
                  src={g.src}
                  alt={g.alt}
                  caption={g.caption}
                  tag={g.tag}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SIGNATURE SCROLL: THE FINISH ---------- */}
      <FinishScroll />

      {/* ---------- PARALLAX BANNER: WHY REDFERN ---------- */}
      <ParallaxBanner
        src="/images/stock-drywall-install.jpg"
        alt="Plasterer applying compound to a wall during a renovation"
      />

      {/* ---------- PROCESS ---------- */}
      <section id="process" className="scroll-mt-24 border-t border-paper/10 bg-coal">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <Reveal>
            <SectionHeading
              label="How it goes"
              title="No surprises"
              intro="The same four steps on every job, whether it's one patch or a whole extension."
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((p, i) => (
              <Reveal key={p.n} delay={0.07 * i} className="h-full">
                <div className="group h-full bg-ink p-8 transition-colors duration-500 hover:bg-coal">
                  <p className="font-display text-5xl font-black tracking-tight text-paper/15 transition-colors duration-500 group-hover:text-paper/30">
                    {p.n}
                  </p>
                  <h3 className="mt-8 font-display text-lg font-black uppercase tracking-tight text-paper">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper/50">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="scroll-mt-24 border-t border-paper/10">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <SectionHeading
                label="Good to know"
                title="Questions"
                intro="The things people ask before they call."
              />
              <div className="mt-8">
                <Magnetic strength={0.2}>
                  <CtaButton href={site.phoneHref} external>
                    Text {site.phoneDisplay}
                  </CtaButton>
                </Magnetic>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Accordion items={faqs} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <section id="contact" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 pb-28 lg:px-8">
          <Reveal>
            <div className="beam-border relative overflow-hidden rounded-3xl bg-coal">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(246,245,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(246,245,241,0.03)_1px,transparent_1px)] [background-size:48px_48px]"
              />
              <div className="relative grid gap-10 p-10 sm:p-14 lg:grid-cols-[1.3fr_1fr] lg:items-center">
                <div>
                  <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-paper/50">
                    <span className="h-px w-8 bg-paper/30" aria-hidden />
                    Get a quote
                  </p>
                  <h2 className="mt-5 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-paper sm:text-6xl">
                    Got a wall
                    <br />
                    that needs
                    <br />
                    sorting?
                  </h2>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-paper/60">
                    Call or text any time — photos of the damage help us scope
                    it and price it faster. Friendly service from start to
                    finish.
                  </p>
                </div>
                <div className="flex flex-col gap-4 lg:items-end">
                  <Magnetic>
                    <CtaButton href={site.phoneHref} external>
                      Call {site.phoneDisplay}
                    </CtaButton>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <CtaButton href={site.smsHref} external variant="beam">
                      Send a text
                    </CtaButton>
                  </Magnetic>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-paper/35">
                    Brisbane based · {site.abn ? `ABN ${site.abn}` : ""}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}