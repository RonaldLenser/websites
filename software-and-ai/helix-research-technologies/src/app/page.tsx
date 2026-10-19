import Hero from "@/components/hero";
import {
  TrustStrip,
  Problem,
  ServicesGrid,
  Process,
  Proof,
  Founders,
  HomeCompare,
  PricingCards,
  Guarantee,
  Faq,
  CtaBand,
  HomeLead,
} from "@/components/sections";
import { FaqJsonLd } from "@/components/json-ld";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Problem />
      <ServicesGrid />
      <Process />
      <Proof />
      <Founders />
      <HomeCompare />
      <PricingCards />
      <Guarantee />
      <HomeLead />
      <Faq />
      <CtaBand />
      <FaqJsonLd />
    </>
  );
}
