import Link from "next/link";
import {
  ArrowRight,
  Bolt,
  Chat,
  Check,
  Clock,
  DocCheck,
  HomeIcon,
  Phone,
  Shield,
  Star,
  Stethoscope,
  VideoCam,
} from "@/components/icons";

/* ----------------------------------------------------------------
   Destaque do Atestado — a peça central do produto
----------------------------------------------------------------- */
export function AtestadoDestaque() {
  return (
    <section id="atestado" className="py-20">
      <div className="container-page">
        <div className="grid items-center gap-12 rounded-3xl bg-brand-600 p-8 text-white shadow-soft sm:p-12 lg:grid-cols-2 lg:p-16">
          <div>
            <div className="badge bg-white/15 text-white">
              <Bolt className="h-3.5 w-3.5" /> O nosso foco
            </div>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              O seu atestado, pronto no mesmo dia.
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-brand-50/90">
              Está doente e não consegue ir trabalhar? Faça a consulta online,
              explique os sintomas ao médico e receba o atestado por email — em
              PDF, com a assinatura e cédula do profissional, pronto a entregar
              à sua entidade patronal.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Emitido durante a consulta, quando justificado",
                "Enviado em PDF para o seu email e telemóvel",
                "Com nome, data, período de dispensa e assinatura médica",
                "Sem deslocações, sem salas de espera",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-brand-50/95">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/agendar"
              className="btn mt-9 bg-white text-brand-700 hover:bg-brand-50 hover:-translate-y-0.5"
            >
              Obter o meu atestado
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* pré-visualização do documento */}
          <div className="relative">
            <div className="mx-auto max-w-sm rounded-2xl bg-white p-6 text-ink-900 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <DocCheck className="h-6 w-6 text-brand-600" />
                  <span className="text-sm font-bold">ATESTADO MÉDICO</span>
                </div>
                <span className="badge bg-brand-100 text-brand-700">Emitido</span>
              </div>
              <div className="space-y-3 py-5 text-sm">
                <div className="h-2.5 w-3/4 rounded bg-slate-100" />
                <div className="h-2.5 w-full rounded bg-slate-100" />
                <div className="h-2.5 w-5/6 rounded bg-slate-100" />
                <div className="mt-4 rounded-lg bg-brand-50 p-3">
                  <p className="text-xs text-ink-500">Período de dispensa</p>
                  <p className="text-base font-bold text-brand-700">
                    2 dias · 26 a 27 Ago 2026
                  </p>
                </div>
                <div className="h-2.5 w-1/2 rounded bg-slate-100" />
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <div className="mb-1 h-4 w-28 rounded bg-slate-200" />
                  <p className="text-[10px] text-ink-500">
                    Assinatura · Céd. Prof. 000000
                  </p>
                </div>
                <Shield className="h-9 w-9 text-brand-500" />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-2 flex items-center gap-2 rounded-full bg-urgency-500 px-4 py-2 text-sm font-semibold shadow-lg">
              <Clock className="h-4 w-4" /> Pronto em minutos
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Como funciona — 3 passos
----------------------------------------------------------------- */
const PASSOS = [
  {
    icon: Stethoscope,
    titulo: "1. Diga o que precisa",
    texto:
      "Preencha um formulário rápido com os seus dados e sintomas. Menos de 2 minutos.",
  },
  {
    icon: VideoCam,
    titulo: "2. Fale com o médico",
    texto:
      "Um médico com cédula profissional atende-o por vídeo ou chamada, a qualquer hora do dia ou da noite.",
  },
  {
    icon: DocCheck,
    titulo: "3. Receba o atestado",
    texto:
      "Se justificado, o atestado é emitido e enviado para o seu email na hora, pronto a usar.",
  },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-brand-50/50 py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge bg-brand-100 text-brand-700">
            Simples e rápido
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Da dúvida ao atestado em 3 passos
          </h2>
          <p className="mt-4 text-lg text-ink-700">
            Sem filas, sem marcações complicadas. Tudo a partir do seu telemóvel
            ou computador.
          </p>
        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          {PASSOS.map((p) => (
            <div key={p.titulo} className="card p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink-900">{p.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                {p.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Benefícios
----------------------------------------------------------------- */
const BENEFICIOS = [
  {
    icon: Clock,
    titulo: "24 horas por dia",
    texto: "Médicos disponíveis a qualquer hora, incluindo noites e fins de semana.",
  },
  {
    icon: HomeIcon,
    titulo: "Sem sair de casa",
    texto: "Perfeito para quando está doente e não consegue deslocar-se.",
  },
  {
    icon: Bolt,
    titulo: "Rápido de verdade",
    texto: "Tempo médio de espera de cerca de 8 minutos até falar com o médico.",
  },
  {
    icon: Shield,
    titulo: "Seguro e sigiloso",
    texto: "Os seus dados de saúde são protegidos e mantidos em total sigilo.",
  },
];

export function Beneficios() {
  return (
    <section className="py-20">
      <div className="container-page">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFICIOS.map((b) => (
            <div
              key={b.titulo}
              className="rounded-2xl border border-slate-100 p-6 transition hover:border-brand-200 hover:shadow-card"
            >
              <b.icon className="h-8 w-8 text-brand-600" />
              <h3 className="mt-4 text-base font-bold text-ink-900">
                {b.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                {b.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Preços
----------------------------------------------------------------- */
const PLANOS = [
  {
    id: "atestado_rapido",
    nome: "Atestado Rápido",
    preco: "24,90 €",
    duracao: "consulta única",
    destaque: true,
    descricao: "Para quem precisa de atestado hoje e sem complicações.",
    inclui: [
      "Consulta por vídeo ou chamada",
      "Atestado emitido na hora (se justificado)",
      "Envio em PDF por email",
      "Prioridade no atendimento",
    ],
  },
  {
    id: "consulta_geral",
    nome: "Consulta Geral",
    preco: "34,90 €",
    duracao: "consulta única",
    destaque: false,
    descricao: "Avaliação clínica completa com médico de medicina geral.",
    inclui: [
      "Consulta por vídeo até 20 min",
      "Aconselhamento e orientação",
      "Prescrição médica (se necessário)",
      "Atestado incluído se justificado",
    ],
  },
  {
    id: "receita",
    nome: "Receita / Renovação",
    preco: "19,90 €",
    duracao: "consulta única",
    destaque: false,
    descricao: "Renovação de receitas de medicação habitual.",
    inclui: [
      "Consulta breve por chat ou chamada",
      "Emissão de receita (se aplicável)",
      "Envio digital imediato",
      "Sem deslocações à farmácia",
    ],
  },
];

export function Precos() {
  return (
    <section id="precos" className="bg-brand-50/50 py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge bg-brand-100 text-brand-700">Preços claros</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Pague apenas pela consulta que precisa
          </h2>
          <p className="mt-4 text-lg text-ink-700">
            Sem mensalidades nem surpresas. O valor é fixo e sabe-o antes de
            começar.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANOS.map((plano) => (
            <div
              key={plano.id}
              className={`relative flex flex-col rounded-2xl bg-white p-7 ${
                plano.destaque
                  ? "ring-2 ring-brand-600 shadow-soft"
                  : "border border-slate-100 shadow-card"
              }`}
            >
              {plano.destaque && (
                <span className="absolute -top-3 left-7 badge bg-urgency-500 text-white">
                  <Star className="h-3 w-3" /> Mais escolhido
                </span>
              )}
              <h3 className="text-lg font-bold text-ink-900">{plano.nome}</h3>
              <p className="mt-1 text-sm text-ink-500">{plano.descricao}</p>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="text-4xl font-extrabold text-ink-900">
                  {plano.preco}
                </span>
                <span className="text-sm text-ink-500">/ {plano.duracao}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plano.inclui.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <span className="text-ink-700">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/agendar?plano=${plano.id}`}
                className={`mt-7 ${plano.destaque ? "btn-primary" : "btn-brand"}`}
              >
                Escolher {plano.nome}
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-ink-500">
          O atestado é sempre emitido a critério clínico do médico. O pagamento
          será processado de forma segura na próxima etapa.
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Depoimentos
----------------------------------------------------------------- */
const DEPOIMENTOS = [
  {
    nome: "Marta S.",
    texto:
      "Acordei com febre e precisava de justificar a falta. Em 10 minutos falei com a médica e recebi o atestado por email. Salvou-me o dia.",
  },
  {
    nome: "João P.",
    texto:
      "Não conseguia sair de casa e o meu patrão pedia atestado. Fiz tudo pelo telemóvel, super simples e rápido.",
  },
  {
    nome: "Inês R.",
    texto:
      "Atendimento de madrugada, com um médico atencioso. Recebi a receita e o atestado sem stress nenhum.",
  },
];

export function Depoimentos() {
  return (
    <section className="py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge bg-brand-100 text-brand-700">
            Quem já usou aprova
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Milhares de atestados resolvidos em casa
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {DEPOIMENTOS.map((d) => (
            <figure key={d.nome} className="card flex flex-col p-6">
              <div className="flex items-center gap-0.5 text-urgency-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                “{d.texto}”
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-ink-900">
                {d.nome}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   FAQ
----------------------------------------------------------------- */
const PERGUNTAS = [
  {
    q: "O atestado tem validade legal?",
    a: "Sim. O atestado é emitido por um médico com cédula profissional, com identificação, data e assinatura, tal como uma consulta presencial. É válido para apresentar à entidade patronal ou instituição de ensino.",
  },
  {
    q: "Recebo sempre o atestado?",
    a: "O atestado é emitido quando existe justificação clínica, avaliada pelo médico durante a consulta. É uma decisão médica — não é garantido antecipadamente, tal como acontece numa consulta normal.",
  },
  {
    q: "Quanto tempo demora?",
    a: "O tempo médio de espera até falar com um médico é de cerca de 8 minutos. Após a consulta, o atestado é enviado para o seu email de imediato.",
  },
  {
    q: "Funciona mesmo 24 horas?",
    a: "Sim. Temos médicos disponíveis a qualquer hora, todos os dias, incluindo noites, fins de semana e feriados.",
  },
  {
    q: "Como é feito o pagamento?",
    a: "Paga apenas pela consulta escolhida, com valor fixo e conhecido antes de começar. O pagamento é processado de forma segura na etapa de agendamento.",
  },
  {
    q: "Os meus dados estão seguros?",
    a: "Sim. Todos os dados de saúde são tratados com sigilo clínico e protegidos de acordo com a legislação de proteção de dados.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-brand-50/50 py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge bg-brand-100 text-brand-700">Dúvidas</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Perguntas frequentes
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200 rounded-2xl bg-white px-6 shadow-card">
          {PERGUNTAS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink-900">
                {item.q}
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   CTA final
----------------------------------------------------------------- */
export function CtaFinal() {
  return (
    <section className="py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-8 py-14 text-center sm:px-16 sm:py-20">
          <div className="grid-bg absolute inset-0 opacity-30" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-100">
              <span className="live-dot" /> Médicos online agora mesmo
            </div>
            <h2 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Doente e sem tempo a perder?
              <br />
              Trate do seu atestado agora.
            </h2>
            <p className="mt-4 text-lg text-brand-100/80">
              Comece a sua consulta em menos de 2 minutos. Sem sair de casa.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/agendar" className="btn-primary text-base">
                Falar com médico agora
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#precos"
                className="btn border border-white/20 text-white hover:bg-white/10"
              >
                Ver preços
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-100/70">
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" /> Vídeo, chamada ou chat
              </span>
              <span className="inline-flex items-center gap-2">
                <Chat className="h-4 w-4" /> Resposta imediata
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
