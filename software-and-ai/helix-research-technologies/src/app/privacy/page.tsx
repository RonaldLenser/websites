import type { Metadata } from "next";
import { SITE } from "@/lib/data";
import PageHero from "@/components/page-hero";
import { Em } from "@/components/sections";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What Helix Research Technologies collects through this site, why, and how to reach us about it.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title={<>Privacy, <Em>in plain words.</Em></>} cta={false} />
      <section className="section pt-0">
        <div className="container max-w-3xl space-y-8 text-gray-600 leading-relaxed">
          <p className="text-xs text-gray-500">Last updated 2026-09-29. Draft: have a lawyer review before relying on it.</p>
          <div>
            <h2 className="h3 text-navy mb-3">What we collect</h2>
            <p>When you submit a form we collect what you type: name, work email, company, website, what you need, budget range, how you found us, and your message. We also record the page you sent it from and a timestamp.</p>
          </div>
          <div>
            <h2 className="h3 text-navy mb-3">Where it goes</h2>
            <p>Form submissions are stored in our CRM (GoHighLevel) and may be emailed to the founders. We use them to reply to you and, if you become a client, to run the project. We do not sell or rent your information.</p>
          </div>
          <div>
            <h2 className="h3 text-navy mb-3">Analytics</h2>
            <p>We use privacy-respecting analytics (Vercel Analytics) and may use Google Tag Manager to measure how the site is used. No advertising pixels are loaded unless we are running ads, and we will update this page if that changes.</p>
          </div>
          <div>
            <h2 className="h3 text-navy mb-3">Do not send us</h2>
            <p>Patient information, card numbers, passwords, or anything else sensitive. The form is for business inquiries.</p>
          </div>
          <div>
            <h2 className="h3 text-navy mb-3">Your choices</h2>
            <p>Email {SITE.email} to see, correct, or delete what we hold about you. We will respond within a few business days.</p>
          </div>
        </div>
      </section>
    </>
  );
}
