"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Zap, ArrowRight, Shield } from "lucide-react";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 4700,
    priceDisplay: "$47",
    priceInr: "₹4,000",
    period: "/month",
    desc: "For solo coaches getting started with AI automation.",
    features: [
      "1 WhatsApp Business number",
      "500 AI responses per month",
      "AI agent configuration",
      "Chat history (90 days)",
      "Email support",
    ],
    notIncluded: [
      "Calendar integration",
      "Human handoff",
      "Additional WhatsApp numbers",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 9700,
    priceDisplay: "$97",
    priceInr: "₹8,000",
    period: "/month",
    desc: "For growing coaches who want leads booked automatically.",
    features: [
      "3 WhatsApp Business numbers",
      "2,000 AI responses per month",
      "Everything in Starter",
      "Calendly / calendar integration",
      "Lead analytics dashboard",
      "Conversation export",
      "Priority email support",
    ],
    notIncluded: [
      "Human handoff",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    id: "agency",
    name: "Agency",
    price: 19700,
    priceDisplay: "$197",
    priceInr: "₹16,000",
    period: "/month",
    desc: "For coach networks and agencies running Rome for clients.",
    features: [
      "10 WhatsApp Business numbers",
      "10,000 AI responses per month",
      "Everything in Pro",
      "Human handoff (Chatwoot)",
      "Custom agent training",
      "Dedicated Slack support",
      "White-label ready",
    ],
    notIncluded: [],
    cta: "Contact Us",
    highlight: false,
  },
];

const FAQS = [
  {
    q: "What's included in the free trial?",
    a: "7 days of full Pro access. Connect WhatsApp, configure your agent, and let Rome run. No credit card required.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes, anytime. Upgrade instantly adds more numbers and messages. Downgrade takes effect at the next billing cycle.",
  },
  {
    q: "What counts as an 'AI response'?",
    a: "Each reply Rome sends to an incoming WhatsApp message counts as one AI response. You can see your usage in the dashboard in real-time.",
  },
  {
    q: "What happens if I hit my message limit?",
    a: "You'll get a warning at 80% usage. At 100%, AI responses pause and leads get a 'please try again later' message. Upgrade to continue.",
  },
  {
    q: "Is there a money-back guarantee?",
    a: "Yes — 30 days, full refund, no questions asked. If Rome doesn't work for you, email us within 30 days for a full refund.",
  },
  {
    q: "Can I use Rome for my clients?",
    a: "Yes — the Agency plan gives you 10 separate instances so you can run Rome for multiple clients under their own WhatsApp numbers.",
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCheckout = async (planId: string) => {
    if (planId === "agency") {
      window.location.href = "mailto:sales@codematics.ai?subject=Rome Agency Plan Inquiry";
      return;
    }

    setLoading(planId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planId,
          email: "demo@example.com", // Replace with actual user email from auth
          userId: "demo-user-id",     // Replace with actual user ID from auth
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.redirect) {
        window.location.href = data.redirect;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Header */}
      <div className="bg-[#0f0f11] border-b border-[#27272a] py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#fafafa] mb-3">
            Simple pricing. No surprises.
          </h1>
          <p className="text-sm text-[#71717a]">
            Start free. Upgrade when Rome proves itself. Cancel anytime.
          </p>

          {/* Guarantee badge */}
          <div className="inline-flex items-center gap-2 mt-4 bg-[#10b981]/10 border border-[#10b981]/20 rounded-full px-4 py-1.5">
            <Shield className="w-3.5 h-3.5 text-[#10b981]" />
            <span className="text-xs text-[#10b981] font-medium">30-day money-back guarantee</span>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map(plan => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? "bg-[#18181b] border-2 border-[#10b981] shadow-[0_0_60px_rgba(16,185,129,0.1)]"
                  : "bg-[#18181b] border border-[#27272a]"
              }`}
            >
              {plan.highlight && (
                <div className="mb-4 -mt-2">
                  <span className="inline-flex items-center gap-1.5 bg-[#10b981]/10 border border-[#10b981]/20 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#10b981]">
                    <Zap className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-sm font-medium text-[#71717a] mb-1">{plan.name}</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-bold text-[#fafafa]">{plan.priceDisplay}</span>
                <span className="text-[#71717a] mb-1">{plan.period}</span>
              </div>
              <div className="text-xs text-[#52525b] mb-4">≈ {plan.priceInr}/month</div>
              <p className="text-sm text-[#71717a] mb-6">{plan.desc}</p>

              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={loading !== null}
                className={`w-full font-semibold text-sm py-3.5 rounded-xl transition-all mb-8 ${
                  plan.highlight
                    ? "bg-[#10b981] hover:bg-[#34d399] text-black"
                    : "bg-[#27272a] hover:bg-[#3f3f46] text-[#fafafa]"
                } disabled:opacity-50`}
              >
                {loading === plan.id ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>

              <div className="flex-1">
                <div className="text-xs font-semibold text-[#52525b] uppercase tracking-wider mb-3">What's included</div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#a1a1aa]">
                      <Check className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {plan.notIncluded.length > 0 && (
                  <>
                    <div className="text-xs font-semibold text-[#52525b] uppercase tracking-wider mb-3">Not included</div>
                    <ul className="space-y-2.5">
                      {plan.notIncluded.map(f => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-[#52525b]">
                          <span className="w-4 h-4 shrink-0 mt-0.5">—</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Annual discount note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#71717a]">
            Pay annually and save{" "}
            <span className="text-[#10b981] font-semibold">17%</span>
            {" "}— contact us for annual pricing.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="border-t border-[#27272a] bg-[#0f0f11] py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#fafafa] text-center mb-8">Frequently asked questions</h2>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 text-[#fafafa] font-medium text-sm list-none">
                  {faq.q}
                  <span className={`text-[#71717a] shrink-0 transition-transform group-open:rotate-45 ${openFaq === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-[#71717a] leading-relaxed border-t border-[#27272a] pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#71717a]">
              Still have questions?{" "}
              <a href="mailto:support@codematics.ai" className="text-[#10b981] hover:underline">
                Email us
              </a>
              {" "}— we reply within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
