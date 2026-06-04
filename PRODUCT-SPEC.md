# Rome by Codematics — Product Specification

**Status:** Building
**Date:** 2026-06-04
**Product:** AI Sales Agent on WhatsApp

---

## 1. Product Overview

**Name:** Rome by Codematics
**Tagline:** "Your AI sales rep. Runs on WhatsApp. Works 24/7."

**What it does:**
User connects their WhatsApp Business number → configures their offer, buyer persona, FAQs, pricing → Rome's AI agent handles all incoming WhatsApp messages in real time — qualifying leads, answering questions, handling objections, and booking calls.

**Core promise:** You sleep, Rome sells.

---

## 2. Target Customer

- **Primary:** Coaches, consultants, course creators, agency owners, freelancers
- **Age/Skill:** 25–50, understands WhatsApp Business, may have zero tech skills
- **Pain:** Wastes hours repeating the same answers, misses hot leads at night, can't afford a VA
- **Willingness:** Has tried chatbots, didn't like setup complexity
- **Price sensitivity:** $47–$197/mo is fine if it actually works

**Ideal ICP:**
> "I sell a $500–$5,000 offer and get 5–20 WhatsApp inquiries a day. I lose half of them because I'm sleeping or in a meeting. I need someone (or something) to talk to them right now."

---

## 3. Architecture

```
[WhatsApp User]
       ↓ message
[Evolution API] (Contabo VPS :8080)
       ↓ webhook POST /webhook/ai-agent
[Rome Bridge Service] (Node.js microservice)
       ↓ → Anthropic Claude API
[AI Agent — Sales Rep Persona]
       ↓ response text
[Rome Bridge Service]
       ↓ POST to Evolution API /messages/send
[Evolution API] → WhatsApp user
```

**Frontend (Next.js SaaS):**
- Landing/overview page (public)
- Dashboard: Configure agent, see chat history, manage settings
- Auth: Email/password, simple
- No complex CRM — chat history + contact list is enough

**Evolution API (VPS):**
- Single instance, multi-tenant via instances
- Each Rome user = one Evolution API "instance" (WhatsApp number)
- Baileys connection (free, QR code auth)
- Webhook → Rome Bridge

**Rome Bridge Service (VPS):**
- Receives webhook from Evolution API
- Calls Claude with user's configured persona + offer
- Sends response back via Evolution API send API
- Node.js/Express, runs on VPS alongside Evolution API
- Config stored in PostgreSQL (same DB as Evolution API, or separate)

**Claude Agent (Anthropic):**
- System prompt: "You are [Name], a helpful sales rep for [Offer]"
- User config: name, offer, price, FAQs, objection map, CTA (book call / send link)
- Max 3–5 tool uses per message (lookup FAQ, book calendar, send pricing)
- No tools = plain response

---

## 4. Feature Set

### MVP (Version 1)
- [ ] WhatsApp number connection (QR code, Baileys)
- [ ] AI agent config: name, intro message, offer details, FAQs
- [ ] Real-time message handling (webhook → Claude → send)
- [ ] Simple dashboard: chat history, agent config
- [ ] Email auth
- [ ] Landing page

### Version 1.1
- [ ] Calendar booking integration (Calendly link)
- [ ] Human handoff trigger ("talk to human" keyword)
- [ ] Basic analytics: messages handled, leads captured

### Version 1.5
- [ ] Objection handling map
- [ ] Multi-offer support (不同的 offer 不同的话术)
- [ ] Chatwoot integration for human takeover

---

## 5. Offer Stack

| Tier | Price | Instances | Messages/mo | Features |
|------|-------|-----------|-------------|---------|
| Starter | $47/mo | 1 WA number | 500 | Core AI agent, chat history |
| Pro | $97/mo | 3 WA numbers | 2,000 | Calendar booking, analytics |
| Agency | $197/mo | 10 WA numbers | 10,000 | Human handoff, priority support |

**Trial:** 7-day free, no credit card.

---

## 6. Tech Stack

| Component | Tech |
|-----------|------|
| Frontend | Next.js 15, Tailwind v4, TypeScript |
| Backend (bridge) | Node.js, Express, TypeScript |
| WhatsApp | Evolution API (Baileys) |
| AI | Anthropic Claude (via Codemax API) |
| Database | PostgreSQL (via Evolution API DB) |
| Hosting (VPS) | Contabo VPS 178.238.232.52 |
| Frontend hosting | Vercel |
| Auth | NextAuth.js / Custom email+password |

