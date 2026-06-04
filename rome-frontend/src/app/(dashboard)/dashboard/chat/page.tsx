"use client";

import { useState } from "react";
import { Search, Filter, MessageSquare } from "lucide-react";

const CONVERSATIONS = [
  { id: "1", name: "Priya Sharma", number: "+91 98765 43210", lastMsg: "When does the course start?", time: "2m ago", unread: 2, avatar: "PS" },
  { id: "2", name: "Rahul Mehta", number: "+91 99887 76655", lastMsg: "Is there a payment plan?", time: "14m ago", unread: 1, avatar: "RM" },
  { id: "3", name: "Aisha Khan", number: "+91 87654 32109", lastMsg: "Thanks! Booked the call.", time: "1h ago", unread: 0, avatar: "AK" },
  { id: "4", name: "Vikram Patel", number: "+91 90000 12345", lastMsg: "How is this different from others?", time: "2h ago", unread: 0, avatar: "VP" },
  { id: "5", name: "Neha Singh", number: "+91 81234 56789", lastMsg: "Can I talk to a human?", time: "3h ago", unread: 0, avatar: "NS" },
];

const MESSAGES = [
  { id: "1", role: "user", content: "Hi! I saw your coaching program online. Is this still available?", time: "10:32 AM" },
  { id: "2", role: "assistant", content: "Hi! 👋 Yes, absolutely! Our Executive Coaching Program is currently open for enrollment. What brings you here today?", time: "10:32 AM" },
  { id: "3", role: "user", content: "I want to improve my leadership skills. I'm a team lead at a tech company.", time: "10:33 AM" },
  { id: "4", role: "assistant", content: "That's great! The program is designed exactly for people in your position — mid-to-senior professionals looking to step into leadership. How big is your team?", time: "10:33 AM" },
  { id: "5", role: "user", content: "About 12 people. I've been a TL for 2 years now.", time: "10:34 AM" },
  { id: "6", role: "assistant", content: "Perfect fit. We work with a lot of tech leads in your exact situation. The program is 12 weeks — one session per week. Would you like to book a free discovery call so we can see if it's the right fit?", time: "10:35 AM" },
  { id: "7", role: "user", content: "Sure! When does the course start?", time: "10:35 AM" },
  { id: "8", role: "assistant", content: "The next cohort starts on the 15th. But first, let me send you a calendar link for a quick 20-minute discovery call — no commitment, just a conversation. 😊", time: "10:36 AM" },
];

export default function ChatPage() {
  const [selected, setSelected] = useState<string | null>("1");
  const [search, setSearch] = useState("");

  const filtered = CONVERSATIONS.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.number.includes(search)
  );

  const activeConv = CONVERSATIONS.find(c => c.id === selected);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-0 bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden">
      {/* ─── Left: conversation list ─── */}
      <div className="w-80 border-r border-[#27272a] flex flex-col shrink-0">
        {/* Search */}
        <div className="p-4 border-b border-[#27272a]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525b]" />
            <input
              className="input-field pl-9 py-2 text-sm"
              placeholder="Search conversations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-[#52525b]">
              <MessageSquare className="w-8 h-8 mb-2" />
              <p className="text-sm">No conversations yet</p>
            </div>
          ) : (
            filtered.map(c => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className={`w-full text-left p-4 border-b border-[#27272a] hover:bg-[#1f1f23] transition-colors ${
                  selected === c.id ? "bg-[#1f1f23]" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#27272a] flex items-center justify-center text-sm font-bold text-[#a1a1aa] shrink-0">
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-medium text-[#fafafa]">{c.name}</span>
                      <span className="text-[10px] text-[#52525b]">{c.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#71717a] truncate">{c.lastMsg}</span>
                      {c.unread > 0 && (
                        <span className="w-5 h-5 rounded-full bg-[#10b981] text-black text-[10px] font-bold flex items-center justify-center shrink-0">
                          {c.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ─── Right: chat view ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {selected ? (
          <>
            {/* Chat header */}
            <div className="flex items-center gap-3 p-4 border-b border-[#27272a]">
              <div className="w-10 h-10 rounded-full bg-[#27272a] flex items-center justify-center text-sm font-bold text-[#a1a1aa]">
                {activeConv?.avatar}
              </div>
              <div>
                <div className="text-sm font-semibold text-[#fafafa]">{activeConv?.name}</div>
                <div className="text-xs text-[#52525b]">{activeConv?.number}</div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {MESSAGES.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#10b981]/15 border border-[#10b981]/30 text-[#d4d4d8] rounded-tr-sm"
                        : "bg-[#27272a] text-[#d4d4d8] rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                    <div className={`text-[10px] mt-1 ${msg.role === "user" ? "text-[#10b981]/60" : "text-[#52525b]"}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input (read-only in MVP) */}
            <div className="p-4 border-t border-[#27272a]">
              <div className="flex items-center gap-3 bg-[#27272a] rounded-xl px-4 py-3">
                <div className="flex-1 text-sm text-[#52525b]">
                  🔒 Chat is AI-managed. Configure Rome in the Agent tab.
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-[#52525b]">
            <MessageSquare className="w-12 h-12 mb-3" />
            <p className="text-sm">Select a conversation to view</p>
          </div>
        )}
      </div>
    </div>
  );
}
