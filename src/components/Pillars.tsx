import { Smartphone, QrCode, PlayCircle, Network, CalendarDays, Bell, HandCoins, UserRound } from "lucide-react";

/** Os quatro diferenciais do MinisterioOn, com o aplicativo do membro como peça visual. */

const pillars = [
  {
    icon: Smartphone,
    title: "Aplicativo exclusivo para a igreja",
    text: "O membro deixa de ser só um número na secretaria. Pelo celular (Android e iOS) ele atualiza os próprios dados, acompanha a agenda, recebe avisos, vê as escalas e contribui.",
  },
  {
    icon: QrCode,
    title: "Tesouraria com Pix integrado",
    text: "Chega de conferir comprovante no WhatsApp. Pix integrado com qualquer banco e QR Codes fixos para cada congregação ou departamento, como Missões, Jovens e Obras. Cada entrada já chega identificada para a prestação de contas.",
  },
  {
    icon: PlayCircle,
    title: "Treinamento em vídeo e suporte humano",
    text: "Trilhas de vídeos curtos para cada perfil de acesso e o assistente “Me Ensina” dentro do sistema. Se a equipe travar, quem responde é uma pessoa, não um robô.",
  },
  {
    icon: Network,
    title: "Matriz e filiais sob controle",
    text: "O pastor presidente vê a rede inteira. Cada dirigente local tem autonomia na sua unidade, sem acesso aos dados financeiros e cadastrais das outras.",
  },
];

function PhoneMock() {
  const rows = [
    { icon: CalendarDays, t: "Culto de Santa Ceia", s: "Domingo, 19h" },
    { icon: UserRound, t: "Sua escala: Recepção", s: "Confirmar presença" },
    { icon: Bell, t: "Aviso da secretaria", s: "Retiro de jovens: inscrições abertas" },
  ];
  return (
    <div aria-hidden="true" className="mx-auto w-[260px] rounded-[2.2rem] bg-ink p-2.5 shadow-[0_40px_80px_-30px_rgba(10,12,50,0.6)]">
      <div className="overflow-hidden rounded-[1.8rem] bg-paper">
        <div className="bg-indigo px-5 pt-6 pb-5 text-white">
          <p className="text-[11px] text-white/75">Igreja Exemplo</p>
          <p className="display mt-0.5 text-lg font-bold">Olá, Ana!</p>
        </div>
        <div className="space-y-2 p-3">
          {rows.map(({ icon: I, t, s }) => (
            <div key={t} className="flex items-center gap-2.5 rounded-xl bg-white p-2.5 ring-1 ring-line">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-indigo-wash text-indigo">
                <I className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[12px] font-semibold text-ink">{t}</span>
                <span className="block truncate text-[10px] text-ink-soft">{s}</span>
              </span>
            </div>
          ))}
          <div className="rounded-xl bg-indigo p-3 text-white">
            <div className="flex items-center gap-2">
              <HandCoins className="size-4 text-gold" />
              <span className="text-[12px] font-semibold">Contribuir com Pix</span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5 text-center text-[10px]">
              {["Dízimo", "Missões", "Obras"].map((d) => (
                <span key={d} className="rounded-md bg-white/15 py-1.5">{d}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Pillars() {
  return (
    <div className="grid items-center gap-14 lg:grid-cols-[1fr_300px] lg:gap-16">
      <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {pillars.map(({ icon: Icon, title, text }) => (
          <li key={title}>
            <span className="grid size-12 place-items-center rounded-2xl bg-indigo text-white">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-xl font-bold">{title}</h3>
            <p className="mt-2 leading-relaxed text-ink-soft">{text}</p>
          </li>
        ))}
      </ul>
      <PhoneMock />
    </div>
  );
}
