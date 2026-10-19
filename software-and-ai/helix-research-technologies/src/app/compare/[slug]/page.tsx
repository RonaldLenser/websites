import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPARE, getComparePage } from "@/lib/data";
import PageHero from "@/components/page-hero";
import { Em, CompareTable, CtaBand, Faq } from "@/components/sections";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return COMPARE.pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/compare/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getComparePage(slug);
  if (!p) return {};
  return { title: p.title, description: p.intro, alternates: { canonical: `/compare/${p.slug}` } };
}

export default async function ComparePage(props: PageProps<"/compare/[slug]">) {
  const { slug } = await props.params;
  const p = getComparePage(slug);
  if (!p) notFound();
  const others = COMPARE.pages.filter((o) => o.slug !== p.slug);
  const [head, tail] = p.title.includes(":") ? p.title.split(":") : [p.title, ""];

  return (
    <>
      <PageHero
        eyebrow="Compare"
        title={
          <>
            {head}
            {tail ? (
              <>
                : <Em>{tail.trim()}</Em>
              </>
            ) : null}
          </>
        }
        lead={p.intro}
      />
      <section className="section pt-0">
        <div className="container">
          <CompareTable title={p.title} columns={p.columns} rows={p.rows} />
          <div className="mt-8 flex flex-wrap gap-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/compare/${o.slug}`} className="chip">
                {o.title.split(":")[0]}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Faq />
      <CtaBand />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: p.title, path: `/compare/${p.slug}` }]} />
    </>
  );
}
