import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRIES, SERVICES, getIndustry } from "@/lib/data";
import PageHero from "@/components/page-hero";
import LeadForm from "@/components/lead-form";
import { Em, SectionHeading, Faq, CtaBand, Proof } from "@/components/sections";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { ArrowRight, Check } from "@/components/icons";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(props: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return {
    title: `AI agents for ${ind.name.toLowerCase()} companies`,
    description: `${ind.headline} ${ind.short}`,
    alternates: { canonical: `/industries/${ind.slug}` },
  };
}

export default async function IndustryPage(props: PageProps<"/industries/[slug]">) {
  const { slug } = await props.params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const others = INDUSTRIES.filter((i) => i.slug !== ind.slug);
  const [first, ...restWords] = ind.headline.split(" ");

  return (
    <>
      <PageHero
        eyebrow={`For ${ind.name.toLowerCase()}`}
        title={
          <>
            {first} {restWords.slice(0, -2).join(" ")} <Em>{restWords.slice(-2).join(" ")}</Em>
          </>
        }
        lead={ind.intro}
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What we look for on your site"
            title={
              <>
                Four signals. <Em>Four fixes.</Em>
              </>
            }
            lead="Before the first call we audit your site the way a buyer sees it. Each signal maps to a specific build."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {ind.signals.map((s, i) => (
              <div key={s.signal} className={`glass glass-hover p-6 reveal reveal-delay-${(i % 4) + 1}`}>
                <p className="eyebrow mb-2">Signal</p>
                <p className="font-semibold">{s.signal}</p>
                <div className="hairline my-4" />
                <p className="eyebrow mb-2 !text-navy">Fix</p>
                <p className="text-gray-600">{s.fix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white/50 border-y border-gray-200">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1fr] items-start">
          <div>
            <SectionHeading eyebrow="Use cases" title={<>What an agent does for a {ind.name.toLowerCase()} company, <Em>day one.</Em></>} />
            <ul className="mt-8 space-y-3">
              {ind.useCases.map((u) => (
                <li key={u} className="flex gap-3 text-gray-600">
                  <Check width={18} height={18} className="text-navy mt-0.5 flex-none" /> <span>{u}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {SERVICES.slice(0, 3).map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="chip">
                  {s.name} <ArrowRight width={14} height={14} className="ml-1.5" />
                </Link>
              ))}
            </div>
          </div>
          <LeadForm variant="page" title={`Get a quote for your ${ind.name.toLowerCase()} business`} />
        </div>
      </section>

      <Proof limit={3} />
      <Faq items={ind.faq} />

      <section className="container pb-10">
        <p className="eyebrow mb-4">Also for</p>
        <div className="flex flex-wrap gap-2">
          {others.map((o) => (
            <Link key={o.slug} href={`/industries/${o.slug}`} className="chip">
              {o.name}
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
      <FaqJsonLd items={ind.faq} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: ind.name, path: `/industries/${ind.slug}` }]} />
    </>
  );
}
