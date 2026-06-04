"use client";

import { useState } from "react";
import { Check, X, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    category: "Core Capabilities",
    items: [
      { name: "WhatsApp connection", rome: true, wati: true },
      { name: "AI-powered responses", rome: true, wati: false },
      { name: "Claude-powered intelligence", rome: true, wati: false },
      { name: "Lead qualification (automatic)", rome: true, wati: false },
      { name: "Calendar booking (automatic)", rome: true, wati: false },
      { name: "Objection handling", rome: true, wati: false },
      { name: "No chatbot flow builder needed", rome: true, wati: false },
    ],
  },
  {
    category: "Setup",
    items: [
      { name: "Setup time", rome: "10 min", wati: "30–60 min" },
      { name: "Technical skill required", rome: "None", wati: "Basic" },
      { name: "Chatbot building required", rome: false, wati: true },
      { name: "AI training needed", rome: "Describe your offer", wati: "Build flows" },
    ],
  },
  {
    category: "Pricing",
    items: [
      { name: "Entry price", rome: "₹4,000/mo", wati: "₹999/mo" },
      { name: "AI features included", rome: true, wati: false },
      { name: "Lead qualification included", rome: true, wati: false },
      { name: "Calendar booking included", rome: true, wati: false },
    ],
  },
  {
    category: "Use Case Fit",
    items: [
      { name: "Solo coaches (1 person)", rome: true, wati: false },
      { name: "Coaches with multiple programs", rome: true, wati: true },
      { name: "Teams with 3+ agents", rome: false, wati: true },
      { name: "Broadcast campaigns", rome: false, wati: true },
      { name: "AI-first sales automation", rome: true, wati: false },
    ],
  },
];

export default function ComparePage() {
  const [primary, setPrimary] = useState<"rome" | "wati">("rome");

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Header */}
      <div className="bg-[#0f0f11] border-b border-[#27272a] py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#fafafa] mb-3">
            Rome vs Wati
          </h1>
          <p className="text-sm text-[#71717a]">
            Compare WhatsApp automation tools for coaches and consultants
          </p>
        </div>
      </div>

      {/* Toggle */}
      <div className="sticky top-0 z-10 bg-[#09090b] border-b border-[#27272a] py-4">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2">
            <span className={`text-sm font-medium ${primary === "rome" ? "text-[#fafafa]" : "text-[#52525b]"}`}>
              Rome
            </span>
            <button
              onClick={() => setPrimary(p => p === "rome" ? "wati" : "rome")}
              className="relative w-12 h-6 rounded-full bg-[#27272a] transition-colors"
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                  primary === "rome" ? "left-0.5" : "left-[calc(100%-1.25rem-0.25rem)]"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${primary === "wati" ? "text-[#fafafa]" : "text-[#52525b]"}`}>
              Wati
            </span>
          </div>
        </div>
      </div>

      {/* Winner Banner */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className={`rounded-2xl p-6 border ${
          primary === "rome"
            ? "bg-[#10b981]/5 border-[#10b981]/30"
            : "bg-[#3b82f6]/5 border-[#3b82f6]/30"
        }`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              primary === "rome" ? "bg-[#10b981]/15" : "bg-[#3b82f6]/15"
            }`}>
              <span className={`text-xl font-black ${
                primary === "rome" ? "text-[#10b981]" : "text-[#3b82f6]"
              }`}>
                {primary === "rome" ? "R" : "W"}
              </span>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#fafafa] mb-1">
                {primary === "rome"
                  ? "Rome is best for solo coaches who want AI."
                  : "Wati is best for teams with multiple agents."}
              </h2>
              <p className="text-sm text-[#71717a]">
                {primary === "rome"
                  ? "No flow builder. No technical skills. Rome uses Claude AI to understand, qualify, and book — in 10 minutes."
                  : "Full team inbox. Broadcast campaigns. Good for businesses with multiple people handling WhatsApp."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="max-w-3xl mx-auto px-4 pb-16 space-y-8">
        {FEATURES.map(group => (
          <div key={group.category}>
            <h3 className="text-xs font-semibold text-[#52525b] uppercase tracking-widest mb-3">
              {group.category}
            </h3>
            <div className="bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden">
              {group.items.map((item, i) => (
                <div
                  key={item.name}
                  className={`flex items-center justify-between px-5 py-3.5 ${
                    i < group.items.length - 1 ? "border-b border-[#27272a]" : ""
                  }`}
                >
                  <span className="text-sm text-[#a1a1aa]">{item.name}</span>
                  <div className="flex items-center gap-3">
                    {typeof (item.rome as boolean | string) === "string" ? (
                      <>
                        <span className={`text-xs font-medium w-20 text-right ${
                          item.rome === "10 min" ? "text-[#10b981]" : "text-[#71717a]"
                        }`}>
                          {String(item.rome)}
                        </span>
                        <span className="text-xs text-[#71717a] w-20 text-right">{String(item.wati)}</span>
                        <div className="w-5 h-5" />
                        <div className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        <span className="text-xs text-[#71717a] w-20 text-right">
                          {item.rome === true ? "Rome" : item.rome === false ? "—" : String(item.rome)}
                        </span>
                        <span className="text-xs text-[#52525b] w-20 text-right">
                          {item.wati === true ? "Wati" : item.wati === false ? "—" : String(item.wati)}
                        </span>
                        {typeof item.rome === "boolean" && (
                          <div className={`w-5 h-5 rounded flex items-center justify-center ${
                            item.rome ? "bg-[#10b981]/15 text-[#10b981]" : "bg-[#27272a] text-[#52525b]"
                          }`}>
                            {item.rome ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          </div>
                        )}
                        {typeof item.wati === "boolean" && (
                          <div className={`w-5 h-5 rounded flex items-center justify-center ${
                            item.wati ? "bg-[#3b82f6]/15 text-[#3b82f6]" : "bg-[#27272a] text-[#52525b]"
                          }`}>
                            {item.wati ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <p className="text-sm text-[#71717a] mb-4">
            Want to see Rome in action?
          </p>
          <a
            href="/signup"
            className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#34d399] text-black font-bold text-sm px-8 py-3 rounded-xl transition-colors"
          >
            Try Rome Free for 7 Days
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-xs text-[#52525b] mt-2">No credit card required</p>
        </div>
      </div>
    </div>
  );
}
