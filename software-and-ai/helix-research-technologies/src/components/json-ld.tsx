import { SITE, FOUNDERS, FAQ, SERVICES, isTodo, absoluteUrl } from "@/lib/data";

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const founders = FOUNDERS.filter((f) => !isTodo(f.name) && f.kind === "founder").map((f) => ({
    "@type": "Person",
    "@id": absoluteUrl(`/about#${f.name.toLowerCase().replace(/\s+/g, "-")}`),
    name: f.name,
    jobTitle: f.role,
    worksFor: { "@id": absoluteUrl("/#organization") },
    ...(isTodo(f.linkedin) ? {} : { sameAs: [f.linkedin] }),
  }));
  const sameAs = Object.values(SITE.socials).filter((v) => v && !isTodo(v));
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: SITE.name,
        url: SITE.url,
        logo: absoluteUrl("/brand/helix-symbol-reverse.svg"),
        description: SITE.description,
        foundingDate: SITE.foundingYear,
        email: SITE.email,
        ...(isTodo(SITE.phone) ? {} : { telephone: SITE.phone }),
        address: { "@type": "PostalAddress", addressLocality: "Fredericksburg", addressRegion: "VA", addressCountry: "US" },
        areaServed: "US",
        founder: founders.map((f) => ({ "@id": f["@id"] })),
        sameAs,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: SITE.email,
          availableLanguage: "en",
        },
        knowsAbout: [
          "AI agents",
          "GoHighLevel",
          "Quote automation",
          "Workflow automation",
          "Lab supply",
          "Medical supply",
          "B2B distribution",
        ],
      },
      ...founders,
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: SITE.url,
        name: SITE.name,
        publisher: { "@id": absoluteUrl("/#organization") },
      },
      {
        "@type": "OfferCatalog",
        name: "Helix services",
        itemListElement: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description: s.short,
            url: absoluteUrl(`/services/${s.slug}`),
            provider: { "@id": absoluteUrl("/#organization") },
          },
        })),
      },
    ],
  };
  return <Script data={data} />;
}

export function FaqJsonLd({ items = FAQ }: { items?: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <Script data={data} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
  return <Script data={data} />;
}

export function ServiceJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: "US",
  };
  return <Script data={data} />;
}
