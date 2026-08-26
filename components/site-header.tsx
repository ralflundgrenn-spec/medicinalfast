import Link from "next/link";
import { LogoMark } from "./icons";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark className="h-8 w-8" />
          <span className="text-lg font-bold tracking-tight text-ink-900">
            Atestado<span className="text-brand-600">Já</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-700 md:flex">
          <a href="/#como-funciona" className="hover:text-brand-700">
            Como funciona
          </a>
          <a href="/#precos" className="hover:text-brand-700">
            Preços
          </a>
          <a href="/#atestado" className="hover:text-brand-700">
            Atestado
          </a>
          <a href="/#faq" className="hover:text-brand-700">
            Dúvidas
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 text-sm font-medium text-brand-700 sm:flex">
            <span className="live-dot" />
            Médicos online agora
          </span>
          <Link href="/agendar" className="btn-primary !px-5 !py-2.5">
            Falar com médico
          </Link>
        </div>
      </div>
    </header>
  );
}