---

## 7. Evolution API Configuration

**Connection:** Baileys (free, QR code)
**Auth:** API key per instance
**Webhook:** POST to Rome Bridge on all message events
**Storage:** Local (S3 optional later)
**Database:** PostgreSQL (shared with Evolution API)

**Key endpoints used:**
- `POST /instances/{instance}/connect` — initiate QR connection
- `GET /instances/{instance}/connectionState` — check connection status
- `POST /instances/{instance}/webhook/set` — set webhook URL
- `POST /instances/{instance}/messages/sendText` — send AI response
- `POST /instances/{instance}/chat/getMessages` — fetch chat history

---

## 8. Rome Bridge API Design

### Webhook (Evolution API → Rome Bridge)
```
POST /webhook/ai-agent
Headers: X-Evolution-Instance, X-Evolution-ApiKey
Body: {
  instance: string,
  event: "messages.upsert",
  data: {
    key: { remoteJid: string, fromMe: boolean },
    message: { conversation?: string, extendedTextMessage?: {...} },
    pushName: string
  }
}
```

### Send Message (Rome Bridge → Evolution API)
```
POST {EVOLUTION_API_URL}/message/sendText
Headers: { X-Api-Key: string }
Body: {
  number: string,      // WhatsApp number
  text: string        // Claude response
}
```

### Claude System Prompt (template)
```
You are {AGENT_NAME}, a friendly and professional sales representative for {BUSINESS_NAME}.
You sell: {OFFER_NAME} — {OFFER_DESCRIPTION}
Price: {PRICE}
Your personality: {PERSONALITY_TONE}

RULES:
1. Always be warm, helpful, and never pushy
2. Answer questions about {OFFER_NAME} honestly and clearly
3. If asked about price, quote: {PRICE}
4. If they want to buy, say: {CTA_MESSAGE}
5. Keep responses SHORT — 1-3 sentences max. WhatsApp is conversational.
6. Never make up information. If you don't know, say you'll check and follow up.
7. If they say goodbye or seem done, wish them well warmly.
8. Never send more than 1 message in a row without waiting for their reply.

FAQ:
{USER_FAQ_LIST}

OBJECTIONS & RESPONSES:
{OBJECTION_MAP}

Current conversation (newest last):
{CONVERSATION_HISTORY}
```

---

## 9. Dashboard Pages

### Landing Page (Public)
- Hero: "Your AI Sales Rep on WhatsApp"
- How it works (3 steps)
- Features grid
- Pricing
- FAQ
- CTA: "Start Free Trial"

### Dashboard (Authenticated)
- `/dashboard` — Overview (messages today, leads captured, agent status)
- `/dashboard/agent` — Configure AI agent (name, offer, FAQs, objections)
- `/dashboard/chat` — Live chat history
- `/dashboard/connect` — WhatsApp QR code connect/disconnect
- `/dashboard/settings` — Account, billing

---

## 10. Launch Plan

### Week 1: Infrastructure & Core
- Deploy Evolution API on Contabo VPS
- Build Rome Bridge service
- Basic Next.js app shell + landing page

### Week 2: AI Agent & Dashboard
- Wire Claude into Rome Bridge
- Build agent config dashboard
- Chat history view
- WhatsApp connect flow (QR)

### Week 3: Polish & Auth
- Email auth
- Pricing page + Stripe checkout
- Dashboard UX polish

### Week 4: Launch
- Landing page live
- 7-day free trial signup
- First 10 beta users

---

## 11. Files to Create

```
rome-by-codematics/
├── SPEC.md                          ← This file
├── evolution-api/                   ← Forked/configured Evolution API
├── rome-bridge/                     ← The Node.js AI agent bridge
│   ├── src/
│   │   ├── server.ts               ← Express webhook receiver
│   │   ├── claude.ts              ← Claude API calls
│   │   ├── evolution.ts           ← Evolution API send client
│   │   ├── db.ts                 ← PostgreSQL client
│   │   ├── prompts/               ← System prompt templates
│   │   └── types/                 ← TypeScript types
│   ├── prisma/schema.prisma
│   └── Dockerfile
├── rome-frontend/                   ← Next.js dashboard
│   ├── app/
│   │   ├── page.tsx               ← Landing page
│   │   ├── dashboard/
│   │   └── api/
│   └── ...
└── docker-compose.yml              ← Runs everything on VPS
```
