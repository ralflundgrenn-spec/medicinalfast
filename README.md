# Atestado Já

Site de consulta médica online **24h** com foco em **atestado rápido**. O cliente
preenche uma ficha curta, paga **R$ 29,99 via PIX** e, assim que o pagamento é
confirmado, é liberado o **WhatsApp do médico com a ficha já preenchida**.

Construído com **Next.js (App Router) + Tailwind CSS**, pagamentos via **BlackCat
(PIX)**, pronto para **Vercel**.

---

## Fluxo do cliente

1. Clica em **"Falar com médico agora"** → página `/agendar`.
2. Preenche a ficha: nome, WhatsApp, CPF, email e um **breve resumo** do que sente.
3. Clica em **"Ir para o pagamento"** → gera a cobrança PIX e mostra o **QR Code**
   (+ código copia-e-cola).
4. A página **verifica o pagamento sozinha** a cada 4 segundos.
5. Pago → libera o botão **"Falar com o médico no WhatsApp"**, que abre o WhatsApp
   do médico **com a ficha já preenchida** (o cliente só carrega em enviar).

## Como corre localmente

```bash
npm install
npm run dev
```

Abra <http://localhost:3000>.

> **Funciona sem chave de pagamento** (modo demonstração): gera um QR falso e
> "confirma" o pagamento em ~8 segundos, para testares o fluxo completo.

## Configurar o pagamento (BlackCat)

Copie `.env.local.example` para `.env.local` e preencha:

```env
BLACKCAT_API_KEY=...          # chave da API BlackCat (painel BlackCat)
DOCTOR_WHATSAPP=5511999999999 # WhatsApp do médico (só dígitos, com DDI+DDD)
NEXT_PUBLIC_SITE_URL=https://seu-dominio.vercel.app  # p/ o webhook
```

- **Docs BlackCat:** <https://docs.blackcatoficial.com/>
- Criar cobrança: `POST /sales/create-sale` → devolve QR Code + `copyPaste`.
- Verificar: `GET /sales/{id}/status` → `PENDING` | `PAID` | `CANCELLED`.
- Webhook: `postbackUrl` recebe `transaction.paid`.

No **Vercel**, adicione as mesmas variáveis em **Settings → Environment
Variables** e faça um redeploy.

## Endpoints

| Rota | Método | Função |
|---|---|---|
| `/api/pagamento/criar` | POST | Valida a ficha e cria a cobrança PIX |
| `/api/pagamento/status` | GET | Verifica o pagamento; libera o WhatsApp se pago |
| `/api/pagamento/webhook` | POST | Recebe os postbacks da BlackCat (reforço) |

## Estrutura

```
app/
  page.tsx                  landing (1 ecrã, 1 botão, R$ 29,99)
  agendar/                  checkout: ficha → QR Code → WhatsApp
  api/pagamento/            criar · status · webhook
lib/
  blackcat.ts               cliente da API PIX (+ modo demo)
components/                 icons, footer
```

## Aviso

Serviço não substitui urgências. Em risco de vida, ligue **192**. O atestado é
sempre emitido a **critério clínico** do médico.
