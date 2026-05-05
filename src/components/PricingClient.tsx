"use client";

import { useCallback, useMemo, useState } from "react";
import LeadGateModal, { type LeadGatePayload } from "@/components/LeadGateModal";

type Plan = {
  title: string;
  price: string;
  badge: string;
  features: string[];
  href: string;
  cta: string;
  highlight?: boolean;
};

const STORAGE_OK_UNTIL = "ofarol_lead_ok_until_v1";
const OK_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

export default function PricingClient({ plans }: { plans: Plan[] }) {
  const [open, setOpen] = useState(false);
  const [selectedHref, setSelectedHref] = useState<string | null>(null);

  const canSkip = useCallback(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_OK_UNTIL);
      if (!raw) return false;
      const until = Number(raw);
      return Number.isFinite(until) && Date.now() < until;
    } catch {
      return false;
    }
  }, []);

  const openFor = useCallback(
    (href: string) => {
      if (canSkip()) {
        window.location.href = href;
        return;
      }
      setSelectedHref(href);
      setOpen(true);
    },
    [canSkip],
  );

  const onSubmit = useCallback(
    async (payload: LeadGatePayload) => {
      const checkoutUrl = selectedHref || undefined;
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, checkoutUrl }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; reason?: string; message?: string }
        | null;

      if (!res.ok || !data || data.ok !== true) {
        const fail = data && data.ok === false ? data : null;
        const msg =
          fail?.message ||
          (fail?.reason === "invalid_whatsapp"
            ? "WhatsApp inválido, revise o número."
            : "Tivemos um problema ao validar seu número. Tente novamente em instantes.");
        throw new Error(msg);
      }

      try {
        window.localStorage.setItem(
          STORAGE_OK_UNTIL,
          String(Date.now() + OK_TTL_MS),
        );
      } catch {
        // ignore
      }
    },
    [selectedHref],
  );

  const modalCta = useMemo(() => "Continuar para o pagamento", []);

  return (
    <>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <PlanCard
            key={p.title}
            {...p}
            onClick={() => openFor(p.href)}
          />
        ))}
      </div>

      {open && selectedHref ? (
        <LeadGateModal
          onSubmit={onSubmit}
          onUnlocked={() => {
            setOpen(false);
            window.location.href = selectedHref;
          }}
          ctaLabel={modalCta}
          checkoutUrl={selectedHref}
        />
      ) : null}
    </>
  );
}

function PlanCard({
  title,
  price,
  badge,
  features,
  cta,
  highlight,
  onClick,
}: {
  title: string;
  price: string;
  badge: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl border bg-night-2 p-8",
        highlight ? "border-gold/35" : "border-white/10",
      ].join(" ")}
    >
      {highlight ? (
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
      ) : null}

      <div className="relative">
        <div className="inline-flex items-center rounded-full border border-gold/25 bg-night/40 px-4 py-2 text-xs tracking-[0.18em] text-muted">
          {badge}
        </div>
        <h3 className="mt-5 text-2xl text-paper">{title}</h3>
        <div className="mt-3 flex items-baseline gap-2">
          <div className="text-4xl text-gold">{price}</div>
          {title !== "Sessão avulsa" ? (
            <div className="text-sm text-muted">/ mês</div>
          ) : null}
        </div>

        <ul className="mt-6 space-y-3 text-paper">
          {features.map((f) => (
            <li key={f} className="flex gap-3 leading-7">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gold" />
              <span className="text-muted">{f}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onClick}
          className={[
            "mt-8 inline-flex w-full items-center justify-center rounded-xl px-6 py-3 font-semibold transition",
            highlight
              ? "bg-gold text-night hover:brightness-110"
              : "border border-gold/25 bg-night/30 text-paper hover:border-gold/50",
          ].join(" ")}
        >
          {cta}
        </button>
      </div>
    </div>
  );
}

