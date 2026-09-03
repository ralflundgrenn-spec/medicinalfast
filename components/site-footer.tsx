import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3">
        <div><p className="text-lg font-semibold text-teal-700">Medicinal Fast</p><p className="mt-3 text-sm text-slate-600">Consultas médicas online com avaliação individual por profissional habilitado.</p></div>
        <div><p className="font-semibold">Navegação</p><div className="mt-3 flex flex-col gap-2 text-sm"><Link href="/">Início</Link><Link href="/#como-funciona">Como funciona</Link><Link href="/agendar">Agendar consulta</Link></div></div>
        <div><p className="font-semibold">Importante</p><ul className="mt-3 space-y-2 text-sm text-slate-600"><li>Documentos e prescrições não são garantidos.</li><li>A conduta é definida pelo médico.</li><li>Em caso de emergência, ligue 192.</li></ul></div>
      </div>
      <div className="border-t px-6 py-4 text-center text-xs text-slate-500">© 2026 Medicinal Fast. Todos os direitos reservados.</div>
    </footer>
  );
}
