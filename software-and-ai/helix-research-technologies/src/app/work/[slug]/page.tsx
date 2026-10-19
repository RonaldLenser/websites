import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASES, getCase, getService } from "@/lib/data";
import PageHero from "@/components/page-hero";
import LeadForm from "@/components/lead-form";
import { Em, CtaBand } from "@/components/sections";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const c = getCase(slug);
  if (!c) return {};
  return {
    title: `${c.title} (${c.client})`,
    description: c.summary.replace(/^TODO:[^.]*\.\s*/, ""),
    alternates: { canonical: `/work/${c.slug}` },
  };
}

export default async function CasePage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const c = getCase(slug);
  if (!c) notFound();
  const svc = getService(c.service);
  const placeholder = c.status === "placeholder";
  const summary = c.summary.replace(/^TODO:[^.]*\.\s*/, "");

  return (
    <>
      <PageHero
        eyebrow={`${c.client} · ${c.profile}`}
        title={
          <>
            {c.title.split(" ").slice(0, -2).join(" ")} <Em>{c.title.split(" ").slice(-2).join(" ")}</Em>
          </>
        }
        lead={summary}
        cta={false}
      >
        {placeholder ? (
          <p className="mt-6 inline-flex items-center gap-2 text-xs text-red border border-red/40 rounded-full px-3 py-1.5">
            Target outcome. A named case study replaces this page once the client approves publication.
          </p>
        ) : null}
      </PageHero>

      <section className="section pt-0">
        <div className="container grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {c.metrics.map((m) => (
                <div key={m.label} className="glass p-6 reveal">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{m.label}</p>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="text-gray-500 line-through text-xl">{m.before}</span>
                    <ArrowRight width={16} height={16} className="text-gray-500" />
                    <span className="text-4xl font-semibold text-navy tracking-tight">{m.after}</span>
                  </div>
                </div>
              ))}
            </div>
            {svc ? (
              <div className="glass p-8 reveal">
                <p className="eyebrow mb-3">Built with</p>
                <h2 className="h3">{svc.name}</h2>
                <p className="mt-3 text-gray-600">{svc.outcome}</p>
                <Link href={`/services/${svc.slug}`} className="mt-5 inline-flex items-center gap-2 text-navy underline underline-offset-4">
                  How the {svc.name} works <ArrowUpRight width={16} height={16} />
                </Link>
              </div>
            ) : null}
          </div>
          <aside className="lg:sticky lg:top-24 self-start">
            <LeadForm variant="page" title="Want this number for your company?" />
          </aside>
        </div>
      </section>

      <CtaBand />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Results", path: "/work" }, { name: c.title, path: `/work/${c.slug}` }]} />
    </>
  );
}
