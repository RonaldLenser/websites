import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { WorkImage } from "../components/WorkImage";
import { IMAGES, SITE } from "../lib/site";
import { useLocale } from "../i18n/LocaleProvider";

const trustKeys = ["trust1", "trust2", "trust3", "trust4"] as const;
const statKeys = ["stat1", "stat2", "stat3", "stat4"] as const;
const homeCards: { t: "home.card1t" | "home.card2t" | "home.card3t"; b: "home.card1b" | "home.card2b" | "home.card3b" }[] = [
  { t: "home.card1t", b: "home.card1b" },
  { t: "home.card2t", b: "home.card2b" },
  { t: "home.card3t", b: "home.card3b" },
];
const previewKeys = ["p1", "p2", "p3", "p4", "p5", "p6"] as const;
const whyKeys = ["why1", "why2", "why3", "why4", "why5", "why6"] as const;

export function Home() {
  const { t } = useLocale();

  return (
    <>
      <Seo
        title={t("home.seo.title")}
        description={t("home.seo.description")}
      />

      <section className="border-b border-greige/30 bg-warm-white/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-20 lg:pl-8 lg:pr-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-deep-blue">
              {t("home.heroEyebrow")}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl">
              {t("home.heroH1")}
            </h1>
            <p className="mt-4 max-w-xl text-balance text-lg text-navy/70">
              {t("home.heroLead", { yearsExperience: SITE.yearsExperience })}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex h-12 min-w-[11rem] items-center justify-center rounded-lg bg-navy px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-deep-blue"
              >
                {t("home.ctaQuote")}
              </Link>
              <a
                href={`tel:+1${SITE.phoneTel}`}
                className="inline-flex h-12 items-center justify-center rounded-lg border border-navy/15 bg-white px-5 text-sm font-semibold text-navy transition hover:border-deep-blue/40 hover:bg-soft-blue/50"
              >
                {t("home.ctaCall", { phone: SITE.phoneDisplay })}
              </a>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
              {trustKeys.map((k) => (
                <li
                  key={k}
                  className="flex items-center gap-2 text-sm font-medium text-navy/80"
                >
                  <span
                    className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-fresh-green"
                    aria-hidden
                  />
                  {t(`home.${k}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="overflow-hidden border border-navy/8 bg-greige/40 shadow-card-lg">
              <WorkImage
                src={IMAGES.hero}
                alt={t("home.heroImgAlt")}
                aspect="portrait"
                priority
                className="!max-h-[min(72vh,600px)] !border-0 !shadow-none"
                rounded="3xl"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm">
              <div className="rounded-2xl border border-white/30 bg-white/95 px-4 py-3 text-sm font-semibold text-navy shadow-card backdrop-blur-sm">
                {t("home.floatCard")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-navy/8 bg-navy text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-10 gap-y-3 px-4 py-4 sm:px-6 lg:justify-between lg:px-8">
          {statKeys.map((k) => (
            <div
              key={k}
              className="flex items-center gap-2 text-sm font-semibold tabular-nums"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-fresh-green"
                aria-hidden
              />
              {t(`home.${k}`)}
            </div>
          ))}
        </div>
      </div>

      <section className="border-b border-navy/8 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-eco-green">
                {t("home.credEyebrow")}
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                {t("home.credH2")}
              </h2>
              <p className="mt-3 text-navy/70">{t("home.credLead")}</p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-eco-green/30 bg-soft-green/50 px-4 py-1.5 text-sm font-bold text-eco-green">
                <span className="text-base leading-none" aria-hidden>✓</span>
                {t("home.credLicensed")}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-navy/45">
                {t("home.credTrustedWith")}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-6">
                <img
                  src={IMAGES.pwhi}
                  alt={t("home.credPwhiAlt")}
                  loading="lazy"
                  className="h-16 w-auto object-contain"
                />
                <img
                  src={IMAGES.dataIntegration}
                  alt={t("home.credDataAlt")}
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              {t("home.builtH2")}
            </h2>
            <p className="mt-3 text-lg text-navy/70">{t("home.builtLead")}</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {homeCards.map((c) => (
              <article
                key={c.t}
                className="group rounded-2xl border border-navy/8 bg-white p-6 shadow-card transition hover:border-deep-blue/20 hover:shadow-card-lg"
              >
                <h3 className="text-lg font-bold text-navy">{t(c.t)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">
                  {t(c.b)}
                </p>
                <div className="mt-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-deep-blue to-fresh-green opacity-0 transition group-hover:opacity-100" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-greige/30 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            {t("home.realH2")}
          </h2>
          <p className="mt-2 max-w-2xl text-navy/65">{t("home.realLead")}</p>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <figure className="lg:col-span-2">
              <WorkImage
                src={IMAGES.galleryMain}
                alt={t("home.cap1")}
                aspect="wide"
                className="lg:max-h-72"
                rounded="2xl"
              />
              <figcaption className="mt-2 text-sm font-medium text-navy/60">
                {t("home.cap1")}
              </figcaption>
            </figure>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <figure>
                <WorkImage
                  src={IMAGES.galleryA}
                  alt={t("home.cap2")}
                  aspect="video"
                  rounded="2xl"
                />
                <figcaption className="mt-2 text-sm font-medium text-navy/60">
                  {t("home.cap2")}
                </figcaption>
              </figure>
              <figure>
                <WorkImage
                  src={IMAGES.galleryB}
                  alt={t("home.cap3")}
                  aspect="video"
                  rounded="2xl"
                />
                <figcaption className="mt-2 text-sm font-medium text-navy/60">
                  {t("home.cap3")}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                {t("home.whyH2")}
              </h2>
              <p className="mt-3 text-navy/70">{t("home.whyLead")}</p>
            </div>
            <ul className="space-y-3 rounded-2xl border border-navy/8 bg-white p-6 shadow-card sm:p-8">
              {whyKeys.map((k) => (
                <li key={k} className="flex gap-3 text-navy/85">
                  <span
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-soft-green text-xs font-bold text-eco-green"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {t(`home.${k}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-navy/8 bg-soft-blue/50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            {t("home.prevH2")}
          </h2>
          <p className="mt-2 max-w-2xl text-navy/65">{t("home.prevLead")}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {previewKeys.map((k) => (
              <div
                key={k}
                className="rounded-xl border border-navy/8 bg-white px-4 py-3 text-sm font-semibold text-navy shadow-sm"
              >
                {t(`home.${k}`)}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/services"
              className="text-sm font-bold text-deep-blue hover:underline"
            >
              {t("home.prevLink")}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div
          className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-deep-blue"
          aria-hidden
        />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fresh-green/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            {t("home.finalH2")}
          </h2>
          <p className="mt-3 text-lg text-white/80">{t("home.finalLead")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex h-12 min-w-[10rem] items-center justify-center rounded-lg bg-fresh-green px-6 text-sm font-bold text-navy transition hover:bg-white"
            >
              {t("home.finalCta1")}
            </Link>
            <a
              href={`tel:+1${SITE.phoneTel}`}
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/25 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
            >
              {t("home.finalCta2")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
