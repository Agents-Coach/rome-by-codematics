# Funnel Architecture — Rome by Codematics
**Funnel Lead Output** | 2026-06-04

---

## CURRENT FUNNEL STATE

Already built:
- Landing page (/) — hero, features, pricing, FAQ
- Signup (/signup) — 3-step onboarding
- Login (/login)
- Dashboard (/dashboard, /agent, /chat, /connect, /settings)

What's missing: friction, conversion boosters, trust amplifiers, upgrade flows

---

## REVISED FUNNEL ARCHITECTURE

```
[COLD TRAFFIC]
  Google Search: "WhatsApp AI agent", "automate WhatsApp business"
  Meta Ads: targeting Indian coaches 28-45
  YouTube/LinkedIn: content

  ↓ Landing Page (/) — high-intent cold traffic
  
  [FLOATING CTA BAR] — sticky on scroll: "Start Free Trial" button
  
  ↓ How It Works section
  
  ↓ Social proof (testimonials, stats)
  
  ↓ Pricing section
  
  ↓ Objection-busting FAQ
  
  ↓ Final CTA block
  
  [SIGNUP PAGE]
  3 steps: Account → Agent Config → Connect WA
  
  ↓ Trial Activation Email (email lead handles)
  
  [DASHBOARD] — Rome running
  
  [7-DAY TOUCHPOINTS]
  Day 1: Welcome + "Rome is live" email
  Day 3: "See what Rome captured today" email
  Day 7: "Your 7-day report" email + upgrade CTA
  
  ↓ Upgrade prompt (when trial ends)
  
  [PAYMENT] — Stripe checkout
  
  ↓ Receipt + onboarding email
  
  [ACTIVE USER]
  
  [UPGRADE FLOWS]
  - Usage limit warning at 80% (400 messages)
  - Add 4th number → Agency upsell
  - Engagement drop → Re-engagement email
```

---

## LANDING PAGE ENHANCEMENTS

### Add These New Sections (to existing page.tsx)

**1. Social Proof Bar (between hero and stats)**
Add a scrolling marquee or grid of logos/testimonials:
- "As seen in" or trust badges
- 5–6 testimonial quotes from beta users
- Platform logos: WhatsApp, Calendly, Claude

**2. "What Rome Looks Like" Section**
Screenshots or mockup of WhatsApp chat:
- Real chat simulation showing Rome responding
- Before/after: "Without Rome" vs "With Rome"
- Visual proof beats text proof

**3. Risk Reversal Block (below pricing)**
A dedicated section addressing the 3 biggest objections:
- "Will WhatsApp ban my number?" → reassurance + policy compliance
- "30-day money-back guarantee" → prominent guarantee badge
- "5-minute setup or your money back" → conditional guarantee

**4. Final CTA Section (end of page)**
- Urgency element: "Launch offer — first 100 users get setup masterclass free"
- Social proof count: "Join 500+ coaches using Rome"
- Single button: "Start Free 7-Day Trial"

---

## NEW PAGES NEEDED

### /trial (standalone trial page)
A dedicated landing page for paid ad traffic — stripped down, conversion-focused:
- Hero: 1 headline, 1 subhead, 1 CTA
- 3-step proof (How it works)
- Pricing table (simplified)
- Testimonials
- Guarantee
- FAQ (3–4 questions)
No navigation, no footer links — single focus: start trial

### /demo (booking page)
For visitors who want a human demo before committing:
- Calendly embed or booking widget
- "Talk to a human first" framing
- Sets expectations for the call

### /compare (vs competitors)
For visitors doing comparison research:
- Rome vs Wati table
- Rome vs Typebot table
- Feature matrix, price comparison
- Rome wins summary

---

## DASHBOARD CONVERSION FLOWS

### Signup → WhatsApp Connected
**Current:** 3-step flow ends without connection
**Problem:** User signs up but never connects WhatsApp → Rome never runs → no value seen → no conversion

**Fix — Connection-first flow:**
1. Signup → immediately show QR code page
2. "Connect WhatsApp to start" — prominent, can't miss
3. After QR scan → success animation → "Rome is live!" → redirect to dashboard
4. If no QR scan in 10 minutes → email reminder with QR link

### Dashboard → First AI Response
**Current:** Agent config is separate from WhatsApp connect
**Problem:** User connects WhatsApp but doesn't configure agent → Rome replies with default response → bad experience

**Fix — Guided setup flow:**
1. After WhatsApp connects → "Now configure Rome" (inline, step-by-step)
2. Show live preview of how Rome will sound
3. "Send Rome a test message" — user tests on their own phone
4. Celebration screen when first AI response fires

### Trial → Paid Upgrade
**Current:** Generic upgrade prompt after 7 days
**Problem:** No compelling reason to upgrade, timing is arbitrary

**Fix — Event-based upgrade triggers:**
1. When Starter hits 80% limit → "You're at 400 messages! Upgrade for more."
2. When user tries to add 2nd number → "Pro lets you add 3 numbers. Upgrade?"
3. When a lead asks for calendar → "Calendar booking is a Pro feature. Upgrade?"
4. Day 7 report email → show ROI → "For ₹4,000 more, get 3x more capacity"

---

## FRICTION REDUCTION

### Remove These Friction Points
- ❌ "Configure your agent" before seeing Rome work → move to post-signup
- ❌ Credit card required for trial → remove immediately
- ❌ Long onboarding checklist → reduce to 3 steps max
- ❌ Email verification before WhatsApp connect → do in parallel
- ❌ Separate "settings" pages for agent config → inline on dashboard

### Add These Trust Elements
- ✅ WhatsApp "official partner" badge (if applicable)
- ✅ "Trusted by 500+ coaches" with real count
- ✅ "Setup in 5 minutes" timer display
- ✅ Live "agents active" counter (e.g., "1,247 agents running right now")
- ✅ Founder photo + bio on landing page

---

## MOBILE-FIRST CONSIDERATIONS

Rome's audience lives on mobile. WhatsApp IS mobile. Landing page must convert on phone.

- CTA button: full-width on mobile, fixed at bottom
- WhatsApp connect: prominent above the fold on mobile
- Chat history: swipeable on mobile, not table layout
- Pricing: stacked cards, not side-by-side on mobile
- Sticky header with CTA always visible on scroll
