import {
  Users,
  UserPlus,
  CalendarDays,
  Network,
  LayoutDashboard,
  HeartHandshake,
  Megaphone,
  Boxes,
  BarChart3,
  Settings,
  AlertTriangle,
  CalendarCheck,
} from "lucide-react";

/**
 * Reprodução em HTML do painel real do MinisterioOn (dados fictícios).
 * Mantida em código para ficar nítida em qualquer tela e não pesar como imagem.
 */

const stats = [
  { icon: Users, label: "Membros", value: "248", note: "Toda a rede", tone: "bg-indigo-wash text-indigo" },
  { icon: UserPlus, label: "Visitantes", value: "31", note: "Cadastrados", tone: "bg-[#e7f4ec] text-ok" },
  { icon: CalendarDays, label: "Eventos", value: "9", note: "Próximos", tone: "bg-[#efe9fb] text-[#6a47c2]" },
  { icon: Network, label: "Unidades", value: "4", note: "Sede e 3 filiais", tone: "bg-[#e6f0f7] text-sky" },
];

const attention = [
  { text: "18 membros sem departamento", where: "Toda a rede" },
  { text: "3 departamentos sem responsável", where: "Organização da sede" },
  { text: "7 bens sem responsável", where: "Patrimônio da sede" },
];

const events = [
  { d: "06", m: "DEZ", t: "Culto de Santa Ceia", h: "19:00" },
  { d: "12", m: "DEZ", t: "Ensaio geral do louvor", h: "15:00" },
  { d: "20", m: "DEZ", t: "Cantata de Natal", h: "19:30" },
];

const nav = [LayoutDashboard, Users, HeartHandshake, CalendarDays, Boxes, Megaphone, BarChart3, Settings];

export function DashboardMock() {
  return (
    <figure className="hero-mock relative" aria-label="Painel do MinisterioOn">
      <div className="overflow-hidden rounded-2xl bg-white text-ink shadow-[0_40px_80px_-30px_rgba(10,12,50,0.55)] ring-1 ring-black/5">
        {/* barra do navegador */}
        <div className="flex items-center gap-2 border-b border-line bg-[#f2f3f8] px-4 py-2.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#e5867a]" />
          <span className="size-2.5 rounded-full bg-[#eac35d]" />
          <span className="size-2.5 rounded-full bg-[#7cc08b]" />
          <span className="ml-3 truncate rounded-md bg-white px-3 py-1 text-[11px] text-ink-soft">
            app.ministerioon.com.br
          </span>
        </div>

        <div className="flex">
          <div className="hidden w-14 shrink-0 flex-col items-center gap-4 bg-indigo py-5 sm:flex" aria-hidden="true">
            {nav.map((Icon, i) => (
              <Icon key={i} className={`size-[18px] ${i === 0 ? "text-white" : "text-white/55"}`} />
            ))}
          </div>

          <div className="min-w-0 flex-1 space-y-3 p-4 text-left sm:p-5">
            <div>
              <p className="text-[11px] font-semibold text-indigo">Painel da igreja</p>
              <p className="display text-lg font-bold text-ink sm:text-xl">Bom dia, pastor Marcos!</p>
              <p className="text-[11px] text-ink-soft">Igreja Exemplo · Sede</p>
            </div>

            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              {stats.map(({ icon: Icon, label, value, note, tone }) => (
                <div key={label} className="rounded-xl border border-line p-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`grid size-7 place-items-center rounded-lg ${tone}`}>
                      <Icon className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-[10px] font-semibold text-ink-soft">{label}</span>
                  </div>
                  <p className="mt-1.5 text-xl font-extrabold leading-none tabular-nums">{value}</p>
                  <p className="mt-0.5 text-[10px] text-ink-soft">{note}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-2 md:grid-cols-[1.15fr_1fr]">
              <div className="rounded-xl border border-line p-3">
                <p className="text-xs font-bold">Atenção da liderança</p>
                <ul className="mt-2 space-y-1.5">
                  {attention.map((a, i) => (
                    <li
                      key={a.text}
                      data-stagger
                      style={{ "--i": i } as React.CSSProperties}
                      className="flex items-start gap-2 rounded-lg bg-[#fdf3ea] px-2.5 py-2"
                    >
                      <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-alert" aria-hidden="true" />
                      <span>
                        <span className="block text-[11px] font-semibold leading-tight">{a.text}</span>
                        <span className="block text-[10px] text-ink-soft">{a.where}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden rounded-xl border border-line p-3 md:block">
                <p className="text-xs font-bold">Próximos eventos e cultos</p>
                <ul className="mt-2 space-y-1.5">
                  {events.map((e) => (
                    <li key={e.t} className="flex items-center gap-2.5">
                      <span className="grid w-9 shrink-0 place-items-center rounded-lg bg-indigo py-1 text-white">
                        <span className="text-xs font-bold leading-none">{e.d}</span>
                        <span className="text-[8px] leading-none opacity-80">{e.m}</span>
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[11px] font-semibold">{e.t}</span>
                        <span className="flex items-center gap-1 text-[10px] text-ink-soft">
                          <CalendarCheck className="size-3" aria-hidden="true" /> {e.h}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
