import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { LogoMark } from "@/components/icons";
import { AgendarForm } from "./agendar-form";

export const metadata = {
  title: "Iniciar consulta — Atestado Já",
  description:
    "Preencha os seus dados e fale com um médico online em minutos. Receba o seu atestado sem sair de casa.",
};

export default async function AgendarPage({
  searchParams,
}: {
  searchParams: Promise<{ plano?: string }>;
}) {
  const { plano } = await searchParams;

  return (
    <>
      <header className="border-b border-slate-100">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark className="h-8 w-8" />
            <span className="text-lg font-bold tracking-tight text-ink-900">
              Atestado<span className="text-brand-600">Já</span>
            </span>
          </Link>
          <span className="flex items-center gap-2 text-sm font-medium text-brand-700">
            <span className="live-dot" />
            Médicos online agora
          </span>
        </div>
      </header>

      <main className="bg-brand-50/30 py-12">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                Fale com um médico agora
              </h1>
              <p className="mt-3 text-ink-700">
                Menos de 2 minutos para começar. Sem sair de casa.
              </p>
            </div>

            <div className="mt-10 rounded-3xl bg-white p-6 shadow-card sm:p-10">
              <AgendarForm planoInicial={plano ?? "atestado_rapido"} />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
