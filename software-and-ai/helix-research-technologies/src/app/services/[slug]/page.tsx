import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, CASES, getService } from "@/lib/data";
import PageHero from "@/components/page-hero";
import LeadForm from "@/components/lead-form";
import { Em, Proof, Faq, CtaBand, SectionHeading } from "@/components/sections";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/json-ld";
import { Check, ArrowRight, ServiceIcon } from "@/components/icons";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.name} for lab and medical supply companies`,
    description: s.short,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const s = getService(slug);
  if (!s) notFound();
  const related = CASES.filter((c) => c.service === s.slug);
  const others = SERVICES.filter((o) => o.slug !== s.slug);

  return (
    <>
      <PageHero
        eyebrow={`${s.eyebrow} · ${s.timeline}`}
        title={
          <>
            {s.name.split(" ").slice(0, -1).join(" ")} <Em>{s.name.split(" ").slice(-1)}</Em>
          </>
        }
        lead={s.short}
      />

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-10">
            <div className="glass p-8 reveal">
              <p className="eyebrow mb-3">The problem</p>
              <p className="lead">{s.problem}</p>
            </div>
            <div className="glass p-8 reveal ring-glow">
              <p className="eyebrow mb-3">What changes</p>
              <p className="lead text-navy">{s.outcome}</p>
            </div>
            <div className="reveal">
              <h2 className="h3 mb-5">What it does</h2>
              <ul className="space-y-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-gray-600">
                    <Check width={18} height={18} className="text-navy mt-0.5 flex-none" /> <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal">
              <h2 className="h3 mb-5">What you get</h2>
              <ol className="grid sm:grid-cols-2 gap-3">
                {s.deliverables.map((d, i) => (
                  <li key={d} className="glass p-4 flex gap-3 items-start">
                    <span className="num mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-gray-600">{d}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <aside className="lg:sticky lg:top-24 self-start space-y-4">
            <LeadForm variant="page" title={`Scope a ${s.name}`} />
            <div className="glass p-6">
              <p className="eyebrow mb-3">Timeline</p>
              <p className="text-2xl font-semibold tracking-tight">{s.timeline}</p>
              <p className="text-gray-500 text-sm mt-1">from signed scope to live, plus 30 days of tuning</p>
            </div>
          </aside>
        </div>
      </section>

      {related.length ? <Proof limit={3} /> : null}

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Pairs well with" title={<>Other agents in the <Em>same system.</Em></>} />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className="glass glass-hover p-6 flex flex-col reveal">
                <div className="w-10 h-10 rounded-xl grid place-items-center bg-gray-100 text-navy">
                  <ServiceIcon name={o.icon} width={18} height={18} />
                </div>
                <h3 className="font-semibold mt-4">{o.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{o.short}</p>
                <span className="mt-auto pt-4 text-sm text-gray-500 inline-flex items-center gap-1.5">
                  Details <ArrowRight width={14} height={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Faq />
      <CtaBand />
      <ServiceJsonLd name={s.name} description={s.short} path={`/services/${s.slug}`} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.name, path: `/services/${s.slug}` }]} />
    </>
  );
}
