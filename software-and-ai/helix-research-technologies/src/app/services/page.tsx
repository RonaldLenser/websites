import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { ServicesGrid, Process, PricingCards, CtaBand, Em } from "@/components/sections";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "What we build: AI agents for supply companies",
  description: "Quote Desk Agent, Reorder Follow-up Agent, AI Receptionist, GoHighLevel systems, and custom apps. Fixed price, quoted in writing, you own everything.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we build"
        title={
          <>
            Agents that do <Em>one job</Em> end to end.
          </>
        }
        lead="Each one connects to your catalog, CRM, and calendar, takes the work off a person, and hands back only the exceptions."
      />
      <ServicesGrid compact />
      <Process />
      <PricingCards />
      <CtaBand />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
    </>
  );
}
