import Link from "next/link";
import Image from "next/image";
import { SITE, SERVICES, CASES, FOUNDERS, BADGES, FAQ, PRICING, COMPARE, isTodo, asset } from "@/lib/data";
import { ArrowRight, ArrowUpRight, Check, Minus, X, ServiceIcon, Linkedin } from "./icons";
import LeadForm from "./lead-form";

/* ---------- Shared bits ---------- */

/**
 * Editorial heading: chapter label, headline left, lead right. Nothing centered.
 */
export function SectionHeading({
  chapter,
  title,
  lead,
  eyebrow,
  align,
}: {
  chapter?: string;
  title: React.ReactNode;
  lead?: string;
  icon?: React.ReactNode;
  eyebrow?: string;
  align?: "left" | "center";
}) {
  const label = chapter ?? eyebrow;
  return (
    <div className={`heading-row reveal ${align === "center" ? "!grid-cols-1 text-center" : ""}`}>
      <div>
        {label ? <p className="chapter mb-5">{label}</p> : null}
        <h2 className="h2">{title}</h2>
      </div>
      {lead ? <p className="lead lg:pb-1">{lead}</p> : null}
    </div>
  );
}

export function Em({ children }: { children: React.ReactNode }) {
  return <span className="serif-em">{children}</span>;
}

/* ---------- Trust strip ---------- */

