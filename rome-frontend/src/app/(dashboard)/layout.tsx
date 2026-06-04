"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Bot,
  QrCode,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/agent", label: "AI Agent", icon: Bot },
  { href: "/dashboard/chat", label: "Conversations", icon: MessageSquare },
  { href: "/dashboard/connect", label: "Connect WA", icon: QrCode },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-[#09090b] flex">
      {/* ─── Sidebar ─── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-[#0f0f11] border-r border-[#27272a]
          flex flex-col transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-6 py-5 border-b border-[#27272a]">
          <div className="w-8 h-8 rounded-lg bg-[#10b981] flex items-center justify-center shrink-0">
            <span className="text-black font-bold text-sm">R</span>
          </div>
          <div>
            <div className="text-[#fafafa] font-bold text-sm leading-none">Rome</div>
            <div className="text-[10px] text-[#52525b] mt-0.5">by Codematics</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-150
                ${
                  isActive(href, exact)
                    ? "bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20"
                    : "text-[#71717a] hover:text-[#fafafa] hover:bg-[#18181b]"
                }
              `}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Plan badge */}
        <div className="px-4 py-3 border-t border-[#27272a]">
          <div className="rounded-lg bg-[#18181b] border border-[#27272a] p-3">
            <div className="text-xs text-[#71717a] mb-0.5">Current plan</div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#fafafa]">Starter</span>
              <button className="text-xs text-[#10b981] hover:underline">Upgrade</button>
            </div>
            <div className="mt-2 w-full bg-[#27272a] rounded-full h-1">
              <div className="bg-[#10b981] h-1 rounded-full" style={{ width: "34%" }} />
            </div>
            <div className="text-[10px] text-[#52525b] mt-1">167 / 500 messages</div>
          </div>
        </div>

        {/* User */}
        <div className="px-3 py-4 border-t border-[#27272a]">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#18181b] cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-[#27272a] flex items-center justify-center text-xs font-bold text-[#a1a1aa] shrink-0">
              AK
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-[#fafafa] truncate">Ankit Kumar</div>
              <div className="text-[10px] text-[#52525b] truncate">ankit@example.com</div>
            </div>
            <LogOut className="w-3.5 h-3.5 text-[#52525b] group-hover:text-[#ef4444] transition-colors" />
          </div>
        </div>
      </aside>

      {/* ─── Mobile overlay ─── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Main ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-[#27272a] bg-[#09090b] shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-[#a1a1aa] hover:text-[#fafafa]"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="text-sm text-[#71717a] hidden md:block">
            {NAV_ITEMS.find(i => isActive(i.href, i.exact))?.label || "Dashboard"}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-xs text-[#71717a]">Agent Active</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
