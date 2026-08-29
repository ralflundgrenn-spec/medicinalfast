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
  title: "Atestado Já — Consulta médica online",
  description:
    "Consulta médica online com profissionais registrados no CRM. Documentos médicos são emitidos somente quando clinicamente indicados.",
  keywords: [
    "consulta médica online",
    "médico online",
    "telemedicina",
    "atendimento médico online",
  ],
  openGraph: {
    title: "Atestado Já — Consulta médica online",
    description:
      "Converse com um médico online. A orientação e qualquer documento dependem da avaliação clínica.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        {children}

        {/* Google tag (gtag.js) — Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18415993757"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {"window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-18415993757');"}
        </Script>
      </body>
    </html>
  );
}
