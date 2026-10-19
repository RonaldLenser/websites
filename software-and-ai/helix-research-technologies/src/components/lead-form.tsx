"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SERVICES, PRICING } from "@/lib/data";

const SOURCES = ["Google", "ChatGPT / Perplexity", "Cold email from Helix", "A call from Helix", "Referral", "LinkedIn", "Other"];

type Props = {
  variant?: "hero" | "page";
  title?: string;
};

export default function LeadForm({ variant = "hero", title }: Props) {
  const router = useRouter();
  const [need, setNeed] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      website: String(fd.get("website") || ""),
      need: need || "Not sure yet",
      budget: budget || "Not sure yet",
      source: String(fd.get("source") || ""),
      message: String(fd.get("message") || ""),
      hp: String(fd.get("hp_field") || ""),
      page: typeof window !== "undefined" ? window.location.pathname : "",
    };
    const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "/api/lead";
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "1" && !process.env.NEXT_PUBLIC_LEAD_ENDPOINT) {
      // Static preview with no API configured: hand the details to email.
      const body = Object.entries(payload)
        .filter(([k]) => k !== "hp")
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href = `mailto:hello@helixresearchtech.com?subject=${encodeURIComponent("Quote request from " + payload.company)}&body=${encodeURIComponent(body)}`;
      setState("idle");
      return;
    }
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong");
      router.push("/contact?sent=1#book");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const compact = variant === "hero";

  return (
    <form onSubmit={onSubmit} className={`card relative p-5 sm:p-6 ${compact ? "" : "p-6 sm:p-8"}`} aria-busy={state === "sending"}>
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <h3 className="h3">{title ?? "Get a fixed-price quote"}</h3>
        <span className="num hidden sm:inline">2 min</span>
      </div>

      {/* honeypot */}
      <div className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
        <label>
          Leave this empty <input name="hp_field" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor={`name-${variant}`}>Your name</label>
          <input id={`name-${variant}`} name="name" className="field" required autoComplete="name" />
        </div>
        <div>
          <label className="label" htmlFor={`email-${variant}`}>Work email</label>
          <input id={`email-${variant}`} name="email" type="email" className="field" required autoComplete="email" />
        </div>
        <div>
          <label className="label" htmlFor={`company-${variant}`}>Company</label>
          <input id={`company-${variant}`} name="company" className="field" required autoComplete="organization" />
        </div>
        <div>
          <label className="label" htmlFor={`website-${variant}`}>Company website</label>
          <input id={`website-${variant}`} name="website" className="field" placeholder="yourcompany.com" inputMode="url" />
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="label">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {[...SERVICES.map((s) => s.name), "Not sure yet"].map((n) => (
            <button
              type="button"
              key={n}
              className="chip"
              data-active={need === n}
              onClick={() => setNeed(n)}
              aria-pressed={need === n}
            >
              {n}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="label">Budget range</legend>
        <div className="flex flex-wrap gap-2">
          {[...PRICING.budgetTiers, "Not sure yet"].map((b) => (
            <button
              type="button"
              key={b}
              className="chip"
              data-active={budget === b}
              onClick={() => setBudget(b)}
              aria-pressed={budget === b}
            >
              {b}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor={`source-${variant}`}>Where did you find us?</label>
          <select id={`source-${variant}`} name="source" className="field" defaultValue="">
            <option value="" disabled>
              Pick one
            </option>
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        {!compact ? (
          <div className="sm:col-span-2">
            <label className="label" htmlFor={`message-${variant}`}>What is slowing you down?</label>
            <textarea id={`message-${variant}`} name="message" className="field min-h-28" placeholder="Quotes sit overnight, reorders leak to competitors, the phone goes to voicemail at lunch..." />
          </div>
        ) : (
          <div>
            <label className="label" htmlFor={`message-${variant}`}>One line on the problem</label>
            <input id={`message-${variant}`} name="message" className="field" placeholder="Quotes sit overnight..." />
          </div>
        )}
      </div>

      {state === "error" ? (
        <p role="alert" className="mt-4 text-sm text-red">
          {error}. Email us instead: <a className="underline" href="mailto:hello@helixresearchtech.com">hello@helixresearchtech.com</a>
        </p>
      ) : null}

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <button type="submit" className="btn btn-primary justify-center" disabled={state === "sending"}>
          {state === "sending" ? "Sending..." : "Get my fixed-price quote"}
        </button>
        <span className="text-xs text-gray-500 leading-snug">
          Reply within one business day. No spam, no sequences you did not ask for.
        </span>
      </div>
    </form>
  );
}
