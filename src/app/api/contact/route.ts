import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "edge";

// Lazily built so the app runs/builds without secrets present.
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(3, "1 h"),
        prefix: "contact",
      })
    : null;

function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() ?? "anonymous";
}

export async function POST(req: Request) {
  // 1. Rate limit (skipped if Upstash unconfigured)
  if (ratelimit) {
    const { success } = await ratelimit.limit(clientIp(req));
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        { status: 429 },
      );
    }
  }

  // 2. Validate (server re-validation with the same schema)
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }
  const { name, email, projectType, message } = parsed.data;

  // 3. Send (guarded — clear error instead of a 500 crash if unconfigured)
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    return NextResponse.json(
      { error: "Email is not configured on the server." },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New inquiry · ${projectType} · ${name}`,
      text: `From: ${name} <${email}>\nProject: ${projectType}\n\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send." }, { status: 502 });
  }
}
