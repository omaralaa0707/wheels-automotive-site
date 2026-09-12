"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/locale-provider";
import { Reveal } from "@/components/motion/reveal";
import { STOREFRONT } from "@/content/media";

export function Visit() {
  const { content } = useLocale();
  const phone = content.contact.phones[0];
  const wa = `https://wa.me/2${phone}`;

  return (
    <>
      {/* About + how we work, set against their storefront. */}
      <section className="border-t border-white/8">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[3/2] overflow-hidden rounded-[2px] border border-white/10">
              <Image
                src={STOREFRONT[1]}
                alt={content.gallery.items.at(-1)?.alt ?? ""}
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <h2 className="font-display text-section font-bold uppercase tracking-[-0.01em] text-white-hot">
              {content.about.heading}
            </h2>
            {content.about.body.map((p) => (
              <p key={p} className="mt-5 max-w-[52ch] text-lead leading-[1.8] text-steel">
                {p}
              </p>
            ))}

            <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-[2px] border border-white/10 bg-white/10">
              {content.about.stats?.map((s) => (
                <div key={s.label} className="bg-graphite px-4 py-5">
                  <dt className="font-display text-[22px] font-bold text-brass">{s.value}</dt>
                  <dd className="mt-1.5 font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-steel-2">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
          <h2 className="font-display text-section font-bold uppercase text-white-hot">
            {content.services.heading}
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[2px] border border-white/10 bg-white/10 md:grid-cols-3">
            {content.services.items.map((s, i) => (
              <div key={s.title} className="bg-graphite px-6 py-8">
                <span className="font-mono text-[10px] tracking-[0.2em] text-brass">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-[17px] font-bold uppercase text-white-hot">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.75] text-steel">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="relative border-t border-white/8">
        <div className="grid-field pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_0.78fr]">
          {/* Held to a readable measure — at full column width the two detail
              columns drift so far apart they stop reading as one block. */}
          <div className="max-w-[600px]">
            <h2 className="font-display text-display font-bold uppercase leading-[1.02] text-white-hot">
              {content.contact.heading}
            </h2>
            <p className="mt-5 max-w-[44ch] text-lead leading-[1.75] text-steel">
              {content.contact.intro}
            </p>

            <dl className="mt-10 grid gap-7 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel-2">
                  {content.contact.addressLabel}
                </dt>
                <dd className="mt-2 text-[15px] leading-[1.7] text-white-hot">
                  {content.contact.address}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel-2">
                  {content.contact.phoneLabel}
                </dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${phone}`}
                    dir="ltr"
                    className="font-mono text-[15px] text-brass transition-colors hover:text-white-hot"
                  >
                    {phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel-2">
                  {content.contact.hoursLabel}
                </dt>
                <dd className="mt-2 text-[15px] text-white-hot">{content.contact.hours}</dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white-hot px-7 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-graphite transition-colors duration-300 hover:bg-brass"
              >
                {content.contact.cta}
              </a>
              <a
                href={content.contact.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-7 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-white-hot transition-colors duration-300 hover:border-brass hover:text-brass"
              >
                Google Maps
              </a>
              {content.contact.instagramUrl ? (
                <a
                  href={content.contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 px-7 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-white-hot transition-colors duration-300 hover:border-brass hover:text-brass"
                >
                  Instagram
                </a>
              ) : null}
            </div>
          </div>

          <div className="relative aspect-[4/5] max-h-[600px] overflow-hidden rounded-[2px] border border-white/10">
            <Image
              src={STOREFRONT[3]}
              alt={content.gallery.items.at(-1)?.alt ?? ""}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 to-transparent" />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/8 pb-24 md:pb-0">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/mark.svg" alt="" width={40} height={30} className="h-[22px] w-auto" />
            <span className="font-display text-[13px] font-bold tracking-[0.3em] text-white-hot">
              WHEELS
            </span>
          </div>
          <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-steel-2">
            {content.footer.rights}
          </p>
        </div>
      </footer>

      {/* Mobile action bar — on a phone, calling is the whole point. */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/10 bg-graphite/95 backdrop-blur-xl md:hidden">
        <a
          href={`tel:${phone}`}
          className="py-4 text-center font-mono text-[12px] uppercase tracking-[0.14em] text-white-hot"
        >
          {content.contact.phoneLabel}
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="bg-brass py-4 text-center font-mono text-[12px] uppercase tracking-[0.14em] text-graphite"
        >
          WhatsApp
        </a>
      </div>
    </>
  );
}
