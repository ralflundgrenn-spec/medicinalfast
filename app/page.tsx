import Link from "next/link";
import { ArrowRight, Bolt, Check, LogoMark } from "@/components/icons";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-brand-50/60 to-white">
      {/* Header slim */}
      <header className="border-b border-slate-100/80">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-8 w-8" />
            <span className="text-lg font-bold tracking-tight text-ink-900">
              Atestado<span className="text-brand-600">Já</span>
            </span>
          </div>
          <span className="flex items-center gap-2 text-sm font-medium text-brand-700">
            <span className="live-dot" />
            Médicos online agora
          </span>
        </div>
      </header>

      {/* Herói centrado — cabe num ecrã */}
      <main className="container-page flex flex-1 flex-col items-center justify-center py-12 text-center">
        <div className="animate-fade-up flex max-w-2xl flex-col items-center">
          <div className="badge bg-urgency-100 text-urgency-600">
            <Bolt className="h-3.5 w-3.5" />
            Atestado em minutos, sem sair de casa
          </div>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl">
            Precisa de atestado?
            <br />
            <span className="text-brand-600">Fale com um médico agora.</span>
          </h1>

          <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-700">
            Consulta médica online <strong>24 horas por dia</strong>. Receba o
            atestado sem sair de casa, quando clinicamente justificado.
          </p>

          {/* O único botão — centrado, no topo */}
          <div className="mt-8">
            <Link href="/agendar" className="btn-primary text-base">
              Falar com médico agora
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-sm text-ink-500">
              Consulta única por{" "}
              <strong className="text-ink-900">R$ 29,99</strong> · atestado
              incluído quando justificado
            </p>
          </div>

          {/* Micro-provas numa linha */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink-700">
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-brand-600" /> 24h por dia
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-brand-600" /> Atestado com validade
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-brand-600" /> Pagamento seguro (PIX)
            </span>
          </div>
        </div>
      </main>

      {/* Rodapé de uma linha */}
      <footer className="border-t border-slate-100">
        <div className="container-page flex h-14 items-center justify-center text-center text-xs text-ink-500">
          Não substitui urgências — em caso de risco de vida, ligue&nbsp;
          <span className="font-semibold text-ink-700">192</span>. ©{" "}
          {new Date().getFullYear()} Atestado Já.
        </div>
      </footer>
    </div>
  );
}
