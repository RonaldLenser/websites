import type { Metadata } from "next";
import { PRICING } from "@/lib/data";
import PageHero from "@/components/page-hero";
import { Em, PricingCards, SectionHeading, Faq, CtaBand, Guarantee } from "@/components/sections";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Pricing: fixed price, in writing, before we build",
  description: "Free 30 minute call, a priced workflow audit credited against the build, and fixed-price builds. No hourly, no seat fees, you own everything.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            A number in writing <Em>before we build.</Em>
          </>
        }
        lead={PRICING.intro}
        cta={false}
      />
      <PricingCards withHeading={false} />
      <Guarantee />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Project shapes"
            title={
              <>
                Three sizes. <Em>Known timelines.</Em>
              </>
            }
            lead="Most companies start with a single workflow, prove it in 30 days, then add the next. The price for each shape is fixed once the scope is written."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PRICING.shapes.map((s, i) => (
              <div key={s.name} className={`glass p-7 reveal reveal-delay-${i + 1}`}>
                <span className="num">{s.timeline}</span>
                <h3 className="h3 mt-3">{s.name}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{s.example}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 glass p-8 reveal">
            <h3 className="h3">What is never on the invoice</h3>
            <ul className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-600">
              <li>Hourly billing</li>
              <li>Per-seat fees</li>
              <li>Markup on your GoHighLevel, Twilio, or hosting accounts</li>
              <li>A monthly fee you did not choose</li>
              <li>Charges for the 30 days of tuning</li>
              <li>Anything not in the written scope</li>
            </ul>
          </div>
        </div>
      </section>
      <Faq />
      <CtaBand />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]} />
    </>
  );
}
