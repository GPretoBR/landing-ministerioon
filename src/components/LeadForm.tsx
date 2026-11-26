"use client";

import { useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { whatsappUrl, whatsappReady } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppButton";

type Errors = Partial<Record<"nome" | "igreja", string>>;

/**
 * Formulário curto que monta a mensagem do WhatsApp.
 * Nada é enviado para servidor: os dados vão apenas no texto da conversa.
 */
export function LeadForm() {
  const [errors, setErrors] = useState<Errors>({});
  const started = useRef(false);

  function onFocus() {
    if (started.current) return;
    started.current = true;
    track("form_start", { form: "lead_whatsapp" });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") || "").trim().slice(0, 80);
    const igreja = String(data.get("igreja") || "").trim().slice(0, 120);
    const unidades = String(data.get("unidades") || "");

    const next: Errors = {};
    if (nome.length < 2) next.nome = "Escreva seu nome para a equipe saber com quem está falando.";
    if (igreja.length < 2) next.igreja = "Escreva o nome da igreja.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector<HTMLInputElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }

    const msg = `Olá! Sou ${nome}, da ${igreja}${unidades ? ` (${unidades})` : ""}. Vim pelo site e quero entender como o MinisterioOn funciona para a nossa igreja.`;
    const url = whatsappUrl(msg);
    track("generate_lead", { form: "lead_whatsapp", units: unidades || "nao_informado" });
    track("whatsapp_click", { location: "lead_form" });
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }

  const field =
    "mt-1.5 block w-full rounded-xl border-0 bg-white px-4 py-3 text-base text-ink ring-1 ring-white/20 placeholder:text-ink-soft/60 focus:ring-2 focus:ring-gold focus:outline-none aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[#ffb4a0]";

  return (
    <form noValidate onSubmit={onSubmit} onFocus={onFocus} className="space-y-4" aria-describedby="lead-privacy">
      <div>
        <label htmlFor="nome" className="text-sm font-semibold text-white">
          Seu nome
        </label>
        <input
          id="nome"
          name="nome"
          autoComplete="name"
          className={field}
          placeholder="Ex.: Pr. Marcos"
          aria-invalid={Boolean(errors.nome)}
          aria-describedby={errors.nome ? "nome-err" : undefined}
        />
        {errors.nome && (
          <p id="nome-err" className="mt-1 text-sm text-[#ffd4c8]">
            {errors.nome}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="igreja" className="text-sm font-semibold text-white">
          Nome da igreja
        </label>
        <input
          id="igreja"
          name="igreja"
          autoComplete="organization"
          className={field}
          placeholder="Ex.: Igreja Batista Central"
          aria-invalid={Boolean(errors.igreja)}
          aria-describedby={errors.igreja ? "igreja-err" : undefined}
        />
        {errors.igreja && (
          <p id="igreja-err" className="mt-1 text-sm text-[#ffd4c8]">
            {errors.igreja}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="unidades" className="text-sm font-semibold text-white">
          A igreja tem filiais? <span className="font-normal text-white/80">(opcional)</span>
        </label>
        <select id="unidades" name="unidades" className={field} defaultValue="">
          <option value="">Prefiro contar na conversa</option>
          <option value="uma unidade">Não, é uma unidade só</option>
          <option value="sede e filiais">Sim, temos sede e filiais</option>
        </select>
      </div>

      <button type="submit" className="btn btn-gold w-full" aria-disabled={!whatsappReady}>
        <WhatsAppIcon />
        Abrir conversa no WhatsApp
      </button>
      <p id="lead-privacy" className="text-xs leading-relaxed text-white/80">
        Seus dados não ficam salvos nesta página: eles vão só no texto da mensagem que você envia pelo WhatsApp.
      </p>
    </form>
  );
}
