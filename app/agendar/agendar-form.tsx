"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bolt,
  Chat,
  Check,
  Clock,
  DocCheck,
  Phone,
  Shield,
  VideoCam,
} from "@/components/icons";
import type { CanalContacto, Urgencia } from "@/lib/types";

// Consulta única
const CONSULTA_NOME = "Consulta médica com atestado";
const CONSULTA_PRECO = "29,99 €";

const URGENCIAS: { id: Urgencia; label: string; hint: string }[] = [
  { id: "agora", label: "Agora", hint: "Falar com médico já" },
  { id: "hoje", label: "Ainda hoje", hint: "Nas próximas horas" },
  { id: "agendar", label: "Agendar", hint: "Escolher um horário" },
];

const CANAIS: { id: CanalContacto; label: string; Icon: typeof VideoCam }[] = [
  { id: "video", label: "Vídeo", Icon: VideoCam },
  { id: "telefone", label: "Chamada", Icon: Phone },
  { id: "chat", label: "Chat", Icon: Chat },
];

export function AgendarForm() {
  const [urgencia, setUrgencia] = useState<Urgencia>("agora");
  const [canal, setCanal] = useState<CanalContacto>("video");
  const [precisaAtestado, setPrecisaAtestado] = useState(true);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [motivo, setMotivo] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);
    try {
      const res = await fetch("/api/agendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          telefone,
          email,
          tipo_consulta: "consulta_atestado",
          motivo,
          precisa_atestado: precisaAtestado,
          urgencia,
          canal_contacto: canal,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(data.error || "Não foi possível concluir. Tente novamente.");
        return;
      }
      setSucesso(true);
    } catch {
      setErro("Erro de ligação. Verifique a internet e tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  if (sucesso) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
          <Check className="h-8 w-8 text-brand-600" />
        </div>
        <h1 className="mt-6 text-2xl font-extrabold text-ink-900">
          Pedido recebido, {nome.split(" ")[0] || "tudo certo"}!
        </h1>
        <p className="mt-3 text-ink-700">
          Um médico vai contactá-lo por{" "}
          <strong>{CANAIS.find((c) => c.id === canal)?.label.toLowerCase()}</strong>{" "}
          {urgencia === "agora" ? "em minutos" : "conforme escolhido"}. Assim que
          a consulta terminar, o seu atestado (se justificado) será enviado para{" "}
          <strong>{email}</strong>.
        </p>
        <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-4 text-left text-sm text-brand-800">
          <p className="flex items-center gap-2 font-semibold">
            <Clock className="h-4 w-4" /> Próximo passo
          </p>
          <p className="mt-1 text-brand-700/90">
            Mantenha o telemóvel por perto. Numa versão em produção, aqui seria
            processado o pagamento e criada a sala da consulta.
          </p>
        </div>
        <Link href="/" className="btn-brand mt-8">
          Voltar ao início
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
      {/* Formulário */}
      <form onSubmit={onSubmit} className="space-y-8">
        {/* Urgência */}
        <fieldset>
          <legend className="text-sm font-bold text-ink-900">
            Com que urgência precisa?
          </legend>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {URGENCIAS.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => setUrgencia(u.id)}
                className={`rounded-xl border p-3 text-left transition ${
                  urgencia === u.id
                    ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600"
                    : "border-slate-200 hover:border-brand-300"
                }`}
              >
                <span className="block text-sm font-semibold text-ink-900">
                  {u.label}
                </span>
                <span className="text-xs text-ink-500">{u.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* Consulta única */}
        <div className="flex items-center justify-between rounded-xl border border-brand-200 bg-brand-50 px-4 py-3.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-brand-800">
            <DocCheck className="h-4 w-4 text-brand-600" />
            {CONSULTA_NOME}
          </div>
          <span className="text-base font-extrabold text-brand-700">
            {CONSULTA_PRECO}
          </span>
        </div>

        {/* Canal */}
        <fieldset>
          <legend className="text-sm font-bold text-ink-900">
            Como quer ser atendido?
          </legend>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {CANAIS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setCanal(id)}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition ${
                  canal === id
                    ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600"
                    : "border-slate-200 hover:border-brand-300"
                }`}
              >
                <Icon className="h-5 w-5 text-brand-600" />
                <span className="text-sm font-medium text-ink-900">{label}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* Precisa de atestado */}
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4">
          <input
            type="checkbox"
            checked={precisaAtestado}
            onChange={(e) => setPrecisaAtestado(e.target.checked)}
            className="mt-0.5 h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-900">
              <DocCheck className="h-4 w-4 text-brand-600" /> Preciso de atestado
              médico
            </span>
            <span className="text-xs text-ink-500">
              O médico avalia e emite durante a consulta, se justificado.
            </span>
          </span>
        </label>

        {/* Dados pessoais */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-sm font-bold text-ink-900" htmlFor="nome">
              Nome completo
            </label>
            <input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="O seu nome"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-ink-900" htmlFor="telefone">
              Telemóvel
            </label>
            <input
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
              inputMode="tel"
              placeholder="+351 9xx xxx xxx"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
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
              placeholder="para receber o atestado"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-bold text-ink-900" htmlFor="motivo">
              O que está a sentir?{" "}
              <span className="font-normal text-ink-500">(opcional)</span>
            </label>
            <textarea
              id="motivo"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={3}
              placeholder="Ex.: febre e dores no corpo desde ontem…"
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
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
          {enviando ? "A enviar…" : "Iniciar consulta agora"}
          {!enviando && <Bolt className="h-4 w-4" />}
        </button>
        <p className="text-center text-xs text-ink-500">
          Ao continuar aceita os termos e a política de privacidade. Em
          emergências com risco de vida, ligue 112.
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
              <dt className="text-ink-500">Urgência</dt>
              <dd className="font-medium text-ink-900">
                {URGENCIAS.find((u) => u.id === urgencia)?.label}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-500">Atestado</dt>
              <dd className="font-medium text-ink-900">
                {precisaAtestado ? "Sim, se justificado" : "Não"}
              </dd>
            </div>
          </dl>
          <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 text-xs text-ink-600">
            <p className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-brand-600" /> Dados seguros e
              sigilosos
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-600" /> Espera média ± 8
              minutos
            </p>
            <p className="flex items-center gap-2">
              <Check className="h-4 w-4 text-brand-600" /> Médicos com cédula
              profissional
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
