"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bolt, Check, Clock, DocCheck, Shield } from "@/components/icons";

const CONSULTA_NOME = "Consulta médica com atestado";
const CONSULTA_PRECO = "R$ 29,99";

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
          Fale já com o médico no WhatsApp. A sua ficha vai{" "}
          <strong>preenchida</strong> — é só carregar em enviar.
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
          {cobranca.qrCodeBase64 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imgSrc(cobranca.qrCodeBase64)}
              alt="QR Code PIX"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="px-3 text-center text-xs text-ink-500">
              <DocCheck className="mx-auto mb-2 h-8 w-8 text-brand-500" />
              QR de demonstração. Use o código copia-e-cola abaixo.
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
          Assim que o PIX for confirmado, o WhatsApp do médico é liberado
          automaticamente nesta página.
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
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              inputMode="tel"
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
              onChange={(e) => setCpf(e.target.value)}
              required
              inputMode="numeric"
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
              <Clock className="h-4 w-4 text-brand-600" /> WhatsApp liberado na
              hora
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
