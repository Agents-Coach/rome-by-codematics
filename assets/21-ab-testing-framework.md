# A/B Testing Framework — Rome by Codematics
**Optimization Lead Output** | 2026-06-04

---

## THE ONE TEST THAT MOVES THE NEEDLE MOST

Before testing anything, know this: Rome's biggest bottleneck is **trial signups → WhatsApp connected → AI live**.

Every other metric (conversion rate, bounce rate, time on page) matters only if Rome is running for users.

**Primary conversion funnel:**
```
Landing Page → Signup → WhatsApp Connect → Agent Config → AI Live → Trial → Paid
   ↓            ↓            ↓                ↓              ↓         ↓
  10%         5%          30%              50%             70%       20%
```

The biggest drop is: **WhatsApp Connect** (70% of people who sign up never connect WhatsApp).

Test that first.

---

## PRIORITY TEST QUEUE

### TEST 1: WhatsApp Connect Rate (HIGHEST PRIORITY)
**Problem:** 70% of signups never connect WhatsApp → Rome never runs → no value seen → no conversion

**Hypothesis:** Showing the QR code immediately after signup (before email verification) will increase connect rate from 30% to 60%.

**Test:**
- **Control (A):** Signup → Email verification → Dashboard → Connect WhatsApp (QR shown in dashboard)
- **Variant (B):** Signup → Immediate QR scan page (before email) → Dashboard

**Winner metric:** % of signups who connect WhatsApp within 48 hours

**Sample size needed:** ~200 signups per variant (stat sig at 95%)

**Expected lift:** +50–100% in connect rate

---

### TEST 2: Hero Headline
**Problem:** Hero headline doesn't trigger enough emotional resonance for cold traffic

**Hypothesis:** Pain-driven headline ("I missed a ₹50,000 client") outperforms feature-driven headline ("AI Sales Rep on WhatsApp")

**Test:**
- **Control (A):** "Your AI Sales Rep. Works 24/7. Runs on WhatsApp."
- **Variant (B):** "I missed a ₹50,000 client because I was sleeping."
- **Variant (C):** "Stop answering the same WhatsApp message for the 50th time."

**Winner metric:** Landing page → Signup conversion rate

**Sample size needed:** ~500 visitors per variant

---

### TEST 3: CTA Button Copy
**Problem:** CTA "Start Free Trial" may not be compelling enough

**Test:**
- **Control (A):** "Start Free Trial"
- **Variant (B):** "Try Rome Free — 7 Days"
- **Variant (C):** "Connect WhatsApp in 5 Minutes"
- **Variant (D):** "See Rome Work (Free)"

**Winner metric:** CTA click-through rate from hero section

**Sample size needed:** ~1,000 visitors per variant

---

### TEST 4: Pricing Page — Monthly vs Annual Display
**Problem:** Monthly prices feel like ongoing commitment; annual feels like bigger upfront cost

**Test:**
- **Control (A):** Show monthly prices (₹4,000/month)
- **Variant (B):** Show annual prices as primary (₹40,000/year) with "Save 17%" badge
- **Variant (C):** Show both, annual as "Recommended"

**Winner metric:** Plan selection rate + checkout completion

---

### TEST 5: Social Proof Placement
**Problem:** Social proof may not be visible enough above the fold

**Test:**
- **Control (A):** Social proof bar below hero
- **Variant (B):** Social proof integrated into hero section (avatars + "500+ coaches")
- **Variant (C):** Video testimonial autoplay (muted) in hero

**Winner metric:** Time on page + signup rate

---

## TEST EXECUTION FRAMEWORK

### How to Run Tests
Use Vercel Edge Middleware or LaunchDarkly for feature flags:
```
/route-a → Original version
/route-b → Variant version
```

For landing page elements: use Google Optimize or Optimizely.

### Test Duration Formula
```
Sample size = (1.96 × √(2 × p × (1-p)) / MOE)²

Where:
p = baseline conversion rate
MOE = minimum detectable effect (typically 5–10%)
```

**Example:** Baseline 5%, MOE 20% → 1,472 visitors per variant

### Test Documentation Template
For each test, document:
```
Test Name: [What you're testing]
Started: [Date]
Ended: [Date]
Variants: [A: control, B: variant...]
Winner: [Which variant won]
Statistical Significance: [X%]
Lift: [+X%]
Action Taken: [What to implement]
```

---

## FUNNEL LEAK ANALYSIS

### Current Funnel Data (estimate, verify with GA4)

| Stage | Drop-off | Priority | Fix |
|-------|----------|----------|-----|
| Landing → Signup | 90% don't convert | 🔴 HIGH | Test headlines, CTA, social proof |
| Signup → WA Connect | 70% don't connect | 🔴 CRITICAL | Show QR immediately, email reminders |
| WA Connect → Config | 50% don't configure | 🟡 MEDIUM | Guided config wizard, inline prompts |
| Config → First Msg | 30% don't test | 🟡 MEDIUM | Test message prompt, celebration moment |
| Trial → Paid | 80% don't upgrade | 🟡 MEDIUM | Event-based upgrade triggers |
| Paid → Retained | 10% monthly churn | 🟢 LOW | Ongoing — track reasons |

### Biggest Lever: WhatsApp Connect Rate

If connect rate goes from 30% → 60%:
- 2x more users have Rome running
- 2x more users see value
- Estimated +30–50% increase in trial-to-paid conversion

**ROI of fixing connect rate:** 3–5x higher than any other optimization.

---

## MOBILE VS DESKTOP TESTS

Rome's audience is 70%+ mobile. Test specifically for mobile:

### Mobile Test: Sticky CTA Bar
**Test:**
- **Control (A):** Static CTA button in hero
- **Variant (B):** Sticky bottom bar on mobile with "Start Free Trial" + "Connect WhatsApp"

**Winner metric:** Mobile signup rate

### Mobile Test: WhatsApp Connect Flow
**Test:**
- **Control (A):** Show QR code on desktop-style page
- **Variant (B):** Send QR code via WhatsApp DM to user's own number (self-send)

**Winner metric:** WhatsApp connect rate on mobile specifically

---

## TEST CALENDAR (30-DAY SPRINT)

| Week | Test | Priority | Status |
|------|------|----------|--------|
| Week 1 | WhatsApp Connect Flow (QR immediately) | 🔴 CRITICAL | Deploy |
| Week 1 | Hero Headline A/B | 🟡 HIGH | Launch |
| Week 2 | Analyze Week 1 results | — | Review |
| Week 2 | CTA Button Copy test | 🟡 HIGH | Launch |
| Week 3 | Analyze Week 2 results | — | Review |
| Week 3 | Pricing display test | 🟡 HIGH | Launch |
| Week 4 | Analyze all results | — | Review + implement winners |

---

## WHAT NOT TO TEST

Don't waste time A/B testing:
- ❌ Font sizes (marginal impact)
- ❌ Exact color shades (negligible impact)
- ❌ Minor copy changes without hypothesis (random, not strategic)
- ❌ Multiple tests at once without proper traffic (statistical noise)

**Focus 80% of testing energy on:**
1. WhatsApp Connect Rate
2. Hero Headline
3. CTA Copy
