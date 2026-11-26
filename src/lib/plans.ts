/**
 * Planos e valores conforme a "Tabela oficial de planos e tarifas" do Ministério On
 * (tabela_precos_ministerioon.pdf, recebida em 26/11/2026).
 * Ao alterar preços, atualize aqui.
 */

export type Cycle = "mensal" | "trimestral" | "semestral" | "anual";

export const cycles: { id: Cycle; label: string; months: number }[] = [
  { id: "mensal", label: "Mensal", months: 1 },
  { id: "trimestral", label: "Trimestral", months: 3 },
  { id: "semestral", label: "Semestral", months: 6 },
  { id: "anual", label: "Anual", months: 12 },
];

export type Plan = {
  id: string;
  name: string;
  forWho: string;
  /** null = sob consulta */
  prices: Record<Cycle, number> | null;
  /** Taxa única de implantação. 0 = grátis. */
  setupFee: number;
  setupFeeFrom?: boolean;
  admins: number | "ilimitado";
  branches: number | "ilimitado";
  highlight?: string;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    forWho: "Para a igreja de uma unidade que quer sair da planilha.",
    prices: { mensal: 59.9, trimestral: 169.9, semestral: 329.9, anual: 599 },
    setupFee: 0,
    admins: 2,
    branches: 0,
  },
  {
    id: "pro",
    name: "Pro",
    forWho: "Para a igreja que já tem congregações e uma equipe dividindo a secretaria.",
    prices: { mensal: 149.9, trimestral: 429.9, semestral: 849.9, anual: 1499 },
    setupFee: 199,
    admins: 7,
    branches: 2,
    highlight: "Para igrejas com filiais",
  },
  {
    id: "premium",
    name: "Premium",
    forWho: "Para a igreja em multiplicação, com liderança distribuída entre várias unidades.",
    prices: { mensal: 299.9, trimestral: 849.9, semestral: 1699, anual: 2999 },
    setupFee: 399,
    admins: 15,
    branches: 5,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    forWho: "Para redes e convenções com muitas unidades. Proposta sob medida.",
    prices: null,
    setupFee: 799,
    setupFeeFrom: true,
    admins: "ilimitado",
    branches: "ilimitado",
  },
];

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Valor mensal equivalente, truncado em centavos como na tabela oficial. */
export function perMonth(plan: Plan, cycle: Cycle) {
  if (!plan.prices) return null;
  const months = cycles.find((c) => c.id === cycle)!.months;
  // + 1e-6 evita erro de ponto flutuante (ex.: 299,90 virar 299,89).
  return Math.floor((plan.prices[cycle] / months) * 100 + 1e-6) / 100;
}

/** Economia real em relação a pagar o mesmo período no ciclo mensal (arredondada para baixo). */
export function savingsPct(plan: Plan, cycle: Cycle) {
  if (!plan.prices) return 0;
  const months = cycles.find((c) => c.id === cycle)!.months;
  return Math.floor((1 - plan.prices[cycle] / (plan.prices.mensal * months)) * 100);
}

/** Menor valor mensal equivalente entre os planos com preço (Starter anual). */
export const lowestMonthly = Math.min(
  ...plans.filter((p) => p.prices).map((p) => perMonth(p, "anual") as number),
);
