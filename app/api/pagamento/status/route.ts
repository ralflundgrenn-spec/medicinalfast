import { NextResponse } from "next/server";
import { estadoCobranca } from "@/lib/blackcat";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = (searchParams.get("id") ?? "").trim();

  if (!id) {
    return NextResponse.json({ error: "Falta o id." }, { status: 400 });
  }

  try {
    const { status } = await estadoCobranca(id);
    const pago = status === "PAID";

    return NextResponse.json({
      status,
      pago,
      // Só devolve o contato do médico depois do pagamento confirmado.
      whatsappMedico: pago ? "5511925478927" : null,
    });
  } catch (err) {
    console.error("[/api/pagamento/status] erro:", err);
    return NextResponse.json(
      { error: "Não foi possível verificar o pagamento." },
      { status: 502 },
    );
  }
}
