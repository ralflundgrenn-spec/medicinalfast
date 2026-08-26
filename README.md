# Atestado Já

Site de venda de consultas médicas online **24 horas por dia**, com foco em
**atestado rápido** para quem não pode sair de casa e precisa de justificar a
falta ao trabalho com urgência.

Construído com **Next.js (App Router) + Tailwind CSS + Supabase**, pronto para
deploy no **Vercel**.

---

## O que já está feito

- **Landing page** focada no atestado rápido: hero com prova social, destaque do
  atestado, como funciona (3 passos), benefícios, preços, depoimentos e FAQ.
- **Fluxo de agendamento** (`/agendar`): urgência, tipo de consulta, canal
  (vídeo/chamada/chat), necessidade de atestado e dados do paciente.
- **API** (`/api/agendar`): valida e grava o pedido no Supabase (tabela
  `agendamentos`). Se o Supabase ainda não estiver configurado, o fluxo continua
  a funcionar em modo demonstração (o pedido é registado no log do servidor).
- Design **claro, confiável e com foco na rapidez**, responsivo (telemóvel e
  desktop).

## Ainda por fazer (próximos passos)

- **Gateway de pagamento próprio** — o ponto de integração já está marcado no
  fluxo (a seguir ao agendamento). Basta ligar o gateway antes de criar a
  consulta.
- **Sala de consulta** (vídeo/chamada) e **emissão real do atestado** em PDF.
- **Painel do médico/operação** para gerir os pedidos da tabela `agendamentos`.

---

## Como correr localmente

```bash
npm install
npm run dev
```

Abra <http://localhost:3000>.

> Funciona **sem** Supabase configurado (modo demonstração). Para persistir os
> pedidos, siga os passos abaixo.

## Configurar o Supabase

1. Crie um projeto em <https://supabase.com>.
2. No **SQL Editor**, execute o conteúdo de [`supabase/schema.sql`](supabase/schema.sql).
3. Copie `.env.local.example` para `.env.local` e preencha:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```

   (Encontra as chaves em **Project Settings → API**.)
4. Reinicie o `npm run dev`.

Os pedidos passam a ser gravados na tabela `agendamentos`. A inserção é feita no
servidor com a `SERVICE_ROLE_KEY`, por isso o RLS mantém a tabela fechada a
acessos diretos do browser.

## Deploy no Vercel

1. Suba o código para um repositório Git (GitHub/GitLab).
2. Importe o projeto no <https://vercel.com>.
3. Em **Settings → Environment Variables**, adicione as 3 variáveis acima.
4. Deploy. O Vercel deteta o Next.js automaticamente.

---

## Estrutura

```
app/
  page.tsx              landing page
  agendar/              fluxo de agendamento (form + página)
  api/agendar/route.ts  endpoint que grava no Supabase
components/
  sections/             hero + secções da home
  site-header.tsx, site-footer.tsx, icons.tsx
lib/
  supabase/admin.ts     cliente Supabase (servidor)
  types.ts
supabase/schema.sql     tabela `agendamentos` + RLS
```

## Aviso

Este serviço não substitui o atendimento de urgência. Em caso de emergência com
risco de vida, ligue **112**. O atestado é sempre emitido a **critério clínico**
do médico durante a consulta.
