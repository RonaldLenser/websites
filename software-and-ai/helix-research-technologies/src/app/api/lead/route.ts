import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * POST /api/lead
 * Validates the lead, drops bots, rate limits by IP, then in order:
 *   1. GoHighLevel: upsert the contact, add a timeline note, open an opportunity
 *      in the Marketing Pipeline (GHL_API_KEY, GHL_LOCATION_ID, GHL_PIPELINE_ID).
 *      The Helix Discord bot polls GHL every minute, so the contact and the deal
 *      also show up in new-leads and the deals forum on their own.
 *   2. Discord: instant post with the full form. Posts as the "Helix Website" bot user
 *      when DISCORD_BOT_TOKEN + DISCORD_LEAD_CHANNEL_ID are set (bot profile carries
 *      avatar, banner and bio), otherwise through DISCORD_LEAD_WEBHOOK_URL.
 *   3. Email copy via Resend (RESEND_API_KEY, LEAD_NOTIFY_EMAIL).
 *   4. Always logs to the server console.
 * CORS: origins in ALLOWED_ORIGINS (comma separated) may call this from another
 * host, so the GitHub Pages preview can post to the Vercel API.
 */

type Lead = {
  name: string;
  email: string;
  company: string;
  website?: string;
  need?: string;
  budget?: string;
  source?: string;
  message?: string;
  hp?: string;
  page?: string;
};

const GHL = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_PER_WINDOW;
}

function clean(s: unknown, max = 500): string {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

function validEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
}

function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/* ---------- CORS ---------- */

function allowedOrigin(req: Request): string | null {
  const origin = req.headers.get("origin");
  if (!origin) return null;
  const list = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return list.includes(origin) ? origin : null;
}

function withCors(res: NextResponse, origin: string | null): NextResponse {
  if (origin) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Vary", "Origin");
    res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "content-type");
    res.headers.set("Access-Control-Max-Age", "86400");
  }
  return res;
}

export async function OPTIONS(req: Request) {
  return withCors(new NextResponse(null, { status: 204 }), allowedOrigin(req));
}

/* ---------- GoHighLevel ---------- */