export function TrustStrip() {
  const items = [...BADGES, ...BADGES];
  return (
    <section aria-label="Tools we build with" className="relative py-10 border-y border-gray-200">
      <div className="container flex items-center justify-between gap-6 mb-5">
        <p className="chapter">Runs on</p>
        <p className="chapter hidden md:block">Accounts opened in your name, never ours.</p>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {items.map((b, i) => (
            <div key={b.name + i} className="flex items-center gap-3 whitespace-nowrap">
              <span className="font-display font-semibold text-navy text-xl tracking-tight">{b.name}</span>
              <span className="text-gray-500 text-sm">{b.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */

export function Stats() {
  return (
    <section className="container py-10">
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-[20px] overflow-hidden border border-gray-200">
        {SITE.stats.map((s, i) => (
          <div key={s.label} className={`bg-white p-6 reveal reveal-delay-${i + 1}`}>
            <dd className="font-display font-semibold text-4xl text-navy tracking-tight">{s.value}</dd>
            <dt className="text-gray-600 text-sm mt-1">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ---------- Problem ---------- */

export function Problem() {
  const pains = [
    { n: "01", t: "The 4:47pm request", d: "A lab manager sends a part number, a quantity, and a ship-to. It sits in a shared inbox until the morning. By then she has two other prices and one of them already shipped." },
    { n: "02", t: "The reorder nobody chased", d: "An account that buys consumables every six weeks goes quiet in week seven. No one noticed. The rep who texted them first got the order." },
    { n: "03", t: "The lunch-hour voicemail", d: "Peak call volume lands when your two inside reps are at lunch. Voicemail is where reorders go to die." },
  ];
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          chapter="Where the money leaks"
          title={
            <>
              Supply companies rarely lose on price. They lose on <Em>hours.</Em>
            </>
          }
          lead="Three delays we see in almost every supplier we audit. None of them need more staff. Each one is an agent doing one job well."
        />
        <ol className="mt-12 grid gap-px bg-gray-200 border border-gray-200 rounded-[20px] overflow-hidden md:grid-cols-3">
          {pains.map((p, i) => (
            <li key={p.t} className={`bg-white p-7 reveal reveal-delay-${i + 1} relative`}>
              <span className="chapter">{p.n}</span>
              <h3 className="h3 mt-5">{p.t}</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{p.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

export function ServicesGrid({ compact = false }: { compact?: boolean }) {
  const [flagship, ...rest] = SERVICES;
  return (
    <section className="section" id="services">
      <div className="container">
        {!compact ? (
          <SectionHeading
            chapter="What we build"
            title={
              <>
                Agents named for the job, <Em>not the technology.</Em>
              </>
            }
            lead="Each one has write access to your catalog, CRM, and calendar. It finishes the task and hands back only the exceptions."
          />
        ) : null}
        <div className={`${compact ? "" : "mt-12"} grid gap-5 lg:grid-cols-[1.15fr_1fr_1fr]`}>
          <Link href={`/services/${flagship.slug}`} className="card-soft glass-hover p-8 lg:row-span-2 flex flex-col reveal relative overflow-hidden">
            
            <div className="relative flex items-center justify-between">
              <span className="chapter">{flagship.eyebrow}</span>
              <span className="num">{flagship.timeline}</span>
            </div>
            <div className="relative w-12 h-12 mt-8 rounded-full grid place-items-center bg-navy text-white">
              <ServiceIcon name={flagship.icon} width={22} height={22} />
            </div>
            <h3 className="relative font-display font-semibold text-navy mt-6" style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.3rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              {flagship.name}
            </h3>
            <p className="relative mt-4 text-gray-600 leading-relaxed text-lg">{flagship.short}</p>
            <ul className="relative mt-6 space-y-2.5 text-gray-600">
              {flagship.bullets.slice(0, 4).map((b) => (
                <li key={b} className="flex gap-3">
                  <Check className="text-navy mt-0.5 flex-none" width={18} height={18} /> <span>{b}</span>
                </li>
              ))}
            </ul>
            <span className="relative mt-auto pt-8 link-arrow">
              See the full flow <ArrowUpRight width={16} height={16} />
            </span>
          </Link>
          {rest.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className={`card glass-hover p-7 flex flex-col reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="flex items-center justify-between">
                <span className="chapter">{s.eyebrow}</span>
                <span className="num">{s.timeline}</span>
              </div>
              <div className="w-11 h-11 mt-6 rounded-full grid place-items-center bg-gray-100 text-navy">
                <ServiceIcon name={s.icon} width={20} height={20} />
              </div>
              <h3 className="h3 mt-5">{s.name}</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{s.short}</p>
              <span className="mt-auto pt-6 link-arrow text-sm">
                Details <ArrowRight width={16} height={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process: strand timeline ---------- */

export function Process() {
  const steps = [
    { n: "01", t: "Audit", d: "One call, then we read how quotes, orders, and follow-ups actually move through your inbox and CRM. You get a written plan with a fixed price and a launch date.", when: "Week 1" },
    { n: "02", t: "Build", d: "We connect the agent to your catalog, pricing rules, calendar, and inbox. You watch it handle real requests in a sandbox before anything goes out.", when: "Weeks 2 to 4" },
    { n: "03", t: "Launch", d: "Live on one channel first. Your team keeps every approval it wants. Nothing reaches a customer that you did not sign off on.", when: "Launch day" },
    { n: "04", t: "Tune", d: "Thirty days of reading real conversations, fixing edge cases, and widening what the agent may handle alone.", when: "Days 1 to 30" },
  ];
  return (
    <section className="section section-soft overflow-hidden">
      <div className="container">
        <SectionHeading
          chapter="How it happens"
          title={
            <>
              Four weeks from first call to an agent <Em>doing the work.</Em>
            </>
          }
          lead="No discovery phase that drags. One workflow, scoped and shipped, then the next one."
        />
        <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n} className={`reveal reveal-delay-${i + 1} border-t border-gray-300 pt-6`}>
              <div className="flex items-center justify-between">
                <span className="chapter !text-navy">{s.n}</span>
                <span className="num">{s.when}</span>
              </div>
              <h3 className="h3 mt-5">{s.t}</h3>
              <p className="mt-3 text-gray-600 leading-relaxed text-[0.95rem]">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Proof ---------- */

export function Proof({ limit = 3 }: { limit?: number }) {
  const items = CASES.slice(0, limit);
  const hasPlaceholders = items.some((c) => c.status === "placeholder");
  return (
    <section className="section" id="results">
      <div className="container">
        <SectionHeading
          chapter="Results"
          title={
            <>
              One number per engagement, <Em>agreed before we start.</Em>
            </>
          }
          lead={hasPlaceholders ? "These are the targets we build toward. Named case studies replace them as clients approve publication. Ask for references on the call." : "Every engagement is measured against the number the client cared about before we started."}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((c, i) => (
            <Link key={c.slug} href={`/work/${c.slug}`} className={`card glass-hover p-7 flex flex-col reveal reveal-delay-${i + 1}`}>
              <span className="chapter">{c.client}</span>
              <span className="text-xs text-gray-500 mt-2">{c.profile}</span>
              <h3 className="h3 mt-5">{c.title}</h3>
              <div className="mt-6 space-y-3">
                {c.metrics.map((m) => (
                  <div key={m.label} className="flex items-baseline justify-between gap-3 border-t border-gray-200 pt-3">
                    <span className="text-xs text-gray-500 leading-snug">{m.label}</span>
                    <span className="flex items-baseline gap-2 whitespace-nowrap">
                      <span className="text-gray-500 line-through text-sm">{m.before}</span>
                      <span className="font-display font-semibold text-2xl text-navy">{m.after}</span>
                    </span>
                  </div>
                ))}
              </div>
              <span className="mt-auto pt-6 link-arrow text-sm">
                Read <ArrowUpRight width={14} height={14} />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/work" className="btn btn-ghost">
            All results
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Team ---------- */

export function Founders({ full = false }: { full?: boolean }) {
  const people = FOUNDERS;
  return (
    <section className="section" id="team">
      <div className="container">
        {!full ? (
          <SectionHeading
            chapter="Who you get"
            title={
              <>
                Four founders. <Em>No account managers.</Em>
              </>
            }
            lead="The person on your first call builds the system and picks up when something breaks. We are in Fredericksburg, Virginia, and we answer our own phones."
          />
        ) : null}
        <div className={`${full ? "" : "mt-12"} grid gap-5 sm:grid-cols-2 lg:grid-cols-4`}>
          {people.map((f, i) => {
            const todoName = isTodo(f.name);
            const initials = todoName ? "?" : f.name.split(" ").map((n) => n[0]).join("");
            return (
              <div key={f.name + i} className={`card p-5 reveal reveal-delay-${(i % 4) + 1} flex flex-col`} id={todoName ? undefined : f.name.toLowerCase().replace(/\s+/g, "-")}>
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-cream-2">
                  {f.photo.endsWith(".svg") ? (
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="relative font-display font-semibold text-5xl text-navy">{initials}</span>
                      <span className="absolute bottom-3 fig">Photo coming</span>
                    </div>
                  ) : (
                    <Image src={asset(f.photo)} alt={`${f.name}, ${f.role}`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  )}
                </div>
                <div className="mt-5 flex items-center justify-between gap-2">
                  <h3 className="h3 !text-[1.15rem]">{todoName ? "Team member" : f.name}</h3>
                  {f.kind === "founder" ? <span className="text-[11px] font-medium text-navy bg-gray-100 rounded-full px-2.5 py-1">Founder</span> : null}
                </div>
                <p className="text-gray-500 text-sm mt-1">{isTodo(f.role) ? (f.kind === "founder" ? "Co-founder" : "Team") : f.role}</p>
                <ul className="mt-4 space-y-2 text-gray-600 text-sm">
                  {f.credentials.filter((c) => !isTodo(c)).map((c) => (
                    <li key={c} className="flex gap-2.5">
                      <Check width={16} height={16} className="text-navy mt-0.5 flex-none" /> <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5 flex items-center gap-4 text-sm">
                  {!isTodo(f.linkedin) ? (
                    <a href={f.linkedin} rel="noopener" className="link-arrow">
                      <Linkedin width={16} height={16} /> LinkedIn
                    </a>
                  ) : null}
                  {f.email ? (
                    <a href={`mailto:${f.email}`} className="text-gray-600 hover:text-navy underline-slide truncate">
                      {f.email}
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Compare table ---------- */

function Cell({ v }: { v: string }) {
  const s = v.toLowerCase();
  if (s === "yes") return <span className="inline-flex items-center gap-2 text-navy font-semibold"><Check width={18} height={18} className="text-teal" /> Yes</span>;
  if (s === "no") return <span className="inline-flex items-center gap-2 text-gray-500"><X width={18} height={18} /> No</span>;
  if (s === "partial" || s === "sometimes") return <span className="inline-flex items-center gap-2 text-navy-3"><Minus width={18} height={18} /> {v[0].toUpperCase() + v.slice(1)}</span>;
  return <span className="text-navy">{v}</span>;
}

export function CompareTable({
  title,
  columns,
  rows,
  highlightLast = true,
}: {
  title?: string;
  columns: string[];
  rows: { label: string; values: string[] }[];
  highlightLast?: boolean;
}) {
  const last = columns.length - 1;
  return (
    <div className="card p-2 sm:p-4 overflow-x-auto reveal">
      <table className="cmp min-w-[640px]">
        <caption className="sr-only">{title ?? "Comparison"}</caption>
        <thead>
          <tr>
            <th scope="col"></th>
            {columns.map((c, i) => (
              <th key={c} scope="col" className={highlightLast && i === last ? "hl" : ""}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row" className="!normal-case !tracking-normal !text-navy !text-[0.95rem]">
                {r.label}
              </th>
              {r.values.map((v, i) => (
                <td key={i} className={highlightLast && i === last ? "hl" : ""}>
                  <Cell v={v} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HomeCompare() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          chapter="Read only vs write access"
          title={
            <>
              {COMPARE.home.title.split(".")[0]}. <Em>{COMPARE.home.title.split(".")[1]?.trim()}.</Em>
            </>
          }
          lead="A chatbot can tell a buyer your hours. An agent can look up their account pricing, send the quote, log it, and book the rep. That is the whole difference, and it is the one that shows up in revenue."
        />
        <div className="mt-12">
          <CompareTable columns={COMPARE.home.columns} rows={COMPARE.home.rows} />
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Longer version: <Link href="/compare/chatbot-vs-ai-agent" className="link-arrow">chatbot vs AI agent</Link>.
        </p>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */

export function PricingCards({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="section section-soft relative" id="pricing">
      <div className="container relative">
        {withHeading ? (
          <SectionHeading
            chapter="Pricing"
            title={
              <>
                A number in writing <Em>before we build.</Em>
              </>
            }
            lead={PRICING.intro}
          />
        ) : null}
        <div className={`${withHeading ? "mt-12" : ""} grid gap-5 md:grid-cols-3`}>
          {PRICING.tiers.map((t, i) => {
            const priceTodo = isTodo(t.price);
            return (
              <div key={t.name} className={`card p-7 flex flex-col reveal reveal-delay-${i + 1} ${t.featured ? "!border-navy" : ""}`}>
                <div className="flex items-center justify-between">
                  <span className="chapter">{String(i + 1).padStart(2, "0")}</span>
                  {t.featured ? <span className="text-[11px] font-medium text-white bg-navy rounded-full px-2.5 py-1">Most start here</span> : null}
                </div>
                <h3 className="h3 mt-5">{t.name}</h3>
                <div className="price mt-5">
                  {priceTodo ? "Priced" : t.price}
                  <small>/ {t.unit}</small>
                </div>
                <p className="mt-5 leading-relaxed text-gray-600">{t.body}</p>
                <Link href={t.href} className={`btn mt-7 ${t.featured ? "btn-primary" : "btn-ghost"}`}>
                  {t.cta}
                </Link>
              </div>
            );
          })}
        </div>
        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-3 text-sm text-gray-600">
          {PRICING.principles.map((p) => (
            <li key={p} className="inline-flex items-start gap-2">
              <Check width={16} height={16} className="text-navy mt-0.5 flex-none" /> <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Guarantee ---------- */

export function Guarantee() {
  const g = SITE.guarantee;
  if (!g.enabled || isTodo(g.headline)) return null;
  return (
    <section className="container py-8">
      <div className="card card-accent p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 reveal">
        <div>
          <h3 className="h3">{g.headline}</h3>
          <p className="mt-2 text-gray-600 leading-relaxed">{g.body}</p>
          <p className="mt-2 text-xs text-gray-500">{g.fine}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Home lead form ---------- */

export function HomeLead() {
  return (
    <section className="section border-t border-gray-200" id="quote">
      <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-start">
        <div className="reveal">
          <p className="chapter mb-5">Start here</p>
          <h2 className="h2">
            Tell us what slows your quotes. <Em>We reply within a business day.</Em>
          </h2>
          <p className="lead mt-6 max-w-md">Two minutes. A founder reads it, not a form queue. You get a plain answer on whether an agent would pay for itself, and what it would cost.</p>
          <ul className="mt-8 space-y-3 text-gray-600">
            {["No sales deck, no discovery retainer", "Fixed price in writing before any build", "You keep the code, the accounts, and the data"].map((t) => (
              <li key={t} className="flex gap-3">
                <Check width={18} height={18} className="text-navy mt-0.5 flex-none" /> <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal reveal-delay-1">
          <LeadForm variant="page" />
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

export function Faq({ items = FAQ, heading = true }: { items?: { q: string; a: string }[]; heading?: boolean }) {
  return (
    <section className="section" id="faq">
      <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.4fr]">
        {heading ? (
          <div className="reveal">
            <p className="chapter mb-5">Questions</p>
            <h2 className="h2">
              What buyers ask us <Em>on the first call.</Em>
            </h2>
          </div>
        ) : (
          <div />
        )}
        <div className="divide-y divide-gray-200 reveal">
          {items.map((f) => (
            <details key={f.q} className="faq">
              <summary>
                {f.q}
                <span className="plus" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA band ---------- */

export function CtaBand({ title, body }: { title?: React.ReactNode; body?: string }) {
  return (
    <section className="container pb-24 pt-6">
      <div className="relative section-dark rounded-[24px] overflow-hidden p-10 md:p-16 reveal">
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <p className="chapter mb-5">Next step</p>
            <h2 className="h2">
              {title ?? (
                <>
                  Find out which agent pays for itself <Em>first.</Em>
                </>
              )}
            </h2>
            <p className="lead mt-5 max-w-xl">{body ?? SITE.calendarNote}</p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <Link href="/contact" className="btn btn-primary">
              Book 30 minutes with a founder
            </Link>
            <Link href="/pricing" className="btn btn-ghost">
              How pricing works
            </Link>
            <span className="fig mt-1">{SITE.responseTime}. {SITE.hours}.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
