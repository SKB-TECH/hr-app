import type { CompanyJob } from './job';

export type ChatMessage = { id: string; conversationId: string; senderId: string; text: string; type: 'TEXT' | 'JOB_PROPOSAL'; jobId: string | null; job: CompanyJob | null; readAt: string | null; createdAt: string; sender?: { id: string; fullName: string; avatar?: string | null } };
export type Conversation = { id: string; companyId: string; candidateId: string; company: { id: string; name: string; logo?: string | null }; candidate: { id: string; fullName: string; avatar?: string | null }; messages: ChatMessage[]; updatedAt: string };
