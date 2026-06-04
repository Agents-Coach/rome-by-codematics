// Evolution API → Rome Bridge webhook payload
export interface EvolutionWebhookPayload {
  instance: string;
  event: string;
  data: {
    key: {
      remoteJid: string;
      fromMe: boolean;
      id?: string;
    };
    pushName?: string;
    message?: {
      conversation?: string;
      extendedTextMessage?: {
        text?: string;
        contextInfo?: {
          quotedMessage?: {
            conversation?: string;
          };
        };
      };
      imageMessage?: {
        caption?: string;
        url?: string;
        mimetype?: string;
      };
      documentMessage?: {
        caption?: string;
        fileName?: string;
      };
      videoMessage?: {
        caption?: string;
      };
    };
    messageTimestamp?: string | number;
  };
}

// Parsed message for the AI
export interface ParsedMessage {
  text: string;
  senderName: string;
  senderNumber: string;
  isGroup: boolean;
  isFromMe: boolean;
  quotedText?: string;
  timestamp: Date;
  messageId: string;
}

// Agent configuration stored in DB
export interface AgentConfig {
  id: string;
  userId: string;
  name: string;
  personality: 'friendly' | 'professional' | 'casual';
  offerName: string;
  offerDescription: string;
  price: string;
  ctaMessage: string;
  introMessage: string;
  calendarLink?: string;
  talkToHumanKeywords: string[];
  faqs: FAQ[];
  objections: Objection[];
  evolutionApiKey: string;
  evolutionInstance: string;
  evolutionUrl: string;
  status: 'active' | 'paused';
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Objection {
  objection: string;
  response: string;
}

// Claude API types
export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClaudeResponse {
  content: string;
  stopReason: string;
}

// Send message to WhatsApp via Evolution API
export interface SendTextRequest {
  number: string;
  text: string;
}

// DB row types (for Prisma)
export interface UserRow {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  plan: 'starter' | 'pro' | 'agency';
  createdAt: Date;
}

export interface ConversationRow {
  id: string;
  agentId: string;
  senderNumber: string;
  senderName: string;
  messages: MessageRow[];
}

export interface MessageRow {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}
