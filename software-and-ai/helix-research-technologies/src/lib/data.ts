import site from "@/data/site.json";
import services from "@/data/services.json";
import industries from "@/data/industries.json";
import cases from "@/data/cases.json";
import faq from "@/data/faq.json";
import pricing from "@/data/pricing.json";
import compare from "@/data/compare.json";
import founders from "@/data/founders.json";
import badges from "@/data/badges.json";

export type Service = (typeof services)[number];
export type Industry = (typeof industries)[number];
export type CaseStudy = (typeof cases)[number];
export type Faq = (typeof faq)[number];
export type Founder = (typeof founders)[number];
export type ComparePage = (typeof compare.pages)[number];

export const SITE = site;
export const SERVICES = services;
export const INDUSTRIES = industries;
export const CASES = cases;
export const FAQ = faq;
export const PRICING = pricing;
export const COMPARE = compare;
export const FOUNDERS = founders;
export const BADGES = badges;

/** True when a data value is still a placeholder. Used to hide unfinished fields instead of shipping "TODO". */
export function isTodo(value: string | undefined | null): boolean {
  if (!value) return true;
  return value.toUpperCase().includes("TODO");
}

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}

export function getComparePage(slug: string): ComparePage | undefined {
  return compare.pages.find((p) => p.slug === slug);
}

/** Prefix for static assets; empty on Vercel, "/repo-name" on GitHub Pages. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}

export function absoluteUrl(path = "/"): string {
  const base = site.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
