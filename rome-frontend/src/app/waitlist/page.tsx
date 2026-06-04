"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, MessageCircle, Zap, Clock } from "lucide-react";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 pt-20 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#10b981]/10 border border-[#10b981]/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          <span className="text-xs font-medium text-[#10b981]">Coming Soon — Join the Waitlist</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#fafafa] leading-tight mb-6">
          Your AI Sales Rep.
          <br />
          <span className="gradient-text">Works 24/7.</span>
          <br />
          Runs on WhatsApp.
        </h1>

        <p className="text-lg text-[#a1a1aa] max-w-xl mx-auto mb-10 leading-relaxed">
          Rome handles every WhatsApp message — qualifying leads, answering questions, booking calls.
          While you sleep. While you coach. While you're busy.
        </p>

        {/* Waitlist form */}
        {submitted ? (
          <div className="max-w-md mx-auto bg-[#18181b] border border-[#10b981]/30 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#10b981]/15 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#10b981]" />
            </div>
            <h2 className="text-xl font-bold text-[#fafafa] mb-2">You're on the list! 🎉</h2>
            <p className="text-sm text-[#71717a]">
              We'll email you when Rome goes live. First 100 get{" "}
              <span className="text-[#10b981] font-semibold">50% off for life.</span>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                required
                className="input-field flex-1"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#10b981] hover:bg-[#34d399] disabled:opacity-50 text-black font-bold text-sm px-6 py-3 rounded-xl transition-colors shrink-0"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  "Join Waitlist"
                )}
              </button>
            </div>
            <p className="text-xs text-[#52525b] mt-3">
              No spam. Unsubscribe anytime. We email once when Rome launches.
            </p>
          </form>
        )}
      </div>

      {/* Social proof */}
      <div className="border-y border-[#27272a] bg-[#0f0f11] py-8 mb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { value: "1,247", label: "Coaches on the waitlist" },
              { value: "<3 sec", label: "Average AI response time" },
              { value: "50%", label: "Discount for first 100" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-[#fafafa]">{value}</div>
                <div className="text-xs text-[#71717a]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#fafafa] mb-3">Rome in 60 seconds</h2>
          <p className="text-sm text-[#71717a]">This is what Rome does for you. Every day.</p>
        </div>

        <div className="space-y-4 max-w-lg mx-auto">
          {[
            { icon: MessageCircle, title: "Message arrives at 2 AM", desc: "A hot lead messages your WhatsApp at 2 AM asking about your coaching program." },
            { icon: Zap, title: "Rome replies in 3 seconds", desc: "Rome reads the message, understands the context, and responds with your exact pricing and details." },
            { icon: Clock, title: "Lead qualifies themselves", desc: "Rome asks qualification questions. Lead answers. Rome identifies them as hot." },
            { icon: CheckCircle, title: "Call booked automatically", desc: "Rome sends your Calendly link. Lead books. You wake up to a confirmed call." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4 bg-[#18181b] border border-[#27272a] rounded-xl p-5">
              <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#10b981]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#fafafa] mb-1">{title}</div>
                <div className="text-xs text-[#71717a] leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing preview */}
      <div className="border-t border-[#27272a] bg-[#0f0f11] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#fafafa] mb-3">Launch pricing</h2>
            <p className="text-sm text-[#71717a]">First 100 waitlist members get 50% off — for life.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              {
                name: "Starter",
                price: "₹2,000/mo",
                orig: "₹4,000/mo",
                desc: "For solo coaches",
                features: ["1 WhatsApp number", "500 AI responses", "Basic analytics"],
              },
              {
                name: "Pro",
                price: "₹4,000/mo",
                orig: "₹8,000/mo",
                desc: "Most popular",
                highlight: true,
                features: ["3 WhatsApp numbers", "2,000 AI responses", "Calendar booking", "Lead analytics"],
              },
              {
                name: "Agency",
                price: "₹8,000/mo",
                orig: "₹16,000/mo",
                desc: "For coach networks",
                features: ["10 WhatsApp numbers", "10,000 AI responses", "Human handoff", "Priority support"],
              },
            ].map(plan => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 ${
                  plan.highlight
                    ? "bg-[#18181b] border-2 border-[#10b981] shadow-[0_0_40px_rgba(16,185,129,0.08)]"
                    : "bg-[#18181b] border border-[#27272a]"
                }`}
              >
                {plan.highlight && (
                  <div className="text-[10px] font-semibold text-[#10b981] uppercase tracking-wider mb-3">
                    Most Popular
                  </div>
                )}
                <div className="text-sm font-medium text-[#71717a] mb-1">{plan.name}</div>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-3xl font-bold text-[#fafafa]">{plan.price}</span>
                  <span className="text-[#52525b] text-sm line-through mb-1">{plan.orig}</span>
                </div>
                <div className="text-xs text-[#52525b] mb-4">{plan.desc}</div>
                <ul className="space-y-2">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[#71717a]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-16 text-center">
        <p className="text-sm text-[#71717a] mb-4">Ready to join?</p>
        {submitted ? (
          <p className="text-[#10b981] font-medium">You're on the list! We'll be in touch soon.</p>
        ) : (
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#34d399] text-black font-bold text-sm px-8 py-3 rounded-xl transition-colors"
          >
            Join the Waitlist
          </a>
        )}
      </div>
    </div>
  );
}
