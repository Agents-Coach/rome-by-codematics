"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#10b981] flex items-center justify-center mx-auto mb-4">
            <span className="text-black font-bold text-xl">R</span>
          </div>
          <h1 className="text-2xl font-bold text-[#fafafa]">Welcome back</h1>
          <p className="text-sm text-[#71717a] mt-1">Sign in to your Rome account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#10b981] hover:bg-[#34d399] disabled:opacity-50 text-black font-semibold text-sm py-3 rounded-xl transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="#" className="text-xs text-[#10b981] hover:underline">
            Forgot password?
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#71717a]">
            No account yet?{" "}
            <Link href="/signup" className="text-[#10b981] hover:underline font-medium">
              Start free trial
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
