import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { en, type Messages } from "./en";
import { es } from "./es";
import { SITE } from "../lib/site";

export type Locale = "en" | "es";

const dict: Record<Locale, Messages> = { en, es };

const STORAGE_KEY = "natufresh-locale";

function getNested(obj: unknown, path: string): string | undefined {
  return path.split(".").reduce<unknown>((o, k) => {
    if (o && typeof o === "object" && k in o) {
      return (o as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj) as string | undefined;
}

type TFn = (key: string, vars?: Record<string, string | number>) => string;

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: TFn;
};

const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const s = localStorage.getItem(STORAGE_KEY);
    if (s === "es" || s === "en") return s;
    const nav = navigator.language?.toLowerCase() ?? "en";
    return nav.startsWith("es") ? "es" : "en";
  });

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "es" ? "es" : "en";
  }, [locale]);

  const t: TFn = useCallback(
    (key, vars) => {
      const raw =
        getNested(dict[locale], key) ?? getNested(dict.en, key) ?? key;
      const merged: Record<string, string | number> = {
        yearsExperience: SITE.yearsExperience,
        owner: SITE.owner,
        phone: SITE.phoneDisplay,
        year: new Date().getFullYear(),
        ...vars,
      };
      let out = raw;
      for (const [k, v] of Object.entries(merged)) {
        out = out.split(`{${k}}`).join(String(v));
      }
      return out;
    },
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
