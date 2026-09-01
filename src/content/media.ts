/**
 * Specs transcribed verbatim from Wheels Automotive's own captions. Photographs
 * are paired only where the car in frame matches the spec sheet.
 */

export type Spec = { label: string; value: string };

export type Car = {
  make: string;
  model: string;
  year: string;
  frame: string;
  /** Headline figures, as they list them. */
  headline: Spec[];
  /** The rest of their equipment list, in their order. */
  kit: string[];
};

export const CARS: Car[] = [
  {
    make: "BYD",
    model: "Leopard 5",
    year: "2025",
    frame: "/media/car-03.jpg",
    headline: [
      { label: "Power", value: "680 hp" },
      { label: "Torque", value: "720 Nm" },
      { label: "Drivetrain", value: "PHEV 1.5T" },
      { label: "EV range", value: "125 km" },
    ],
    kit: [
      "Dual electric motor",
      "4WD",
      "Full ADAS driving assistance",
      "Front & rear differential locks",
      "23-speaker Devialet",
      "Three screens",
      "Nine driving modes",
      "Full film protection, 10 years",
      "Roof rack, electric side step, side ladder",
    ],
  },
  {
    make: "Audi",
    model: "Q7 S-line",
    year: "2025",
    frame: "/media/car-04.jpg",
    headline: [
      { label: "Engine", value: "2000 cc" },
      { label: "Power", value: "261 hp" },
      { label: "Seats", value: "7" },
      { label: "Suspension", value: "Hydraulic" },
    ],
    kit: [
      "360° cameras",
      "Soft-close doors",
      "Keyless entry",
      "Projector headlights",
      "Panoramic sunroof",
      "Front & rear climate control",
      "Heated & ventilated seats",
      "Adjustable ride height",
      "Electric tow hitch, power tailgate",
      "Bang & Olufsen sound system",
    ],
  },
  {
    make: "Mercedes-Benz",
    model: "E200",
    year: "2026",
    frame: "/media/car-11.jpg",
    headline: [
      { label: "Engine", value: "2000 cc" },
      { label: "Power", value: "224 hp" },
      { label: "Rims", value: '20"' },
      { label: "Audio", value: "Burmester" },
    ],
    kit: [
      "360° camera",
      "Keyless entry",
      "Heated electric seats with memory",
      "Wireless charging",
      "Apple CarPlay & Android Auto",
      "Digital Light headlamps",
      "Blind Spot Assist",
      "Panoramic sunroof",
    ],
  },
  {
    make: "Range Rover",
    model: "Velar",
    year: "2023",
    frame: "/media/car-15.jpg",
    headline: [
      { label: "Engine", value: "2000 cc" },
      { label: "Power", value: "250 hp" },
      { label: "Rims", value: '20"' },
      { label: "Audio", value: "Meridian" },
    ],
    kit: [
      "Keyless entry",
      "Rear view camera",
      "Front & rear parking sensors",
      "Panoramic sunroof",
      "Electric seats with memory",
      "Apple CarPlay & Android Auto",
      "Brake assist",
      "Power-folding mirrors",
      "10-colour ambient lighting",
    ],
  },
  {
    make: "Mercedes-Benz",
    model: "C180",
    year: "2024",
    frame: "/media/car-09.jpg",
    headline: [
      { label: "Engine", value: "1500 cc" },
      { label: "Power", value: "184 hp" },
      { label: "Rims", value: '18"' },
      { label: "Camera", value: "360°" },
    ],
    kit: [
      "Panoramic sunroof",
      "Heated electric seats",
      "Keyless entry",
      "LED High Performance headlamps",
      "Electric seats with memory",
      "Wireless Apple CarPlay & Android Auto",
      "Wireless charging",
    ],
  },
];

/**
 * Marques from their highlight reels, plus Xiaomi — an SU7 is visibly badged in
 * one of their own showroom frames, so it belongs on the list.
 */
export const MARQUES = [
  "Mercedes-Benz",
  "BMW",
  "Porsche",
  "Land Rover",
  "Jaguar",
  "CUPRA",
  "MINI",
  "Audi",
  "BYD",
  "Xiaomi",
];

/** Storefront frames — the gold WHEELS signage is their landmark. */
export const STOREFRONT = [
  "/media/car-01.jpg",
  "/media/car-05.jpg",
  "/media/car-14.jpg",
  "/media/car-17.jpg",
  "/media/car-19.jpg",
];

/** Dark showroom frames under their winged-wheel emblem. */
export const SHOWROOM = [
  "/media/car-08.jpg",
  "/media/car-10.jpg",
  "/media/car-12.jpg",
  "/media/car-22.jpg",
  "/media/car-23.jpg",
  "/media/car-24.jpg",
];

export const HERO_FRAME = "/media/car-11.jpg";
