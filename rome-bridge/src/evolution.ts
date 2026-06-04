import axios, { AxiosInstance } from 'axios';
import type { SendTextRequest } from '../types';

export class EvolutionClient {
  private client: AxiosInstance;
  private instance: string;

  constructor(baseUrl: string, apiKey: string, instance: string) {
    this.instance = instance;
    this.client = axios.create({
      baseURL: `${baseUrl.replace(/\/$/, '')}`,
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey,
      },
      timeout: 15_000,
    });
  }

  /**
   * Send a text message to a WhatsApp number.
   * Number format: "919876543210@s.whatsapp.net" or "919876543210"
   */
  async sendText(payload: SendTextRequest): Promise<void> {
    const number = payload.number.includes('@')
      ? payload.number
      : `${payload.number}@s.whatsapp.net`;

    // Evolution API v2 endpoint shape: /messages/sendText/{instanceName}
    await this.client.post(`/messages/sendText/${this.instance}`, {
      number,
      text: payload.text,
    });
  }

  /**
   * Send a text message to a group.
   * Group JID format: "123456789-987654321@g.us"
   */
  async sendGroupText(groupJid: string, text: string): Promise<void> {
    await this.client.post(`/messages/sendText/${this.instance}`, {
      number: groupJid,
      text,
    });
  }

  /**
   * Get connection state of this instance.
   * Returns: 'open' | 'close' | 'connecting' | 'refused' | 'logout'
   */
  async getConnectionState(): Promise<string> {
    const res = await this.client.get(`/instance/connectionState/${this.instance}`);
    return res.data?.instance?.state ?? 'unknown';
  }

  /**
   * Get QR code for authentication (if using Baileys).
   * Returns base64 image string.
   */
  async getQrCode(): Promise<string | null> {
    // For Baileys, QR code is fetched via the connection endpoint
    const res = await this.client.post(`/instance/connect/${this.instance}`, {});
    return res.data?.qrcode?.code ?? res.data?.qr?.code ?? null;
  }

  /**
   * Check if the instance is connected and ready.
   */
  async isConnected(): Promise<boolean> {
    try {
      const state = await this.getConnectionState();
      return state === 'open';
    } catch {
      return false;
    }
  }

  /**
   * Set webhook URL for this instance.
   * All events will be forwarded to this URL.
   */
  async setWebhook(webhookUrl: string, webhookByEvents: boolean = true): Promise<void> {
    await this.client.post(`/webhook/set/${this.instance}`, {
      webhook: {
        url: webhookUrl,
        enabled: true,
        webhookByEvents,
      },
    });
  }

  /**
   * Get chat history for a specific contact.
   */
  async getChatHistory(remoteJid: string, limit: number = 50): Promise<any[]> {
    const res = await this.client.get(`/chat/findMessages/${this.instance}`, {
      params: { where: JSON.stringify({ key: { remoteJid } }), limit },
    });
    return res.data ?? [];
  }

  /**
   * Send typing indicator (typing or recording).
   */
  async sendPresence(remoteJid: string, type: 'typing' | 'recording' = 'typing'): Promise<void> {
    await this.client.post(`/chat/sendPresence/${this.instance}`, {
      number: remoteJid,
      groupJid: remoteJid.includes('@g.us') ? remoteJid : undefined,
      presence: type === 'typing' ? 'composing' : 'recording',
    });
  }
}
