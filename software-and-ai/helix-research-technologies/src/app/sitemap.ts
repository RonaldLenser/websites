import type { MetadataRoute } from "next";
import { SERVICES, INDUSTRIES, CASES, COMPARE, absoluteUrl } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = ["/", "/services", "/industries", "/work", "/pricing", "/about", "/contact", "/privacy", "/terms"];
  return [
    ...statics.map((p) => ({ url: absoluteUrl(p), lastModified: now, changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...SERVICES.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...INDUSTRIES.map((i) => ({ url: absoluteUrl(`/industries/${i.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...CASES.map((c) => ({ url: absoluteUrl(`/work/${c.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...COMPARE.pages.map((c) => ({ url: absoluteUrl(`/compare/${c.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
