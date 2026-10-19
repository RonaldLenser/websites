import type { Metadata } from "next";
import { SITE } from "@/lib/data";
import PageHero from "@/components/page-hero";
import { Em } from "@/components/sections";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using the Helix Research Technologies website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title={<>Terms, <Em>short version.</Em></>} cta={false} />
      <section className="section pt-0">
        <div className="container max-w-3xl space-y-8 text-gray-600 leading-relaxed">
          <p className="text-xs text-gray-500">Last updated 2026-09-29. Draft: have a lawyer review before relying on it.</p>
          <div>
            <h2 className="h3 text-navy mb-3">This site</h2>
            <p>The content on this site is general information about what {SITE.name} builds. It is not a quote. Prices, timelines, and outcomes for your company are set in a written scope you sign before any work starts.</p>
          </div>
          <div>
            <h2 className="h3 text-navy mb-3">Results pages</h2>
            <p>Where a results page is marked as a target outcome, the numbers describe what an engagement is designed to achieve, not a completed client deployment. Named case studies are published only with client approval.</p>
          </div>
          <div>
            <h2 className="h3 text-navy mb-3">Client work</h2>
            <p>Every engagement is governed by its own written agreement, which covers scope, price, ownership, and support. That agreement takes precedence over anything on this site.</p>
          </div>
          <div>
            <h2 className="h3 text-navy mb-3">Contact</h2>
            <p>Questions about these terms: {SITE.email}.</p>
          </div>
        </div>
      </section>
    </>
  );
}
