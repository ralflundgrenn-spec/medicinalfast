import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medicinal Fast | Consulta Médica Online",
  description:
    "Consulta médica online com profissional habilitado, avaliação individual e orientação clínica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18415993757"
        strategy="afterInteractive"
      />
      <Script
        id="google-ads-tag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html:
            "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag(\"js\",new Date());gtag(\"config\",\"AW-18415993757\");",
        }}
      />
      <Script
        id="whatsapp-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html:
            "document.addEventListener(\"click\",function(event){var target=event.target;var link=target&&target.closest?target.closest(\"a[href*=\\\"wa.me\\\"],a[href*=\\\"whatsapp.com\\\"]\"):null;if(!link||typeof window.gtag!==\"function\")return;window.gtag(\"event\",\"conversion\",{send_to:\"AW-18415993757/bYJPCIj-3ekcEJ2Ht81E\"});});",
        }}
      />
    </html>
  );
}
