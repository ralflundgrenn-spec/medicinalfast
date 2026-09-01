import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="text-xl font-semibold text-teal-700">Medicinal Fast</span>
          <span className="text-sm text-slate-600">Atendimento médico online</span>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 font-medium text-teal-700">Consulta médica por teleatendimento</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Converse com um médico sem sair de casa
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Atendimento individual com profissional habilitado. Durante a consulta,
            o médico avalia seu quadro, esclarece dúvidas e define a orientação
            clínica adequada para você.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/agendar"
              className="rounded-full bg-teal-700 px-7 py-4 font-semibold text-white transition hover:bg-teal-800"
            >
              Agendar consulta online
            </Link>
            <span className="text-sm text-slate-500">Consulta sujeita à avaliação médica individual.</span>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Como funciona</h2>
          <ol className="mt-6 space-y-6 text-slate-600">
            <li><strong className="text-slate-900">1. Informe seus dados</strong><br />Preencha as informações necessárias para o atendimento.</li>
            <li><strong className="text-slate-900">2. Realize a consulta</strong><br />Converse diretamente com um profissional médico habilitado.</li>
            <li><strong className="text-slate-900">3. Receba orientação clínica</strong><br />A conduta é definida pelo médico conforme a avaliação realizada.</li>
          </ol>
          <div className="mt-8 rounded-2xl bg-teal-50 p-5 text-sm leading-6 text-teal-950">
            Este serviço não substitui atendimento de urgência. Em caso de emergência, ligue 192.
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
          <div><h3 className="font-semibold">Atendimento individual</h3><p className="mt-2 text-sm text-slate-600">Cada caso é analisado de forma independente pelo médico.</p></div>
          <div><h3 className="font-semibold">Profissional habilitado</h3><p className="mt-2 text-sm text-slate-600">O atendimento é realizado por médico com registro profissional ativo.</p></div>
          <div><h3 className="font-semibold">Decisão clínica</h3><p className="mt-2 text-sm text-slate-600">Nenhuma conduta, prescrição ou resultado específico é garantido.</p></div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-500">
        Medicinal Fast · Serviço de consulta médica online
      </footer>
    </main>
  );
}
