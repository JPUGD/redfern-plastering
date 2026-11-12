import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { CtaButton } from "@/components/cta-button";
import { QuoteForm } from "@/components/quote-form";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <Reveal>
          <div className="beam-border relative overflow-hidden rounded-3xl bg-coal">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(246,245,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(246,245,241,0.03)_1px,transparent_1px)] [background-size:48px_48px]"
            />
            <div className="relative p-8 sm:p-12 lg:p-14">
              <div className="max-w-2xl">
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
                  Send the form and we’ll get back to you. A photo of the damage
                  helps us scope it and price it faster. Call, text or WhatsApp
                  if that’s easier.
                </p>
              </div>

              <div className="mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(16rem,0.7fr)]">
                <QuoteForm />
                <div className="flex flex-col gap-4 lg:pt-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-paper/45">
                    Or get in touch directly
                  </p>
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
                  <Magnetic strength={0.2}>
                    <CtaButton href={site.whatsappHref} external variant="beam">
                      WhatsApp us
                    </CtaButton>
                  </Magnetic>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-paper/35">
                    Brisbane based · ABN {site.abn}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
