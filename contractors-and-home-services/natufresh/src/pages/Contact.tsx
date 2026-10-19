import { Seo } from "../components/Seo";
import { SITE } from "../lib/site";
import { useLocale } from "../i18n/LocaleProvider";

export function Contact() {
  const { t } = useLocale();
  const req = t("contactPage.requiredMark");

  return (
    <>
      <Seo
        title={t("contactPage.seo.title")}
        description={t("contactPage.seo.description")}
      />

      <div className="border-b border-greige/30 bg-warm-white/80">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
            {t("contactPage.h1")}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-navy/70">
            {t("contactPage.lead")}
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-b from-greige/40 to-warm-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-navy/8 bg-white p-6 shadow-card sm:p-7">
              <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-navy/45">
                {t("contactPage.direct")}
              </h2>
              <p className="mt-3 text-sm font-bold text-navy">{SITE.owner}</p>
              <p className="text-sm text-navy/55">{t("contactPage.owner")}</p>
              <div className="mt-4 space-y-1 text-sm">
                <p>
                  <span className="text-navy/55">{t("contactPage.phone")} </span>
                  <a
                    className="font-bold text-deep-blue hover:underline"
                    href={`tel:+1${SITE.phoneTel}`}
                  >
                    {SITE.phoneDisplay}
                  </a>
                </p>
                <p>
                  <span className="text-navy/55">{t("contactPage.email")} </span>
                  <a
                    className="break-all font-bold text-deep-blue hover:underline"
                    href={`mailto:${SITE.email}`}
                  >
                    {SITE.email}
                  </a>
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-navy/55">
              {t("contactPage.sideNote")}
            </p>
          </div>

          <div className="lg:col-span-8">
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="rounded-2xl border border-navy/8 bg-white p-6 shadow-card-lg sm:p-8"
            >
              <input
                type="hidden"
                name="access_key"
                value="REPLACE_WITH_WEB3FORMS_ACCESS_KEY"
              />
              <input
                type="hidden"
                name="subject"
                value={t("contactPage.formSubject")}
              />
              <input
                type="hidden"
                name="from_name"
                value={t("contactPage.fromName")}
              />
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-navy">
                    {t("contactPage.fName")}{" "}
                    <span className="text-eco-green">{req}</span>
                  </span>
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="h-12 w-full rounded-lg border border-navy/10 bg-warm-white px-3.5 text-sm text-navy outline-none ring-deep-blue/20 transition placeholder:text-navy/35 focus:border-deep-blue/50 focus:ring-4"
                    placeholder={t("contactPage.phName")}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-navy">
                    {t("contactPage.fCompany")}
                  </span>
                  <input
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className="h-12 w-full rounded-lg border border-navy/10 bg-warm-white px-3.5 text-sm text-navy outline-none ring-deep-blue/20 transition placeholder:text-navy/35 focus:border-deep-blue/50 focus:ring-4"
                    placeholder={t("contactPage.phCompany")}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-navy">
                    {t("contactPage.fPhone")}{" "}
                    <span className="text-eco-green">{req}</span>
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    className="h-12 w-full rounded-lg border border-navy/10 bg-warm-white px-3.5 text-sm text-navy outline-none ring-deep-blue/20 transition placeholder:text-navy/35 focus:border-deep-blue/50 focus:ring-4"
                    placeholder={t("contactPage.phPhone")}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-navy">
                    {t("contactPage.fEmail")}{" "}
                    <span className="text-eco-green">{req}</span>
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="h-12 w-full rounded-lg border border-navy/10 bg-warm-white px-3.5 text-sm text-navy outline-none ring-deep-blue/20 transition placeholder:text-navy/35 focus:border-deep-blue/50 focus:ring-4"
                    placeholder={t("contactPage.phEmail")}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-navy">
                    {t("contactPage.fProperty")}
                  </span>
                  <input
                    name="property_type"
                    type="text"
                    className="h-12 w-full rounded-lg border border-navy/10 bg-warm-white px-3.5 text-sm text-navy outline-none ring-deep-blue/20 transition placeholder:text-navy/35 focus:border-deep-blue/50 focus:ring-4"
                    placeholder={t("contactPage.phProperty")}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-navy">
                    {t("contactPage.fService")}{" "}
                    <span className="text-eco-green">{req}</span>
                  </span>
                  <input
                    name="service_needed"
                    type="text"
                    required
                    className="h-12 w-full rounded-lg border border-navy/10 bg-warm-white px-3.5 text-sm text-navy outline-none ring-deep-blue/20 transition placeholder:text-navy/35 focus:border-deep-blue/50 focus:ring-4"
                    placeholder={t("contactPage.phService")}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-navy">
                    {t("contactPage.fFrequency")}
                  </span>
                  <input
                    name="cleaning_frequency"
                    type="text"
                    className="h-12 w-full rounded-lg border border-navy/10 bg-warm-white px-3.5 text-sm text-navy outline-none ring-deep-blue/20 transition placeholder:text-navy/35 focus:border-deep-blue/50 focus:ring-4"
                    placeholder={t("contactPage.phFrequency")}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-navy">
                    {t("contactPage.fTime")}
                  </span>
                  <input
                    name="best_time_to_contact"
                    type="text"
                    className="h-12 w-full rounded-lg border border-navy/10 bg-warm-white px-3.5 text-sm text-navy outline-none ring-deep-blue/20 transition placeholder:text-navy/35 focus:border-deep-blue/50 focus:ring-4"
                    placeholder={t("contactPage.phTime")}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-navy">
                    {t("contactPage.fMessage")}{" "}
                    <span className="text-eco-green">{req}</span>
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full rounded-lg border border-navy/10 bg-warm-white px-3.5 py-3 text-sm text-navy outline-none ring-deep-blue/20 transition placeholder:text-navy/35 focus:border-deep-blue/50 focus:ring-4"
                    placeholder={t("contactPage.phMessage")}
                  />
                </label>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full min-w-[12rem] items-center justify-center rounded-lg bg-gradient-to-r from-deep-blue to-eco-green px-8 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-blue sm:w-auto"
                >
                  {t("contactPage.submit")}
                </button>
                <p className="mt-3 text-xs text-navy/45">
                  {t("contactPage.footNote")}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
