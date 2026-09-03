import { apiRequest } from '@/core/lib/api-client';
import type { ChatMessage, Conversation } from '@/core/types/message';

export const getConversations = () => apiRequest<Conversation[]>('messages').then((response) => response.data);
export const getSocketToken = () => apiRequest<{ token: string }>('messages/socket-token').then((response) => response.data.token);
export const createConversation = (candidateId: string, jobId?: string, text?: string) => apiRequest<Conversation>('messages/conversations', { method: 'POST', body: JSON.stringify({ candidateId, jobId, text }) }).then((response) => response.data);
export const sendMessage = (conversationId: string, text: string, jobId?: string) => apiRequest<ChatMessage>(`messages/${conversationId}`, { method: 'POST', body: JSON.stringify({ text, ...(jobId ? { type: 'JOB_PROPOSAL', jobId } : {}) }) }).then((response) => response.data);
export const markConversationRead = (conversationId: string) => apiRequest(`messages/${conversationId}/read`, { method: 'PATCH' });
