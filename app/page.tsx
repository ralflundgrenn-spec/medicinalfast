import Link from "next/link";
import {
  ArrowRight,
  Bolt,
  Check,
  Clock,
  DocCheck,
  LogoMark,
  Shield,
} from "@/components/icons";

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

      {/* Conteúdo central — cabe num ecrã */}
      <main className="container-page flex flex-1 items-center py-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Texto + único botão */}
          <div className="animate-fade-up">
            <div className="badge bg-urgency-100 text-urgency-600">
              <Bolt className="h-3.5 w-3.5" />
              Atestado em minutos, sem sair de casa
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl">
              Precisa de atestado?
              <br />
              <span className="text-brand-600">Fale com um médico agora.</span>
            </h1>

            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-700">
              Consulta médica online <strong>24 horas por dia</strong>. Receba o
              atestado sem sair de casa, quando clinicamente justificado.
            </p>

            {/* O único botão */}
            <div className="mt-7">
              <Link href="/agendar" className="btn-primary text-base">
                Falar com médico agora
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-sm text-ink-500">
                Consulta única por{" "}
                <strong className="text-ink-900">29,99 €</strong> · atestado
                incluído quando justificado
              </p>
            </div>

            {/* Micro-provas numa linha */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-700">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-brand-600" /> 24h por dia
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-brand-600" /> Atestado com validade
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-brand-600" /> 100% sigiloso
              </span>
            </div>
          </div>

          {/* Cartão visual compacto */}
          <div className="animate-fade-up [animation-delay:120ms] hidden sm:block">
            <div className="relative mx-auto max-w-md">
              <div className="card overflow-hidden">
                <div className="flex items-center justify-between bg-brand-600 px-5 py-3.5 text-white">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="live-dot" />
                    Consulta a decorrer
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Clock className="h-4 w-4" />
                    06:42
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-brand-700">
                      DR
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink-900">
                        Dra. Rita Almeida
                      </p>
                      <p className="text-xs text-ink-500">
                        Medicina Geral · Céd. 000000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white">
                      <DocCheck className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-brand-800">
                        Atestado médico emitido
                      </p>
                      <p className="truncate text-xs text-brand-700/80">
                        atestado.pdf · pronto a descarregar
                      </p>
                    </div>
                    <span className="ml-auto badge bg-brand-600 text-white">
                      <Check className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -left-4 -top-4 hidden rounded-2xl bg-white px-4 py-3 shadow-card md:block">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-brand-600" />
                  <div>
                    <p className="text-xs text-ink-500">Espera média</p>
                    <p className="text-sm font-bold text-ink-900">± 8 minutos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Rodapé de uma linha */}
      <footer className="border-t border-slate-100">
        <div className="container-page flex h-14 items-center justify-center text-center text-xs text-ink-500">
          Não substitui urgências — em caso de risco de vida, ligue&nbsp;
          <span className="font-semibold text-ink-700">112</span>. © {" "}
          {new Date().getFullYear()} Atestado Já.
        </div>
      </footer>
    </div>
  );
}