function ghlHeaders(key: string): Record<string, string> {
  return {
    Authorization: `Bearer ${key}`,
    Version: GHL_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

async function ghlStageId(key: string, locationId: string, pipelineId: string): Promise<string | undefined> {
  const wanted = (process.env.GHL_STAGE_NAME || "New").toLowerCase();
  const res = await fetch(`${GHL}/opportunities/pipelines?locationId=${locationId}`, { headers: ghlHeaders(key) });
  if (!res.ok) return undefined;
  const data = (await res.json()) as { pipelines?: { id: string; stages?: { id: string; name: string }[] }[] };
  const pipe = data.pipelines?.find((p) => p.id === pipelineId);
  const stages = pipe?.stages || [];
  return (stages.find((s) => s.name.toLowerCase() === wanted) || stages[0])?.id;
}

async function pushToGhl(lead: Lead): Promise<{ ok: boolean; id?: string; opportunityId?: string; error?: string }> {
  const key = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!key || !locationId) return { ok: false, error: "GHL not configured" };

  const { firstName, lastName } = splitName(lead.name);
  const tags = ["website-inbound", lead.need ? `need:${slug(lead.need)}` : "", lead.budget ? `budget:${slug(lead.budget)}` : ""].filter(Boolean);

  const body = {
    locationId,
    firstName,
    lastName,
    name: lead.name,
    email: lead.email,
    companyName: lead.company,
    website: lead.website || undefined,
    source: `Website${lead.source ? ` (${lead.source})` : ""}`,
    tags,
    customFields: [] as { id: string; value: string }[],
  };

  const fieldNeed = process.env.GHL_FIELD_NEED_ID;
  const fieldBudget = process.env.GHL_FIELD_BUDGET_ID;
  const fieldMessage = process.env.GHL_FIELD_MESSAGE_ID;
  if (fieldNeed && lead.need) body.customFields.push({ id: fieldNeed, value: lead.need });
  if (fieldBudget && lead.budget) body.customFields.push({ id: fieldBudget, value: lead.budget });
  if (fieldMessage && lead.message) body.customFields.push({ id: fieldMessage, value: lead.message });

  const res = await fetch(`${GHL}/contacts/upsert`, { method: "POST", headers: ghlHeaders(key), body: JSON.stringify(body) });
  if (!res.ok) {
    const text = await res.text();
    return { ok: false, error: `GHL ${res.status}: ${text.slice(0, 300)}` };
  }
  const data = (await res.json()) as { contact?: { id?: string } };
  const id = data.contact?.id;
  if (!id) return { ok: true };

  // Timeline note with the whole form.
  await fetch(`${GHL}/contacts/${id}/notes`, {
    method: "POST",
    headers: ghlHeaders(key),
    body: JSON.stringify({
      body: [
        "Website lead",
        `Need: ${lead.need || "-"}`,
        `Budget: ${lead.budget || "-"}`,
        `Source: ${lead.source || "-"}`,
        `Page: ${lead.page || "-"}`,
        "",
        lead.message || "",
      ].join("\n"),
    }),
  }).catch(() => undefined);

  // Open a deal in the Marketing Pipeline so it lands in the deals forum, not just contacts.
  const pipelineId = process.env.GHL_PIPELINE_ID;
  let opportunityId: string | undefined;
  if (pipelineId) {
    const stageId = await ghlStageId(key, locationId, pipelineId).catch(() => undefined);
    if (stageId) {
      const oppRes = await fetch(`${GHL}/opportunities/`, {
        method: "POST",
        headers: ghlHeaders(key),
        body: JSON.stringify({
          pipelineId,
          locationId,
          pipelineStageId: stageId,
          contactId: id,
          status: "open",
          name: `${lead.company}${lead.need ? ` · ${lead.need}` : ""}`.slice(0, 200),
          source: "Website",
        }),
      }).catch(() => undefined);
      if (oppRes?.ok) {
        const opp = (await oppRes.json()) as { opportunity?: { id?: string } };
        opportunityId = opp.opportunity?.id;
      }
    }
  }
  return { ok: true, id, opportunityId };
}

/* ---------- Discord ---------- */

async function postToDiscord(lead: Lead, ghl: { id?: string; opportunityId?: string }, siteOrigin: string): Promise<void> {
  const webhook = process.env.DISCORD_LEAD_WEBHOOK_URL;
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const channelId = process.env.DISCORD_LEAD_CHANNEL_ID;
  const viaBot = !!(botToken && channelId);
  if (!webhook && !viaBot) return;
  const locationId = process.env.GHL_LOCATION_ID;
  const contactUrl = ghl.id && locationId ? `https://app.gohighlevel.com/v2/location/${locationId}/contacts/detail/${ghl.id}` : undefined;
  const oppUrl = ghl.opportunityId && locationId ? `https://app.gohighlevel.com/v2/location/${locationId}/opportunities/list` : undefined;
  const brand = `${siteOrigin}/brand`;
  const field = (name: string, value: string | undefined, inline = true) => ({ name, value: (value || "-").slice(0, 1000), inline });
  const site = lead.website ? (lead.website.startsWith("http") ? lead.website : `https://${lead.website}`) : undefined;
  const links = [
    contactUrl ? `[Open contact in GHL](${contactUrl})` : "",
    oppUrl ? `[Marketing Pipeline](${oppUrl})` : "",
    site ? `[Their website](${site})` : "",
    `[Reply by email](mailto:${lead.email})`,
  ].filter(Boolean).join("  ·  ");
  const payload = {
    ...(viaBot ? {} : { username: "Helix Website", avatar_url: `${brand}/avatar.png` }),
    allowed_mentions: { parse: [] },
    embeds: [
        {
          author: { name: "helixresearchtech.com  ·  new lead", icon_url: `${brand}/avatar.png`, url: siteOrigin },
          title: `${lead.company}${lead.need ? `  ·  ${lead.need}` : ""}`.slice(0, 256),
          url: contactUrl || siteOrigin,
          description: [lead.message ? `> ${lead.message.slice(0, 1200).replace(/\n/g, "\n> ")}` : "", "", links].join("\n"),
          color: 0x1566b9,
          thumbnail: { url: `${brand}/avatar.png` },
          image: { url: `${brand}/lead-banner.png` },
          fields: [
            field("Name", lead.name),
            field("Email", lead.email),
            field("Website", lead.website),
            field("Budget", lead.budget),
            field("Found us via", lead.source),
            field("From page", lead.page),
            field("CRM", ghl.id ? (ghl.opportunityId ? "Contact saved, deal opened in New" : "Contact saved") : "Not saved, check GHL_API_KEY", false),
          ],
          footer: { text: "Helix Research Technologies  ·  Fredericksburg, VA", icon_url: `${brand}/avatar.png` },
          timestamp: new Date().toISOString(),
        },
      ],
  };
  // Bot user (has its own profile with banner and bio) when configured, webhook otherwise.
  const target = viaBot ? `https://discord.com/api/v10/channels/${channelId}/messages` : (webhook as string);
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (viaBot) headers.Authorization = `Bot ${botToken}`;
  await fetch(target, { method: "POST", headers, body: JSON.stringify(payload) }).catch(() => undefined);
}

/* ---------- Email ---------- */

async function emailCopy(lead: Lead): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL || "Helix Website <leads@helixresearchtech.com>";
  if (!key || !to) return;
  const text = [
    `New website lead`,
    ``,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company}`,
    `Website: ${lead.website || "-"}`,
    `Need: ${lead.need || "-"}`,
    `Budget: ${lead.budget || "-"}`,
    `Source: ${lead.source || "-"}`,
    `Page: ${lead.page || "-"}`,
    ``,
    lead.message || "",
  ].join("\n");
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: to.split(","), reply_to: lead.email, subject: `Lead: ${lead.company} (${lead.need || "unspecified"})`, text }),
  }).catch(() => undefined);
}

/* ---------- Handler ---------- */

export async function POST(req: Request) {
  const origin = allowedOrigin(req);
  const json = (body: object, status = 200) => withCors(NextResponse.json(body, { status }), origin);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return json({ ok: false, error: "Too many requests. Try again in a few minutes" }, 429);

  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Bad request" }, 400);
  }

  // Honeypot: bots fill it, humans never see it. Return ok so bots stop retrying.
  if (clean(raw.hp)) return json({ ok: true });

  const lead: Lead = {
    name: clean(raw.name, 120),
    email: clean(raw.email, 200).toLowerCase(),
    company: clean(raw.company, 160),
    website: clean(raw.website, 200),
    need: clean(raw.need, 80),
    budget: clean(raw.budget, 60),
    source: clean(raw.source, 60),
    message: clean(raw.message, 2000),
    page: clean(raw.page, 200),
  };

  if (!lead.name || !lead.company || !validEmail(lead.email)) {
    return json({ ok: false, error: "Name, work email, and company are required" }, 400);
  }

  // Nowhere to deliver the lead (fresh deployment with no env vars): fail loudly so the
  // form shows the email fallback instead of swallowing the lead.
  const hasSink = !!(process.env.GHL_API_KEY || process.env.DISCORD_LEAD_WEBHOOK_URL || process.env.DISCORD_BOT_TOKEN || process.env.RESEND_API_KEY);
  if (!hasSink) {
    console.error(JSON.stringify({ event: "lead_unrouted", lead: { ...lead, message: lead.message?.slice(0, 200) } }));
    return json({ ok: false, error: "Our form is not connected yet" }, 503);
  }

  const ghl = await pushToGhl(lead).catch((e: Error) => ({ ok: false, error: e.message } as { ok: boolean; id?: string; opportunityId?: string; error?: string }));
  const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(req.url).origin;
  await Promise.all([postToDiscord(lead, ghl, siteOrigin), emailCopy(lead)]);

  console.log(JSON.stringify({ event: "lead", ip, ghl: ghl.ok ? `ok ${ghl.id || ""} ${ghl.opportunityId || ""}`.trim() : ghl.error, lead: { ...lead, message: lead.message?.slice(0, 200) } }));

  return json({ ok: true, crm: ghl.ok });
}
