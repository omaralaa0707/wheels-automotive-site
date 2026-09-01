import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";

/**
 * This site's signature section is a spec reader, so it needs a handful of
 * strings the shared schema doesn't carry. Extending here keeps the shared
 * schema untouched while staying fully typed.
 */
export type WheelsContent = SiteContent & {
  specs: {
    heading: string;
    intro: string;
    /** Column header above the equipment list. */
    kitLabel: string;
    /** Prefix for the running index, e.g. "Unit". */
    indexLabel: string;
    /** Per-car spec labels, keyed by the English label in media.ts. */
    labels: Record<string, string>;
    /** Spec values that carry words rather than pure figures. */
    values: Record<string, string>;
    /** Equipment lines, keyed by the English line in media.ts. */
    kit: Record<string, string>;
    /** Model names stay Latin; this labels the year row. */
    yearLabel: string;
  };
  wall: {
    heading: string;
    intro: string;
    caption: string;
    /** Mono strip along the bottom of the board. */
    readout: string;
  };
  marques: {
    heading: string;
    intro: string;
  };
};

export function useWheels() {
  return useContent() as WheelsContent;
}
