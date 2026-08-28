import { NextResponse } from "next/server";
import { criarCobrancaPix, type FichaCliente } from "@/lib/blackcat";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(request: Request) {
  let body: Partial<FichaCliente>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const nome = (body.nome ?? "").trim();
  const email = (body.email ?? "").trim();
  const whatsapp = (body.whatsapp ?? "").trim();
  const cpf = (body.cpf ?? "").trim();
  const resumo = (body.resumo ?? "").trim();

  const erros: string[] = [];
  if (nome.length < 2) erros.push("Indique o seu nome.");
  if (!isEmail(email)) erros.push("Email inválido.");
  if (whatsapp.replace(/\D/g, "").length < 10) erros.push("WhatsApp inválido.");
  if (cpf.replace(/\D/g, "").length !== 11) erros.push("CPF inválido.");
  if (resumo.length < 3) erros.push("Descreva brevemente o que está sentindo.");

  if (erros.length > 0) {
    return NextResponse.json({ error: erros.join(" ") }, { status: 422 });
  }

  const ficha: FichaCliente = { nome, email, whatsapp, cpf, resumo };

  // URL pública do site (para o webhook da BlackCat)
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    request.headers.get("origin") ||
    undefined;
  const postbackUrl = siteUrl ? `${siteUrl}/api/pagamento/webhook` : undefined;

  try {
    const cobranca = await criarCobrancaPix(ficha, postbackUrl);
    return NextResponse.json({ ok: true, ...cobranca });
  } catch (err) {
    console.error("[/api/pagamento/criar] erro:", err);
    return NextResponse.json(
      { error: "Não foi possível gerar o pagamento. Tente novamente." },
      { status: 502 },
    );
  }
}
