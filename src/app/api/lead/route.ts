import { NextResponse } from "next/server";
import { getPublicConfig, getServerWhatsappConfig } from "@/lib/config";
import { normalizeToE164Brazil } from "@/lib/phone";
import { leadSchema } from "@/lib/validation";
import { sendWhatsappMessage, verifyWhatsappNumber } from "@/lib/whatsapp";

export const runtime = "nodejs";

type Bucket = { windowStartMs: number; count: number };

function getIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function getBucketStore(): Map<string, Bucket> {
  const g = globalThis as unknown as { __ofarolBuckets?: Map<string, Bucket> };
  if (!g.__ofarolBuckets) g.__ofarolBuckets = new Map();
  return g.__ofarolBuckets;
}

function rateLimit(ip: string, limit: number, windowMs: number) {
  const store = getBucketStore();
  const now = Date.now();
  const bucket = store.get(ip);
  if (!bucket || now - bucket.windowStartMs > windowMs) {
    store.set(ip, { windowStartMs: now, count: 1 });
    return { allowed: true };
  }

  if (bucket.count >= limit) return { allowed: false };
  bucket.count += 1;
  store.set(ip, bucket);
  return { allowed: true };
}

export async function POST(req: Request) {
  const ip = getIp(req);
  const rl = rateLimit(ip, 5, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, reason: "rate_limited", message: "Muitas tentativas. Tente novamente em instantes." },
      { status: 429 },
    );
  }

  const json = await req.json().catch(() => null);
  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, reason: "invalid_input", message: "Dados inválidos. Verifique e tente novamente." },
      { status: 400 },
    );
  }

  const { email, whatsapp, hp, checkoutUrl } = parsed.data;

  // Honeypot triggered: pretend success, do nothing.
  if (hp && hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const phoneE164 = normalizeToE164Brazil(whatsapp);
  if (!phoneE164) {
    return NextResponse.json(
      { ok: false, reason: "invalid_whatsapp", message: "WhatsApp inválido, revise o número." },
      { status: 400 },
    );
  }

  const { token, verifyUrl, sendUrl, messageTemplate } = getServerWhatsappConfig();
  const { checkout4 } = getPublicConfig();

  if (!token || !verifyUrl || !sendUrl) {
    // Keep the page usable in staging: return a clear error.
    return NextResponse.json(
      {
        ok: false,
        reason: "missing_config",
        message:
          "Configuração do WhatsApp ausente no servidor. Defina WHATSAPP_API_BASE_URL e WHATSAPP_API_TOKEN.",
      },
      { status: 500 },
    );
  }

  // 1) verify
  const verify = await verifyWhatsappNumber({ verifyUrl, token, phoneE164 });
  if (!verify.exists) {
    return NextResponse.json(
      { ok: false, reason: "invalid_whatsapp", message: "WhatsApp inválido, revise o número." },
      { status: 400 },
    );
  }

  // 2) send message
  const chosen = checkoutUrl || checkout4;
  const message = messageTemplate
    .replace("{{CHECKOUT_URL}}", chosen)
    .replace("{{CHECKOUT_4_URL}}", checkout4);
  await sendWhatsappMessage({ sendUrl, token, phoneE164, message });

  // We intentionally don't persist anything yet (no DB in the scope).
  // If you want lead capture later, we can add a provider (Sheets/Airtable/DB).
  void email;

  return NextResponse.json({ ok: true });
}
