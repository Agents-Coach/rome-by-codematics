# Agent Operations Playbook — Rome by Codematics
**Agent Lead Output** | 2026-06-04

---

## PURPOSE

This playbook defines the human-vs-agent boundaries, operational workflows, and agentization roadmap for Rome by Codematics.

Goal: Build Rome into an autonomous operating system where Rome manages Rome — not just the WhatsApp AI agent, but the business operations around it.

---

## PART 1: WORKFLOW ARCHITECTURE

### Human-Owned Work (what Aby does)
- Strategic decisions (pricing, positioning, new features)
- Human sales calls (demos, enterprise deals)
- Client onboarding for Agency tier
- Funding and financials
- Partnership decisions
- Content final approval (brand voice)
- Crisis management

### Agent-Owned Work (what Rome's AI workforce does)
- Answering WhatsApp messages (Rome AI agent)
- Qualifying leads (Rome AI agent)
- Sending booking links (Rome AI agent)
- Following up on trial signups (email agent)
- Managing support tickets (support agent)
- Updating content on website (content agent)
- Posting on social media (social agent)
- Reporting on metrics (reporting agent)

---

## PART 2: ROME'S AI WORKFORCE (12-MONTH ROADMAP)

### Phase 1: MVP Launch (Month 1)
**Rome Core Agent** (already built)
- Receives WhatsApp messages via Evolution API webhook
- Calls Claude via Codemax API
- Sends responses back via Evolution API
- Stores conversations in PostgreSQL

**Rome Bridge API** (already built)
- REST API for frontend
- Agent configuration CRUD
- Conversation history
- Usage tracking

**What Aby does manually:**
- New user onboarding emails
- Stripe billing
- Support requests
- Content posting

---

### Phase 2: Automation Layer (Month 2–3)

**New Agent 1: Onboarding Agent**
- Triggers on new signup
- Sends welcome email sequence
- Tracks WhatsApp connection status
- Follows up on Day 1 if not connected
- Escalates to Aby if stuck

**New Agent 2: Billing Agent**
- Monitors Stripe webhooks
- Activates/deactivates accounts based on payment
- Sends renewal reminders (Day 25, Day 28)
- Handles failed payment retry flow
- Generates invoices

