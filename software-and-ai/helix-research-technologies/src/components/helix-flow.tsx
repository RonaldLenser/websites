import Image from "next/image";
import { asset } from "@/lib/data";

/**
 * The Helix flow: request -> agent -> quote. Three quiet cards, one thin connector.
 */
export default function HelixFlow({ dark = false }: { dark?: boolean }) {
  const steps = [
    {
      k: "in",
      label: "Request in",
      time: "4:47pm",
      title: "RFQ: 500 x petri dishes, 90mm, sterile",
      body: "Need pricing and lead time by tomorrow. Ship to Raleigh.",
      meta: "Email from a lab manager",
    },
    {
      k: "agent",
      label: "Helix reads",
      time: "4:48pm",
      title: "Catalog match: SKU PD-90-S, in stock",
      body: "Account pricing applied. Lead time from warehouse feed. Nothing off-catalog, no approval needed.",
      meta: "Agent, 41 seconds",
    },
    {
      k: "out",
      label: "Quote out",
      time: "4:49pm",
      title: "Quote #4821 sent. $210.00, 2 days.",
      body: "Logged in GoHighLevel. Follow-up scheduled for tomorrow 9am if no reply.",
      meta: "Sent from your inbox",
    },
  ];
  const card = dark ? "plate" : "card";

  return (
    <div className="relative reveal">
      <ol className="relative grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.k} className={`${card} p-5 sm:p-6 relative`}>
            <div className="flex items-center justify-between">
              <span className="chapter">{s.label}</span>
              <span className="num">{s.time}</span>
            </div>
            <div className="mt-5 flex items-start gap-3">
              {i === 1 ? (
                <span className={`relative flex-none w-9 h-9 rounded-full grid place-items-center ${dark ? "bg-white" : "bg-navy"}`}>
                  <Image src={asset(dark ? "/brand/helix-symbol.svg" : "/brand/helix-symbol-reverse.svg")} alt="" width={16} height={16} />
                </span>
              ) : (
                <span className={`flex-none w-9 h-9 rounded-full grid place-items-center ${dark ? "bg-white/10" : "bg-gray-100"}`}>
                  <span className={`w-2 h-2 rounded-full ${i === 0 ? "bg-gray-500" : "bg-teal"}`} />
                </span>
              )}
              <div>
                <p className={`font-medium leading-snug ${dark ? "text-white" : "text-navy"}`}>{s.title}</p>
                <p className={`mt-1.5 text-sm leading-relaxed ${dark ? "" : "text-gray-600"}`}>{s.body}</p>
              </div>
            </div>
            <p className="mt-5 fig">{s.meta}</p>
          </li>
        ))}
      </ol>

      <div className={`mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px] ${dark ? "" : "text-gray-600"}`}>
        {["Every step logged in your CRM", "Human approval for anything off-catalog", "Reply goes out under your name"].map((t) => (
          <span key={t} className="inline-flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${dark ? "bg-white/60" : "bg-navy"}`} /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}
