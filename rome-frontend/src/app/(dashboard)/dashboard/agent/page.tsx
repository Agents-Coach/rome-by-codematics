"use client";

import { useState } from "react";
import { Save, Plus, Trash2, AlertCircle, CheckCircle } from "lucide-react";

type Personality = "friendly" | "professional" | "casual";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface Objection {
  id: string;
  objection: string;
  response: string;
}

export default function AgentConfigPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Agent identity
  const [agentName, setAgentName] = useState("Rome");
  const [personality, setPersonality] = useState<Personality>("friendly");
  const [introMessage, setIntroMessage] = useState(
    "Hi! 👋 I'm Rome, here to help. What would you like to know about our coaching program?"
  );

  // Offer
  const [offerName, setOfferName] = useState("Executive Coaching Program");
  const [offerDescription, setOfferDescription] = useState(
    "A 12-week coaching program for senior professionals who want to accelerate their career growth, build executive presence, and land their next promotion."
  );
  const [price, setPrice] = useState("$2,997");
  const [ctaMessage, setCtaMessage] = useState(
    "Sounds great! Book a free discovery call to see if we're the right fit:"
  );
  const [calendarLink, setCalendarLink] = useState("https://calendly.com/your-link");

  // FAQs
  const [faqs, setFaqs] = useState<FAQ[]>([
    { id: "1", question: "What is the duration of the program?", answer: "The program runs for 12 weeks, with one 60-minute session per week." },
    { id: "2", question: "Is there a payment plan?", answer: "Yes! We offer a 3-month payment plan at $999/month with no interest." },
    { id: "3", question: "Who is this program for?", answer: "Mid-to-senior professionals with 5+ years of experience who want to step into leadership roles." },
  ]);

  // Objections
  const [objections, setObjections] = useState<Objection[]>([
    { id: "1", objection: "It's too expensive", response: "I hear you! The investment reflects the transformation you'll make. Many of our clients say the ROI in their first month after the program paid for itself." },
    { id: "2", objection: "I don't have time", response: "That's exactly what the last client said — and she said it was the best 2 hours a week she's ever invested. The ROI is in the clarity you'll gain." },
  ]);

  const addFaq = () =>
    setFaqs([...faqs, { id: Date.now().toString(), question: "", answer: "" }]);

  const removeFaq = (id: string) => setFaqs(faqs.filter(f => f.id !== id));

  const addObjection = () =>
    setObjections([...objections, { id: Date.now().toString(), objection: "", response: "" }]);

  const removeObjection = (id: string) =>
    setObjections(objections.filter(o => o.id !== id));

  const handleSave = async () => {
    setSaving(true);
    // TODO: API call to save agent config
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#fafafa]">AI Agent Configuration</h1>
          <p className="text-sm text-[#71717a] mt-0.5">Configure how Rome speaks, sells, and handles your leads.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#34d399] disabled:opacity-50 text-black font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          {saving ? (
            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : saved ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* ─── Agent Identity ─── */}
      <Section title="Agent Identity" desc="How Rome introduces itself to your leads.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Agent Name" hint="The name Rome will use">
            <input className="input-field" value={agentName} onChange={e => setAgentName(e.target.value)} placeholder="Rome" />
          </Field>
          <Field label="Personality" hint="The tone Rome uses">
            <select
              className="input-field"
              value={personality}
              onChange={e => setPersonality(e.target.value as Personality)}
            >
              <option value="friendly">🟢 Friendly — warm, conversational</option>
              <option value="professional">🔵 Professional — polished, formal</option>
              <option value="casual">🟡 Casual — relaxed, like talking to a friend</option>
            </select>
          </Field>
        </div>
        <Field label="Intro Message" hint="Rome's first message when someone new starts a conversation">
          <textarea
            className="input-field resize-none"
            rows={3}
            value={introMessage}
            onChange={e => setIntroMessage(e.target.value)}
            placeholder="Hi! I'm Rome, here to help..."
          />
        </Field>
      </Section>

      {/* ─── Your Offer ─── */}
      <Section title="Your Offer" desc="What Rome is selling on your behalf.">
        <Field label="Offer Name" hint="The product or service name">
          <input className="input-field" value={offerName} onChange={e => setOfferName(e.target.value)} placeholder="My Coaching Program" />
        </Field>
        <Field label="Description" hint="What the offer is, in one or two sentences">
          <textarea
            className="input-field resize-none"
            rows={3}
            value={offerDescription}
            onChange={e => setOfferDescription(e.target.value)}
            placeholder="Describe what you offer..."
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Price" hint="What Rome quotes when asked about cost">
            <input className="input-field" value={price} onChange={e => setPrice(e.target.value)} placeholder="$999" />
          </Field>
          <Field label="Calendar Link" hint="Calendly or similar booking link">
            <input className="input-field" type="url" value={calendarLink} onChange={e => setCalendarLink(e.target.value)} placeholder="https://calendly.com/..." />
          </Field>
        </div>
        <Field label="CTA Message" hint="Rome says this before sending the calendar link">
          <textarea
            className="input-field resize-none"
            rows={2}
            value={ctaMessage}
            onChange={e => setCtaMessage(e.target.value)}
            placeholder="Sounds great! Book a call here:"
          />
        </Field>
      </Section>

      {/* ─── FAQs ─── */}
      <Section title="FAQ Knowledge" desc="Rome uses these to answer common questions automatically.">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={faq.id} className="bg-[#0f0f11] border border-[#27272a] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#71717a]">FAQ #{i + 1}</span>
                <button onClick={() => removeFaq(faq.id)} className="text-[#ef4444] hover:text-[#dc2626]">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                className="input-field text-sm"
                value={faq.question}
                onChange={e => setFaqs(faqs.map(f => f.id === faq.id ? { ...f, question: e.target.value } : f))}
                placeholder="What question will they ask?"
              />
              <textarea
                className="input-field text-sm resize-none"
                rows={2}
                value={faq.answer}
                onChange={e => setFaqs(faqs.map(f => f.id === faq.id ? { ...f, answer: e.target.value } : f))}
                placeholder="How should Rome answer this?"
              />
            </div>
          ))}
          <button
            onClick={addFaq}
            className="w-full flex items-center justify-center gap-2 border border-dashed border-[#3f3f46] hover:border-[#10b981] text-[#71717a] hover:text-[#10b981] text-sm py-3 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add FAQ
          </button>
        </div>
      </Section>

      {/* ─── Objections ─── */}
      <Section title="Objection Handling" desc="Rome knows how to respond when leads push back.">
        <div className="space-y-4">
          {objections.map((obj, i) => (
            <div key={obj.id} className="bg-[#0f0f11] border border-[#27272a] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#71717a]">Objection #{i + 1}</span>
                <button onClick={() => removeObjection(obj.id)} className="text-[#ef4444] hover:text-[#dc2626]">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                className="input-field text-sm"
                value={obj.objection}
                onChange={e => setObjections(objections.map(o => o.id === obj.id ? { ...o, objection: e.target.value } : o))}
                placeholder="What will they say? (e.g. 'It's too expensive')"
              />
              <textarea
                className="input-field text-sm resize-none"
                rows={2}
                value={obj.response}
                onChange={e => setObjections(objections.map(o => o.id === obj.id ? { ...o, response: e.target.value } : o))}
                placeholder="How should Rome respond to this objection?"
              />
            </div>
          ))}
          <button
            onClick={addObjection}
            className="w-full flex items-center justify-center gap-2 border border-dashed border-[#3f3f46] hover:border-[#10b981] text-[#71717a] hover:text-[#10b981] text-sm py-3 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Objection
          </button>
        </div>
      </Section>

      {/* ─── Preview ─── */}
      <Section title="Agent Preview" desc="This is how Rome will sound to your leads.">
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center text-xs font-bold text-black shrink-0">
              {agentName[0]}
            </div>
            <div>
              <div className="text-sm font-semibold text-[#fafafa] mb-0.5">{agentName}</div>
              <div className="text-xs text-[#71717a] italic">{personality} • {offerName}</div>
            </div>
          </div>
          <div className="space-y-2 pl-1">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-[#27272a] shrink-0 mt-0.5" />
              <div className="text-sm text-[#d4d4d8] bg-[#27272a] rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-sm">
                Hi! I'm {agentName} 👋 {introMessage.split("?")[0]}?
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="text-sm text-[#d4d4d8] bg-[#10b981]/20 border border-[#10b981]/30 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-sm">
                What's the price?
              </div>
              <div className="w-6 h-6 rounded-full bg-[#52525b] shrink-0 mt-0.5" />
            </div>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-[#10b981] shrink-0 mt-0.5" />
              <div className="text-sm text-[#d4d4d8] bg-[#27272a] rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-sm">
                {price} — let me know if you'd like to explore further! 🚀
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#fafafa]">{title}</h2>
        <p className="text-xs text-[#71717a] mt-0.5">{desc}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#a1a1aa] mb-1.5">{label}</label>
      {hint && <p className="text-[10px] text-[#52525b] mb-1.5">{hint}</p>}
      {children}
    </div>
  );
}
