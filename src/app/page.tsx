import {
  Check,
  X,
  Network,
  ShieldCheck,
  FileSpreadsheet,
  Palette,
  ArrowUpRight,
  Plus,
  Building2,
  Smartphone,
  QrCode,
  Lock,
  CloudUpload,
  Headset,
} from "lucide-react";
import { site } from "@/lib/config";
import { Logo } from "@/components/Logo";
import { DashboardMock } from "@/components/DashboardMock";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Areas } from "@/components/Areas";
import { Pillars } from "@/components/Pillars";
import { DemoButton, DemoVideo } from "@/components/DemoButton";
import { Pricing } from "@/components/Pricing";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { Tracking } from "@/components/Tracking";

const wrap = "mx-auto max-w-6xl px-4 sm:px-6";

/* ---------- conteúdo ---------- */

const officeLines = [
  "“A lista de membros está na planilha da irmã Cláudia. Só ela sabe mexer.”",
  "“Aquele casal que visitou mês passado… alguém ligou para eles?”",
  "“Quem está escalado na recepção domingo? Mandei no grupo, mas ninguém confirmou.”",
  "“A filial ainda não mandou o relatório do mês.”",
  "“Pastor, quantos membros ativos nós temos hoje?” “Deixa eu levantar e te falo semana que vem.”",
  "“Pastor, chegaram 14 comprovantes de Pix no meu WhatsApp. De qual departamento é cada um?”",
];

const costs = [
  {
    title: "Pessoas passam despercebidas",
    text: "Visitante sem retorno e membro que se afasta sem que ninguém note. Não por falta de cuidado, mas por falta de uma lista que mostre quem precisa de atenção.",
  },
  {
    title: "A secretaria depende de uma pessoa",
    text: "Quando quem cuida das planilhas muda de função, se muda de cidade ou adoece, o histórico da igreja vai junto e alguém recomeça do zero.",
  },
  {
    title: "A liderança decide sem enxergar",
    text: "Sem números confiáveis, a reunião de liderança discute impressões: onde falta líder, que departamento está parado, que filial cresce.",
  },
];

const compare = [
  { item: "Cadastro de membros", before: "Planilha ou caderno, cada um com uma versão", after: "Ficha única com família, cargo, departamento e unidade" },
  { item: "Visitantes e novos convertidos", before: "Ficha de papel recolhida no culto", after: "Cadastro próprio, visível para quem vai acompanhar" },
  { item: "Escalas de culto", before: "Combinadas no grupo do WhatsApp", after: "Escala no sistema, com vagas e confirmação" },
  { item: "Filiais", before: "Relatório por mensagem, quando chega", after: "Central de Filiais com os números de cada unidade" },
  { item: "Dízimos e ofertas", before: "Comprovantes de Pix soltos no WhatsApp", after: "Pix integrado, com QR Code por congregação e departamento" },
  { item: "Patrimônio", before: "Ninguém sabe com quem está", after: "Bens com responsável, retiradas e manutenções" },
  { item: "Acesso aos dados", before: "Uma senha compartilhada, ou nenhuma", after: "Um usuário por pessoa, com permissões por função" },
];

const steps = [
  {
    title: "Conversa com a equipe",
    text: "Você conta como a igreja está organizada hoje, quantas unidades tem e o que mais pesa na rotina. A equipe indica o plano que cobre isso.",
  },
  {
    title: "Igreja configurada",
    text: "Você traz a planilha que já tem pela importação de dados, cadastra departamentos e filiais e aplica o logo e as cores da igreja no painel.",
  },
  {
    title: "Liderança acompanhando",
    text: "Cada líder entra com o próprio usuário. O painel mostra o que precisa de atenção: membros sem departamento, departamentos sem responsável, próximos compromissos.",
  },
];

const units = [
  { name: "Sede", members: 112, active: 104, noDept: 6 },
  { name: "Filial Centro", members: 58, active: 55, noDept: 4 },
  { name: "Filial Jardim", members: 44, active: 41, noDept: 5 },
  { name: "Filial Vila Nova", members: 34, active: 33, noDept: 3 },
];

