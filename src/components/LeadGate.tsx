"use client";

import { useCallback, useEffect, useState } from "react";
import LeadGateModal, { type LeadGatePayload } from "@/components/LeadGateModal";

const STORAGE_KEY = "ofarol_lead_ok_v1";

export default function LeadGate({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    try {
      const ok = window.localStorage.getItem(STORAGE_KEY) === "1";
      const t = window.setTimeout(() => setIsOpen(!ok), 0);
      return () => window.clearTimeout(t);
    } catch {
      const t = window.setTimeout(() => setIsOpen(true), 0);
      return () => window.clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    // While gated, prevent scroll and avoid "glimpses" from keyboard navigation.
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = useCallback(async (payload: LeadGatePayload) => {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
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
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setIsOpen(false);
  }, []);

  return (
    <>
      <div
        className={
          isOpen
            ? "blur-md brightness-75 saturate-75 pointer-events-none select-none"
            : ""
        }
      >
        {children}
      </div>
      {isOpen ? <LeadGateModal onSubmit={handleSubmit} onUnlocked={() => {}} /> : null}
    </>
  );
}
