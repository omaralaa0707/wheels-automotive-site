"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useScrolledPast } from "@/lib/use-browser";
import { cn } from "@/lib/utils";

export function Nav() {
  const { content, locale, toggleLocale } = useLocale();
  const scrolled = useScrolledPast(40);
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-white/8 bg-graphite/85 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-[68px] max-w-[1400px] items-center gap-6 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <Image src="/mark.svg" alt="" width={40} height={30} className="h-[26px] w-auto" priority />
          <span className="font-display text-[15px] font-bold tracking-[0.34em] text-white-hot">
            WHEELS
          </span>
        </a>

        <nav className="ms-auto hidden items-center gap-8 md:flex">
          {content.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel transition-colors duration-300 hover:text-brass"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-3 md:ms-6">
          {/* Bordered, so a single-glyph label reads as a control rather than
              as a stray character next to the hotline. */}
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={content.a11y.toggleLanguage}
            className="grid h-8 min-w-9 place-items-center rounded-full border border-white/15 px-2.5 font-mono text-[11px] uppercase leading-none tracking-[0.12em] text-steel transition-colors duration-300 hover:border-brass hover:text-brass"
          >
            {locale === "ar" ? "EN" : "ع"}
          </button>

          <a
            href={`tel:${content.contact.phones[0]}`}
            dir="ltr"
            className="hidden rounded-full border border-brass/45 px-4 py-1.5 font-mono text-[11px] tracking-[0.1em] text-brass transition-colors duration-300 hover:bg-brass hover:text-graphite sm:block"
          >
            {content.contact.phones[0]}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? content.a11y.closeMenu : content.a11y.openMenu}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center md:hidden"
          >
            <span className="relative block h-[9px] w-[18px]">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-px bg-white-hot transition-transform duration-300",
                  open && "translate-y-[4px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px bg-white-hot transition-transform duration-300",
                  open && "-translate-y-[4px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet. Height-animated so it slides rather than snapping. */}
      <div
        className={cn(
          "overflow-hidden border-t border-white/8 bg-graphite/97 backdrop-blur-xl transition-[max-height] duration-500 md:hidden",
          open ? "max-h-72" : "max-h-0 border-t-transparent"
        )}
      >
        <nav className="flex flex-col px-5 py-2">
          {content.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/6 py-3.5 font-mono text-[12px] uppercase tracking-[0.18em] text-steel last:border-b-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
