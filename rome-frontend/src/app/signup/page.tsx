"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

const STEPS = ["Account", "Agent Setup", "Connect WA"];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#10b981] flex items-center justify-center mx-auto mb-4">
            <span className="text-black font-bold text-xl">R</span>
          </div>
          <h1 className="text-2xl font-bold text-[#fafafa]">Start your free trial</h1>
          <p className="text-sm text-[#71717a] mt-1">7 days free, no credit card required</p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i < step
                    ? "bg-[#10b981] text-black"
                    : i === step
                    ? "bg-[#10b981]/20 border border-[#10b981] text-[#10b981]"
                    : "bg-[#27272a] text-[#52525b]"
                }`}
              >
                {i < step ? <Check className="w-3 h-3" /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i === step ? "text-[#fafafa]" : "text-[#52525b]"}`}>
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <div className={`w-8 h-px ${i < step ? "bg-[#10b981]" : "bg-[#27272a]"}`} />
              )}
            </div>
          ))}
        </div>

        {/* ─── Step 0: Account ─── */}
        {step === 0 && (
          <form onSubmit={handleAccount} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#a1a1aa] mb-1.5 block">Your Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="Ankit Kumar"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#a1a1aa] mb-1.5 block">Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#a1a1aa] mb-1.5 block">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Min. 8 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                minLength={8}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#10b981] hover:bg-[#34d399] disabled:opacity-50 text-black font-semibold text-sm py-3 rounded-xl transition-colors"
            >
              {loading ? "Creating account..." : "Continue"}
            </button>
          </form>
        )}

        {/* ─── Step 1: Agent Setup ─── */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 text-center">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-base font-semibold text-[#fafafa] mb-2">Configure your AI agent</h3>
              <p className="text-sm text-[#71717a]">
                You can set up your agent's name, offer details, and FAQs after signup.
              </p>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#10b981] hover:bg-[#34d399] text-black font-semibold text-sm py-3 rounded-xl transition-colors"
            >
              Skip for now
            </button>
            <button
              onClick={() => router.push("/dashboard/agent")}
              className="w-full bg-[#27272a] hover:bg-[#3f3f46] text-[#fafafa] font-semibold text-sm py-3 rounded-xl transition-colors"
            >
              Configure now
            </button>
          </div>
        )}

        {/* ─── Step 2: Connect WhatsApp ─── */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 text-center">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="text-base font-semibold text-[#fafafa] mb-2">Connect WhatsApp</h3>
              <p className="text-sm text-[#71717a]">
                Scan a QR code to link your WhatsApp Business number. You can do this later from the dashboard.
              </p>
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-[#10b981] hover:bg-[#34d399] text-black font-semibold text-sm py-3 rounded-xl transition-colors"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => router.push("/dashboard/connect")}
              className="w-full bg-[#27272a] hover:bg-[#3f3f46] text-[#fafafa] font-semibold text-sm py-3 rounded-xl transition-colors"
            >
              Scan QR Code Now
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-[#71717a]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#10b981] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-[#52525b]">
          By signing up, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
