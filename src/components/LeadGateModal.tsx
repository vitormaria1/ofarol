"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { formatBrPhoneMask, onlyDigits } from "@/lib/phone";

export type LeadGatePayload = {
  email: string;
  whatsapp: string;
  hp?: string; // honeypot
  referrer?: string;
  utm?: Record<string, string>;
};

export default function LeadGateModal({
  onSubmit,
  onUnlocked,
}: {
  onSubmit: (payload: LeadGatePayload) => Promise<void>;
  onUnlocked: () => void;
}) {
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [hp, setHp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [referrer, setReferrer] = useState<string | undefined>(undefined);
  const [utm, setUtm] = useState<Record<string, string> | undefined>(undefined);

  useEffect(() => {
    const t = window.setTimeout(() => {
      const url = new URL(window.location.href);
      const utmKeys = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
      ] as const;
      const utmLocal: Record<string, string> = {};
      for (const k of utmKeys) {
        const v = url.searchParams.get(k);
        if (v) utmLocal[k] = v;
      }
      setReferrer(document.referrer || undefined);
      setUtm(Object.keys(utmLocal).length ? utmLocal : undefined);
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isLoading) return;
    setError(null);
    setIsLoading(true);
    try {
      await onSubmit({
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        hp: hp.trim() || undefined,
        referrer,
        utm,
      });
      onUnlocked();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setIsLoading(false);
    }
  }

  const whatsappDigits = onlyDigits(whatsapp);
  const whatsappMasked = formatBrPhoneMask(whatsappDigits);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-night/95 px-5">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gold/20 bg-night-2 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
          <div className="absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
        </div>

        <div className="relative p-7 sm:p-9">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gold/25 bg-night">
              <Image
                src="/assets/logo.jpeg"
                alt="O Farol - Clínica Terapêutica"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <div className="text-xs tracking-[0.22em] text-muted">
                CLÍNICA TERAPÊUTICA
              </div>
              <h2 className="mt-1 text-2xl text-paper">O FAROL</h2>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-muted">
            Antes de continuar, informe seu e-mail e WhatsApp. Assim que validarmos seu
            número, você receberá uma mensagem para seguir com o agendamento.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm text-paper">E-mail</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                autoComplete="email"
                placeholder="seuemail@exemplo.com"
                className="mt-2 w-full rounded-xl border border-white/10 bg-night px-4 py-3 text-paper outline-none ring-0 placeholder:text-white/35 focus:border-gold/50"
              />
            </label>

            <label className="block">
              <span className="text-sm text-paper">WhatsApp</span>
              <input
                value={whatsappMasked}
                onChange={(e) => setWhatsapp(e.target.value)}
                inputMode="numeric"
                autoComplete="tel"
                required
                placeholder="(11) 99999-9999"
                className="mt-2 w-full rounded-xl border border-white/10 bg-night px-4 py-3 text-paper outline-none ring-0 placeholder:text-white/35 focus:border-gold/50"
              />
              <div className="mt-2 text-xs text-muted">
                Ao enviar, você concorda em receber uma mensagem no WhatsApp para dar
                continuidade ao agendamento.
              </div>
            </label>

            {/* honeypot */}
            <div className="hidden">
              <label>
                Website
                <input value={hp} onChange={(e) => setHp(e.target.value)} />
              </label>
            </div>

            {error ? (
              <div className="rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-paper">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="group relative mt-2 w-full overflow-hidden rounded-xl bg-gold px-5 py-3 font-semibold text-night transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="relative">
                {isLoading ? "Validando..." : "Enviar e Continuar"}
              </span>
              <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="absolute -left-16 top-0 h-full w-16 rotate-12 bg-white/20 blur-xl" />
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
