import { NextResponse } from "next/server";

// Recebe os postbacks da BlackCat (ex.: evento "transaction.paid").
// A confirmação para o cliente é feita pelo polling em /api/pagamento/status;
// este webhook serve de registo/reforço (reconciliação) e é onde, no futuro,
// se pode gravar o pagamento numa base de dados ou disparar um email/CRM.
export async function POST(request: Request) {
  let payload: unknown = null;
  try {
    payload = await request.json();
  } catch {
    // BlackCat pode enviar corpo vazio nalguns eventos — respondemos 200 na mesma.
  }

  try {
    const evento = (payload as { event?: string })?.event ?? "desconhecido";
    console.log("[webhook blackcat]", evento, JSON.stringify(payload));
    // TODO: quando o Supabase estiver ligado, gravar aqui o pagamento confirmado.
  } catch (err) {
    console.error("[webhook blackcat] erro a processar:", err);
  }

  // Responder sempre 200 para a BlackCat não reenviar indefinidamente.
  return NextResponse.json({ received: true });
}
