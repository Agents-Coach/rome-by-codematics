# Runtime Notes — Rome by Codematics

## Last Updated
2026-06-04

## Build Status
- [x] Landing page deployed (Vercel): https://rome-frontend-sable.vercel.app
- [x] GitHub repo: github.com/Agents-Coach/rome-by-codematics
- [x] Rome Bridge service (TypeScript)
- [x] Evolution API integration
- [x] Docker Compose stack
- [x] Prisma schema
- [ ] Auth system (pending)
- [ ] Stripe billing (pending)
- [ ] VPS deployment (pending — needs SSH)
- [ ] End-to-end AI test (pending)

## Tech Stack
- Frontend: Next.js 15, Tailwind v4, TypeScript
- Backend: Node.js, Express, TypeScript
- AI: Claude via Codemax API
- WhatsApp: Evolution API (Baileys + Cloud API)
- DB: PostgreSQL (Prisma)
- Hosting: Contabo VPS 178.238.232.52 + Vercel

## Environment Variables Needed
- DATABASE_URL: postgresql://...
- CODEMAX_API_KEY: sk-cp-...
- CODEMAX_API_URL: https://api.codematics.ai/v1
- EVOLUTION_API_KEY: (set on VPS)
- STRIPE_SECRET_KEY: (pending)
- NEXTAUTH_SECRET: (pending)

## Agent Team
Chief (this agent) → coordinating all 16 lead agents across the workforce

## Current Sprint Goal
30-day launch sprint: full go-to-market package + all product assets + first revenue
