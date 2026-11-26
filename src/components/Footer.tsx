import Link from "next/link";
import { site } from "@/lib/config";
import { Logo } from "./Logo";

export function Footer() {
  const c = site.company;
  return (
    <footer className="bg-ink pt-14 pb-28 text-sm text-white/70 md:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm leading-relaxed">
            Sistema de gestão para igrejas: pessoas, ministérios, agenda, comunicação e patrimônio, da sede a cada
            filial.
          </p>
          {(c.legalName || c.cnpj) && (
            <p className="mt-4">
              {c.legalName}
              {c.cnpj && <> · CNPJ {c.cnpj}</>}
            </p>
          )}
        </div>
        <nav aria-label="Links do rodapé">
          <p className="font-semibold text-white">Navegação</p>
          <ul className="mt-3 space-y-2">
            <li><a href="#como-funciona" className="hover:text-white">Como funciona</a></li>
            <li><a href="#recursos" className="hover:text-white">Recursos</a></li>
            <li><a href="#planos" className="hover:text-white">Planos</a></li>
            <li><a href="#duvidas" className="hover:text-white">Dúvidas</a></li>
            <li><a href={site.appLoginUrl} className="hover:text-white">Já sou cliente: entrar</a></li>
          </ul>
        </nav>
        <div>
          <p className="font-semibold text-white">Contato e legal</p>
          <ul className="mt-3 space-y-2">
            {c.email && <li><a href={`mailto:${c.email}`} className="hover:text-white">{c.email}</a></li>}
            {c.instagram && <li><a href={c.instagram} rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>}
            {c.youtube && <li><a href={c.youtube} rel="noopener noreferrer" className="hover:text-white">YouTube</a></li>}
            <li><Link href="/privacidade/" className="hover:text-white">Política de privacidade</Link></li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl px-4 text-xs text-white/50 sm:px-6">
        © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
