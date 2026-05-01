type VerifyResult = { exists: boolean };

function getBoolean(x: unknown): boolean | null {
  return typeof x === "boolean" ? x : null;
}

function getString(x: unknown): string | null {
  return typeof x === "string" ? x : null;
}

function parseUazapiCheckResponse(payload: unknown, queriedNumber: string): boolean | null {
  // Provider described by the user:
  // POST /chat/check with { numbers: ["5511...", ...] }
  // Response shape varies by deployment; we parse defensively.

  // Direct booleans
  const p0 = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : null;
  const direct =
    getBoolean(p0?.exists) ?? getBoolean(p0?.valid) ?? getBoolean(p0?.isInWhatsapp);
  if (direct !== null) return direct;

  // If payload is an array, attempt to find any entry that matches the number.
  if (Array.isArray(payload)) {
    for (const item of payload) {
      if (!item || typeof item !== "object") continue;
      const obj = item as Record<string, unknown>;
      const num =
        getString(obj.query) ||
        getString(obj.number) ||
        getString(obj.phone) ||
        getString(obj.id);
      const exists =
        getBoolean(obj.exists) ??
        getBoolean(obj.valid) ??
        getBoolean(obj.isValid) ??
        getBoolean(obj.isInWhatsapp);
      if (num && num.replace(/\D+/g, "") === queriedNumber.replace(/\D+/g, "")) {
        if (exists !== null) return exists;
      }
    }
  }

  // Nested arrays: { data: [...] } / { numbers: [...] } / { result: [...] }
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    const candidates = [obj.data, obj.numbers, obj.result, obj.results, obj.contacts];
    for (const c of candidates) {
      if (c) {
        const r = parseUazapiCheckResponse(c, queriedNumber);
        if (r !== null) return r;
      }
    }
  }

  return null;
}

export async function verifyWhatsappNumber(opts: {
  verifyUrl: string;
  token: string;
  phoneE164: string; // may include '+'
}) {
  const numberDigits = opts.phoneE164.replace(/[^\d]/g, "");
  const res = await fetch(opts.verifyUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      token: opts.token,
    },
    body: JSON.stringify({ numbers: [numberDigits] }),
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error("verify_failed");
  }

  const exists = parseUazapiCheckResponse(json, numberDigits);
  if (exists === null) {
    // If provider does not return a recognizable shape, treat as failure (safer).
    throw new Error("verify_unexpected_response");
  }

  return { exists } satisfies VerifyResult;
}

export async function sendWhatsappMessage(opts: {
  sendUrl: string;
  token: string;
  phoneE164: string; // may include '+'
  message: string; // text
}) {
  const numberDigits = opts.phoneE164.replace(/[^\d]/g, "");
  const res = await fetch(opts.sendUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      token: opts.token,
    },
    body: JSON.stringify({ number: numberDigits, text: opts.message }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("send_failed");
  }
}
