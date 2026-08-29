import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atestado Já — Consulta médica online 24h com atestado rápido",
  description:
    "Fale com um médico online em minutos, 24 horas por dia. Receba o seu atestado médico sem sair de casa, quando clinicamente justificado. Rápido, seguro e sigiloso.",
  keywords: [
    "atestado médico online",
    "consulta médica online",
    "médico 24 horas",
    "atestado rápido",
    "telemedicina",
    "baixa médica",
  ],
  openGraph: {
    title: "Atestado Já — Consulta médica online 24h com atestado rápido",
    description:
      "Fale com um médico online em minutos, 24h por dia, e receba o seu atestado sem sair de casa.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={inter.variable}>
      <body>
        {children}

        {/* Google tag (gtag.js) — Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18415993757"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18415993757');
          `}
        </Script>
      </body>
    </html>
  );
}
