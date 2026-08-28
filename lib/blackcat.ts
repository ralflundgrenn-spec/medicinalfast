// Cliente da API de pagamentos BlackCat (PIX)
// Docs: https://docs.blackcatoficial.com/

const BASE_URL = "https://api.blackcatoficial.com/api";

// Valor da consulta em centavos (R$ 29,99)
export const VALOR_CENTAVOS = 2999;
export const VALOR_LABEL = "R$ 29,99";

export interface FichaCliente {
  nome: string;
  email: string;
  whatsapp: string; // telefone do cliente (só dígitos de preferência)
  cpf: string;
  resumo: string;
}

export interface CobrancaPix {
  transactionId: string;
  status: string;
  qrCode: string | null; // código copia-e-cola (texto)
  qrCodeBase64: string | null; // imagem base64 (data URI ou base64 puro)
  copyPaste: string | null;
  expiresAt: string | null;
  demo: boolean;
}

export function blackcatConfigurado() {
  return Boolean(process.env.BLACKCAT_API_KEY);
}

function apenasDigitos(v: string) {
  return (v || "").replace(/\D/g, "");
}

/** Cria uma cobrança PIX. Sem API key entra em modo demonstração. */
export async function criarCobrancaPix(
  ficha: FichaCliente,
  postbackUrl?: string,
): Promise<CobrancaPix> {
  // ---- Modo demonstração (sem chave configurada) ----
  if (!blackcatConfigurado()) {
    return {
      transactionId: `demo-${Date.now()}`,
      status: "PENDING",
      qrCode:
        "00020126DEMO-PIX-ATESTADO-JA-CONFIGURE-A-CHAVE-BLACKCAT-PARA-COBRAR-A-SERIO5204000053039865802BR6009SAO PAULO62070503***6304DEMO",
      qrCodeBase64: null,
      copyPaste:
        "00020126DEMO-PIX-ATESTADO-JA-CONFIGURE-A-CHAVE-BLACKCAT-PARA-COBRAR-A-SERIO5204000053039865802BR6009SAO PAULO62070503***6304DEMO",
      expiresAt: null,
      demo: true,
    };
  }

  const body = {
    amount: VALOR_CENTAVOS,
    currency: "BRL",
    paymentMethod: "pix",
    items: [
      {
        title: "Consulta médica com atestado",
        unitPrice: VALOR_CENTAVOS,
        quantity: 1,
        tangible: false,
      },
    ],
    customer: {
      name: ficha.nome,
      email: ficha.email,
      phone: apenasDigitos(ficha.whatsapp),
      document: {
        number: apenasDigitos(ficha.cpf),
        type: "cpf",
      },
    },
    pix: { expiresInDays: 1 },
    ...(postbackUrl ? { postbackUrl } : {}),
  };

  const res = await fetch(`${BASE_URL}/sales/create-sale`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.BLACKCAT_API_KEY as string,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let detalhe = `status ${res.status}`;
    try {
      const j = JSON.parse(await res.text());
      detalhe = j.error || j.message || detalhe;
    } catch {
      /* corpo não-JSON */
    }
    throw new Error(detalhe);
  }

  const json = await res.json();
  // A resposta vem embrulhada: { success, data: { ... } }
  const data = json.data ?? json;
  const pd = data.paymentData ?? data.pix ?? {};

  return {
    transactionId: String(data.transactionId ?? data.id ?? ""),
    status: String(data.status ?? "PENDING"),
    qrCode: pd.qrCode ?? pd.copyPaste ?? null,
    qrCodeBase64: pd.qrCodeBase64 ?? null,
    copyPaste: pd.copyPaste ?? pd.qrCode ?? null,
    expiresAt: pd.expiresAt ?? null,
    demo: false,
  };
}

/** Consulta o estado de um pagamento. Devolve o status normalizado. */
export async function estadoCobranca(
  transactionId: string,
): Promise<{ status: string }> {
  // ---- Modo demonstração: confirma ~8s após a criação ----
  if (transactionId.startsWith("demo-")) {
    const criadoEm = Number(transactionId.replace("demo-", "")) || 0;
    const pago = Date.now() - criadoEm > 8000;
    return { status: pago ? "PAID" : "PENDING" };
  }

  const res = await fetch(`${BASE_URL}/sales/${transactionId}/status`, {
    method: "GET",
    headers: { "X-API-Key": process.env.BLACKCAT_API_KEY as string },
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`BlackCat status ${res.status}: ${txt}`);
  }

  const json = await res.json();
  const data = json.data ?? json;
  return { status: String(data.status ?? "PENDING").toUpperCase() };
}
