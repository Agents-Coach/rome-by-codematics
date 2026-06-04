"use client";

import Link from "next/link";
import { CheckCircle, Calendar, MessageCircle, Sparkles } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center">
        {/* Hero */}
        <div className="mb-10">
          <div className="w-16 h-16 rounded-2xl bg-[#10b981]/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-[#10b981]" />
          </div>
          <h1 className="text-3xl font-bold text-[#fafafa] mb-3">
            Welcome to Rome! 🏛️
          </h1>
          <p className="text-base text-[#71717a] leading-relaxed">
            Your payment went through. Rome is activated and ready to run 24/7 on your WhatsApp.
          </p>
        </div>

        {/* What's included */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 mb-6 text-left">
          <h2 className="text-sm font-semibold text-[#fafafa] mb-4">Your Rome Pro plan includes</h2>
          <div className="space-y-3">
            {[
              { icon: MessageCircle, text: "3 WhatsApp Business numbers" },
              { icon: MessageCircle, text: "2,000 AI responses per month" },
              { icon: Calendar, text: "Calendly / calendar integration" },
              { icon: CheckCircle, text: "Lead analytics dashboard" },
              { icon: CheckCircle, text: "Priority email support" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-[#10b981] shrink-0" />
                <span className="text-sm text-[#a1a1aa]">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 mb-6 text-left">
          <h2 className="text-sm font-semibold text-[#fafafa] mb-4">Complete your setup</h2>
          <div className="space-y-2">
            {[
              { label: "Configure your AI agent", href: "/dashboard/agent", done: false },
              { label: "Connect WhatsApp Business", href: "/dashboard/connect", done: false },
              { label: "Send Rome a test message", href: "/dashboard/chat", done: false },
            ].map(({ label, href, done }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-[#27272a] last:border-0">
                <span className={`text-sm ${done ? "text-[#71717a] line-through" : "text-[#fafafa]"}`}>
                  {label}
                </span>
                {!done && (
                  <Link href={href} className="text-xs text-[#10b981] hover:underline">
                    Go →
                  </Link>
                )}
                {done && <CheckCircle className="w-4 h-4 text-[#10b981]" />}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#34d399] text-black font-bold text-sm px-8 py-4 rounded-xl transition-colors mb-4"
        >
          Go to Your Dashboard
        </Link>

        <p className="text-xs text-[#52525b]">
          Questions? Email us at <span className="text-[#71717a]">support@codematics.ai</span>
        </p>
      </div>
    </div>
  );
}
