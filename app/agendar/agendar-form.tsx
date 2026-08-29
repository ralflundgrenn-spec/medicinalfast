"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Bolt, Check, Clock, DocCheck, Shield } from "@/components/icons";
import { cpfValido } from "@/lib/cpf";

const CONSULTA_NOME = "Consulta médica online";
const CONSULTA_PRECO = "R$ 29,99";

// Máscaras de entrada (formatam enquanto o cliente digita)
function maskCPF(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length > 9)
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  if (d.length > 6) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  if (d.length > 3) return `${d.slice(0, 3)}.${d.slice(3)}`;
  return d;
}

function maskTel(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length > 10) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length > 6) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  if (d.length > 2) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return d;
}

type Passo = "ficha" | "pagamento" | "liberado";

interface Cobranca {
  transactionId: string;
  qrCode: string | null;
  qrCodeBase64: string | null;
  copyPaste: string | null;
  demo: boolean;
}

function imgSrc(base64: string) {
  return base64.startsWith("data:") ? base64 : `data:image/png;base64,${base64}`;
}

export function AgendarForm() {
  const [passo, setPasso] = useState<Passo>("ficha");

  // Ficha
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [resumo, setResumo] = useState("");

  // Pagamento
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [cobranca, setCobranca] = useState<Cobranca | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [whatsappMedico, setWhatsappMedico] = useState<string | null>(null);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ---- Passo 1 → cria a cobrança PIX ----
  async function irParaPagamento(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    // Validação no cliente — feedback imediato
    const erros: string[] = [];
    if (nome.trim().split(/\s+/).length < 2)
      erros.push("Digite seu nome completo.");
    if (whatsapp.replace(/\D/g, "").length < 10)
      erros.push("WhatsApp inválido — use DDD + número.");
    if (!cpfValido(cpf)) erros.push("CPF inválido.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      erros.push("Email inválido.");
    if (resumo.trim().length < 5)
      erros.push("Conte um pouco melhor o que está sentindo.");
    if (erros.length) {
      setErro(erros.join(" "));
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch("/api/pagamento/criar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, whatsapp, cpf, resumo }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(data.error || "Não foi possível gerar o pagamento.");
        return;
      }
      setCobranca({
        transactionId: data.transactionId,
        qrCode: data.qrCode,
        qrCodeBase64: data.qrCodeBase64,
        copyPaste: data.copyPaste,
        demo: Boolean(data.demo),
      });
      setPasso("pagamento");
    } catch {
      setErro("Erro de ligação. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  // ---- Passo 2 → verifica o pagamento a cada 4s ----
  useEffect(() => {
    if (passo !== "pagamento" || !cobranca) return;

    async function verificar() {
      try {
        const res = await fetch(
          `/api/pagamento/status?id=${encodeURIComponent(cobranca!.transactionId)}`,
          { cache: "no-store" },
        );
        const data = await res.json();
        if (data.pago) {
          setWhatsappMedico(data.whatsappMedico);
          setPasso("liberado");
        }
      } catch {
        /* tenta de novo no próximo ciclo */
      }
    }

    verificar();
    pollRef.current = setInterval(verificar, 4000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [passo, cobranca]);

  // Dispara a conversão do Google Ads quando o pagamento é confirmado
  useEffect(() => {
    if (passo !== "liberado") return;
    const w = window as unknown as {
      gtag?: (
        command: string,
        event: string,
        params: Record<string, unknown>,
      ) => void;
    };
    w.gtag?.("event", "conversion", {
      send_to: "AW-18415993757/bYJPCIj-3ekcEJ2Ht81E",
      value: 1.0,
      currency: "BRL",
    });
  }, [passo]);

  async function copiar() {
    if (!cobranca?.copyPaste) return;
    try {
      await navigator.clipboard.writeText(cobranca.copyPaste);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* ignora */
    }
  }

  // Mensagem que já vai preenchida no WhatsApp do médico
  const mensagemWpp = encodeURIComponent(
    `Olá! Fiz o pagamento da consulta (Atestado Já) e preciso do atendimento.\n\n` +
      `Nome: ${nome}\n` +
      `CPF: ${cpf}\n` +
      `O que estou sentindo: ${resumo}`,
  );
  const linkWpp = whatsappMedico
    ? `https://wa.me/${whatsappMedico.replace(/\D/g, "")}?text=${mensagemWpp}`
    : "#";

  /* ============================ PASSO 3: LIBERADO ============================ */
  if (passo === "liberado") {
    return (
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
          <Check className="h-8 w-8 text-brand-600" />
        </div>
        <h2 className="mt-6 text-2xl font-extrabold text-ink-900">
          Pagamento confirmado! ✅
        </h2>
        <p className="mt-3 text-ink-700">
          Entre em contato com o médico pelo WhatsApp. A sua ficha vai{" "}
          <strong>preenchida</strong> — é só carregar em enviar. A emissão de
          documentos médicos depende da avaliação clínica e pode ser recusada
          pelo profissional.
        </p>

        <a
          href={linkWpp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-8 w-full bg-[#25D366] text-base text-white hover:brightness-95"
        >
          Falar com o médico no WhatsApp
        </a>

        <p className="mt-4 text-xs text-ink-500">
          Se o botão não abrir, adicione o número{" "}
          <strong className="text-ink-700">{whatsappMedico}</strong> no WhatsApp.
        </p>
      </div>
    );
  }

  /* ============================ PASSO 2: PAGAMENTO ============================ */
  if (passo === "pagamento" && cobranca) {
    return (
      <div className="mx-auto max-w-md text-center">
        <span className="badge bg-urgency-100 text-urgency-600">
          <Bolt className="h-3.5 w-3.5" /> Pague com PIX para liberar
        </span>
        <h2 className="mt-4 text-2xl font-extrabold text-ink-900">
          Escaneie o QR Code
        </h2>
        <p className="mt-2 text-sm text-ink-700">
          {CONSULTA_NOME} ·{" "}
          <strong className="text-ink-900">{CONSULTA_PRECO}</strong>
        </p>

        {cobranca.demo && (
          <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
            Modo demonstração: sem a chave BlackCat configurada. O pagamento será
            "confirmado" automaticamente em ~8 segundos para testar o fluxo.
          </p>
        )}

        <div className="mx-auto mt-6 flex h-56 w-56 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3">
          {cobranca.copyPaste || cobranca.qrCode ? (
            <QRCodeSVG
              value={(cobranca.copyPaste || cobranca.qrCode) as string}
              size={200}
              level="M"
            />
          ) : cobranca.qrCodeBase64 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imgSrc(cobranca.qrCodeBase64)}
              alt="QR Code PIX"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="px-3 text-center text-xs text-ink-500">
              <DocCheck className="mx-auto mb-2 h-8 w-8 text-brand-500" />
              Use o código copia-e-cola abaixo para pagar.
            </div>
          )}
        </div>

        {cobranca.copyPaste && (
          <div className="mt-5">
            <p className="text-xs font-medium text-ink-500">
              Ou copie o código PIX:
            </p>
            <div className="mt-2 flex items-center gap-2">
              <code className="flex-1 truncate rounded-lg bg-slate-50 px-3 py-2 text-left text-xs text-ink-700">
                {cobranca.copyPaste}
              </code>
              <button
                type="button"
                onClick={copiar}
                className="btn-brand !px-4 !py-2 text-xs"
              >
                {copiado ? "Copiado!" : "Copiar"}
              </button>
            </div>
          </div>
        )}

        <div className="mt-7 flex items-center justify-center gap-2 text-sm font-medium text-brand-700">
          <span className="live-dot" />
          À espera do pagamento…
        </div>
        <p className="mt-2 text-xs text-ink-500">
          Assim que o PIX for confirmado, o contato para iniciar a consulta
          médica será liberado nesta página. O pagamento não garante a emissão
          de atestado, receita ou qualquer outro documento.
        </p>
      </div>
    );
  }

  /* ============================ PASSO 1: FICHA ============================ */
  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
      <form onSubmit={irParaPagamento} className="space-y-5">
        <div>
          <label className="text-sm font-bold text-ink-900" htmlFor="nome">
            Nome completo
          </label>
          <input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            placeholder="Seu nome"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-bold text-ink-900" htmlFor="whatsapp">
              WhatsApp
            </label>
            <input
              id="whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(maskTel(e.target.value))}
              required
              inputMode="tel"
              maxLength={16}
              placeholder="(11) 99999-9999"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-ink-900" htmlFor="cpf">
              CPF
            </label>
            <input
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(maskCPF(e.target.value))}
              required
              inputMode="numeric"
              maxLength={14}
              placeholder="000.000.000-00"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-ink-900" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seu@email.com"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-ink-900" htmlFor="resumo">
            O que você está sentindo?{" "}
            <span className="font-normal text-ink-500">(um resumo basta)</span>
          </label>
          <textarea
            id="resumo"
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
            required
            rows={3}
            placeholder="Ex.: febre e dores no corpo desde ontem…"
            className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        {erro && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="btn-primary w-full text-base disabled:cursor-not-allowed disabled:opacity-60"
        >
          {enviando ? "Gerando pagamento…" : "Ir para o pagamento"}
          {!enviando && <Bolt className="h-4 w-4" />}
        </button>
        <p className="text-center text-sm font-semibold text-brand-700">
          O valor corresponde exclusivamente à consulta médica online.
          Documentos médicos não são garantidos.
        </p>
        <p className="text-center text-xs text-ink-500">
          Pagamento seguro via PIX. Em emergências com risco de vida, ligue 192.
        </p>
      </form>

      {/* Resumo lateral */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card p-6">
          <h3 className="text-sm font-bold text-ink-900">Resumo</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-500">Consulta</dt>
              <dd className="text-right font-medium text-ink-900">
                {CONSULTA_NOME}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-500">Valor</dt>
              <dd className="font-bold text-ink-900">{CONSULTA_PRECO}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-500">Pagamento</dt>
              <dd className="font-medium text-ink-900">PIX</dd>
            </div>
          </dl>
          <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 text-xs text-ink-600">
            <p className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-brand-600" /> Pagamento seguro
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-600" /> Acesso ao médico após
              a confirmação do pagamento
            </p>
            <p className="flex items-center gap-2">
              <Check className="h-4 w-4 text-brand-600" /> Ficha vai preenchida ao
              médico
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
