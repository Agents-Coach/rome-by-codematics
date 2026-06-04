"use client";

import { useState } from "react";
import { Calculator, ArrowRight, TrendingUp, Clock, Users, Zap } from "lucide-react";

export default function RoiCalculatorPage() {
  const [messages, setMessages] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(1000);
  const [pricePerLead, setPricePerLead] = useState(30000);
  const [romePlan, setRomePlan] = useState<"starter" | "pro">("pro");

  // Calculations
  const timePerMessage = 3; // minutes
  const monthlyMessages = messages * 30;
  const currentMonthlyTime = (monthlyMessages * timePerMessage) / 60; // hours
  const currentMonthlyCost = (currentMonthlyTime * hourlyRate); // ₹
  const currentMonthlyLeadsLost = Math.floor(monthlyMessages * 0.05); // 5% lost to slow replies
  const currentMonthlyRevenueLost = currentMonthlyLeadsLost * pricePerLead;

  const romePlanCost = romePlan === "starter" ? 4000 : 8000; // ₹
  const romePlanMessages = romePlan === "starter" ? 500 : 2000;
  const romeLeadsCaptured = Math.floor(Math.min(monthlyMessages, romePlanMessages) * 0.12); // 12% qualify
  const romeRevenueGenerated = romeLeadsCaptured * pricePerLead;
  const romeNetValue = romeRevenueGenerated - romePlanCost;

  const timeSaved = currentMonthlyTime;
  const valuePerMonth = romeNetValue + (timeSaved * hourlyRate);
  const valuePerYear = valuePerMonth * 12;
  const payBackDays = romePlanCost > 0 ? Math.ceil(romePlanCost / (valuePerMonth / 30)) : 0;

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Header */}
      <div className="bg-[#0f0f11] border-b border-[#27272a] py-6">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#10b981]/15 flex items-center justify-center">
              <Calculator className="w-4 h-4 text-[#10b981]" />
            </div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#10b981]">Free Tool</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#fafafa]">
            Rome ROI Calculator
          </h1>
          <p className="text-sm text-[#71717a] mt-1">
            See exactly how much Rome is worth for your coaching practice
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* ─── LEFT: Inputs ─── */}
          <div className="space-y-6">
            <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6">
              <h2 className="text-sm font-semibold text-[#fafafa] mb-5">Your Current Situation</h2>

              <div className="space-y-5">
                {/* Messages per day */}
                <div>
                  <label className="text-xs font-medium text-[#a1a1aa] mb-2 block">
                    WhatsApp inquiry messages per day
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={messages}
                    onChange={e => setMessages(Number(e.target.value))}
                    className="w-full accent-[#10b981]"
                  />
                  <div className="flex justify-between text-xs text-[#71717a] mt-1">
                    <span>1</span>
                    <span className="text-[#10b981] font-bold text-sm">{messages} messages/day</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Hourly rate */}
                <div>
                  <label className="text-xs font-medium text-[#a1a1aa] mb-2 block">
                    Your hourly rate (₹) — coaching / consulting
                  </label>
                  <input
                    type="range"
                    min={500}
                    max={10000}
                    step={500}
                    value={hourlyRate}
                    onChange={e => setHourlyRate(Number(e.target.value))}
                    className="w-full accent-[#10b981]"
                  />
                  <div className="flex justify-between text-xs text-[#71717a] mt-1">
                    <span>₹500/hr</span>
                    <span className="text-[#10b981] font-bold text-sm">₹{hourlyRate.toLocaleString()}/hr</span>
                    <span>₹10,000/hr</span>
                  </div>
                </div>

                {/* Price per lead */}
                <div>
                  <label className="text-xs font-medium text-[#a1a1aa] mb-2 block">
                    Average revenue per new client (₹)
                  </label>
                  <input
                    type="range"
                    min={5000}
                    max={200000}
                    step={5000}
                    value={pricePerLead}
                    onChange={e => setPricePerLead(Number(e.target.value))}
                    className="w-full accent-[#10b981]"
                  />
                  <div className="flex justify-between text-xs text-[#71717a] mt-1">
                    <span>₹5,000</span>
                    <span className="text-[#10b981] font-bold text-sm">₹{pricePerLead.toLocaleString()}</span>
                    <span>₹2,00,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rome Plan */}
            <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6">
              <h2 className="text-sm font-semibold text-[#fafafa] mb-4">Rome Plan</h2>
              <div className="space-y-2">
                {[
                  { id: "starter" as const, name: "Rome Starter", price: "₹4,000/mo", msgs: "500 messages", desc: "1 WhatsApp number" },
                  { id: "pro" as const, name: "Rome Pro", price: "₹8,000/mo", msgs: "2,000 messages", desc: "3 numbers + Calendar" },
                ].map(plan => (
                  <button
                    key={plan.id}
                    onClick={() => setRomePlan(plan.id)}
                    className={`w-full text-left rounded-xl p-4 border transition-all ${
                      romePlan === plan.id
                        ? "border-[#10b981] bg-[#10b981]/8"
                        : "border-[#27272a] hover:border-[#3f3f46]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-semibold ${romePlan === plan.id ? "text-[#10b981]" : "text-[#fafafa]"}`}>
                        {plan.name}
                      </span>
                      <span className="text-sm font-bold text-[#fafafa]">{plan.price}</span>
                    </div>
                    <div className="text-xs text-[#71717a]">{plan.desc} · {plan.msgs}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Results ─── */}
          <div className="space-y-4">
            {/* Hero result */}
            <div className="bg-gradient-to-br from-[#10b981]/20 to-[#10b981]/5 border border-[#10b981]/30 rounded-2xl p-8 text-center">
              <div className="text-sm text-[#10b981] mb-2 font-medium">Rome's value per month</div>
              <div className="text-5xl font-black text-[#fafafa] mb-1">
                ₹{Math.max(0, Math.round(valuePerMonth)).toLocaleString()}
              </div>
              <div className="text-sm text-[#71717a]">per month — in reclaimed time + captured leads</div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-[#10b981]" />
                <span className="text-sm text-[#10b981]">Pays for itself in ~{payBackDays} days</span>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-[#fafafa]">Your Monthly Breakdown</h3>

              <div className="space-y-3">
                <ResultRow
                  icon={<Clock className="w-4 h-4 text-[#f59e0b]" />}
                  label="Time spent on WhatsApp (current)"
                  value={`${currentMonthlyTime.toFixed(1)} hrs/month`}
                  sub={`Worth ₹${currentMonthlyCost.toLocaleString()} at your rate`}
                />
                <ResultRow
                  icon={<TrendingUp className="w-4 h-4 text-[#ef4444]" />}
                  label="Leads lost to slow replies"
                  value={`~${currentMonthlyLeadsLost} leads/month`}
                  sub={`₹${currentMonthlyRevenueLost.toLocaleString()} in lost revenue`}
                />
                <ResultRow
                  icon={<Users className="w-4 h-4 text-[#10b981]" />}
                  label="Leads Rome captures"
                  value={`~${romeLeadsCaptured} leads/month`}
                  sub={`₹${romeRevenueGenerated.toLocaleString()} in new revenue`}
                />
              </div>

              <div className="border-t border-[#27272a] pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#10b981]">₹{Math.max(0, Math.round(romeNetValue)).toLocaleString()}</div>
                    <div className="text-xs text-[#71717a]">Net lead value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#10b981]">{timeSaved.toFixed(1)}h</div>
                    <div className="text-xs text-[#71717a]">Time saved/month</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 text-center">
              <div className="text-sm text-[#71717a] mb-3">
                Rome costs ₹{romePlanCost.toLocaleString()}/month.
                <br />
                Your estimated value: <span className="text-[#fafafa] font-bold">₹{Math.max(0, Math.round(valuePerMonth)).toLocaleString()}/month.</span>
              </div>
              <a
                href="/signup"
                className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#34d399] text-black font-bold text-sm px-8 py-3 rounded-xl transition-colors"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="text-xs text-[#52525b] mt-2">No credit card required · 7 days free</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultRow({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-[#27272a] flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#71717a]">{label}</span>
          <span className="text-sm font-semibold text-[#fafafa]">{value}</span>
        </div>
        <div className="text-[10px] text-[#52525b] mt-0.5">{sub}</div>
      </div>
    </div>
  );
}
