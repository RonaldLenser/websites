import type { Metadata } from "next";
import { SITE } from "@/lib/data";
import PageHero from "@/components/page-hero";
import { Em, Founders, SectionHeading, CtaBand } from "@/components/sections";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "The Helix team: four founders, no account managers",
  description: "Helix Research Technologies is four founders in Fredericksburg, VA who build AI agents for supply companies and answer their own phones.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const beliefs = [
    { t: "Speed is the product", d: "A buyer who gets a correct answer in minutes rarely shops it. Every agent we build is measured on the time from request to reply." },
    { t: "Agents do jobs, not chats", d: "Read only is a chatbot. We give agents write access to the catalog, CRM, and calendar so they can finish the work, not just talk about it." },
    { t: "You own everything", d: "Accounts in your name. Code in your repo. Runbook in your drive. If we vanish, nothing stops." },
    { t: "Built with AI, honestly", d: "We build with Claude, Claude Code, and the best tools of the month. We do not pretend to hand-code. That is why we are fast and why the price is fixed." },
  ];
  return (
    <>
      <PageHero
        eyebrow={`${SITE.city} · founded ${SITE.foundingYear}`}
        title={
          <>
            Four founders. <Em>No account managers.</Em>
          </>
        }
        lead="The person on your first call builds your system and picks up when it breaks. We started Helix in Fredericksburg because supply companies around us were losing orders to slow replies, and the agencies pitching them AI could not ship anything that touched a real catalog."
      />
      <Founders full />
      <section className="section bg-white/50 border-y border-gray-200">
        <div className="container">
          <SectionHeading chapter="How we work" title={<>Four things we <Em>will not compromise.</Em></>} />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {beliefs.map((b, i) => (
              <div key={b.t} className={`glass p-7 reveal reveal-delay-${(i % 4) + 1}`}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3 mt-3">{b.t}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Team", path: "/about" }]} />
    </>
  );
}
