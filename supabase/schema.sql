-- ============================================================
--  Atestado Já — schema Supabase
--  Execute no SQL Editor do Supabase (ou via `supabase db push`).
-- ============================================================

-- Tabela de pedidos de consulta / agendamentos
create table if not exists public.agendamentos (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  -- Dados do paciente
  nome            text not null,
  telefone        text not null,
  email           text not null,

  -- Consulta
  tipo_consulta   text not null default 'atestado_rapido',
  motivo          text,                 -- descrição breve do sintoma/necessidade
  precisa_atestado boolean not null default true,
  urgencia        text not null default 'agora',   -- 'agora' | 'hoje' | 'agendar'

  -- Estado do pedido
  estado          text not null default 'novo',    -- novo | em_atendimento | concluido | cancelado
  canal_contacto  text not null default 'video'    -- video | telefone | chat
);

-- Índices úteis para o painel de operação
create index if not exists agendamentos_estado_idx on public.agendamentos (estado);
create index if not exists agendamentos_created_at_idx on public.agendamentos (created_at desc);

-- ------------------------------------------------------------
--  Row Level Security
-- ------------------------------------------------------------
alter table public.agendamentos enable row level security;

-- Sem políticas de SELECT/INSERT públicas: a inserção é feita pelo
-- servidor (route handler) com a SERVICE_ROLE_KEY, que ignora o RLS.
-- Isto impede leitura/escrita direta a partir do browser.

-- Opcional: se quiser permitir INSERT direto a partir do cliente com a
-- ANON key (sem passar pelo servidor), descomente a política abaixo:
--
-- create policy "permitir_insert_publico"
--   on public.agendamentos
--   for insert
--   to anon
--   with check (true);
