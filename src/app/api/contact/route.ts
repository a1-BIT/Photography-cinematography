import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
const reply = (error: string, status: number) => NextResponse.json({ error }, { status });
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const expectedOrigin = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin : request.nextUrl.origin;
  if (origin && origin !== expectedOrigin && origin !== request.nextUrl.origin) return reply("Request origin is not allowed.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return reply("Expected a JSON request.", 415);
  // Read with a hard byte limit, including chunked requests without Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return reply("Your message is empty.", 400);
  let text = "", size = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) { await reader.cancel(); return reply("Your message is too long.", 413); }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } catch { return reply("Could not read the message.", 400); }
  let body: Record<string, unknown>;
  try { body = JSON.parse(text); } catch { return reply("Invalid message format.", 400); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return reply("Invalid message format.", 400);
  if (body.website) return NextResponse.json({ ok: true });
  const { name, contact, message } = body;
  if (typeof name !== "string" || name.trim().length < 2 || name.length > 100 || /[\r\n]/.test(name)) return reply("Please enter your name (2–100 characters).", 400);
  if (typeof contact !== "string" || contact.length > 200) return reply("Please enter a valid email address or phone number.", 400);
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());
  const phone = /^\+?[\d\s().-]+$/.test(contact.trim()) && contact.replace(/\D/g, "").length >= 7 && contact.replace(/\D/g, "").length <= 15;
  if (!email && !phone) return reply("Please enter a valid email address or phone number.", 400);
  if (typeof message !== "string" || message.trim().length < 10 || message.length > 4000) return reply("Please add a message between 10 and 4,000 characters.", 400);
  const { RESEND_API_KEY, CONTACT_FROM, CONTACT_TO } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM || !CONTACT_TO) return reply("This demo’s contact delivery isn’t connected yet. Please try again once the portfolio owner enables it.", 503);
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: CONTACT_FROM, to: [CONTACT_TO], ...(email ? { reply_to: contact.trim() } : {}), subject: `MyView enquiry from ${name.trim()}`, text: `Name: ${name.trim()}\nContact: ${contact.trim()}\n\n${message.trim()}` }),
      signal: AbortSignal.timeout(10000),
    });
    if (!result.ok) return reply("Your message couldn’t be delivered. Please try again later.", 502);
    return NextResponse.json({ ok: true });
  } catch { return reply("Delivery is temporarily unavailable. Please try again later.", 502); }
}
