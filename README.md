# Wheels Automotive — concept site

A bilingual (Arabic / English) concept marketing site for **Wheels Automotive**,
46 El-Thawra Street, Heliopolis, Cairo.

> **Concept design — not the official Wheels Automotive website.** Photography
> and specifications are taken from the dealership's own public channels.

## The idea

Wheels publish spec-led captions: every car they post arrives with its engine,
output, rims, audio and full equipment list written out. So this site is built
as an **instrument panel** rather than a showroom lobby — graphite and steel,
brass used only where their own emblem uses it, mono type carrying every figure,
and a mint "live" accent for status.

## Signature technique — the split-flap wall

`src/components/three/flip-wall.tsx` renders their showroom as a **split-flap
board**: an `InstancedMesh` of 9×6 tiles, each carrying a slice of the current
photograph on its front face and the next photograph on its back. Scroll drives
a diagonal wave of flips, so one car turns into the next the way an airport
board changes.

Details worth noting:

- Each tile samples only its own slice via an `aUvOffset` instanced attribute —
  without it, every tile would show the whole photo.
- The back face mirrors `v`, because rotating about the horizontal axis
  otherwise delivers the next photograph upside down.
- Photos are **cover-fitted** to the wall's aspect in the shader rather than
  stretched, and the wall is sized from the live frustum so it always reaches
  the viewport edges.
- A gentle gamma lift keeps their very dark showroom photography readable at
  wall scale.

## The spec reader

`src/components/site/spec-reader.tsx` pins and steps through five cars as you
scroll. Figures don't crossfade — they **seat**, like a gauge needle finding its
stop. A brass hairline along the top edge reads out travel through the section.

Every figure is transcribed verbatim from Wheels' own captions
(`src/content/media.ts`); nothing is invented or rounded.

## Bilingual

Arabic is the primary locale and the default. The toggle swaps a full content
dictionary and flips `lang`/`dir` on `<html>`; Arabic type scales are keyed to
`[dir="rtl"]` (never `[lang]`, which browser translation rewrites) and live
outside `@layer` so they outrank Tailwind's utilities.

## Fallbacks

- Every WebGL surface is guarded by `use-webgl-health`; a dropped context falls
  back to a static grid of the same frames.
- `prefers-reduced-motion` and viewports under `1024px` skip the pinned reader
  and lay all five spec cards out plainly — a phone can't hold one card at once.

## Brand mark

`public/mark.svg` is their winged-brass roundel, redrawn from the piece mounted
on their showroom wall (their Instagram avatar is a family photograph, not a
logo). It is built for the graphite ground — the dark details are knockouts.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger ·
Lenis · react-three-fiber / three.js

```bash
pnpm install
pnpm dev
```

Fonts: Chakra Petch (display), IBM Plex Sans / Mono, Noto Kufi Arabic.
