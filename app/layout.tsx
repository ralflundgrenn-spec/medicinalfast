import type { Metadata } from "next";
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
    </html>
  );
}
