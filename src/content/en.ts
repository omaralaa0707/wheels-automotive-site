import type { WheelsContent } from "./schema-ext";
import { STOREFRONT, SHOWROOM } from "./media";

/**
 * English adapts the Arabic rather than translating it literally — same
 * spec-led confidence, without the Egyptian idiom that doesn't carry over.
 * Spec labels/values pass through unchanged, so the maps stay identities.
 */
export const en: WheelsContent = {
  locale: "en",
  dir: "ltr",
  brand: {
    name: "Wheels Automotive",
    shortName: "WHEELS",
    tagline: "Two move the body — four move the soul",
  },
  nav: [
    { label: "Stock", href: "#specs" },
    { label: "Showroom", href: "#wall" },
    { label: "Marques", href: "#marques" },
    { label: "Visit", href: "#visit" },
  ],
  hero: {
    eyebrow: "46 El-Thawra Street — Heliopolis, Cairo",
    headline: "Drive the change",
    sub: "Wheels Automotive. A short list of cars chosen one at a time, in dealer condition, with every figure printed before you have to ask for it.",
    primaryCta: "See what's in",
    secondaryCta: "WhatsApp us",
  },
  about: {
    heading: "The showroom",
    body: [
      "We work out of Heliopolis with a deliberately short list — cars we know, rather than a long row with histories we don't.",
      "Every car carries a full spec card: engine, output, rims, audio, and everything fitted inside. What you read here is what stands in the hall.",
    ],
    stats: [
      { value: "10", label: "Marques on the floor" },
      { value: "700+", label: "Cars posted" },
      { value: "13.3K", label: "Following" },
    ],
  },
  services: {
    heading: "How we work",
    items: [
      {
        title: "Every figure printed",
        body: "No \"come and see.\" Each car's full spec card is published before you leave the house.",
      },
      {
        title: "Chosen one at a time",
        body: "We inspect a car ourselves before it enters the hall. If we wouldn't buy it, we don't list it.",
      },
      {
        title: "Handed over in the hall",
        body: "You collect from the Heliopolis showroom, prepared and ready — not from a lock-up across town.",
      },
    ],
  },
  gallery: {
    heading: "From the hall",
    items: [
      ...SHOWROOM.map((src) => ({ src, alt: "A car inside the Wheels Automotive showroom" })),
      ...STOREFRONT.map((src) => ({ src, alt: "The Wheels Automotive storefront in Heliopolis" })),
    ],
  },
  contact: {
    heading: "Visit",
    intro: "The hall is open, and the cars above are genuinely standing in it.",
    addressLabel: "Address",
    address: "46 El-Thawra Street, Heliopolis, Cairo",
    phoneLabel: "Phone / WhatsApp",
    phones: ["01070719678"],
    hoursLabel: "Hours",
    hours: "Daily, 11:00 — 22:00",
    mapsUrl: "https://maps.app.goo.gl/H2eot5QANGHGi2Fd8",
    instagramUrl: "https://www.instagram.com/wheels.eg/",
    cta: "Message us on WhatsApp",
  },
  footer: {
    rights: "© Wheels Automotive. All rights reserved.",
  },
  a11y: {
    toggleLanguage: "Switch to Arabic",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  specs: {
    heading: "Spec card",
    intro: "Five cars from the hall, carrying exactly the figures we publish on our own channels — nothing added.",
    kitLabel: "Equipment",
    indexLabel: "Unit",
    yearLabel: "Model year",
    labels: {},
    values: {},
    kit: {},
  },
  wall: {
    heading: "The hall",
    intro: "The showroom wall turns over from one car to the next — the way a split-flap board changes.",
    caption: "Heliopolis — inside the hall",
    readout: "Split-flap board · 6 frames",
  },
  marques: {
    heading: "Marques",
    intro: "What moves through the hall across a year.",
  },
};
