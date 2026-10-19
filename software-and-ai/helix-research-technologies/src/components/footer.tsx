import Link from "next/link";
import Image from "next/image";
import { SITE, SERVICES, INDUSTRIES, COMPARE, isTodo, asset } from "@/lib/data";
import { Linkedin } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();
  const cols: { title: string; links: { href: string; label: string }[] }[] = [
    { title: "Agents", links: SERVICES.map((s) => ({ href: `/services/${s.slug}`, label: s.name })) },
    { title: "Industries", links: INDUSTRIES.map((i) => ({ href: `/industries/${i.slug}`, label: i.name })) },
    {
      title: "Compare",
      links: COMPARE.pages.map((p) => ({ href: `/compare/${p.slug}`, label: p.title.split(":")[0] })),
    },
    {
      title: "Helix",
      links: [
        { href: "/about", label: "Team" },
        { href: "/work", label: "Results" },
        { href: "/pricing", label: "Pricing" },
        { href: "/contact", label: "Book a call" },
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
      ],
    },
  ];

  return (
    <footer className="section-dark mt-10 relative">
      <div className="container relative pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Image src={asset("/brand/helix-horizontal-reverse.svg")} alt={SITE.name} width={200} height={78} loading="eager" />
            <p className="mt-6 text-[#b8bcc6] leading-relaxed max-w-sm">
              AI agents for lab, medical, and industrial supply companies. Built in Fredericksburg, Virginia. Owned by the client, always.
            </p>
            <div className="mt-6 flex flex-col gap-1.5 text-sm text-[#b8bcc6]">
              <a href={`mailto:${SITE.email}`} className="hover:text-white underline-slide w-fit">{SITE.email}</a>
              {!isTodo(SITE.phone) ? (
                <a href={`tel:${SITE.phone}`} className="hover:text-white underline-slide w-fit">{SITE.phoneDisplay}</a>
              ) : null}
              <span>{SITE.hours}. {SITE.responseTime}.</span>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Link href="/contact" className="btn btn-primary btn-sm">
                Book 30 minutes
              </Link>
              {!isTodo(SITE.socials.linkedin) ? (
                <a href={SITE.socials.linkedin} rel="noopener" aria-label="LinkedIn" className="w-10 h-10 rounded-full grid place-items-center text-white bg-white/10 hover:bg-white/20">
                  <Linkedin width={18} height={18} />
                </a>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <h3 className="chapter mb-4">{c.title}</h3>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="text-sm text-[#b8bcc6] hover:text-white underline-slide">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-between text-xs text-[#b8bcc6]">
          <span>© {year} {SITE.name}. Fredericksburg, VA.</span>
          <span>Built with AI. Owned by you.</span>
        </div>
      </div>
    </footer>
  );
}
