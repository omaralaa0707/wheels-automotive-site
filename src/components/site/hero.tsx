"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/locale-provider";
import { SplitText } from "@/components/motion/split-text";
import { HERO_FRAME } from "@/content/media";
import { useWheels } from "@/content/schema-ext";

/**
 * The hero is built like an instrument binnacle: a readout strip pinned under
 * the headline, hairlines instead of boxes, and their storefront photograph
 * held in a tall aperture rather than bled full-screen — every other dealership
 * site opens with a full-bleed hero, and this one shouldn't.
 */
export function Hero() {
  const { content } = useLocale();
  const wheels = useWheels();

  const readout = [
    { k: content.about.stats?.[0]?.label, v: content.about.stats?.[0]?.value },
    { k: content.contact.hoursLabel, v: content.contact.hours },
  ];

  return (
    <section id="top" className="relative overflow-hidden pt-[68px]">
      {/* Instrument grid, fading out before it reaches the type. */}
      <div className="grid-field pointer-events-none absolute inset-0 [mask-image:radial-gradient(120%_80%_at_50%_0%,black,transparent_72%)]" />

      {/* Explicitly placed on lg so the readout can sit under the copy there,
          while on mobile the photograph comes before it — stacked, the readout
          alone would push the car a full screen below the fold. */}
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-5 pt-6 pb-16 sm:px-8 sm:pt-12 lg:min-h-[calc(100vh-68px)] lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-[auto_auto] lg:gap-x-14 lg:gap-y-10 lg:py-16">
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-brass">
            {content.hero.eyebrow}
          </p>

          <SplitText
            as="h1"
            text={content.hero.headline}
            className="mt-6 block font-display text-hero leading-[0.92] font-bold uppercase tracking-[-0.02em] text-white-hot"
          />

          <div className="hair-brass mt-8 h-px w-full max-w-[520px]" />

          <p className="mt-7 max-w-[46ch] text-lead leading-[1.75] text-steel">
            {content.hero.sub}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#specs"
              className="rounded-full bg-white-hot px-7 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-graphite transition-colors duration-300 hover:bg-brass"
            >
              {content.hero.primaryCta}
            </a>
            <a
              href={`https://wa.me/2${content.contact.phones[0]}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-7 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-white-hot transition-colors duration-300 hover:border-brass hover:text-brass"
            >
              {content.hero.secondaryCta}
            </a>
          </div>

        </div>

        {/* Aperture. The brass hairline frame echoes their storefront lettering. */}
        <figure className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1">
          {/* Height-capped rather than aspect-driven: a 4:5 aperture at this
              column width would push the whole hero past a screen. */}
          <div className="relative aspect-[4/5] max-h-[62vh] overflow-hidden rounded-[2px] border border-white/10 lg:aspect-auto lg:h-[64vh]">
            <Image
              src={HERO_FRAME}
              alt={content.gallery.items[0]?.alt ?? ""}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent opacity-70" />
          </div>

          <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-steel-2">
            <span>{wheels.wall.caption}</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-live" />
              {content.brand.tagline}
            </span>
          </figcaption>
        </figure>

        {/* Readout strip: mono, tabular, hairline-separated. */}
        <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-6 sm:flex sm:flex-wrap sm:gap-x-10 lg:col-start-1 lg:row-start-2 lg:self-start">
          {readout.map((item) => (
            <div key={item.k}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel-2">
                {item.k}
              </dt>
              <dd className="mt-1.5 font-mono text-[13px] text-white-hot">{item.v}</dd>
            </div>
          ))}
          <div className="col-span-2 sm:col-auto">
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel-2">
              {content.contact.addressLabel}
            </dt>
            <dd className="mt-1.5 font-mono text-[13px] text-white-hot">
              {content.contact.address}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
