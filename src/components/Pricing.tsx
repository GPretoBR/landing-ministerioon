"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { brl, cycles, perMonth, plans, savingsPct, type Cycle } from "@/lib/plans";
import { track } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppButton";

export function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("anual");
  const cycleInfo = cycles.find((c) => c.id === cycle)!;

  return (
    <div>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <fieldset className="w-full sm:w-auto">
          <legend className="sr-only">Ciclo de cobrança</legend>
          <div className="grid grid-cols-4 rounded-full bg-white p-1 ring-1 ring-line sm:inline-grid">
            {cycles.map((c) => (
              <label key={c.id} className="cursor-pointer text-center">
                <input
                  type="radio"
                  name="ciclo"
                  value={c.id}
                  checked={cycle === c.id}
                  onChange={() => setCycle(c.id)}
                  className="peer sr-only"
                />
                <span className="block rounded-full px-2 py-2 text-[13px] sm:px-4 sm:text-sm font-semibold text-ink-soft transition-colors peer-checked:bg-indigo peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-gold">
                  {c.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <p className="text-sm text-ink-soft" aria-live="polite">
          {cycle === "mensal"
            ? "Pagamento mês a mês."
            : `No ${cycleInfo.label.toLowerCase()} você paga ${savingsPct(plans[0], cycle)}% menos que no mensal.`}
        </p>
      </div>

      <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {plans.map((plan) => {
          const featured = Boolean(plan.highlight);
          const total = plan.prices[cycle];
          const msg = `Olá! Vim pelo site e tenho interesse no plano ${plan.name} (${cycleInfo.label.toLowerCase()}, ${brl(total)}). Pode me explicar os próximos passos?`;
          const href = whatsappUrl(msg);
          return (
            <li
              key={plan.id}
              className={`relative flex flex-col rounded-2xl p-6 xl:p-5 ${
                featured ? "bg-indigo text-white shadow-[0_30px_60px_-30px_rgba(57,62,153,0.8)]" : "bg-white ring-1 ring-line"
              }`}
            >
              {plan.highlight && (
                <p className="mb-3 self-start rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink">
                  {plan.highlight}
                </p>
              )}
              <h3 className="display text-2xl font-bold">{plan.name}</h3>
              <p className={`mt-2 min-h-[4.5rem] text-sm leading-relaxed ${featured ? "text-white/80" : "text-ink-soft"}`}>
                {plan.forWho}
              </p>

              <div className="mt-5">
                <p className="text-3xl font-extrabold whitespace-nowrap tabular-nums xl:text-[1.65rem]">
                  {brl(perMonth(plan, cycle))}
                  <span className={`text-sm font-medium ${featured ? "text-white/70" : "text-ink-soft"}`}>/mês</span>
                </p>
                <p className={`mt-1 text-xs ${featured ? "text-white/70" : "text-ink-soft"}`}>
                  {cycle === "mensal" ? "Cobrança mensal" : `${brl(total)} a cada ${cycleInfo.months} meses`}
                </p>
                <p className={`mt-1 text-xs ${featured ? "text-white/70" : "text-ink-soft"}`}>
                  {plan.setupFee ? `+ implantação única de ${brl(plan.setupFee)}` : "Sem taxa de implantação"}
                </p>
              </div>

              <div className="mt-auto pt-6">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn w-full px-3 text-sm whitespace-nowrap ${featured ? "btn-gold" : "btn-outline"}`}
                    onClick={() => {
                      track("plan_select", { plan: plan.id, cycle, value: total });
                      track("whatsapp_click", { location: "pricing", plan: plan.id, cycle });
                    }}
                  >
                    <WhatsAppIcon className="size-4 shrink-0" />
                    Escolher {plan.name}
                    <span className="sr-only">(abre o WhatsApp em nova aba)</span>
                  </a>
                ) : (
                  <span aria-disabled="true" className={`btn w-full px-3 text-sm whitespace-nowrap ${featured ? "btn-gold" : "btn-outline"}`}>
                    Escolher {plan.name}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <ul className="mt-6 grid gap-2 text-sm text-ink-soft sm:grid-cols-3">
        {[
          "Os módulos liberados variam conforme o plano. A equipe confirma o que entra no seu antes da contratação.",
          "Trocar para um plano maior é feito no próprio sistema, pagando só a diferença proporcional.",
          "Reduções de plano valem a partir da próxima renovação, sem reembolso do período pago.",
        ].map((t) => (
          <li key={t} className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-indigo" aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
