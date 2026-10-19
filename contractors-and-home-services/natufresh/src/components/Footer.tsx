import { Link } from "react-router-dom";
import { LogoImage } from "./WorkImage";
import { SITE } from "../lib/site";
import { useLocale } from "../i18n/LocaleProvider";

export function Footer() {
  const { t } = useLocale();
  const y = new Date().getFullYear();

  const serviceKeys = ["s1", "s2", "s3", "s4", "s5", "s6"] as const;

  return (
    <footer className="border-t border-navy/8 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="mb-3 inline-block">
              <LogoImage variant="footer" />
            </Link>
            <p className="text-sm font-medium text-navy/75">{SITE.tagline}</p>
            <p className="mt-2 text-sm text-navy/60">{t("footer.companyBlurb")}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-eco-green/30 bg-soft-green/50 px-3 py-1 text-xs font-bold text-eco-green">
              <span className="leading-none" aria-hidden>✓</span>
              {t("footer.licensedInsured")}
            </span>
          </div>
          <div>
            <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-navy/50">
              {t("footer.servicesHeading")}
            </h2>
            <ul className="mt-3 space-y-2">
              {serviceKeys.map((k) => (
                <li key={k}>
                  <Link
                    to="/services"
                    className="text-sm text-navy/75 transition hover:text-deep-blue"
                  >
                    {t(`footer.${k}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-navy/50">
              {t("footer.contactHeading")}
            </h2>
            <p className="mt-3 text-sm font-medium text-navy">NatuFresh LLC</p>
            <p className="mt-2 text-sm text-navy/75">
              <a
                className="hover:text-deep-blue"
                href={`tel:+1${SITE.phoneTel}`}
              >
                {SITE.phoneDisplay}
              </a>
            </p>
            <p className="text-sm text-navy/75">
              <a
                className="break-all hover:text-deep-blue"
                href={`mailto:${SITE.email}`}
              >
                {SITE.email}
              </a>
            </p>
          </div>
          <div>
            <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-navy/50">
              {t("footer.getQuoteHeading")}
            </h2>
            <p className="mt-3 text-sm text-navy/70">{t("footer.getQuoteText")}</p>
            <Link
              to="/contact"
              className="mt-4 inline-flex h-11 items-center justify-center rounded-lg bg-eco-green px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-deep-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eco-green"
            >
              {t("footer.getQuoteCta")}
            </Link>
          </div>
        </div>
        <div className="mt-12 border-t border-navy/8 pt-8 text-center text-xs text-navy/45">
          {t("footer.copyright", { year: y })}
        </div>
      </div>
    </footer>
  );
}
