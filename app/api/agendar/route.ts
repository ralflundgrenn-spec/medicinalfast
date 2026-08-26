import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import type { AgendamentoInput } from "@/lib/types";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Partial<AgendamentoInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const nome = (body.nome ?? "").trim();
  const telefone = (body.telefone ?? "").trim();
  const email = (body.email ?? "").trim();
  const motivo = (body.motivo ?? "").trim();

  // Validação
  const erros: string[] = [];
  if (nome.length < 2) erros.push("Indique o seu nome.");
  if (telefone.replace(/\D/g, "").length < 9) erros.push("Telefone inválido.");
  if (!isEmail(email)) erros.push("Email inválido.");

  if (erros.length > 0) {
    return NextResponse.json({ error: erros.join(" ") }, { status: 422 });
  }

  const registo = {
    nome,
    telefone,
    email,
    tipo_consulta: body.tipo_consulta || "atestado_rapido",
    motivo: motivo || null,
    precisa_atestado: body.precisa_atestado ?? true,
    urgencia: body.urgencia || "agora",
    canal_contacto: body.canal_contacto || "video",
  };

  // Se o Supabase ainda não estiver configurado, não bloqueia o fluxo de
  // demonstração local — regista no log do servidor e devolve sucesso.
  if (!isSupabaseConfigured()) {
    console.warn(
      "[/api/agendar] Supabase não configurado — pedido recebido mas não persistido:",
      registo,
    );
    return NextResponse.json({ ok: true, persisted: false });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("agendamentos")
      .insert(registo)
      .select("id")
      .single();

    if (error) {
      console.error("[/api/agendar] Supabase erro:", error);
      return NextResponse.json(
        { error: "Não foi possível registar o pedido. Tente novamente." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, persisted: true, id: data.id });
  } catch (err) {
    console.error("[/api/agendar] erro inesperado:", err);
    return NextResponse.json(
      { error: "Erro no servidor. Tente novamente." },
      { status: 500 },
    );
  }
}
