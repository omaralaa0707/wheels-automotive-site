"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Locale, SiteContent } from "./schema";

type LocaleContextValue = {
  locale: Locale;
  dir: "rtl" | "ltr";
  content: SiteContent;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "site-locale";

export function LocaleProvider({
  children,
  dictionaries,
  defaultLocale = "ar",
}: {
  children: ReactNode;
  dictionaries: Record<Locale, SiteContent>;
  defaultLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // Restore the visitor's prior choice after hydration. Reading storage during
  // render would desync server and client markup.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "ar" || stored === "en") setLocaleState(stored);
  }, []);

  // The <html> element owns lang/dir so CSS logical properties and screen
  // readers both follow the toggle.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "ar" ? "en" : "ar";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const content = dictionaries[locale];

  return (
    <LocaleContext.Provider
      value={{
        locale,
        dir: locale === "ar" ? "rtl" : "ltr",
        content,
        setLocale,
        toggleLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}

/** Shorthand for the common case of only needing the copy. */
export function useContent() {
  return useLocale().content;
}
