import type { Metadata } from "next";
import Script from "next/script";
import { SITE, isTodo } from "@/lib/data";
import PageHero from "@/components/page-hero";
import LeadForm from "@/components/lead-form";
import { Em } from "@/components/sections";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { Check, Mail, Phone } from "@/components/icons";
import SentSwitch from "@/components/contact-sent";

export const metadata: Metadata = {
  title: "Book a free 30 minute call",
  description: "Tell us where quotes, reorders, or calls are leaking and we will tell you honestly whether an agent pays for itself. Reply within one business day.",
  alternates: { canonical: "/contact" },
};

// GHL booking link: env var wins, else site.json calendarUrl (so it can be set without touching Vercel).
const CAL = (process.env.NEXT_PUBLIC_GHL_CALENDAR_URL || SITE.calendarUrl || "").trim();

export default function ContactPage() {
  const heroSent = (
    <PageHero
      eyebrow="Book a call"
      title={
        <>
          Got it. <Em>Pick a time.</Em>
        </>
      }
      lead="Your details are in. Grab a slot below and we will come to the call with your site audit done."
      cta={false}
    />
  );
  const heroDefault = (
    <PageHero
      eyebrow="Book a call"
      title={
        <>
          Thirty minutes. <Em>No pitch deck.</Em>
        </>
      }
      lead={SITE.calendarNote}
      cta={false}
    />
  );

  return (
    <>
      <SentSwitch sent={heroSent} notSent={heroDefault} />

      <section className="section pt-0" id="book">
        <div className="container grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="glass p-3 sm:p-4 reveal min-h-[560px]">
            {CAL ? (
              <>
                {/* GHL's embed script sizes the iframe to the calendar, so nothing gets cut off on mobile. */}
                <iframe
                  id="helix-booking"
                  src={CAL}
                  title="Book a call with Helix"
                  className="w-full min-h-[760px] rounded-2xl bg-transparent border-0 overflow-hidden"
                  scrolling="no"
                />
                <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
                <p className="text-sm text-gray-500 text-center mt-3">
                  Calendar not loading?{" "}
                  <a href={CAL} target="_blank" rel="noopener" className="text-navy underline">
                    Open it in a new tab
                  </a>
                  .
                </p>
              </>
            ) : (
              <div className="h-full min-h-[520px] rounded-2xl border border-gray-200 grid place-items-center text-center p-8">
                <div>
                  <p className="eyebrow mb-3">Pick a time</p>
                  <p className="text-gray-600 max-w-sm">
                    Send the short form and a founder emails you times within one business day, or email us directly.
                  </p>
                  <a href={`mailto:${SITE.email}?subject=${encodeURIComponent("Book a 30 minute call")}`} className="btn btn-primary mt-5">
                    Email a founder
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <SentSwitch sent={null} notSent={<LeadForm variant="page" title="Or send the details first" />} />
            <div className="glass p-7 reveal">
              <p className="eyebrow mb-4">On the call</p>
              <ul className="space-y-2.5 text-gray-600">
                {[
                  "How quotes, orders, and follow-ups move through your business today",
                  "Which agent would pay for itself first, and roughly what it costs",
                  "A written scope and fixed price within two business days, if it fits",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check width={18} height={18} className="text-navy mt-0.5 flex-none" /> <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="hairline my-6" />
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 hover:text-navy">
                  <Mail width={16} height={16} /> {SITE.email}
                </a>
                {!isTodo(SITE.phone) ? (
                  <a href={`tel:${SITE.phone}`} className="inline-flex items-center gap-2 hover:text-navy">
                    <Phone width={16} height={16} /> {SITE.phoneDisplay}
                  </a>
                ) : null}
                <span className="text-gray-500">{SITE.hours}. {SITE.responseTime}.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Book a call", path: "/contact" }]} />
    </>
  );
}
