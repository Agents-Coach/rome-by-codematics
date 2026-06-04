"use client";

import { MessageSquare, Users, TrendingUp, Bot, ArrowRight } from "lucide-react";
import Link from "next/link";

const STATS = [
  { label: "Messages Today", value: "47", delta: "+12%", icon: MessageSquare, color: "#10b981" },
  { label: "New Conversations", value: "8", delta: "+3", icon: Users, color: "#3b82f6" },
  { label: "Lead Capture Rate", value: "94%", delta: "+2%", icon: TrendingUp, color: "#8b5cf6" },
  { label: "Agent Status", value: "Active", delta: "Online", icon: Bot, color: "#10b981" },
];

const RECENT = [
  { name: "Priya Sharma", number: "+91 98765 43210", last: "When does the course start?", time: "2m ago", unread: true },
  { name: "Rahul Mehta", number: "+91 99887 76655", last: "Is there a payment plan?", time: "14m ago", unread: true },
  { name: "Aisha Khan", number: "+91 87654 32109", last: "Thanks! Booked the call.", time: "1h ago", unread: false },
  { name: "Vikram Patel", number: "+91 90000 12345", last: "How is this different from others?", time: "2h ago", unread: false },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#fafafa]">Good morning, Ankit</h1>
        <p className="text-sm text-[#71717a] mt-1">
          Rome handled <span className="text-[#10b981] font-semibold">47 messages</span> while you slept.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 hover:border-[#3f3f46] transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${s.color}15` }}
              >
                <s.icon className="w-4.5 h-4.5" style={{ color: s.color }} />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#27272a] text-[#71717a]">
                {s.delta}
              </span>
            </div>
            <div className="text-2xl font-bold text-[#fafafa] mb-0.5">{s.value}</div>
            <div className="text-xs text-[#71717a]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Configure Agent", href: "/dashboard/agent", desc: "Update offer, FAQs, pricing" },
          { label: "View Conversations", href: "/dashboard/chat", desc: "See all leads & chat history" },
          { label: "Reconnect WhatsApp", href: "/dashboard/connect", desc: "Scan QR if disconnected" },
        ].map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="group flex items-center justify-between bg-[#18181b] border border-[#27272a] rounded-xl p-5 hover:border-[#10b981]/40 transition-all"
          >
            <div>
              <div className="font-semibold text-[#fafafa] text-sm mb-0.5">{a.label}</div>
              <div className="text-xs text-[#71717a]">{a.desc}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#3f3f46] group-hover:text-[#10b981] transition-colors" />
          </Link>
        ))}
      </div>

      {/* Recent conversations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[#fafafa]">Recent Conversations</h2>
          <Link href="/dashboard/chat" className="text-xs text-[#10b981] hover:underline">
            View all
          </Link>
        </div>
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden">
          {RECENT.map((c, i) => (
            <div
              key={c.number}
              className={`flex items-center gap-4 p-4 hover:bg-[#1f1f23] transition-colors cursor-pointer ${
                i < RECENT.length - 1 ? "border-b border-[#27272a]" : ""
              }`}
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-[#27272a] flex items-center justify-center text-sm font-bold text-[#a1a1aa] shrink-0">
                {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-medium text-[#fafafa]">{c.name}</span>
                  <span className="text-[10px] text-[#52525b]">{c.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#52525b]">{c.number}</span>
                  <span className="text-xs text-[#71717a] truncate">{c.last}</span>
                </div>
              </div>
              {c.unread && <div className="w-2 h-2 rounded-full bg-[#10b981] shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
