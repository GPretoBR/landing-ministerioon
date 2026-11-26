"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { brl, cycles, perMonth, plans, savingsPct, type Cycle, type Plan } from "@/lib/plans";
import { track } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppButton";

function limitText(n: number | "ilimitado", one: string, many: string) {
  if (n === "ilimitado") return `${many[0].toUpperCase()}${many.slice(1)} ilimitados`;
  if (n === 0) return `Sem ${many}`;
  return `${n} ${n === 1 ? one : many}`;
}

function features(plan: Plan) {
  return [
    "Membros ilimitados",
    limitText(plan.admins, "administrador", "administradores"),
    plan.branches === 0 ? "Uma unidade (sem filiais)" : limitText(plan.branches, "filial ou congregação", "filiais ou congregações"),
  ];
}

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
                <span className="block rounded-full px-2 py-2 text-[13px] font-semibold text-ink-soft transition-colors peer-checked:bg-indigo peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-gold sm:px-4 sm:text-sm">
                  {c.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <p className="text-sm text-ink-soft" aria-live="polite">
          {cycle === "mensal" ? "Pagamento mês a mês." : `Valor mensal equivalente no ciclo ${cycleInfo.label.toLowerCase()}.`}
        </p>
      </div>

      <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => {
          const featured = Boolean(plan.highlight);
          const total = plan.prices?.[cycle];
          const monthly = perMonth(plan, cycle);
          const save = savingsPct(plan, cycle);
          const msg = plan.prices
            ? `Olá! Vim pelo site e tenho interesse no plano ${plan.name} (${cycleInfo.label.toLowerCase()}, ${brl(total!)}). Pode me explicar os próximos passos?`
            : `Olá! Vim pelo site e quero uma proposta do plano ${plan.name} para a nossa rede de igrejas.`;
          const href = whatsappUrl(msg);
          const label = plan.prices ? `Escolher ${plan.name}` : "Pedir proposta";
          const muted = featured ? "text-white/75" : "text-ink-soft";
          return (
            <li
              key={plan.id}
              className={`relative flex flex-col rounded-2xl p-6 ${
                featured ? "bg-indigo text-white shadow-[0_30px_60px_-30px_rgba(57,62,153,0.8)]" : "bg-white ring-1 ring-line"
              }`}
            >
              {plan.highlight && (
                <p className="mb-3 self-start rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink">{plan.highlight}</p>
              )}
              <h3 className="display text-2xl font-bold">{plan.name}</h3>
              <p className={`mt-2 min-h-[3rem] text-sm leading-relaxed ${muted}`}>{plan.forWho}</p>

              <div className="mt-5 min-h-[6.5rem]">
                {monthly !== null && total !== undefined ? (
                  <>
                    <p className="text-3xl font-extrabold whitespace-nowrap tabular-nums">
                      {brl(monthly)}
                      <span className={`text-sm font-medium ${muted}`}>/mês</span>
                    </p>
                    <p className={`mt-1 text-xs ${muted}`}>
                      {cycle === "mensal" ? "Cobrança mensal" : `${brl(total)} a cada ${cycleInfo.months} meses`}
                      {save > 0 && <span className={featured ? "font-semibold text-gold" : "font-semibold text-ok"}> · {save}% a menos que no mensal</span>}
                    </p>
                  </>
                ) : (
                  <p className="text-3xl font-extrabold">Sob consulta</p>
                )}
                <p className={`mt-1 text-xs ${muted}`}>
                  {plan.setupFee === 0
                    ? "Implantação grátis"
                    : `Implantação única ${plan.setupFeeFrom ? "a partir de " : "de "}${brl(plan.setupFee)}`}
                </p>
              </div>

              <ul className="mt-5 space-y-2 border-t border-current/10 pt-5 text-sm">
                {features(plan).map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className={`mt-0.5 size-4 shrink-0 ${featured ? "text-gold" : "text-indigo"}`} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn w-full px-3 text-sm whitespace-nowrap ${featured ? "btn-gold" : "btn-outline"}`}
                    onClick={() => {
                      track("plan_select", { plan: plan.id, cycle, value: total ?? 0 });
                      track("whatsapp_click", { location: "pricing", plan: plan.id, cycle });
                    }}
                  >
                    <WhatsAppIcon className="size-4 shrink-0" />
                    {label}
                    <span className="sr-only">(abre o WhatsApp em nova aba)</span>
                  </a>
                ) : (
                  <span aria-disabled="true" className={`btn w-full px-3 text-sm whitespace-nowrap ${featured ? "btn-gold" : "btn-outline"}`}>
                    {label}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <ul className="mt-6 grid gap-2 text-sm text-ink-soft sm:grid-cols-3">
        {[
          "Membros ilimitados em todos os planos: o valor não sobe conforme a igreja cresce.",
          "Os módulos liberados variam conforme o plano. A equipe confirma o que entra no seu antes da contratação.",
          "Trocar para um plano maior é feito no próprio sistema, pagando só a diferença proporcional.",
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
