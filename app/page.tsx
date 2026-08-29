import Link from "next/link";
import {
  ArrowRight,
  Chat,
  Check,
  DocCheck,
  LogoMark,
} from "@/components/icons";

const WHATSAPP_DUVIDAS = "5511925478927";
const MSG_DUVIDAS = "Olá! Queria saber mais sobre a consulta médica online.";
const LINK_DUVIDAS =
  "https://wa.me/" +
  WHATSAPP_DUVIDAS +
  "?text=" +
  encodeURIComponent(MSG_DUVIDAS);

const ETAPAS = [
  {
    titulo: "Preencha seus dados",
    texto: "Informe seus dados de contato e descreva brevemente seus sintomas.",
  },
  {
    titulo: "Pague pela consulta",
    texto: "O valor de R$ 29,99 corresponde exclusivamente ao atendimento médico online.",
  },
  {
    titulo: "Converse com o médico",
    texto: "O profissional fará a avaliação e definirá a orientação adequada para o seu caso.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-brand-50/60 to-white">
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
            Atendimento médico online
          </span>
        </div>
      </header>

      <main className="container-page flex flex-1 flex-col items-center justify-center py-12 text-center">
        <div className="animate-fade-up flex max-w-2xl flex-col items-center">
          <div className="badge bg-brand-100 text-brand-700">
            Consulta médica online
          </div>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl lg:text-7xl">
            Cuidado médico online,
            <br />
            <span className="text-brand-600">onde você estiver.</span>
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-700 lg:text-2xl">
            Converse com um médico registrado no CRM. Após a avaliação, o
            profissional orientará o atendimento e decidirá se existe indicação
            clínica para a emissão de algum documento médico.
          </p>

          <div className="mt-8">
            <Link
              href="/agendar"
              className="btn-primary text-base lg:!px-8 lg:!py-4 lg:text-lg"
            >
              Iniciar consulta online
              <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />
            </Link>
            <p className="mt-3 text-sm font-semibold text-brand-700 lg:text-base">
              Atendimento sujeito à avaliação médica individual.
            </p>
            <p className="mt-1.5 text-sm text-ink-500 lg:text-base">
              Consulta por <strong className="text-ink-900">R$ 29,99</strong>.
              A emissão de documentos não é garantida.
            </p>

            <a
              href={LINK_DUVIDAS}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-4 border border-[#25D366] bg-white text-sm text-[#128C4A] hover:bg-[#25D366]/10 lg:text-base"
            >
              <Chat className="h-4 w-4 lg:h-5 lg:w-5" />
              Tire suas dúvidas no WhatsApp
            </a>
          </div>

          <div className="mt-7 flex w-full max-w-xl items-center gap-4 rounded-2xl border-2 border-brand-200 bg-white px-6 py-5 shadow-card">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
              <DocCheck className="h-8 w-8" />
            </div>
            <div className="text-left">
              <p className="text-lg font-extrabold text-ink-900">
                Avaliação médica individual
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">
                Declarações, receitas ou atestados são emitidos somente quando
                clinicamente indicados, conforme a avaliação e a autonomia do
                médico responsável.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink-700 lg:text-base">
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-brand-600" /> Médicos registrados no CRM
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-brand-600" /> Atendimento remoto
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-brand-600" /> Pagamento seguro via PIX
            </span>
          </div>
        </div>
      </main>

      <section className="border-t border-slate-100 bg-white">
        <div className="container-page py-12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-extrabold text-ink-900">
              Como funciona a consulta
            </h2>
            <p className="mt-2 text-sm text-ink-600">
              Um processo simples e transparente para iniciar seu atendimento.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {ETAPAS.map((etapa, index) => (
              <div key={etapa.titulo} className="card p-5 text-left">
                <span className="text-sm font-bold text-brand-600">
                  Etapa {index + 1}
                </span>
                <h3 className="mt-2 font-extrabold text-ink-900">
                  {etapa.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {etapa.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100">
        <div className="container-page flex min-h-16 items-center justify-center py-3 text-center text-xs text-ink-500">
          Não substitui urgências — em caso de risco de vida, ligue&nbsp;
          <span className="font-semibold text-ink-700">192</span>. Documentos
          médicos dependem de indicação clínica. © {new Date().getFullYear()} Atestado Já.
        </div>
      </footer>
    </div>
  );
}
