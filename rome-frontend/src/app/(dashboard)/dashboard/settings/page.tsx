"use client";

import { useState } from "react";
import { User, Bell, CreditCard, Shield, Trash2, LogOut } from "lucide-react";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-xl font-bold text-[#fafafa]">Settings</h1>

      {/* Profile */}
      <SettingsCard icon={User} title="Profile" desc="Your account information">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#27272a] flex items-center justify-center text-xl font-bold text-[#a1a1aa]">
              AK
            </div>
            <div>
              <div className="text-sm font-semibold text-[#fafafa]">Ankit Kumar</div>
              <div className="text-xs text-[#71717a]">ankit@example.com</div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[#71717a] mb-1.5 block">Full Name</label>
              <input className="input-field" defaultValue="Ankit Kumar" />
            </div>
            <div>
              <label className="text-xs font-medium text-[#71717a] mb-1.5 block">Email</label>
              <input className="input-field" type="email" defaultValue="ankit@example.com" />
            </div>
          </div>
        </div>
      </SettingsCard>

      {/* Notifications */}
      <SettingsCard icon={Bell} title="Notifications" desc="How Rome keeps you updated">
        <div className="space-y-3">
          <ToggleRow
            label="Email notifications"
            desc="Get daily summary of leads captured"
            checked={emailNotifications}
            onChange={setEmailNotifications}
          />
          <ToggleRow
            label="New lead alerts"
            desc="Instant email when Rome captures a qualified lead"
            checked={false}
            onChange={() => {}}
          />
          <ToggleRow
            label="Disconnection alerts"
            desc="SMS when WhatsApp disconnects"
            checked={true}
            onChange={() => {}}
          />
        </div>
      </SettingsCard>

      {/* Billing */}
      <SettingsCard icon={CreditCard} title="Billing & Plan" desc="Manage your subscription">
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-[#0f0f11] rounded-xl p-4">
            <div>
              <div className="text-sm font-semibold text-[#fafafa]">Starter Plan</div>
              <div className="text-xs text-[#71717a]">$47/month · 500 messages</div>
            </div>
            <button className="text-xs text-[#10b981] hover:underline font-medium">Upgrade</button>
          </div>
          <div className="text-xs text-[#71717a]">
            Next billing date: July 4, 2026 · Card ending in 4242
          </div>
        </div>
      </SettingsCard>

      {/* Danger zone */}
      <SettingsCard icon={Shield} title="Security" desc="Password and account security">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-[#71717a] mb-1.5 block">New Password</label>
            <input className="input-field" type="password" placeholder="••••••••" />
          </div>
          <button className="text-sm text-[#10b981] hover:underline font-medium">
            Save Password
          </button>
        </div>
      </SettingsCard>

      {/* Danger */}
      <div className="bg-[#18181b] border border-[#ef4444]/20 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Trash2 className="w-5 h-5 text-[#ef4444] shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-sm font-semibold text-[#fafafa] mb-1">Danger Zone</div>
            <div className="text-xs text-[#71717a] mb-4">
              Deleting your account is permanent and cannot be undone. All data will be lost.
            </div>
            <button className="text-sm text-[#ef4444] hover:bg-[#ef4444]/10 px-4 py-2 rounded-lg border border-[#ef4444]/30 transition-colors font-medium">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsCard({ icon: Icon, title, desc, children }: {
  icon: any; title: string; desc: string; children: React.ReactNode
}) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-[#27272a] flex items-center justify-center">
          <Icon className="w-4.5 h-4.5 text-[#a1a1aa]" />
        </div>
        <div>
          <div className="text-sm font-semibold text-[#fafafa]">{title}</div>
          <div className="text-xs text-[#71717a]">{desc}</div>
        </div>
      </div>
      {children}
    </div>
  );
}

function ToggleRow({ label, desc, checked, onChange }: {
  label: string; desc: string; checked: boolean; onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm text-[#fafafa]">{label}</div>
        <div className="text-xs text-[#71717a]">{desc}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-[#10b981]" : "bg-[#3f3f46]"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
