# Growth & Funnel — Rome by Codematics

## Funnel Structure

```
[Traffic]
  ↓
[Landing Page /wait rome.codematics.ai] — Hero → How it works → Pricing → FAQ → CTA
  ↓
[Signup] — 3-step: Account → Agent Config → Connect WA
  ↓
[Dashboard] — Agent config, chat history, connection status
  ↓
[Trial Activation] — WhatsApp connected → AI live → first message
  ↓
[Upgrade to Pro] — After 7 days, prompt to upgrade for calendar booking
  ↓
[Retention] — Monthly value reminders, new feature drops
```

## Traffic Sources
1. **SEO** — "WhatsApp AI agent", "automate WhatsApp business", "AI sales bot"
2. **Content** — Blog posts, YouTube tutorials, LinkedIn content
3. **Social** — Twitter/X, WhatsApp communities, LinkedIn
4. **Paid** — Meta ads targeting coaches/consultants in India
5. **Referral** — Happy users share with peers

## Conversion Goals
- Landing → Signup: 5–10%
- Signup → WhatsApp Connected: 30%
- Connected → First AI Message: 50%
- Trial → Paid: 15–20%

## Key Funnel Pages
1. `/` — Landing page (already built)
2. `/signup` — 3-step onboarding (already built)
3. `/dashboard/agent` — AI configuration (already built)
4. `/dashboard/chat` — Conversation history (already built)
5. `/dashboard/connect` — WhatsApp QR connect (already built)
6. `/dashboard/settings` — Account + billing (already built)

## What Needs Building
- Real authentication (NextAuth or custom)
- Stripe checkout flow
- Trial-to-paid upgrade flow
- Email confirmation on signup
- Welcome email sequence
- Usage tracking + plan limits UI
- Dashboard real-time updates
