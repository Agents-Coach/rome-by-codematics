"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { MessageCircle, Zap, BarChart2, Calendar, Shield, Headphones, ChevronDown, Check, Star } from "lucide-react";

// ─── Scroll animation hook ────────────────────────────────────

function useFadeUp(ref: React.RefObject<Element | null>, delay = 0) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current as HTMLElement;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { rootMargin: "-60px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, delay]);
}

// ─── Section wrapper ─────────────────────────────────────────

function Section({ children, className = "", id, ref }: { children: React.ReactNode; className?: string; id?: string; ref?: React.RefObject<HTMLElement | null> }) {
  return (
    <section ref={ref as any} id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">{children}</div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-4 bg-[#10b981] rounded-full" />
      <span className="text-xs font-semibold tracking-widest uppercase text-[#10b981]">
        {children}
      </span>
    </div>
  );
}

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#fafafa] leading-tight mb-4 ${className}`}
    >
      {children}
    </h2>
  );
}

// ─── Navbar ─────────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#27272a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#10b981] flex items-center justify-center">
            <span className="text-black font-bold text-sm">R</span>
          </div>
          <span className="text-[#fafafa] font-bold text-lg">Rome</span>
          <span className="text-[#52525b] text-sm font-medium ml-1">by Codematics</span>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/pricing"
            className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors hidden sm:block"
          >
            Pricing
          </Link>
          <Link
            href="/roi-calculator"
            className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors hidden sm:block"
          >
            ROI Calculator
          </Link>
          <Link
            href="/login"
            className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors hidden sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 bg-[#10b981] hover:bg-[#34d399] text-black font-semibold text-sm px-5 py-2 rounded-lg transition-colors"
          >
            Start Free Trial
            <ChevronDown className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────

function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useFadeUp(badgeRef, 0);
  useFadeUp(h1Ref, 100);
  useFadeUp(subRef, 200);
  useFadeUp(ctaRef, 300);

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#10b981] opacity-[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
        {/* Badge */}
        <div ref={badgeRef} className="fade-up mb-6">
          <span className="badge">
            <Zap className="w-3 h-3" />
            AI-Powered Sales on WhatsApp
          </span>
        </div>

        {/* H1 */}
        <h1
          ref={h1Ref}
          className="fade-up text-5xl md:text-6xl lg:text-7xl font-bold text-[#fafafa] leading-[1.05] tracking-tight mb-6"
        >
          Your AI Sales Rep.{" "}
          <span className="gradient-text">Works 24/7.</span>
          <br />
          Runs on WhatsApp.
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="fade-up text-lg md:text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Connect your WhatsApp number in 5 minutes. Configure your offer once.
          Rome handles every message — qualifying leads, answering questions,
          booking calls — while you sleep.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="fade-up flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#34d399] text-black font-bold text-base px-8 py-4 rounded-xl transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.35)]"
          >
            Start 7-Day Free Trial
          </Link>
          <Link
            href="/roi-calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[#a1a1aa] hover:text-[#fafafa] font-medium text-base px-8 py-4 rounded-xl border border-[#3f3f46] hover:border-[#52525b] transition-all"
          >
            ROI Calculator
          </Link>
          <Link
            href="/compare"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[#a1a1aa] hover:text-[#fafafa] font-medium text-base px-8 py-4 rounded-xl border border-[#3f3f46] hover:border-[#52525b] transition-all"
          >
            Rome vs Wati
          </Link>
        </div>

        {/* Social proof */}
        <div className="fade-up mt-10 flex items-center justify-center gap-3 text-sm text-[#71717a]">
          <div className="flex -space-x-2">
            {["SM", "AK", "RP", "JT", "ML"].map((initials, i) => (
              <div
                key={initials}
                className="w-7 h-7 rounded-full border-2 border-[#09090b] bg-[#27272a] flex items-center justify-center text-[10px] font-bold text-[#a1a1aa]"
              >
                {initials}
              </div>
            ))}
          </div>
          <span>
            Trusted by <span className="text-[#fafafa] font-semibold">500+</span> coaches & founders
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Stats band ───────────────────────────────────────────────

function StatsBand() {
  return (
    <div className="border-y border-[#27272a] bg-[#0f0f11]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { value: "500K+", label: "Messages handled" },
          { value: "<3 min", label: "Avg response time" },
          { value: "98.7%", label: "Lead capture rate" },
          { value: "4.9★", label: "User rating" },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#fafafa] mb-1">{value}</div>
            <div className="text-sm text-[#71717a]">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── How it works ─────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <MessageCircle className="w-6 h-6 text-[#10b981]" />,
      title: "Connect WhatsApp",
      desc: "Scan a QR code. Link your existing WhatsApp Business number in under 5 minutes. No new app needed.",
    },
    {
      num: "02",
      icon: <Zap className="w-6 h-6 text-[#10b981]" />,
      title: "Configure Your Agent",
      desc: "Tell Rome who you are, what you sell, your pricing, FAQs, and how to handle objections. One-time setup.",
    },
    {
      num: "03",
      icon: <Headphones className="w-6 h-6 text-[#10b981]" />,
      title: "Rome Handles Everything",
      desc: "Inbound messages hit Claude. Rome replies instantly with your configured personality. Hot leads get your calendar link.",
    },
  ];

  return (
    <Section id="how-it-works" className="bg-[#0f0f11]">
      <div className="fade-up">
        <div className="text-center mb-16">
          <SectionLabel>How it works</SectionLabel>
          <H2>Three steps. Five minutes.<br />Then Rome runs 24/7.</H2>
          <p className="text-[#71717a] mt-4 text-lg max-w-xl mx-auto">
            No coding. No chatbot flow builder. No 40-page setup guide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[#27272a] rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <div key={step.num} className="bg-[#09090b] p-8 md:p-10 relative">
              <div className="text-6xl font-black text-[#18181b] select-none mb-4">{step.num}</div>
              <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-[#fafafa] mb-2">{step.title}</h3>
              <p className="text-sm text-[#71717a] leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-px -translate-y-1/2 w-4 h-4 border-r-2 border-b-2 border-[#3f3f46] rotate-[-45deg]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Features ────────────────────────────────────────────────

function Features() {
  const features = [
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Real-Time AI Responses",
      desc: "Every inbound message gets a smart, in-character reply in under 3 seconds. No delay. No missed leads.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Your Voice, Your Words",
      desc: "Rome sounds like you — friendly, professional, or casual. Configure your tone, intro message, and personality.",
    },
    {
      icon: <BarChart2 className="w-5 h-5" />,
      title: "Lead Analytics",
      desc: "See every conversation, track message volume, and know exactly which leads Rome captured for you.",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Calendar Booking",
      desc: "When a lead is hot, Rome sends your Calendly link automatically. No manual follow-up.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Your Data, Your Server",
      desc: "Runs on your own VPS. WhatsApp conversations never leave your infrastructure. GDPR-friendly.",
    },
    {
      icon: <Headphones className="w-5 h-5" />,
      title: "Human Handoff",
      desc: "When Rome can't close, a human takes over via Chatwoot integration. Zero leads fall through.",
    },
  ];

  return (
    <Section>
      <div className="text-center mb-16">
        <SectionLabel>Features</SectionLabel>
        <H2>Everything a great<br />sales rep does. Automated.</H2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="group p-6 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] transition-all hover:shadow-xl hover:shadow-black/20"
          >
            <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 flex items-center justify-center mb-4 text-[#10b981]">
              {f.icon}
            </div>
            <h3 className="font-semibold text-[#fafafa] mb-2">{f.title}</h3>
            <p className="text-sm text-[#71717a] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── Testimonial ─────────────────────────────────────────────

function Testimonial() {
  return (
    <Section className="bg-[#0f0f11]">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-1 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#10b981] text-[#10b981]" />
          ))}
        </div>
        <blockquote className="text-xl md:text-2xl text-[#fafafa] font-medium leading-relaxed mb-8">
          "I was losing half my leads because I was sleeping or in meetings.
          Rome picks up every single message at 2 AM and books calls while I'm
          unconscious. I woke up to 4 booked calls last week."
        </blockquote>
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#27272a] flex items-center justify-center text-sm font-bold text-[#fafafa]">
            SK
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-[#fafafa]">Sneha Kapoor</div>
            <div className="text-xs text-[#71717a]">Executive Coach · Mumbai</div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$47",
      period: "/month",
      desc: "Perfect for individual coaches and freelancers starting out.",
      features: [
        "1 WhatsApp number",
        "500 AI messages/month",
        "Agent configuration",
        "Chat history",
        "Email support",
      ],
      cta: "Start Free Trial",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$97",
      period: "/month",
      desc: "For growing coaches who need more reach and calendar booking.",
      features: [
        "3 WhatsApp numbers",
        "2,000 AI messages/month",
        "Everything in Starter",
        "Calendar integration (Calendly)",
        "Lead analytics dashboard",
        "Priority support",
      ],
      cta: "Start Free Trial",
      highlight: true,
    },
    {
      name: "Agency",
      price: "$197",
      period: "/month",
      desc: "Run Rome for your clients. White-label ready.",
      features: [
        "10 WhatsApp numbers",
        "10,000 AI messages/month",
        "Everything in Pro",
        "Human handoff (Chatwoot)",
        "Custom agent training",
        "Dedicated support",
      ],
      cta: "Contact Us",
      highlight: false,
    },
  ];

  return (
    <Section>
      <div className="text-center mb-16">
        <SectionLabel>Pricing</SectionLabel>
        <H2>Simple pricing.<br />No surprises.</H2>
        <p className="text-[#71717a] mt-4 text-lg">7-day free trial on all plans. Cancel anytime.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-8 flex flex-col ${
              plan.highlight
                ? "bg-[#18181b] border-2 border-[#10b981] shadow-[0_0_60px_rgba(16,185,129,0.1)]"
                : "bg-[#18181b] border border-[#27272a]"
            }`}
          >
            {plan.highlight && (
              <div className="mb-4 -mt-2">
                <span className="badge">Most Popular</span>
              </div>
            )}
            <div className="text-sm font-semibold text-[#a1a1aa] mb-1">{plan.name}</div>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-bold text-[#fafafa]">{plan.price}</span>
              <span className="text-[#71717a] mb-1">{plan.period}</span>
            </div>
            <p className="text-sm text-[#71717a] mb-6">{plan.desc}</p>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[#a1a1aa]">
                  <Check className="w-4 h-4 text-[#10b981] mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className={`block text-center font-semibold text-sm px-6 py-3.5 rounded-xl transition-all ${
                plan.highlight
                  ? "bg-[#10b981] hover:bg-[#34d399] text-black"
                  : "bg-[#27272a] hover:bg-[#3f3f46] text-[#fafafa]"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────

function FAQ() {
  const faqs = [
    {
      q: "Do I need a WhatsApp Business account?",
      a: "Yes, Rome works with WhatsApp Business (free) or WhatsApp Business API. You connect your existing number — no new SIM or device needed.",
    },
    {
      q: "What happens when Rome can't answer a question?",
      a: "Rome is trained on your FAQs and objection map. For anything outside that, it says it will check and follow up. You can also set a 'talk to human' keyword that immediately flags the conversation for you.",
    },
    {
      q: "Will WhatsApp ban my number?",
      a: "Rome uses the official WhatsApp Business API and Baileys (web-based). Thousands of businesses run automation on WhatsApp. We follow Meta's policies and recommend using WhatsApp Business (not personal WhatsApp) to be fully compliant.",
    },
    {
      q: "How long does setup take?",
      a: "Connecting WhatsApp takes 5 minutes. Configuring your agent — your name, offer, pricing, FAQs — takes another 10. After that, Rome is live and running.",
    },
    {
      q: "Can I use Rome for my clients?",
      a: "Yes — the Agency plan gives you 10 instances so you can run Rome for your clients under their own WhatsApp numbers. Each client is completely isolated.",
    },
  ];

  return (
    <Section className="bg-[#0f0f11]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel>FAQ</SectionLabel>
          <H2>Questions people ask</H2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer p-6 text-[#fafafa] font-medium text-sm list-none">
                {faq.q}
                <ChevronDown className="w-4 h-4 text-[#71717a] shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-sm text-[#71717a] leading-relaxed border-t border-[#27272a] pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Final CTA ───────────────────────────────────────────────

function FinalCTA() {
  return (
    <Section>
      <div className="text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-[#10b981]/10 flex items-center justify-center mb-6 mx-auto">
          <MessageCircle className="w-8 h-8 text-[#10b981]" />
        </div>
        <H2 className="mb-4">
          Your best lead just<br />messaged you on WhatsApp.
        </H2>
        <p className="text-[#71717a] text-lg mb-10 leading-relaxed">
          Are you going to reply in 3 seconds — or in 12 hours?
          Rome replies in 3 seconds.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#34d399] text-black font-bold text-base px-10 py-4 rounded-xl transition-all hover:shadow-[0_0_50px_rgba(16,185,129,0.4)]"
        >
          Start Your Free 7-Day Trial
        </Link>
        <p className="mt-4 text-xs text-[#52525b]">No credit card required. Cancel anytime.</p>
      </div>
    </Section>
  );
}

// ─── Footer ───────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-[#27272a] py-8">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-[#10b981] flex items-center justify-center">
          <span className="text-black font-bold text-xs">R</span>
        </div>
        <span className="text-[#fafafa] font-semibold text-sm">Rome by Codematics</span>
      </div>
      <div className="flex items-center gap-6 text-xs text-[#52525b]">
        <Link href="/pricing" className="hover:text-[#71717a] transition-colors">Pricing</Link>
        <Link href="/compare" className="hover:text-[#71717a] transition-colors">Compare</Link>
        <Link href="/roi-calculator" className="hover:text-[#71717a] transition-colors">ROI Calculator</Link>
        <Link href="/changelog" className="hover:text-[#71717a] transition-colors">Changelog</Link>
        <a href="#" className="hover:text-[#71717a] transition-colors">Privacy</a>
        <a href="#" className="hover:text-[#71717a] transition-colors">Terms</a>
        <span>© 2026 Codematics.ai</span>
      </div>
    </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <main className="min-h-full">
      <Navbar />
      <Hero />
      <StatsBand />
      <HowItWorks />
      <Features />
      <Testimonial />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
