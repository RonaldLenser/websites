import { Seo } from "../components/Seo";
import { LogoImage } from "../components/WorkImage";
import { IMAGES, SITE } from "../lib/site";
import { Link } from "react-router-dom";
import { useLocale } from "../i18n/LocaleProvider";

const sectionKeys = [
  { title: "sec1t" as const, body: "sec1b" as const },
  { title: "sec2t" as const, body: "sec2b" as const },
  { title: "sec3t" as const, body: "sec3b" as const },
  { title: "sec4t" as const, body: "sec4b" as const },
];

export function About() {
  const { t } = useLocale();

  return (
    <>
      <Seo
        title={t("aboutPage.seo.title")}
        description={t("aboutPage.seo.description")}
      />

      <div className="border-b border-greige/30 bg-warm-white/80">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
            {t("aboutPage.h1", { yearsExperience: SITE.yearsExperience })}
          </h1>
          <p className="mt-5 max-w-3xl text-balance text-lg text-navy/75">
            {t("aboutPage.intro", {
              yearsExperience: SITE.yearsExperience,
              owner: SITE.owner,
            })}
          </p>
        </div>
      </div>

      <div className="bg-warm-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-16">
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-eco-green">
                {t("aboutPage.brand")}
              </p>
              <h2 className="text-2xl font-extrabold text-navy">
                {t("aboutPage.presH2")}
              </h2>
              <p className="text-sm text-navy/65">{t("aboutPage.presLead")}</p>
              <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-eco-green/15 bg-white p-6 shadow-card ring-1 ring-deep-blue/10">
                <LogoImage
                  variant="about"
                  alt={t("aboutPage.logoAlt")}
                  loading="lazy"
                />
              </div>
              <div className="mx-auto max-w-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-eco-green/30 bg-soft-green/50 px-4 py-1.5 text-sm font-bold text-eco-green">
                  <span className="text-base leading-none" aria-hidden>✓</span>
                  {t("aboutPage.licensedBadge")}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-12 lg:col-span-7">
            {sectionKeys.map((s) => (
              <section key={s.title}>
                <h2 className="text-xl font-extrabold text-navy sm:text-2xl">
                  {t(`aboutPage.${s.title}`)}
                </h2>
                <p className="mt-2 text-navy/75 leading-relaxed">
                  {t(`aboutPage.${s.body}`)}
                </p>
              </section>
            ))}
            <section className="rounded-2xl border border-navy/8 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-navy sm:text-2xl">
                {t("aboutPage.credH2")}
              </h2>
              <p className="mt-2 leading-relaxed text-navy/75">
                {t("aboutPage.credBody", { owner: SITE.owner })}
              </p>
              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-navy/45">
                {t("aboutPage.credTrustedWith")}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-6">
                <img
                  src={IMAGES.pwhi}
                  alt={t("aboutPage.credPwhiAlt")}
                  loading="lazy"
                  className="h-16 w-auto object-contain"
                />
                <img
                  src={IMAGES.dataIntegration}
                  alt={t("aboutPage.credDataAlt")}
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </section>
            <div className="rounded-2xl border border-navy/8 bg-soft-blue/40 p-6 sm:p-8">
              <h2 className="text-lg font-extrabold text-navy">
                {t("aboutPage.boxH2")}
              </h2>
              <p className="mt-2 text-sm text-navy/70">
                {t("aboutPage.boxLead")}
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex h-12 items-center justify-center rounded-lg bg-navy px-6 text-sm font-bold text-white transition hover:bg-deep-blue"
              >
                {t("aboutPage.boxCta")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
