import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { AgendarForm } from "./agendar-form";

export const metadata = {
  title: "Agendar consulta médica online | Medicinal Fast",
  description:
    "Informe seus dados para solicitar uma consulta médica online com avaliação individual.",
};

export default function AgendarPage() {
  return (
    <>
      <header className="border-b border-slate-100 bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-brand-700">
            Medicinal Fast
          </Link>
          <span className="flex items-center gap-2 text-sm font-medium text-brand-700">
            <span className="live-dot" />
            Atendimento médico online
          </span>
        </div>
      </header>

      <main className="bg-brand-50/30 py-12">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                Solicite sua consulta médica online
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-ink-600">
                Preencha seus dados para iniciar o atendimento. A avaliação e a
                orientação clínica são realizadas individualmente pelo médico.
              </p>
            </div>
            <div className="mt-10">
              <AgendarForm />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
