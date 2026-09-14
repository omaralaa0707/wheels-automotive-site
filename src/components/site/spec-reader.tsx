"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { CARS } from "@/content/media";
import { useWheels } from "@/content/schema-ext";
import { useMediaQuery, useReducedMotion } from "@/lib/use-browser";
import { cn } from "@/lib/utils";

/**
 * The centrepiece: their spec cards, read the way you'd read an instrument
 * cluster. Scrolling steps through the cars; each figure re-seats itself with a
 * short mechanical throw rather than crossfading, so numbers feel stamped.
 */
export function SpecReader() {
  const wheels = useWheels();
  const { locale } = useLocale();
  const reduced = useReducedMotion();
  // A phone screen can't hold one car's full spec card at once, so the pinned
  // reader is a desktop behaviour; narrow screens get the cards laid out.
  const wide = useMediaQuery("(min-width: 1024px)");
  const stacked = reduced || !wide;
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (stacked) return;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: `+=${CARS.length * 90}%`,
        pin: ".spec-stage",
        scrub: true,
        onUpdate: (self) => {
          // Written straight to the node: this fires every scrubbed frame, and
          // routing it through state would re-render the whole cluster.
          if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;

          // Bias slightly forward so a car holds through its own segment
          // instead of flicking at the boundary.
          const i = Math.min(
            CARS.length - 1,
            Math.floor(self.progress * CARS.length * 0.999)
          );
          setActive(i);
        },
      });
      return () => st.kill();
    },
    { scope: root, dependencies: [stacked] }
  );

  const car = CARS[active];
  const t = (map: Record<string, string>, key: string) => map[key] ?? key;

  // Without the pin there is no scroll to step through the cars, so the
  // unpinned path lays every spec card out plainly instead of only the first.
  if (stacked) {
    return (
      <section id="specs" className="border-t border-white/8">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-brass">
            {wheels.specs.heading}
          </p>
          <p className="mt-3 max-w-[52ch] text-lead leading-[1.7] text-steel">
            {wheels.specs.intro}
          </p>

          <div className="mt-12 grid gap-12">
            {CARS.map((c) => (
              <article key={c.model} className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] border border-white/10">
                  <Image
                    src={c.frame}
                    alt={`${c.make} ${c.model} ${c.year}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="object-cover"
                  />
                  <span aria-hidden className="absolute left-3 top-3 h-4 w-4 border-l border-t border-brass/70" />
                  <span aria-hidden className="absolute right-3 top-3 h-4 w-4 border-r border-t border-brass/70" />
                  <span aria-hidden className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-brass/70" />
                  <span aria-hidden className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-brass/70" />
                </div>
                <div>
                  <p
                    dir="ltr"
                    className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-steel-2 rtl:justify-end"
                  >
                    {c.make}
                    <span aria-hidden className="h-px w-6 bg-brass/60" />
                    <span className="text-brass">{c.year}</span>
                  </p>
                  <h3
                    dir="ltr"
                    className="mt-3 font-display text-display font-bold uppercase text-white-hot rtl:text-end"
                  >
                    {c.model}
                  </h3>
                  <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {c.headline.map((s) => (
                      <div key={s.label}>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-2">
                          {t(wheels.specs.labels, s.label)}
                        </dt>
                        <dd className="mt-1.5 font-display text-[18px] font-bold text-white-hot">
                          {t(wheels.specs.values, s.value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    {c.kit.map((line) => (
                      <li key={line} className="flex gap-3 text-[13.5px] text-steel">
                        <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-brass/70" />
                        {t(wheels.specs.kit, line)}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="specs" ref={root} className="relative border-t border-white/8">
      <div className="spec-stage relative min-h-screen overflow-hidden">
        <div className="grid-field pointer-events-none absolute inset-0 opacity-40" />

        {/* Travel through the reader, read off the top edge like a gauge. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-px bg-white/10">
          <div
            ref={bar}
            className="h-full origin-left scale-x-0 bg-brass rtl:origin-right"
          />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-5 py-24 sm:px-8">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-brass">
                {wheels.specs.heading}
              </p>
              <p className="mt-3 max-w-[52ch] text-lead leading-[1.7] text-steel">
                {wheels.specs.intro}
              </p>
            </div>

            {/* Index rail — the running count of cars in the reader. */}
            <ol className="flex items-center gap-2.5 font-mono text-[11px]">
              {CARS.map((c, i) => (
                <li
                  key={c.model}
                  className={cn(
                    "h-6 border-b transition-all duration-500",
                    i === active
                      ? "w-9 border-brass text-brass"
                      : "w-6 border-white/15 text-steel-2"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </li>
              ))}
            </ol>
          </header>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            {/* Plate */}
            <figure className="relative aspect-[4/3] overflow-hidden rounded-[2px] border border-white/10 bg-graphite-2">
              {CARS.map((c, i) => (
                <Image
                  key={c.frame}
                  src={c.frame}
                  alt={`${c.make} ${c.model} ${c.year}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className={cn(
                    "object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                    i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                  )}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/70 to-transparent" />

              {/* Registration ticks — the aperture reads as an instrument, not a card. */}
              <span aria-hidden className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-brass/70" />
              <span aria-hidden className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-brass/70" />
              <span aria-hidden className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-brass/70" />
              <span aria-hidden className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-brass/70" />

              <figcaption className="absolute bottom-5 start-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white-hot/80">
                {wheels.specs.indexLabel} {String(active + 1).padStart(2, "0")}
              </figcaption>
            </figure>

            {/* Cluster */}
            <div>
              {/* Make and year ride together in an LTR mono line; mixing a Latin
                  year into the Arabic display heading collides under bidi. */}
              <p
                dir="ltr"
                className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-steel-2 rtl:justify-end"
              >
                {car.make}
                <span aria-hidden className="h-px w-6 bg-brass/60" />
                <span className="text-brass">{car.year}</span>
              </p>
              <h3
                key={`${car.model}-${locale}`}
                dir="ltr"
                className="mt-3 font-display text-display font-bold uppercase leading-[1.02] tracking-[-0.01em] text-white-hot rtl:text-end [animation:seat_.7s_cubic-bezier(0.16,1,0.3,1)_both]"
              >
                {car.model}
              </h3>

              <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-[2px] border border-white/10 bg-white/10 sm:grid-cols-4">
                {car.headline.map((s, i) => (
                  <div key={s.label} className="bg-graphite px-4 py-5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-2">
                      {t(wheels.specs.labels, s.label)}
                    </dt>
                    <dd
                      key={`${car.model}-${s.label}-${locale}`}
                      className="mt-2 font-display text-[19px] font-bold leading-tight text-white-hot [animation:seat_.6s_cubic-bezier(0.16,1,0.3,1)_both]"
                      style={{ animationDelay: `${0.05 + i * 0.06}s` }}
                    >
                      {t(wheels.specs.values, s.value)}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                {wheels.specs.kitLabel}
              </p>
              <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {car.kit.map((line, i) => (
                  <li
                    key={`${car.model}-${line}`}
                    className="flex gap-3 text-[13.5px] leading-[1.55] text-steel [animation:seat_.55s_cubic-bezier(0.16,1,0.3,1)_both]"
                    style={{ animationDelay: `${0.12 + i * 0.035}s` }}
                  >
                    <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-brass/70" />
                    {t(wheels.specs.kit, line)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
