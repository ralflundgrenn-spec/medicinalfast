import Link from "next/link";
import { LogoMark } from "./icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 bg-brand-900 text-brand-100">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8" />
              <span className="text-lg font-bold text-white">
                Atestado<span className="text-brand-300">Já</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-200/80">
              Consultas médicas online 24 horas por dia. Fale com um médico sem
              sair de casa e receba o seu atestado quando clinicamente
              justificado.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Navegação</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-brand-200/80">
              <li>
                <a href="/#como-funciona" className="hover:text-white">
                  Como funciona
                </a>
              </li>
              <li>
                <a href="/#precos" className="hover:text-white">
                  Preços
                </a>
              </li>
              <li>
                <Link href="/agendar" className="hover:text-white">
                  Iniciar consulta
                </Link>
              </li>
              <li>
                <a href="/#faq" className="hover:text-white">
                  Dúvidas frequentes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Importante</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-brand-200/80">
              <li>Serviço não substitui urgências (ligue 112).</li>
              <li>Atestado emitido a critério do médico.</li>
              <li>Dados protegidos e sigilo clínico.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-brand-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Atestado Já. Todos os direitos reservados.</p>
          <p>
            Em caso de emergência com risco de vida, ligue de imediato para o{" "}
            <span className="font-semibold text-brand-100">112</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
