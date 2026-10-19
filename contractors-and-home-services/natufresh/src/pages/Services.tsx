import { Seo } from "../components/Seo";
import { WorkImage } from "../components/WorkImage";
import { IMAGES, SITE } from "../lib/site";
import { Link } from "react-router-dom";
import { useLocale } from "../i18n/LocaleProvider";

const serviceIds = [
  "office",
  "janitorial",
  "deep",
  "move",
  "recurring",
  "floors",
] as const;

const imagesForIndex = (i: number) => {
  if (i % 3 === 0) return IMAGES.hero;
  if (i % 3 === 1) return IMAGES.galleryA;
  return IMAGES.galleryB;
};

export function Services() {
  const { t } = useLocale();
  const imgAlts = [
    t("servicesPage.imgAltHero"),
    t("servicesPage.imgAltGalleryA"),
    t("servicesPage.imgAltGalleryB"),
  ];

  return (
    <>
      <Seo
        title={t("servicesPage.seo.title")}
        description={t("servicesPage.seo.description")}
      />

      <div className="border-b border-greige/30 bg-warm-white/80">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-deep-blue">
            {t("servicesPage.only")}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
            {t("servicesPage.h1")}
          </h1>
          <p className="mt-4 max-w-3xl text-balance text-lg text-navy/70">
            {t("servicesPage.lead", { yearsExperience: SITE.yearsExperience })}
          </p>
        </div>
      </div>

      <div className="space-y-0 bg-warm-white">
        {serviceIds.map((id, i) => {
          const bullets = [0, 1, 2, 3].map((j) =>
            t(`serviceDetail.${id}.b${j}`)
          );
          return (
            <section
              key={id}
              id={id}
              className={`border-t border-navy/8 ${
                i % 2 === 0 ? "bg-warm-white" : "bg-greige/25"
              }`}
            >
              <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-12 lg:px-8 lg:py-16">
                <div
                  className={
                    i % 2 === 0
                      ? "lg:col-span-7"
                      : "order-1 lg:order-2 lg:col-span-7"
                  }
                >
                  <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
                    {t(`serviceDetail.${id}.title`)}
                  </h2>
                  <p className="mt-3 text-navy/75 leading-relaxed">
                    {t(`serviceDetail.${id}.intro`)}
                  </p>
                  <ul className="mt-5 space-y-2.5 text-navy/80">
                    {bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 pl-0">
                        <span
                          className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-deep-blue"
                          aria-hidden
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm text-navy/60">
                    {t("servicesPage.quoteLinePrefix")}
                    <Link
                      to="/contact"
                      className="font-bold text-deep-blue hover:underline"
                    >
                      {t("servicesPage.quoteLink")}
                    </Link>
                    {t("servicesPage.quoteLineSuffix")}
                  </p>
                </div>
                <div
                  className={
                    i % 2 === 0
                      ? "lg:col-span-5"
                      : "order-2 lg:order-1 lg:col-span-5"
                  }
                >
                  <WorkImage
                    src={imagesForIndex(i)}
                    alt={imgAlts[i % 3] ?? ""}
                    aspect="video"
                    rounded="2xl"
                  />
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="bg-navy py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            {t("servicesPage.ctaH2")}
          </h2>
          <p className="mt-2 text-white/80">{t("servicesPage.ctaLead")}</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-fresh-green px-8 text-sm font-bold text-navy transition hover:bg-white"
          >
            {t("servicesPage.ctaBtn")}
          </Link>
        </div>
      </section>
    </>
  );
}