const faq = [
  {
    q: "Nossa igreja é pequena. Faz sentido para nós?",
    a: "O plano Starter foi pensado para a igreja de uma unidade: membros ilimitados, 2 administradores e implantação grátis. No ciclo anual ele sai por R$ 599,00, cerca de R$ 1,64 por dia. Se a igreja crescer, você muda de plano dentro do próprio sistema.",
  },
  {
    q: "Temos sede e filiais. Cada uma precisa de uma conta separada?",
    a: "Não. O MinisterioOn trabalha com matriz e filiais vinculadas na mesma conta. O plano Pro inclui até 2 filiais ou congregações, o Premium até 5 e o Enterprise não tem limite. A Central de Filiais mostra membros, ativos e pendências de cada unidade.",
  },
  {
    q: "Nosso secretário não é da área de tecnologia. Vai conseguir usar?",
    a: "Sim. Há trilhas de vídeos curtos para cada perfil de acesso, o assistente “Me Ensina” dentro das telas e a Central de Ajuda com guias passo a passo. Se travar em algo, quem responde o chamado é uma pessoa da equipe de suporte.",
  },
  {
    q: "Já temos tudo em planilha. Vamos ter que digitar de novo?",
    a: "Não necessariamente. O sistema tem um módulo de importação de dados. Na conversa, mostre como sua planilha está e a equipe orienta o melhor caminho para trazer os cadastros.",
  },
  {
    q: "Como funcionam as contribuições por Pix?",
    a: "O Pix é integrado com qualquer banco. Você gera QR Codes fixos para cada congregação ou departamento, como Missões, Jovens e Obras, e o membro também pode contribuir pelo aplicativo. Cada entrada chega identificada, sem conferência manual de comprovantes.",
  },
  {
    q: "Quem consegue ver os dados dos membros?",
    a: "Só quem tem usuário. Cada pessoa entra com acesso próprio e o administrador define o papel de cada um. Assim o líder de célula não precisa ver o que é da tesouraria, por exemplo.",
  },
  {
    q: "E se o plano escolhido ficar pequeno ou grande demais?",
    a: "Para subir de plano, a troca é feita no sistema e você paga só a diferença proporcional ao tempo que falta. Para descer, a mudança vale a partir da próxima renovação, sem reembolso do período já pago.",
  },
  {
    q: "Quanto tempo leva para começar?",
    a: "Depende do tamanho da base e de quantas unidades a igreja tem. Na conversa pelo WhatsApp a equipe estima o prazo para a sua realidade antes de você contratar.",
  },
  {
    q: "Existe fidelidade ou multa de cancelamento?",
    a: "Não. Sem fidelidade forçada e sem multa de cancelamento. Você fica no MinisterioOn pelos resultados, não por amarra contratual.",
  },
];