**New Agent 3: Support Agent**
- Receives support emails/DMs
- Answers FAQ questions (using Rome's FAQ knowledge base)
- Creates support tickets for complex issues
- Escalates to Aby for refunds, technical issues

### Phase 3: Growth Layer (Month 4–6)

**New Agent 4: Content Agent**
- Publishes blog posts on schedule
- Posts to LinkedIn/Twitter on calendar
- Monitors comments and responds
- Reports on content performance

**New Agent 5: Lead Follow-up Agent**
- Follows up with trial users on Day 3, 5, 7
- Sends upgrade prompts based on usage triggers
- Personalizes follow-up based on usage data
- Escalates hot leads to Aby for human call

**New Agent 6: Analytics Agent**
- Daily report: messages handled, leads captured, trial signups
- Weekly report: conversion rates, revenue, churn
- Monthly report: growth trends, cohort analysis
- Alerts Aby on anomalies (spikes, drops)

### Phase 4: Scale Layer (Month 7–12)

**New Agent 7: Acquisition Agent**
- Identifies high-intent traffic sources
- Optimizes ad spend recommendations
- A/B tests landing page variations
- Reports on CAC and LTV

**New Agent 8: Retention Agent**
- Monitors user engagement
- Identifies churn risk (no WhatsApp connect, low usage)
- Triggers re-engagement sequences
- Manages win-back campaigns for churned users

**New Agent 9: Partnership Agent**
- Identifies potential partnership opportunities (coaches, communities)
- Drafts outreach messages
- Tracks partnership pipeline
- Schedules follow-ups

---

## PART 3: OPERATIONS WORKFLOWS

### Workflow 1: New User → Rome Running

```
User signs up
  ↓
[Onboarding Agent] sends Email 1 (welcome)
  ↓
User scans QR → WhatsApp connects
  ↓
[Onboarding Agent] sends Email 3 (Rome is live)
  ↓
[Billing Agent] starts 7-day trial tracking
  ↓
User configures agent (self-serve in dashboard)
  ↓
Day 3: [Lead Follow-up Agent] sends Email 4
Day 5: [Lead Follow-up Agent] sends Email 5
Day 7: [Lead Follow-up Agent] sends Email 6 + upgrade prompt
  ↓
Trial ends → [Billing Agent] prompts upgrade
  ↓
Payment → [Billing Agent] activates account
  OR
No payment → [Billing Agent] pauses account, sends exit email
```

### Workflow 2: Lead Capture → Human Handoff

```
Lead messages WhatsApp
  ↓
Rome AI Agent responds in <3 seconds
  ↓
Lead qualifies (asked price, expressed interest)
  ↓
Rome sends Calendly link
  ↓
Lead books call OR continues conversation
  ↓
Lead asks for human / Rome triggers handoff keyword
  ↓
[Support Agent] creates ticket
  ↓
Aby notified: "Hot lead wants to talk — [link]"
  ↓
Aby books call with Calendly (already linked)
  ↓
Aby closes deal → [Billing Agent] creates account
```

### Workflow 3: Usage Alert → Upgrade Trigger

```
[Billing Agent] tracks message usage daily
  ↓
Starter hits 400/500 messages (80%)
  ↓
[Lead Follow-up Agent] sends upgrade prompt:
  "You're at 80% of your monthly messages. Upgrade to Pro 
   for 3x more capacity and calendar booking."
  ↓
User upgrades OR ignores
  ↓
Starter hits 500/500 messages (100%)
  ↓
[Billing Agent] pauses AI responses, sends hard limit email
  ↓
User must upgrade or wait for reset
```

---

## PART 4: METRICS DASHBOARD

### Daily Metrics (tracked by Analytics Agent)
- New signups
- WhatsApp connections
- Messages handled by Rome
- Leads captured
- Calls booked
- Trial conversions

### Weekly Metrics (Analytics Agent report)
- Trial-to-paid conversion rate
- Lead-to-call rate
- Revenue
- Churn rate
- Net new MRR

### Monthly Metrics (Aby reviews)
- LTV (lifetime value)
- CAC (customer acquisition cost)
- Rome NPS score
- Top objections raised
- Feature requests

---

## PART 5: ESCALATION RULES

### When to Escalate to Aby (human)
1. Refund requests
2. WhatsApp ban/technical issue
3. Enterprise/Agency tier inquiries
4. Negative reviews or public complaints
5. Press/media inquiries
6. Partnership proposals
7. Legal/compliance questions

### When Rome Handles It Alone
1. Answering WhatsApp messages (Rome AI Agent)
2. FAQ questions (Support Agent)
3. Trial follow-ups (Lead Follow-up Agent)
4. Content posting (Content Agent)
5. Billing reminders (Billing Agent)
6. Analytics reporting (Analytics Agent)
7. Social media posting (Content Agent)

---

## PART 6: AGENT BUILD PRIORITY

| Priority | Agent | Complexity | Business Impact | Build First? |
|----------|-------|-----------|----------------|--------------|
| 1 | Rome Core AI Agent | Medium | HIGH | ✅ Already built |
| 2 | Billing Agent | Medium | HIGH | Month 2 |
| 3 | Onboarding Agent | Low | MEDIUM | Month 2 |
| 4 | Support Agent | Medium | MEDIUM | Month 2 |
| 5 | Lead Follow-up Agent | Low | MEDIUM | Month 3 |
| 6 | Analytics Agent | Low | MEDIUM | Month 3 |
| 7 | Content Agent | Medium | LOW | Month 4 |
| 8 | Retention Agent | Medium | MEDIUM | Month 5 |
| 9 | Acquisition Agent | High | MEDIUM | Month 6 |
| 10 | Partnership Agent | Medium | LOW | Month 7+ |
