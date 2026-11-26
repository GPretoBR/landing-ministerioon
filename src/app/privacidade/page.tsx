import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/config";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Política de privacidade da página | MinisterioOn",
  description: "Como esta página trata dados de visitantes, cookies e contato pelo WhatsApp.",
  alternates: { canonical: "/privacidade/" },
};

/**
 * Texto-base sobre ESTA landing page. Deve ser revisado pelo jurídico/encarregado (DPO)
 * e completado com razão social, CNPJ e canal do encarregado antes de publicar.
 */
export default function Privacidade() {
  const c = site.company;
  return (
    <>
      <header className="bg-indigo">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-4 sm:px-6">
          <Link href="/" aria-label="Voltar para a página inicial">
            <Logo light />
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="display text-4xl font-bold">Política de privacidade desta página</h1>
        <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-ink-soft [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink">
          <p>
            Esta política explica como a página de apresentação do {site.name} trata dados de quem a visita, conforme a Lei
            Geral de Proteção de Dados (Lei 13.709/2018). O uso do sistema por igrejas clientes tem termos próprios.
          </p>
          <h2>Formulário de contato</h2>
          <p>
            O formulário desta página não envia dados para nossos servidores. Nome, nome da igreja e a resposta sobre
            filiais são usados apenas para montar a mensagem que você mesmo envia pelo WhatsApp. A partir daí, a conversa
            segue as regras do WhatsApp e é usada somente para responder ao seu contato comercial.
          </p>
          <h2>Cookies e medição</h2>
          <p>
            Ferramentas de medição (como Google Analytics, Google Tag Manager, Meta Pixel e Microsoft Clarity) só são
            carregadas se você clicar em “Aceitar medição”. Elas nos ajudam a entender quais partes da página são úteis.
            Se recusar, nenhuma delas é carregada. Guardamos sua escolha no próprio navegador; para mudar, limpe os dados
            deste site no navegador e a pergunta aparece de novo.
          </p>
          <h2>Seus direitos</h2>
          <p>
            Você pode pedir confirmação, acesso, correção ou exclusão dos seus dados de contato
            {c.email ? (
              <>
                {" "}pelo e-mail <a className="text-indigo underline" href={`mailto:${c.email}`}>{c.email}</a>.
              </>
            ) : (
              " pelos canais de atendimento informados na conversa."
            )}
          </p>
          {(c.legalName || c.cnpj) && (
            <p>
              Controlador: {c.legalName}
              {c.cnpj && `, CNPJ ${c.cnpj}`}.
            </p>
          )}
          <p className="text-sm">Última atualização: 26/11/2026.</p>
        </div>
        <Link href="/" className="btn btn-outline mt-12">
          Voltar para a página inicial
        </Link>
      </main>
    </>
  );
}
