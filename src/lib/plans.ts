/**
 * Planos e valores conforme a tela "Atualizar Plano" do MinisterioOn (consultada em 26/11/2026).
 * Ao alterar preços no sistema, atualize aqui.
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
  prices: Record<Cycle, number>;
  setupFee?: number;
  highlight?: string;
};

export const plans: Plan[] = [
  {
    id: "essencial",
    name: "Essencial",
    forWho: "Para igrejas que estão começando a organizar membros, eventos e financeiro em um só lugar.",
    prices: { mensal: 49.9, trimestral: 142.22, semestral: 269.46, anual: 508.98 },
  },
  {
    id: "basico",
    name: "Básico",
    forWho: "Organização diária da igreja com departamentos, relatórios e controle de usuários.",
    prices: { mensal: 89.9, trimestral: 256.22, semestral: 485.46, anual: 916.98 },
    setupFee: 299,
  },
  {
    id: "gestao",
    name: "Gestão",
    forWho: "Gestão completa de ministérios, convidados e painéis por público.",
    prices: { mensal: 149.9, trimestral: 427.22, semestral: 809.46, anual: 1528.98 },
    setupFee: 399,
  },
  {
    id: "profissional",
    name: "Profissional",
    forWho: "Para igrejas em multiplicação, com todos os painéis e liderança distribuída.",
    prices: { mensal: 199, trimestral: 567.15, semestral: 1074.6, anual: 2029.8 },
    highlight: "Para igrejas com filiais",
  },
  {
    id: "premium",
    name: "Premium",
    forWho: "Todos os módulos, relatórios avançados, API e suporte prioritário. Usuários ilimitados.",
    prices: { mensal: 299, trimestral: 852.15, semestral: 1614.6, anual: 3049.8 },
  },
];

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Economia real em relação a pagar o mesmo período no ciclo mensal. */
export function savingsPct(plan: Plan, cycle: Cycle) {
  const months = cycles.find((c) => c.id === cycle)!.months;
  const monthlyTotal = plan.prices.mensal * months;
  return Math.round((1 - plan.prices[cycle] / monthlyTotal) * 100);
}

export function perMonth(plan: Plan, cycle: Cycle) {
  const months = cycles.find((c) => c.id === cycle)!.months;
  return plan.prices[cycle] / months;
}
