import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { db } from './db';
import { EvolutionClient } from './evolution';
import { getClaudeResponse } from './claude';
import type { EvolutionWebhookPayload, ParsedMessage } from './types';

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ───────────────────────────────────────────────

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '5mb' }));

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'rome-bridge' }));

// ─── Evolution API Webhook ─────────────────────────────────────
// POST /webhook/ai-agent — receives all WhatsApp events from Evolution API

app.post('/webhook/ai-agent', async (req, res) => {
  const payload = req.body as EvolutionWebhookPayload;

  // Only process incoming messages (not our own sends)
  if (payload.event !== 'messages.upsert') {
    return res.sendStatus(200);
  }

  const msg = payload.data;
  // Ignore messages we sent ourselves
  if (msg.key.fromMe) {
    return res.sendStatus(200);
  }

  // Parse the incoming message
  const parsed = parseMessage(payload);
  if (!parsed.text.trim()) {
    return res.sendStatus(200); // Skip empty messages
  }

  const remoteJid = msg.key.remoteJid || '';

  // Find the agent by Evolution instance name
  const agent = await db.agent.findFirst({
    where: { evolutionInstance: payload.instance },
    include: { user: true },
  });

  if (!agent) {
    console.warn(`[Rome] No agent found for instance: ${payload.instance}`);
    return res.sendStatus(200);
  }

  if (agent.status !== 'ACTIVE') {
    console.log(`[Rome] Agent ${agent.id} is paused, skipping`);
    return res.sendStatus(200);
  }

  // Get or create conversation
  const conversation = await db.conversation.upsert({
    where: {
      agentId_senderNumber: {
        agentId: agent.id,
        senderNumber: parsed.senderNumber,
      },
    },
    create: {
      agentId: agent.id,
      userId: agent.userId,
      senderNumber: parsed.senderNumber,
      senderName: parsed.senderName,
    },
    update: {
      senderName: parsed.senderName, // Update name if changed
    },
  });

  // Save incoming message
  await db.message.create({
    data: {
      conversationId: conversation.id,
      role: 'USER',
      content: parsed.text,
      rawPayload: payload as any,
    },
  });

  // Get conversation history (last 10 messages)
  const history = await db.message.findMany({
    where: { conversationId: conversation.id },
    orderBy: { createdAt: 'asc' },
  });
  const historyForClaude = history.slice(-10).map(m => ({
    role: m.role === 'USER' ? 'user' : 'assistant',
    content: m.content,
  }));

  // Fire Claude call asynchronously (don't block the webhook response)
  processClaudeResponse(agent, parsed, historyForClaude, conversation.id).catch(
    err => console.error('[Rome] Claude process error:', err)
  );

  res.sendStatus(200);
});

// ─── Claude Response Processor ─────────────────────────────────

async function processClaudeResponse(
  agent: any,
  parsed: ParsedMessage,
  history: { role: 'user' | 'assistant'; content: string }[],
  conversationId: string
) {
  try {
    // Send typing indicator
    const evolution = new EvolutionClient(
      agent.evolutionApiUrl,
      agent.evolutionApiKey,
      agent.evolutionInstance
    );

    try {
      await evolution.sendPresence(parsed.senderNumber);
    } catch { /* non-critical */ }

    // Call Claude
    const response = await getClaudeResponse(
      {
        id: agent.id,
        name: agent.name,
        personality: agent.personality,
        offerName: agent.offerName,
        offerDescription: agent.offerDescription,
        price: agent.price,
        ctaMessage: agent.ctaMessage,
        introMessage: agent.introMessage,
        calendarLink: agent.calendarLink,
        talkToHumanKeywords: agent.talkToHumanKeywords,
        faqs: agent.faqs,
        objections: agent.objections,
        evolutionApiKey: agent.evolutionApiKey,
        evolutionInstance: agent.evolutionInstance,
        evolutionUrl: agent.evolutionApiUrl,
      },
      history,
      parsed.text
    );

    // Save assistant response
    await db.message.create({
      data: {
        conversationId,
        role: 'ASSISTANT',
        content: response.content,
      },
    });

    // Track usage
    const now = new Date();
    await db.messageCounter.upsert({
      where: {
        agentId_month_year: {
          agentId: agent.id,
          month: now.getMonth() + 1,
          year: now.getFullYear(),
        },
      },
      create: { agentId: agent.id, month: now.getMonth() + 1, year: now.getFullYear(), count: 1 },
      update: { count: { increment: 1 } },
    });

    // Send response via WhatsApp
    await evolution.sendText({
      number: parsed.senderNumber,
      text: response.content,
    });

    console.log(`[Rome] ✅ Replied to ${parsed.senderNumber}: "${response.content.substring(0, 60)}..."`);
  } catch (err) {
    console.error(`[Rome] ❌ Failed to respond to ${parsed.senderNumber}:`, err);
    // Try to send a fallback message
    try {
      const evolution = new EvolutionClient(
        agent.evolutionApiUrl,
        agent.evolutionApiKey,
        agent.evolutionInstance
      );
      await evolution.sendText({
        number: parsed.senderNumber,
        text: "I'm having a moment right now 😅 A human will reach out to help you soon!",
      });
    } catch { /* silently fail — don't crash */ }
  }
}

