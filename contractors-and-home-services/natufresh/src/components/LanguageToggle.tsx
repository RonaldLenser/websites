import { useLocale } from "../i18n/LocaleProvider";

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg border border-navy/10 bg-light-gray/80 p-0.5"
      role="group"
      aria-label={t("language.label")}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`min-w-[2.5rem] rounded-md px-2 py-1.5 text-xs font-bold transition ${
          locale === "en"
            ? "bg-white text-navy shadow-sm ring-1 ring-navy/10"
            : "text-navy/55 hover:text-navy"
        }`}
      >
        {t("language.en")}
      </button>
      <button
        type="button"
        onClick={() => setLocale("es")}
        aria-pressed={locale === "es"}
        className={`min-w-[2.5rem] rounded-md px-2 py-1.5 text-xs font-bold transition ${
          locale === "es"
            ? "bg-white text-navy shadow-sm ring-1 ring-navy/10"
            : "text-navy/55 hover:text-navy"
        }`}
      >
        {t("language.es")}
      </button>
    </div>
  );
}
