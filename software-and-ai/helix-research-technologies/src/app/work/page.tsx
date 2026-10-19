import type { Metadata } from "next";
import Link from "next/link";
import { CASES, getService } from "@/lib/data";
import PageHero from "@/components/page-hero";
import { Em, CtaBand } from "@/components/sections";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Results: before and after, in numbers",
  description: "What Helix agents change for lab, medical, and B2B supply companies: quote turnaround, reorder rate, missed calls.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const hasPlaceholders = CASES.some((c) => c.status === "placeholder");
  return (
    <>
      <PageHero
        eyebrow="Results"
        title={
          <>
            Before and after, <Em>in numbers.</Em>
          </>
        }
        lead={
          hasPlaceholders
            ? "Target outcomes we build toward on every engagement. Named case studies are published as clients approve them. Ask for references on the call."
            : "Every engagement is measured against the number the client cared about before we started."
        }
      />
      <section className="section pt-0">
        <div className="container grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c, i) => {
            const svc = getService(c.service);
            return (
              <Link key={c.slug} href={`/work/${c.slug}`} className={`glass glass-hover p-7 flex flex-col reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="eyebrow">{c.client}</span>
                  {svc ? <span className="num">{svc.name}</span> : null}
                </div>
                <span className="text-xs text-gray-500 mt-1">{c.profile}</span>
                <h2 className="h3 mt-5">{c.title}</h2>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-gray-200 p-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-gray-500 line-through text-sm">{m.before}</span>
                        <ArrowRight width={12} height={12} className="text-gray-500" />
                        <span className="text-xl font-semibold text-navy">{m.after}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1 leading-snug">{m.label}</p>
                    </div>
                  ))}
                </div>
                <span className="mt-auto pt-6 text-sm text-gray-600 inline-flex items-center gap-1.5">
                  Read <ArrowRight width={14} height={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <CtaBand />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Results", path: "/work" }]} />
    </>
  );
}
