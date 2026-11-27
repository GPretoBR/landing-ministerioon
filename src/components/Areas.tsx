"use client";

import { useId, useRef, useState } from "react";
import {
  Users,
  HeartHandshake,
  CalendarDays,
  Megaphone,
  Boxes,
  QrCode,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

type Area = {
  id: string;
  icon: LucideIcon;
  name: string;
  outcome: string;
  modules: string[];
  rows: { feature: string; benefit: string }[];
};

/** Módulos conforme o menu do sistema. Cada linha: funcionalidade → o que muda na rotina. */
const areas: Area[] = [
  {
    id: "pessoas",
    icon: Users,
    name: "Pessoas",
    outcome: "Saber quem é a sua igreja hoje, não no último recadastramento.",
    modules: ["Membros", "Visitantes", "Crianças", "Congregados", "Novos convertidos", "Famílias", "Carteirinhas", "Assistência social", "Batismo"],
    rows: [
      { feature: "Ficha única de membro com cargo, departamento e unidade", benefit: "Você responde “quantos membros ativos temos?” em segundos, por unidade ou na rede toda." },
      { feature: "Cadastros próprios para visitantes e novos convertidos", benefit: "Quem chegou recentemente aparece numa lista que alguém acompanha, em vez de uma ficha de papel na gaveta." },
      { feature: "Carteirinhas a partir de modelos", benefit: "A carteirinha sai com os dados do cadastro, sem redigitar nada." },
    ],
  },
  {
    id: "ministerios",
    icon: HeartHandshake,
    name: "Ministérios",
    outcome: "Cada departamento com responsável, cada célula com líder.",
    modules: ["Departamentos", "Células", "Cargos eclesiásticos", "Nomeações", "Atribuições ministeriais"],
    rows: [
      { feature: "Departamentos e células ligados aos membros", benefit: "Fica visível quem ainda não serve em lugar nenhum e onde falta liderança." },
      { feature: "Cargos e nomeações registrados", benefit: "O histórico de quem foi consagrado e nomeado não depende da memória de ninguém." },
    ],
  },
  {
    id: "agenda",
    icon: CalendarDays,
    name: "Cultos e agenda",
    outcome: "A programação do ano inteiro em um calendário que todos consultam.",
    modules: ["Eventos", "Cultos", "Escalas", "Presenças", "Reuniões", "Atas", "EBD", "Calendário anual", "Pregadores e cantores"],
    rows: [
      { feature: "Escalas de culto com vagas e confirmação", benefit: "Cada voluntário vê a própria escala. Menos “ninguém me avisou” no domingo." },
      { feature: "Presenças, reuniões e atas", benefit: "As decisões da reunião ficam registradas e encontráveis meses depois." },
      { feature: "Alunos e turmas da EBD", benefit: "Frequência da escola bíblica sem lista de chamada em papel." },
    ],
  },
  {
    id: "tesouraria",
    icon: QrCode,
    name: "Tesouraria e Pix",
    outcome: "Cada contribuição identificada, sem caçar comprovante.",
    modules: ["Dízimos", "Ofertas", "Pix integrado (todos os bancos)", "QR Code por congregação", "QR Code por departamento", "Contribuição pelo app", "Prestação de contas"],
    rows: [
      { feature: "Pix integrado com qualquer banco", benefit: "A entrada aparece no sistema sem ninguém conferir print de comprovante no WhatsApp." },
      { feature: "QR Codes fixos por congregação ou departamento", benefit: "Missões, Jovens e Obras recebem cada um no seu QR Code, e o relatório já sai separado." },
      { feature: "Contribuição pelo aplicativo do membro", benefit: "O membro contribui pelo celular, no culto ou de casa." },
    ],
  },
  {
    id: "comunicacao",
    icon: Megaphone,
    name: "Comunicação",
    outcome: "Recado oficial da igreja num canal da igreja.",
    modules: ["Aplicativo do membro (Android e iOS)", "Chat", "Avisos", "Notícias", "Culto ao vivo (YouTube)", "Testemunhos", "Pedidos de oração", "Equipe de oração", "Documentos"],
    rows: [
      { feature: "Avisos e notícias publicados no sistema", benefit: "O comunicado não se perde entre figurinhas do grupo." },
      { feature: "Pedidos de oração com equipe própria", benefit: "Cada pedido chega a quem vai orar, com discrição." },
      { feature: "Transmissão do culto pelo YouTube dentro da plataforma", benefit: "Quem não pôde ir acompanha no mesmo lugar onde recebe os avisos." },
    ],
  },
  {
    id: "gestao",
    icon: Boxes,
    name: "Patrimônio e RH",
    outcome: "Cada bem com responsável, cada funcionário com contrato em dia.",
    modules: ["Bens", "Fornecedores", "Solicitações", "Retiradas", "Baixas", "Manutenções", "Funcionários", "Contratos", "Férias", "Folha", "Horas extras"],
    rows: [
      { feature: "Bens com responsável, retiradas e manutenções", benefit: "Você sabe com quem está o equipamento de som e quando ele foi revisado." },
      { feature: "Funcionários, contratos, férias e folha", benefit: "A parte trabalhista da igreja fica organizada no mesmo sistema." },
    ],
  },
  {
    id: "formacao",
    icon: GraduationCap,
    name: "Formação e relatórios",
    outcome: "Líderes em formação e números que ajudam a decidir.",
    modules: ["Academia de líderes", "Cursos", "Central de relatórios", "Relatórios customizados", "Importação de dados"],
    rows: [
      { feature: "Cursos com aulas e matrículas", benefit: "Discipulado e capacitação com acompanhamento de quem concluiu." },
      { feature: "Central de relatórios e relatórios customizados", benefit: "Os números da reunião de liderança saem do sistema, não de uma noite montando planilha." },
    ],
  },
];

export function Areas() {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const area = areas[active];

  function onKey(e: React.KeyboardEvent, i: number) {
    const last = areas.length - 1;
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
      <div
        role="tablist"
        aria-label="Áreas do sistema"
        aria-orientation="vertical"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {areas.map((a, i) => {
          const selected = i === active;
          return (
            <button
              key={a.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`${base}-tab-${a.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                selected ? "bg-indigo text-white" : "bg-white text-ink ring-1 ring-line hover:bg-indigo-wash"
              }`}
            >
              <a.icon className="size-5 shrink-0" aria-hidden="true" />
              {a.name}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${base}-panel`}
        aria-labelledby={`${base}-tab-${area.id}`}
        tabIndex={0}
        className="rounded-2xl bg-white p-6 ring-1 ring-line sm:p-8"
      >
        <h3 className="display text-2xl font-bold sm:text-3xl">{area.outcome}</h3>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Módulos desta área">
          {area.modules.map((m) => (
            <li key={m} className="rounded-full bg-indigo-wash px-3 py-1 text-xs font-medium text-indigo">
              {m}
            </li>
          ))}
        </ul>
        <dl className="mt-6 divide-y divide-line">
          {area.rows.map((r) => (
            <div key={r.feature} className="grid gap-1 py-4 sm:grid-cols-[1fr_1.3fr] sm:gap-6">
              <dt className="text-sm font-semibold text-ink-soft">{r.feature}</dt>
              <dd className="text-[15px] leading-relaxed">{r.benefit}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
