import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b bg-white"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5"><span className="text-xl font-semibold text-teal-700">Medicinal Fast</span><span className="text-sm text-slate-600">Atendimento médico online</span></div></header>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 font-medium text-teal-700">Consulta médica por teleatendimento</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Converse com um médico sem sair de casa</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">Atendimento individual com profissional habilitado. O médico avalia seu quadro, esclarece dúvidas e define a orientação clínica adequada.</p>
          <div className="mt-6 rounded-2xl border border-teal-200 bg-teal-50 p-5"><p className="text-sm text-teal-800">Valor da consulta online</p><p className="mt-1 text-3xl font-bold text-teal-800">R$ 29,99</p><p className="mt-2 text-sm text-slate-700">Pagamento via PIX antes da consulta. O contato com o médico é liberado após a confirmação do pagamento.</p></div>
          <div className="mt-7 flex flex-col gap-3 sm:items-start">
            <Link href="/agendar" className="rounded-full bg-teal-700 px-7 py-4 text-center font-semibold text-white hover:bg-teal-800">Agendar consulta por R$ 29,99</Link>
            <a href="https://wa.me/5511925478927?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20o%20agendamento%20da%20consulta." target="_blank" rel="noopener noreferrer" className="rounded-full border border-teal-700 px-6 py-3 text-center font-semibold text-teal-800 hover:bg-teal-50">Tirar dúvidas com o suporte no WhatsApp</a>
          </div>
          <p className="mt-3 text-sm text-slate-600">Suporte para dúvidas sobre agendamento e pagamento. Não é consulta médica. Não envie CPF, exames ou sintomas por este botão.</p>
        </div>
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Como funciona</h2>
          <ol className="mt-6 space-y-6 text-slate-700">
            <li><strong>1. Preencha o cadastro</strong><p>Informe os dados necessários para solicitar o atendimento.</p></li>
            <li><strong>2. Pague R$ 29,99 via PIX</strong><p>Após a confirmação, o site libera o contato do médico.</p></li>
            <li><strong>3. Realize a consulta online</strong><p>A avaliação e a orientação clínica são individuais. Nenhuma prescrição, documento ou resultado específico é garantido.</p></li>
          </ol>
          <p className="mt-7 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">Este serviço não substitui urgências. Em caso de emergência, ligue 192.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-5 px-6 pb-12 md:grid-cols-3"><div className="rounded-2xl bg-white p-6"><h2 className="font-semibold">Atendimento individual</h2><p className="mt-2 text-slate-600">Cada caso é analisado pelo médico.</p></div><div className="rounded-2xl bg-white p-6"><h2 className="font-semibold">Profissional habilitado</h2><p className="mt-2 text-slate-600">Consulta com médico de registro profissional ativo.</p></div><div className="rounded-2xl bg-white p-6"><h2 className="font-semibold">Decisão clínica</h2><p className="mt-2 text-slate-600">A conduta depende da avaliação médica.</p></div></section>
      <footer className="border-t px-6 py-6 text-center text-sm text-slate-600">Medicinal Fast · Consulta médica online · Emergências: 192</footer>
    </main>
  );
}
