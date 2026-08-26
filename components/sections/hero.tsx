import Link from "next/link";
import {
  ArrowRight,
  Bolt,
  Check,
  Clock,
  DocCheck,
  Shield,
  Star,
} from "@/components/icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 to-white">
      <div className="grid-bg absolute inset-0 opacity-70" aria-hidden />
      <div className="container-page relative grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        {/* Coluna texto */}
        <div className="animate-fade-up">
          <div className="badge bg-urgency-100 text-urgency-600">
            <Bolt className="h-3.5 w-3.5" />
            Atestado em minutos, sem sair de casa
          </div>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            Precisa de atestado?
            <br />
            <span className="text-brand-600">Fale com um médico agora.</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-700">
            Consulta médica online <strong>24 horas por dia</strong>. Ideal para
            quando não pode sair de casa e precisa do atestado para o trabalho{" "}
            <strong>com rapidez</strong>. O documento é emitido pelo médico
            durante a consulta, quando clinicamente justificado.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/agendar" className="btn-primary text-base">
              Falar com médico agora
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#como-funciona" className="btn-ghost text-base">
              Ver como funciona
            </a>
          </div>

          {/* Micro-provas */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-700">
            <span className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-brand-600" /> Atestado com validade
            </span>
            <span className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-brand-600" /> Médicos com cédula
              profissional
            </span>
            <span className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-brand-600" /> 100% sigiloso
            </span>
          </div>
        </div>

        {/* Coluna cartão visual */}
        <div className="animate-fade-up [animation-delay:120ms]">
          <div className="relative mx-auto max-w-md">
            {/* cartão principal — consulta */}
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 bg-brand-600 px-5 py-4 text-white">
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
                  <div className="ml-auto flex items-center gap-0.5 text-urgency-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5" />
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 text-sm text-ink-700">
                  “Com base nos seus sintomas, vou emitir um atestado de{" "}
                  <strong>2 dias</strong>. Já enviei para o seu email. 👇”
                </div>

                {/* atestado emitido */}
                <div className="flex items-center gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white">
                    <DocCheck className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-brand-800">
                      Atestado médico emitido
                    </p>
                    <p className="truncate text-xs text-brand-700/80">
                      atestado-2026-08.pdf · pronto a descarregar
                    </p>
                  </div>
                  <span className="ml-auto badge bg-brand-600 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>

            {/* etiqueta flutuante */}
            <div className="absolute -left-4 -top-4 hidden rounded-2xl bg-white px-4 py-3 shadow-card sm:block">
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

      {/* barra de estatísticas */}
      <div className="border-y border-slate-100 bg-white/70">
        <div className="container-page grid grid-cols-2 gap-6 py-6 sm:grid-cols-4">
          {[
            { v: "24h", l: "Médicos disponíveis" },
            { v: "± 8 min", l: "Tempo médio de espera" },
            { v: "4,9/5", l: "Avaliação dos pacientes" },
            { v: "100%", l: "Online, sem filas" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-2xl font-extrabold text-brand-700">{s.v}</p>
              <p className="mt-1 text-xs font-medium text-ink-500">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
