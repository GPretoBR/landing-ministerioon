"use client";

/**
 * Camada de eventos. Tudo passa pelo dataLayer (GTM/GA4) e, se houver consentimento,
 * pelos pixels carregados. Antes do consentimento os eventos ficam apenas na memória
 * da página: nenhum script de terceiros é carregado e nada é enviado.
 *
 * Eventos:
 *  - cta_click       { location }               clique em qualquer CTA
 *  - whatsapp_click  { location, plan?, cycle? } abertura do WhatsApp
 *  - plan_select     { plan, cycle, value }     equivalente a begin_checkout
 *  - form_start      { form }                   primeiro campo tocado
 *  - generate_lead   { form, units }            envio do formulário (abre WhatsApp)
 *  - scroll_depth    { percent }                25, 50, 75, 90
 * A compra é concluída dentro do app (assinatura), não nesta página.
 */

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export const CONSENT_KEY = "mo-consent-v1";

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params, ...getUtm() });

  const metaMap: Record<string, string> = {
    whatsapp_click: "Contact",
    generate_lead: "Lead",
    plan_select: "InitiateCheckout",
  };
  if (window.fbq && metaMap[event]) window.fbq("track", metaMap[event], params);
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

/** Guarda os parâmetros UTM da primeira visita da sessão. */
export function captureUtm() {
  try {
    const q = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    UTM_KEYS.forEach((k) => {
      const v = q.get(k);
      if (v) found[k] = v.slice(0, 120);
    });
    if (Object.keys(found).length) sessionStorage.setItem("mo-utm", JSON.stringify(found));
  } catch {
    /* armazenamento indisponível: segue sem UTM */
  }
}

export function getUtm(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem("mo-utm") || "{}");
  } catch {
    return {};
  }
}

export function readConsent(): "granted" | "denied" | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(v: "granted" | "denied") {
  try {
    localStorage.setItem(CONSENT_KEY, v);
  } catch {
    /* sem armazenamento: a escolha vale só para esta visita */
  }
}
