"use client";

import { useState } from "react";
import { QrCode, Wifi, WifiOff, RefreshCw, AlertCircle } from "lucide-react";

export default function ConnectPage() {
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div>
        <h1 className="text-xl font-bold text-[#fafafa]">WhatsApp Connection</h1>
        <p className="text-sm text-[#71717a] mt-0.5">
          Connect your WhatsApp Business number to start receiving messages.
        </p>
      </div>

      {/* ─── Status card ─── */}
      <div
        className={`rounded-2xl border p-6 flex items-start gap-4 ${
          status === "connected"
            ? "bg-[#10b981]/5 border-[#10b981]/30"
            : status === "connecting"
            ? "bg-[#3b82f6]/5 border-[#3b82f6]/30"
            : "bg-[#18181b] border-[#27272a]"
        }`}
      >
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            status === "connected"
              ? "bg-[#10b981]/15 text-[#10b981]"
              : status === "connecting"
              ? "bg-[#3b82f6]/15 text-[#3b82f6] animate-pulse"
              : "bg-[#27272a] text-[#71717a]"
          }`}
        >
          {status === "connected" ? (
            <Wifi className="w-6 h-6" />
          ) : status === "connecting" ? (
            <RefreshCw className="w-6 h-6 animate-spin" />
          ) : (
            <WifiOff className="w-6 h-6" />
          )}
        </div>
        <div>
          <div className="font-semibold text-[#fafafa] mb-0.5">
            {status === "connected"
              ? "WhatsApp Connected"
              : status === "connecting"
              ? "Connecting..."
              : "Not Connected"}
          </div>
          <div className="text-sm text-[#71717a]">
            {status === "connected"
              ? "+91 98765 43210 — Rome is running."
              : status === "connecting"
              ? "Please wait while we establish the connection."
              : "Scan the QR code below to link your WhatsApp Business number."}
          </div>
          {status === "connected" && (
            <div className="mt-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-xs text-[#10b981]">Active — receiving messages</span>
            </div>
          )}
        </div>
      </div>

      {/* ─── QR Code (when disconnected) ─── */}
      {status === "disconnected" && (
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-8 text-center">
          <div className="w-56 h-56 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center relative">
            {/* Placeholder QR — real QR comes from Evolution API */}
            <div className="grid grid-cols-6 gap-1 p-4">
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm ${
                    Math.random() > 0.5 ? "bg-black" : "bg-white"
                  }`}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl">
              <div className="text-center">
                <QrCode className="w-10 h-10 text-black mx-auto mb-2" />
                <p className="text-xs text-black font-medium">QR Code</p>
                <p className="text-[10px] text-black/60">from Evolution API</p>
              </div>
            </div>
          </div>

          <h3 className="text-base font-semibold text-[#fafafa] mb-2">
            Scan with WhatsApp
          </h3>
          <p className="text-sm text-[#71717a] mb-6">
            Open WhatsApp on your phone → Settings → Linked Devices → Link a Device → Scan the code above.
          </p>

          <button
            onClick={() => setStatus("connecting")}
            className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#34d399] text-black font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Connect WhatsApp
          </button>

          <div className="mt-4 flex items-start gap-2 bg-[#27272a] rounded-lg p-3 text-left">
            <AlertCircle className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
            <p className="text-xs text-[#71717a]">
              Use your <span className="text-[#a1a1aa]">WhatsApp Business</span> account — not personal WhatsApp.
              The QR code expires in 60 seconds. Keep this page open while scanning.
            </p>
          </div>
        </div>
      )}

      {/* ─── Connecting spinner ─── */}
      {status === "connecting" && (
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-full border-4 border-[#3f3f46] border-t-[#10b981] animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#fafafa] mb-2">Connecting to WhatsApp...</h3>
          <p className="text-sm text-[#71717a] mb-4">
            This takes about 10–30 seconds. Don't close this page.
          </p>
          <button
            onClick={() => setStatus("disconnected")}
            className="text-sm text-[#ef4444] hover:underline"
          >
            Cancel
          </button>
        </div>
      )}

      {/* ─── Connected: reconnect option ─── */}
      {status === "connected" && (
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-[#fafafa]">Connection Settings</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-[#27272a]">
              <span className="text-sm text-[#71717a]">WhatsApp Number</span>
              <span className="text-sm text-[#fafafa] font-medium">+91 98765 43210</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#27272a]">
              <span className="text-sm text-[#71717a]">Connection Type</span>
              <span className="text-sm text-[#fafafa] font-medium">WhatsApp Web (Baileys)</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#27272a]">
              <span className="text-sm text-[#71717a]">Webhook Status</span>
              <span className="text-sm text-[#10b981] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" /> Active
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-[#71717a]">Last Connected</span>
              <span className="text-sm text-[#fafafa] font-medium">Today at 09:14 AM</span>
            </div>
          </div>

          <button
            onClick={() => setStatus("disconnected")}
            className="w-full mt-2 flex items-center justify-center gap-2 border border-[#ef4444]/30 hover:border-[#ef4444]/50 text-[#ef4444] hover:bg-[#ef4444]/5 font-medium text-sm py-2.5 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reconnect (Scan New QR)
          </button>
        </div>
      )}
    </div>
  );
}