// ─── Parse Evolution Webhook ───────────────────────────────────

function parseMessage(payload: EvolutionWebhookPayload): ParsedMessage {
  const msg = payload.data;
  const rawText =
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    msg.message?.imageMessage?.caption ||
    msg.message?.documentMessage?.caption ||
    msg.message?.videoMessage?.caption ||
    '';

  const remoteJid = msg.key.remoteJid || '';
  const isGroup = remoteJid.includes('@g.us');
  const senderNumber = remoteJid
    .replace('@s.whatsapp.net', '')
    .replace('@g.us', '');

  const quotedText =
    msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation || undefined;

  return {
    text: rawText.trim(),
    senderName: msg.pushName || senderNumber,
    senderNumber,
    isGroup,
    isFromMe: msg.key.fromMe || false,
    quotedText,
    timestamp: new Date(
      typeof msg.messageTimestamp === 'string'
        ? parseInt(msg.messageTimestamp) * 1000
        : Number(msg.messageTimestamp || Date.now()) * 1000
    ),
    messageId: msg.key.id || `msg-${Date.now()}`,
  };
}

// ─── REST API for Frontend ────────────────────────────────────

// Get agent config
app.get('/api/agents/:agentId', async (req, res) => {
  const agent = await db.agent.findUnique({
    where: { id: req.params.agentId },
    select: {
      id: true,
      name: true,
      personality: true,
      offerName: true,
      offerDescription: true,
      price: true,
      ctaMessage: true,
      introMessage: true,
      calendarLink: true,
      talkToHumanKeywords: true,
      faqs: true,
      objections: true,
      status: true,
      evolutionApiUrl: true,
      evolutionInstance: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!agent) return res.status(404).json({ error: 'Agent not found' });
  res.json(agent);
});

// Update agent config
app.patch('/api/agents/:agentId', async (req, res) => {
  const { evolutionApiKey, ...rest } = req.body;
  try {
    const updated = await db.agent.update({
      where: { id: req.params.agentId },
      data: rest,
    });
    res.json({ success: true, agentId: updated.id });
  } catch (err) {
    console.error('Update agent error:', err);
    res.status(400).json({ error: 'Failed to update agent' });
  }
});

// Get conversations for an agent
app.get('/api/agents/:agentId/conversations', async (req, res) => {
  const { page = '1', limit = '50' } = req.query;
  const conversations = await db.conversation.findMany({
    where: { agentId: req.params.agentId },
    orderBy: { updatedAt: 'desc' },
    take: Number(limit),
    skip: (Number(page) - 1) * Number(limit),
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
        take: 1, // Get last message for preview
        select: { content: true, createdAt: true },
      },
    },
  });
  res.json(conversations);
});

// Get messages for a conversation
app.get('/api/conversations/:conversationId/messages', async (req, res) => {
  const messages = await db.message.findMany({
    where: { conversationId: req.params.conversationId },
    orderBy: { createdAt: 'asc' },
  });
  res.json(messages);
});

// Get usage stats
app.get('/api/agents/:agentId/stats', async (req, res) => {
  const now = new Date();
  const thisMonth = await db.messageCounter.findUnique({
    where: {
      agentId_month_year: {
        agentId: req.params.agentId,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      },
    },
  });
  const totalConversations = await db.conversation.count({
    where: { agentId: req.params.agentId },
  });
  const totalMessages = await db.message.count({
    where: { conversation: { agentId: req.params.agentId } },
  });
  res.json({
    messagesThisMonth: thisMonth?.count || 0,
    totalConversations,
    totalMessages,
  });
});

// ─── Start ────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`[Rome Bridge] Running on http://localhost:${PORT}`);
  console.log(`[Rome Bridge] Webhook endpoint: POST /webhook/ai-agent`);
});

export default app;
