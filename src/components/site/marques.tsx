"use client";

import { useLocale } from "@/i18n/locale-provider";
import { MARQUES } from "@/content/media";
import { useWheels } from "@/content/schema-ext";
import { Reveal } from "@/components/motion/reveal";

/**
 * Purely typographic. We can't verify which photo shows which marque well
 * enough to pair them, so the marques are named and not illustrated — the same
 * rule applied across these sites.
 */
export function Marques() {
  const { content } = useLocale();
  const wheels = useWheels();

  return (
    <section id="marques" className="border-t border-white/8">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-brass">
              {wheels.marques.heading}
            </p>
            <p className="mt-3 max-w-[38ch] text-lead leading-[1.7] text-steel">
              {wheels.marques.intro}
            </p>
          </div>

          <ul className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {MARQUES.map((m, i) => (
              <li key={m} className="border-b border-white/10">
                <Reveal delay={i * 0.03}>
                  {/* Latin marque names stay LTR even in the Arabic layout. */}
                  <span
                    dir="ltr"
                    className="block py-4 font-display text-[17px] font-bold uppercase tracking-[0.06em] text-white-hot/85 transition-colors duration-300 hover:text-brass"
                  >
                    {m}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* Their own tagline, set as a rule across the page. */}
        <div className="mt-20 border-t border-white/10 pt-10">
          <p className="font-display text-section font-bold uppercase leading-[1.15] tracking-[-0.01em] text-brass">
            {content.brand.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