/* ---------- página ---------- */

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">
        Pular para o conteúdo
      </a>

      <header className="sticky top-0 z-40 bg-indigo/95 backdrop-blur">
        <div className={`${wrap} flex h-16 items-center justify-between gap-4`}>
          <a href="#inicio" aria-label="MinisterioOn, início">
            <Logo light />
          </a>
          <nav aria-label="Principal" className="hidden items-center gap-7 text-sm font-medium text-white/80 lg:flex">
            <a href="#como-funciona" className="hover:text-white">Como funciona</a>
            <a href="#recursos" className="hover:text-white">Recursos</a>
            <a href="#planos" className="hover:text-white">Planos</a>
            <a href="#duvidas" className="hover:text-white">Dúvidas</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href={site.appLoginUrl} className="text-sm font-medium text-white/80 hover:text-white">
              Entrar
            </a>
            <WhatsAppButton location="header" label="Falar no WhatsApp" className="hidden min-h-10 px-4 text-sm sm:inline-flex" />
          </div>
        </div>
      </header>

      <main id="conteudo">
        {/* 01 · HERO */}
        <section id="inicio" className="relative overflow-hidden bg-indigo pb-16 text-white sm:pb-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }}
          />
          <div className={`${wrap} relative grid items-center gap-12 pt-12 sm:pt-16 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:pt-16`}>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/85">
                <Building2 className="size-4 text-gold" aria-hidden="true" />
                Sistema de gestão para igrejas
              </p>
              <h1 className="display mt-5 text-[2.2rem] font-extrabold sm:text-5xl lg:text-[2.9rem] xl:text-[3.25rem]">
                A gestão completa que liberta o pastor da burocracia e conecta toda a sua igreja.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                Secretaria, tesouraria com Pix integrado, gestão de matriz e filiais e aplicativo exclusivo para os
                membros em um só lugar. Da sede à congregação mais distante, tudo sob controle e com transparência.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton location="hero" label="Conversar com a equipe" />
                {site.demoVideoUrl ? (
                  <DemoButton />
                ) : (
                  <a href="#planos" className="btn btn-ghost">
                    Ver planos e preços
                  </a>
                )}
              </div>
              <p className="mt-4 max-w-md text-sm text-white/75">
                Você fala com uma pessoa da equipe, tira as dúvidas e só contrata se fizer sentido. Sem fidelidade e
                sem multa de cancelamento.
              </p>
              <ul className="mt-8 grid gap-2.5 text-[15px] text-white/90">
                {[
                  [Smartphone, "App próprio para membros e liderança (Android e iOS)"],
                  [QrCode, "Dízimos e ofertas via Pix integrado (todos os bancos) + QR Code por congregação"],
                  [Network, "Sede e filiais unificadas, membros ilimitados a partir de R$ 49,91/mês"],
                ].map(([Icon, t]) => {
                  const I = Icon as typeof Network;
                  return (
                    <li key={t as string} className="flex items-start gap-2">
                      <I className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                      {t as string}
                    </li>
                  );
                })}
              </ul>
            </div>
            <DashboardMock />
          </div>
        </section>

        {/* SELOS DE CONFIANÇA */}
        <section aria-label="Segurança e suporte" className="border-b border-line bg-white">
          <ul className={`${wrap} grid grid-cols-2 gap-x-6 gap-y-5 py-7 text-sm md:grid-cols-4`}>
            {[
              [Lock, "Dados protegidos", "Tratamento conforme a LGPD"],
              [CloudUpload, "Backup automático", "Cópias em nuvem"],
              [Headset, "Suporte humano", "Gente de verdade para ajudar"],
              [ShieldCheck, "Confira Aki Tecnologia", "Empresa responsável pelo sistema"],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Lock;
              return (
                <li key={t as string} className="flex items-start gap-3">
                  <I className="mt-0.5 size-5 shrink-0 text-indigo" aria-hidden="true" />
                  <span>
                    <span className="block font-semibold">{t as string}</span>
                    <span className="block text-ink-soft">{d as string}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* DEMONSTRAÇÃO EM VÍDEO */}
        {site.demoVideoUrl && (
          <section id="demonstracao" className="bg-white py-16 sm:py-20" aria-labelledby="demo-titulo">
            <div className={`${wrap} grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14`}>
              <div>
                <h2 id="demo-titulo" className="display text-4xl font-bold sm:text-5xl">
                  Veja o MinisterioOn funcionando em pouco mais de 1 minuto.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                  O painel da liderança, o aplicativo do membro, o Pix com QR Code por departamento e o suporte que acompanha a
                  sua equipe.
                </p>
                <WhatsAppButton
                  location="demo_section"
                  label="Gostei, quero conversar"
                  className="mt-7"
                  message="Olá! Assisti ao vídeo de demonstração do MinisterioOn e quero conversar sobre a minha igreja."
                />
              </div>
              <div className="order-first lg:order-none">
                <DemoVideo />
              </div>
            </div>
          </section>
        )}

        {/* 02-03 · PROBLEMA + CUSTO DA INAÇÃO */}
        <section className="py-20 sm:py-28" aria-labelledby="problema-titulo">
          <div className={`${wrap} grid gap-12 lg:grid-cols-[0.9fr_1.1fr]`}>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 id="problema-titulo" className="display text-4xl font-bold sm:text-5xl">
                Alguma dessas frases já foi dita na sua igreja esta semana?
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
                Quando a igreja cresce e a organização continua no caderno, o trabalho não desaparece. Ele fica todo nas
                costas de duas ou três pessoas.
              </p>
            </div>
            <ul className="space-y-3">
              {officeLines.map((l) => (
                <li key={l} className="rounded-2xl rounded-tl-sm bg-white px-5 py-4 text-[17px] leading-relaxed ring-1 ring-line">
                  {l}
                </li>
              ))}
            </ul>
          </div>

          <div className={`${wrap} mt-20`}>
            <h3 className="display max-w-2xl text-3xl font-bold sm:text-4xl">O custo de deixar como está não aparece no caixa. Aparece nas pessoas.</h3>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {costs.map((c) => (
                <div key={c.title} className="border-t-2 border-indigo pt-5">
                  <p className="text-lg font-bold">{c.title}</p>
                  <p className="mt-2 leading-relaxed text-ink-soft">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 · SOLUÇÃO: ANTES E DEPOIS */}
        <section className="bg-white py-20 sm:py-28" aria-labelledby="solucao-titulo">
          <div className={wrap}>
            <h2 id="solucao-titulo" className="display max-w-3xl text-4xl font-bold sm:text-5xl">
              Cada pedaço da rotina da igreja sai do improviso e ganha um lugar.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              A equipe usa o MinisterioOn no navegador do computador ou do celular, e os membros usam o aplicativo da
              igreja. Veja o que muda em cada frente.
            </p>

            <div className="mt-12 overflow-hidden rounded-2xl ring-1 ring-line">
              <table className="w-full text-left text-[15px]">
                <caption className="sr-only">Comparação entre a organização com planilhas e grupos e com o MinisterioOn</caption>
                <thead className="hidden bg-paper text-sm md:table-header-group">
                  <tr>
                    <th scope="col" className="w-1/4 px-6 py-4 font-semibold text-ink-soft">Frente</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-ink-soft">Com planilha e grupo</th>
                    <th scope="col" className="bg-indigo-wash px-6 py-4 font-semibold text-indigo">Com o MinisterioOn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {compare.map((r) => (
                    <tr key={r.item} className="grid md:table-row">
                      <th scope="row" className="px-5 pt-5 font-bold md:px-6 md:py-5">{r.item}</th>
                      <td className="flex gap-2.5 px-5 pt-2 text-ink-soft md:table-cell md:px-6 md:py-5">
                        <X className="mt-0.5 inline size-4 shrink-0 text-alert md:mr-2" aria-label="Antes:" />
                        {r.before}
                      </td>
                      <td className="flex gap-2.5 px-5 pt-2 pb-5 md:table-cell md:bg-indigo-wash/50 md:px-6 md:py-5">
                        <Check className="mt-0.5 inline size-4 shrink-0 text-ok md:mr-2" aria-label="Com o MinisterioOn:" />
                        {r.after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 04b · DIFERENCIAIS: OS 4 PILARES */}
        <section id="diferenciais" className="py-20 sm:py-28" aria-labelledby="pilares-titulo">
          <div className={wrap}>
            <h2 id="pilares-titulo" className="display max-w-3xl text-4xl font-bold sm:text-5xl">
              Os quatro pilares que fazem do MinisterioOn uma gestão completa.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Organizar a secretaria é só o começo. O que muda a rotina do pastor e do tesoureiro está aqui.
            </p>
            <div className="mt-14">
              <Pillars />
            </div>
          </div>
        </section>

        {/* 05 · MECANISMO */}
        <section id="como-funciona" className="py-20 sm:py-28" aria-labelledby="como-titulo">
          <div className={wrap}>
            <h2 id="como-titulo" className="display max-w-3xl text-4xl font-bold sm:text-5xl">
              Da primeira conversa ao painel funcionando, em três etapas.
            </h2>
            <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {steps.map((s, i) => (
                <li key={s.title} className="relative">
                  <span className="display grid size-14 place-items-center rounded-2xl bg-indigo text-2xl font-bold text-white">
                    {i + 1}
                  </span>
                  {i < steps.length - 1 && (
                    <span aria-hidden="true" className="absolute top-7 left-16 hidden h-0.5 w-[calc(100%-4rem)] bg-[repeating-linear-gradient(90deg,#393e99_0_8px,transparent_8px_14px)] md:block" />
                  )}
                  <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{s.text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              {[
                [FileSpreadsheet, "Importação de dados", "Traga os cadastros que a igreja já tem."],
                [Palette, "Identidade da igreja", "Logo e cores da igreja aplicados no painel."],
                [ShieldCheck, "Usuários e permissões", "Cada líder vê o que é da função dele."],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof Network;
                return (
                  <div key={t as string} className="flex gap-3 rounded-2xl bg-white p-5 ring-1 ring-line">
                    <I className="size-6 shrink-0 text-indigo" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">{t as string}</p>
                      <p className="mt-1 text-sm text-ink-soft">{d as string}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 06 · BENEFÍCIOS POR ÁREA */}
        <section id="recursos" className="bg-indigo-wash py-20 sm:py-28" aria-labelledby="recursos-titulo">
          <div className={wrap}>
            <h2 id="recursos-titulo" className="display max-w-3xl text-4xl font-bold sm:text-5xl">
              Tudo o que a secretaria, a tesouraria e a liderança usam.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Escolha uma área para ver os módulos e o que muda na prática. Os módulos liberados variam conforme o plano.
            </p>
            <div className="mt-12">
              <Areas />
            </div>
          </div>
        </section>

        {/* 07 · DIFERENCIAL: MATRIZ E FILIAIS */}
        <section className="py-20 sm:py-28" aria-labelledby="filiais-titulo">
          <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2`}>
            <div>
              <h2 id="filiais-titulo" className="display text-4xl font-bold sm:text-5xl">
                Igreja que multiplica precisa enxergar a rede inteira.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Na Central de Filiais, cada cadastro é contado uma única vez, na unidade em que está. A sede vê a rede toda;
                cada filial cuida dos seus. Ninguém precisa mais esperar o relatório do mês para saber como cada congregação
                está.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Painel filtrado por unidade ou pela rede toda",
                  "Membros, ativos e pendências de cada filial lado a lado",
                  "Limites de usuários definidos por unidade",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-indigo" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <figure className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <p className="font-bold">Central de Filiais</p>
                <p className="text-sm text-ink-soft">4 unidades · 248 membros</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] text-sm">
                  <caption className="sr-only">Exemplo da Central de Filiais</caption>
                  <thead className="text-left text-xs text-ink-soft">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-semibold">Unidade</th>
                      <th scope="col" className="px-3 py-3 text-right font-semibold">Membros</th>
                      <th scope="col" className="px-3 py-3 text-right font-semibold">Ativos</th>
                      <th scope="col" className="px-5 py-3 text-right font-semibold">Sem depto.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {units.map((u, i) => (
                      <tr key={u.name}>
                        <th scope="row" className="px-5 py-3.5 text-left font-semibold">
                          {u.name}
                          <span className="ml-2 rounded-full bg-indigo-wash px-2 py-0.5 text-[11px] font-medium text-indigo">
                            {i === 0 ? "Matriz" : "Filial"}
                          </span>
                        </th>
                        <td className="px-3 py-3.5 text-right tabular-nums">{u.members}</td>
                        <td className="px-3 py-3.5 text-right tabular-nums">{u.active}</td>
                        <td className="px-5 py-3.5 text-right tabular-nums text-alert">{u.noDept}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </figure>
          </div>
        </section>

        {/* 09 · PROVA SOCIAL (só aparece com depoimentos reais configurados) */}
        {site.testimonials.length > 0 && (
          <section className="bg-white py-20 sm:py-28" aria-labelledby="depoimentos-titulo">
            <div className={wrap}>
              <h2 id="depoimentos-titulo" className="display max-w-3xl text-4xl font-bold sm:text-5xl">
                O que dizem as igrejas que já usam.
              </h2>
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {site.testimonials.map((t) => (
                  <figure key={t.name} className="rounded-2xl bg-paper p-6">
                    <blockquote className="text-lg leading-relaxed">“{t.quote}”</blockquote>
                    <figcaption className="mt-5 text-sm">
                      <span className="font-bold">{t.name}</span>
                      <span className="block text-ink-soft">
                        {t.role}, {t.church}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 10 · OFERTA */}
        <section id="planos" className="bg-paper py-20 sm:py-28" aria-labelledby="planos-titulo">
          <div className={wrap}>
            <h2 id="planos-titulo" className="display max-w-3xl text-4xl font-bold sm:text-5xl">
              Sua igreja cresce, sua mensalidade não.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Todos os planos contam com membros ilimitados. Você escolhe apenas conforme o tamanho da sua equipe administrativa e o número de congregações.
            </p>
            <div className="mt-10">
              <Pricing />
            </div>
          </div>
        </section>

        {/* 11 · REDUÇÃO DE RISCO */}
        <section className="bg-ink py-20 text-white sm:py-28" aria-labelledby="risco-titulo">
          <div className={`${wrap} grid gap-12 lg:grid-cols-[1fr_1.2fr]`}>
            <div>
              <h2 id="risco-titulo" className="display text-4xl font-bold sm:text-5xl">
                Você não fica sozinho depois de contratar.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/75">
                Trocar de sistema dá receio, principalmente quando quem vai usar não é da área de tecnologia. Por isso o
                suporte fica dentro do próprio painel.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {[
                ["Sem fidelidade, sem multa", "Você fica pelos resultados, não por amarra contratual. Cancelar não gera multa."],
                ["Treinamento em vídeo", "Trilhas de vídeos curtos por perfil de acesso, mais o assistente “Me Ensina” dentro das telas e a Central de Ajuda."],
                ["Suporte humanizado", "Travou em algo? Abra um chamado pelo painel. Quem responde é uma pessoa da equipe."],
                ["Plano flexível", "Subiu a demanda, sobe o plano pagando a diferença proporcional. Sem recomeçar nada."],
              ].map(([t, d]) => (
                <div key={t}>
                  <p className="flex items-center gap-2 font-bold">
                    <Plus className="size-4 text-gold" aria-hidden="true" />
                    {t}
                  </p>
                  <p className="mt-2 leading-relaxed text-white/70">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12 · OBJEÇÕES */}
        <section id="duvidas" className="py-20 sm:py-28" aria-labelledby="duvidas-titulo">
          <div className={`${wrap} grid gap-12 lg:grid-cols-[0.8fr_1.2fr]`}>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 id="duvidas-titulo" className="display text-4xl font-bold sm:text-5xl">
                As perguntas que todo pastor faz antes de decidir.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">Não encontrou a sua? Pergunte direto para a equipe.</p>
              <WhatsAppButton
                location="faq"
                variant="outline"
                label="Perguntar no WhatsApp"
                className="mt-6"
                message="Olá! Vim pelo site do MinisterioOn e tenho uma dúvida antes de contratar:"
              />
            </div>
            <div className="divide-y divide-line border-y border-line">
              {faq.map((f) => (
                <details key={f.q} className="group">
                  <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-lg font-semibold">
                    {f.q}
                    <Plus className="faq-icon size-5 shrink-0 text-indigo transition-transform duration-200" aria-hidden="true" />
                  </summary>
                  <p className="pb-6 leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 13-14 · MOMENTO + FECHAMENTO */}
        <section id="contato" className="bg-indigo py-20 text-white sm:py-28" aria-labelledby="contato-titulo">
          <div className={`${wrap} grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]`}>
            <div>
              <h2 id="contato-titulo" className="display text-4xl font-extrabold sm:text-5xl">
                {site.closing.title}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{site.closing.text}</p>
              <ul className="mt-8 space-y-3 text-white/90">
                {[
                  "Aplicativo próprio para membros e liderança",
                  "Dízimos e ofertas com Pix integrado e QR Code por departamento",
                  "Sede e filiais acompanhadas no mesmo painel",
                  "Membros ilimitados, a partir de R$ 49,91 por mês no plano anual",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <a href={site.appLoginUrl} className="mt-10 inline-flex items-center gap-1.5 text-sm text-white/70 underline-offset-4 hover:text-white hover:underline">
                Já é cliente? Entre no sistema
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
            <div className="rounded-3xl bg-white/[0.08] p-6 ring-1 ring-white/15 sm:p-8">
              <p className="display text-2xl font-bold">Fale com a equipe do MinisterioOn</p>
              <p className="mt-2 text-sm text-white/80">
                Preencha e o WhatsApp abre com a mensagem pronta. Leva menos de um minuto.
              </p>
              <div className="mt-6">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyCta />
      <Tracking />
    </>
  );
}
