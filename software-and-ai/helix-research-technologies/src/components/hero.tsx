import Link from "next/link";
import HelixFlow from "./helix-flow";
import { SITE } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative pt-[72px]" id="top">
      <div className="container pt-20 md:pt-32 pb-14 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="chapter mb-6">AI agents for lab, medical, and industrial supply</p>
          <h1 className="display" style={{ fontSize: "clamp(2.5rem, 5.6vw, 4.6rem)" }}>
            The quote goes out before the buyer finishes their coffee.
          </h1>
          <p className="lead mt-7 max-w-2xl mx-auto">
            Helix builds AI agents that read the request, price it from your catalog, send the quote, and chase the reply. Fixed price. Your accounts, your data, your code.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Book 30 minutes with a founder
            </Link>
            <Link href="/services/quote-desk-agent" className="btn btn-ghost">
              How the Quote Desk works
            </Link>
          </div>
        </div>

        <dl className="mt-16 md:mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
          {SITE.stats.slice(0, 3).map((s) => (
            <div key={s.label}>
              <dd className="font-display font-semibold text-2xl md:text-3xl text-navy tracking-tight">{s.value}</dd>
              <dt className="text-sm text-gray-500 mt-1">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="container pb-16 md:pb-24">
        <div className="card-soft p-5 sm:p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8">
            <div>
              <p className="chapter mb-2">Quote Desk Agent, one request</p>
              <h2 className="h3">A Tuesday afternoon with an agent on the inbox.</h2>
            </div>
            <p className="text-sm text-gray-500">Real flow. Placeholder numbers until a client approves theirs.</p>
          </div>
          <HelixFlow />
        </div>
      </div>
    </section>
  );
}
