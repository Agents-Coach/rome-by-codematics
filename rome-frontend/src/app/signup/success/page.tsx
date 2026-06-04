"use client";

import Link from "next/link";
import { CheckCircle, ArrowRight, MessageCircle, Zap } from "lucide-react";

export default function SignupSuccessPage() {
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        {/* Success animation */}
        <div className="mb-8">
          <div className="w-20 h-20 rounded-full bg-[#10b981]/10 border-2 border-[#10b981] flex items-center justify-center mx-auto mb-6 animate-[pulse_2s_ease-in-out_infinite]">
            <CheckCircle className="w-10 h-10 text-[#10b981]" />
          </div>
          <h1 className="text-2xl font-bold text-[#fafafa] mb-2">
            You're in! 🎉
          </h1>
          <p className="text-sm text-[#71717a]">
            Your Rome account is ready. Connect your WhatsApp to get started.
          </p>
        </div>

        {/* What's next */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 mb-6 text-left">
          <h2 className="text-sm font-semibold text-[#fafafa] mb-4">What happens next</h2>
          <div className="space-y-4">
            {[
              { step: "01", title: "Connect WhatsApp", desc: "Scan the QR code in your dashboard — takes 60 seconds." },
              { step: "02", title: "Configure Rome", desc: "Tell us what you sell, your price, and FAQs. Takes 10 minutes." },
              { step: "03", title: "Let Rome run", desc: "Rome handles every WhatsApp message — 24/7, in under 3 seconds." },
            ].map(item => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#10b981]/15 text-[#10b981] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <div className="text-sm font-medium text-[#fafafa]">{item.title}</div>
                  <div className="text-xs text-[#71717a]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/dashboard/connect"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#34d399] text-black font-bold text-sm py-4 rounded-xl transition-colors mb-3"
        >
          <MessageCircle className="w-4 h-4" />
          Connect WhatsApp Now
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/dashboard"
          className="block text-sm text-[#71717a] hover:text-[#a1a1aa] transition-colors"
        >
          Go to dashboard →
        </Link>

        {/* Social proof nudge */}
        <div className="mt-8 pt-6 border-t border-[#27272a]">
          <p className="text-xs text-[#52525b] mb-3">Rome is already working for coaches like you</p>
          <div className="flex items-center justify-center gap-3">
            {["PS", "AK", "RM", "NS", "VP"].map((initials, i) => (
              <div
                key={initials}
                className="w-8 h-8 rounded-full bg-[#27272a] flex items-center justify-center text-[10px] font-bold text-[#71717a]"
              >
                {initials}
              </div>
            ))}
            <span className="text-xs text-[#71717a]">+497 more</span>
          </div>
        </div>
      </div>
    </div>
  );
}
