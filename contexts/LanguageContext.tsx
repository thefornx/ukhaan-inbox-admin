"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import en from "@/dictionaries/en.json";
import mn from "@/dictionaries/mn.json";

export const LOCALES = ["en", "mn"] as const;
export type Locale = (typeof LOCALES)[number];

/** localStorage key — must match the inline boot script in `app/layout.tsx`. */
export const LANGUAGE_STORAGE_KEY = "language";
export const DEFAULT_LOCALE: Locale = "en";

type Dictionary = typeof en;

const DICTIONARIES: Record<Locale, Dictionary> = { en, mn: mn as Dictionary };

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "mn";
}

/**
 * Resolve the active locale on the client by reading the `lang` attribute
 * that the boot script in the root layout writes to <html> before hydration.
 * On the server we fall back to `DEFAULT_LOCALE` to keep the first render
 * deterministic.
 */
function getInitialLocale(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const attr = document.documentElement.getAttribute("lang");
  return isLocale(attr) ? attr : DEFAULT_LOCALE;
}

function resolvePath(dict: Dictionary, path: string): string | undefined {
  const parts = path.split(".");
  let current: unknown = dict;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof current === "string" ? current : undefined;
}

function interpolate(value: string, vars?: Record<string, string | number>): string {
  if (!vars) return value;
  return value.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  // Keep <html lang> and localStorage in sync with state. On first mount this
  // writes back the same value the boot script set, so there is no flash.
  useEffect(() => {
    document.documentElement.setAttribute("lang", locale);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
    } catch {
      // Ignore: storage may be unavailable (private mode, blocked cookies).
    }
  }, [locale]);

  // Reflect changes made in other tabs/windows.
  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== LANGUAGE_STORAGE_KEY) return;
      if (isLocale(event.newValue)) {
        setLocaleState(event.newValue);
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);

  const value = useMemo<LanguageContextValue>(() => {
    const dict = DICTIONARIES[locale];
    const t = (path: string, vars?: Record<string, string | number>) => {
      const resolved = resolvePath(dict, path) ?? resolvePath(DICTIONARIES.en, path) ?? path;
      return interpolate(resolved, vars);
    };
    return { locale, setLocale, t };
  }, [locale, setLocale]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a <LanguageProvider>");
  }
  return ctx;
}

export function useTranslation() {
  const { t, locale } = useLanguage();
  return { t, locale };
}
