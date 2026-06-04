"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Clock, Zap, Star } from "lucide-react";

const CHANGELOG = [
  {
    version: "v1.0.0",
    date: "June 2026",
    type: "major",
    title: "Rome Launch",
    badge: "🏛️",
    changes: [
      "Rome AI Sales Agent — full launch",
      "WhatsApp Business connection via QR scan",
      "Claude-powered AI responses",
      "Agent configuration (name, offer, FAQs, objections)",
      "Conversation history and analytics",
      "Three pricing tiers: Starter, Pro, Agency",
      "7-day free trial",
      "30-day money-back guarantee",
    ],
  },
  {
    version: "v1.1.0",
    date: "Q3 2026 (Planned)",
    type: "planned",
    title: "Calendar Integration",
    badge: "📅",
    changes: [
      "Calendly / calendar integration (Pro+)",
      "Automatic booking link delivery",
      "Calendar booking analytics",
    ],
  },
  {
    version: "v1.2.0",
    date: "Q3 2026 (Planned)",
    type: "planned",
    title: "Human Handoff",
    badge: "👤",
    changes: [
      "Chatwoot integration for human handoff",
      "Escalation keywords (e.g., 'talk to human')",
      "Team inbox for Agency tier",
    ],
  },
  {
    version: "v2.0.0",
    date: "Q4 2026 (Planned)",
    type: "planned",
    title: "Multi-Language Support",
    badge: "🌍",
    changes: [
      "Hindi language support",
      "WhatsApp Business API (cloud) option",
      "Agency dashboard (multi-client management)",
      "White-label dashboard",
      "API access (developer tier)",
    ],
  },
];

const ROADMAP = [
  {
    quarter: "Q3 2026",
    color: "#10b981",
    items: [
      { text: "Calendly integration", status: "in_progress" },
      { text: "Human handoff via Chatwoot", status: "in_progress" },
      { text: "Email support → Priority Slack support", status: "planned" },
      { text: "ROI analytics dashboard", status: "planned" },
    ],
  },
  {
    quarter: "Q4 2026",
    color: "#3b82f6",
    items: [
      { text: "Multi-language (Hindi)", status: "planned" },
      { text: "WhatsApp Cloud API option", status: "planned" },
      { text: "Agency multi-client dashboard", status: "planned" },
      { text: "White-label mode", status: "planned" },
    ],
  },
  {
    quarter: "2027",
    color: "#8b5cf6",
    items: [
      { text: "Rome mobile app", status: "planned" },
      { text: "SMS integration (fallback)", status: "planned" },
      { text: "AI training on your conversations", status: "planned" },
      { text: "Rome Academy (training)", status: "planned" },
    ],
  },
];

export default function ChangelogPage() {
  const [tab, setTab] = useState<"changelog" | "roadmap">("changelog");

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Header */}
      <div className="bg-[#0f0f11] border-b border-[#27272a]">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-[#10b981]" />
          </div>
          <h1 className="text-3xl font-bold text-[#fafafa] mb-2">Rome Changelog & Roadmap</h1>
          <p className="text-sm text-[#71717a]">What we've built, what's coming next.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Tabs */}
        <div className="flex items-center gap-1 mb-10">
          {[
            { id: "changelog" as const, label: "Changelog" },
            { id: "roadmap" as const, label: "Roadmap" },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-[#10b981] text-black"
                  : "text-[#71717a] hover:text-[#fafafa] hover:bg-[#18181b]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Changelog */}
        {tab === "changelog" && (
          <div className="space-y-8">
            {CHANGELOG.map((release, i) => (
              <div key={release.version} className={`${i > 0 ? "border-t border-[#27272a] pt-8" : ""}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{release.badge}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#fafafa]">{release.version}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider ${
                        release.type === "major"
                          ? "bg-[#10b981]/15 text-[#10b981]"
                          : "bg-[#3b82f6]/15 text-[#3b82f6]"
                      }`}>
                        {release.type === "major" ? "Current" : "Planned"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3 h-3 text-[#52525b]" />
                      <span className="text-xs text-[#52525b]">{release.date}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-[#fafafa] mb-3">{release.title}</h3>

                <ul className="space-y-2">
                  {release.changes.map(change => (
                    <li key={change} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#a1a1aa]">{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Roadmap */}
        {tab === "roadmap" && (
          <div className="space-y-8">
            {ROADMAP.map((quarter, i) => (
              <div key={quarter.quarter} className={i > 0 ? "border-t border-[#27272a] pt-8" : ""}>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: quarter.color }}
                  />
                  <h2 className="text-lg font-bold text-[#fafafa]">{quarter.quarter}</h2>
                </div>

                <div className="space-y-3">
                  {quarter.items.map(item => (
                    <div
                      key={item.text}
                      className="flex items-center justify-between bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-3"
                    >
                      <span className="text-sm text-[#a1a1aa]">{item.text}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase ${
                        item.status === "in_progress"
                          ? "bg-[#f59e0b]/15 text-[#f59e0b]"
                          : "bg-[#3f3f46] text-[#71717a]"
                      }`}>
                        {item.status === "in_progress" ? "In Progress" : "Planned"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Request feature */}
            <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 mt-8">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-[#fafafa] mb-1">Missing something?</h3>
                  <p className="text-xs text-[#71717a] mb-3">
                    Have a feature request? We read every one.
                  </p>
                  <a
                    href="mailto:feature@codematics.ai?subject=Rome Feature Request"
                    className="text-xs text-[#10b981] hover:underline font-medium"
                  >
                    Send us a feature request →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
