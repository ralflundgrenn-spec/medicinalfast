import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import {
  AtestadoDestaque,
  Beneficios,
  ComoFunciona,
  CtaFinal,
  Depoimentos,
  Faq,
  Precos,
} from "@/components/sections/home";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AtestadoDestaque />
        <ComoFunciona />
        <Beneficios />
        <Precos />
        <Depoimentos />
        <Faq />
        <CtaFinal />
      </main>
      <SiteFooter />
    </>
  );
}
