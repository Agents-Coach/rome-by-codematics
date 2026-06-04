import type { ClaudeMessage, ClaudeResponse, AgentConfig, FAQ, Objection } from '../types';

const CODEMAX_API_URL = process.env.CODEMAX_API_URL || 'https://api.codematics.ai/v1';
const CODEMAX_API_KEY = process.env.CODEMAX_API_KEY || '';

const SYSTEM_PROMPT_TEMPLATE = `You are {{AGENT_NAME}}, a friendly and professional WhatsApp sales representative.

BUSINESS: {{BUSINESS_NAME}}
WHAT YOU SELL: {{OFFER_NAME}} — {{OFFER_DESCRIPTION}}
PRICE: {{PRICE}}
YOUR CALENDAR LINK: {{CALENDAR_LINK}}

YOUR PERSONALITY: You are warm, helpful, and genuinely care about helping people. You never push. You listen first, then suggest.

RULES — Follow these strictly:
1. Keep responses SHORT — 1 to 3 sentences. WhatsApp is a chat, not an essay.
2. Always be warm and friendly.
3. If asked about price, quote exactly: {{PRICE}}. Do not add or subtract.
4. When they want to take action, send this link: {{CALENDAR_LINK}}
5. If they say any of these phrases: {{TALK_TO_HUMAN_KEYWORDS}}, respond warmly and say a human will reach out soon.
6. If you don't know something, say "Let me check and get back to you!" — then stop.
7. Never make up information about the product, pricing, or anything else.
8. Never send multiple messages in a row without waiting for a reply.
9. If they seem done or say goodbye, wish them well warmly.
10. If they ask "how are you" or say hi, introduce yourself briefly: "{{INTRO_MESSAGE}}"

FAQ KNOWLEDGE:
{{FAQ_LIST}}

OBJECTION HANDLING:
{{OBJECTION_LIST}}

IMPORTANT: You are talking on WhatsApp. Format your responses naturally. Use simple language.`;

function buildSystemPrompt(config: Partial<AgentConfig>): string {
  const faqs = (config.faqs || []) as FAQ[];
  const objections = (config.objections || []) as Objection[];

  const faqList = faqs.length > 0
    ? faqs.map((f, i) => `Q${i + 1}: ${f.question}\nA${i + 1}: ${f.answer}`).join('\n\n')
    : '(No FAQ configured yet)';

  const objectionList = objections.length > 0
    ? objections.map(o => `Objection: "${o.objection}"\nResponse: ${o.response}`).join('\n\n')
    : '(No objections configured yet)';

  return SYSTEM_PROMPT_TEMPLATE
    .replace('{{AGENT_NAME}}', config.name || 'Rome')
    .replace('{{BUSINESS_NAME}}', config.offerName || 'my business')
    .replace('{{OFFER_NAME}}', config.offerName || 'my offer')
    .replace('{{OFFER_DESCRIPTION}}', config.offerDescription || '')
    .replace('{{PRICE}}', config.price || 'contact us for pricing')
    .replace('{{CALENDAR_LINK}}', config.calendarLink || 'book a call below')
    .replace('{{TALK_TO_HUMAN_KEYWORDS}}', (config.talkToHumanKeywords || []).join(', '))
    .replace('{{INTRO_MESSAGE}}', config.introMessage || `Hi! I'm ${config.name || 'Rome'}, here to help!`)
    .replace('{{FAQ_LIST}}', faqList)
    .replace('{{OBJECTION_LIST}}', objectionList);
}

/**
 * Call Claude via Codemax API to get a sales response.
 */
export async function getClaudeResponse(
  config: Partial<AgentConfig>,
  conversationHistory: { role: 'user' | 'assistant'; content: string }[],
  currentMessage: string
): Promise<ClaudeResponse> {
  const systemPrompt = buildSystemPrompt(config);

  const messages: ClaudeMessage[] = [
    ...conversationHistory.slice(-10).map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    {
      role: 'user',
      content: currentMessage,
    },
  ];

  try {
    const response = await fetch(`${CODEMAX_API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CODEMAX_API_KEY,
      },
      body: JSON.stringify({
        model: 'claude-opus-4-8',
        max_tokens: 300,
        system: systemPrompt,
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error:', response.status, errorText);
      throw new Error(`Claude API returned ${response.status}`);
    }

    const data = await response.json() as any;
    const content = data.content?.[0]?.text || data.choices?.[0]?.message?.content || '';

    return {
      content: content.trim(),
      stopReason: data.stop_reason || data.choices?.[0]?.finish_reason || 'end_turn',
    };
  } catch (err) {
    console.error('Claude call failed:', err);
    // Fallback response if Claude is unavailable
    return {
      content: "I'm having a little trouble right now — a human will reach out to you shortly! 🙏",
      stopReason: 'error_fallback',
    };
  }
}
