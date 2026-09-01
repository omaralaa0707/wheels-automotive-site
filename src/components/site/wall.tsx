"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { FlipWall } from "@/components/three/flip-wall";
import { SHOWROOM } from "@/content/media";
import { useWheels } from "@/content/schema-ext";
import { useReducedMotion } from "@/lib/use-browser";

/**
 * Their showroom wall, turned into a split-flap board. Scroll drives the flip
 * progress through the run of showroom frames; if the GPU drops the context or
 * the visitor has asked for less motion, the same frames fall back to a grid.
 */
export function Wall() {
  const wheels = useWheels();
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const reduced = useReducedMotion();
  const [glLost, setGlLost] = useState(false);

  const onLost = useCallback((lost: boolean) => setGlLost(lost), []);

  useGSAP(
    () => {
      if (reduced) return;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=300%",
        pin: ".wall-stage",
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });
      return () => st.kill();
    },
    { scope: root, dependencies: [reduced] }
  );

  const fallback = reduced || glLost;

  if (fallback) {
    return (
      <section id="wall" className="border-t border-white/8">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-brass">
            {wheels.wall.heading}
          </p>
          <p className="mt-3 max-w-[52ch] text-lead leading-[1.7] text-steel">
            {wheels.wall.intro}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
            {SHOWROOM.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-[2px] border border-white/10"
              >
                <Image
                  src={src}
                  alt={wheels.wall.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="wall" ref={root} className="relative border-t border-white/8">
      <div className="wall-stage relative min-h-screen overflow-hidden">
        <FlipWall
          urls={SHOWROOM}
          progressRef={progress}
          className="absolute inset-0 z-0"
          onLost={onLost}
        />

        {/* Scrims: top and bottom for the edges, plus one down the text column,
            since the tiles behind the copy are photographs, not flat colour. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-graphite to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-graphite to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 z-10 w-full max-w-[820px] bg-gradient-to-l from-graphite via-graphite/92 to-transparent ltr:left-0 ltr:bg-gradient-to-r rtl:right-0" />

        <div className="pointer-events-none relative z-20 mx-auto flex min-h-screen max-w-[1400px] flex-col justify-between px-5 py-24 sm:px-8">
          <div className="max-w-[42ch]">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-brass">
              {wheels.wall.caption}
            </p>
            <h2 className="mt-4 font-display text-display font-bold uppercase leading-[1.04] text-white-hot">
              {wheels.wall.heading}
            </h2>
            <p className="mt-5 text-lead leading-[1.75] text-steel">{wheels.wall.intro}</p>
          </div>

          {/* The board's own readout strip. */}
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white-hot/60">
            {wheels.wall.readout}
          </p>
        </div>
      </div>
    </section>
  );
}
