import { apiRequest } from "@/core/lib/api-client";

export type AiCandidateOutput = {
  rank: number;
  candidateId: string;
  name: string;
  matchScore: number;
  eligible: boolean;
  explanation?: unknown;
  questions?: unknown;
  outreach?: unknown;
  brief?: unknown;
};

export type RecruiterWorkflowResult = {
  workflowId?: string;
  intent?: string;
  outputs?: AiCandidateOutput[];
  comparison?: unknown;
  errors?: string[];
  requiresHumanReview?: boolean;
};

export type CandidateSearchResult = {
  criteria?: Record<string, unknown>;
  candidates?: Array<Record<string, unknown>>;
  requiresHumanReview?: boolean;
};

async function postAi<T>(path: string, request: string, limit: number): Promise<T> {
  const response = await apiRequest<T>(path, {
    method: "POST",
    headers: { "idempotency-key": crypto.randomUUID() },
    body: JSON.stringify({ request, limit }),
  });
  return ((response as { data?: T }).data ?? response) as T;
}

export const runRecruiterWorkflow = (jobId: string, request: string, limit = 5) =>
  postAi<RecruiterWorkflowResult>(`ai/recruiter/jobs/${jobId}/workflows`, request, limit);

export const searchAiCandidates = (jobId: string, request: string, limit = 10) =>
  postAi<CandidateSearchResult>(`ai/recruiter/jobs/${jobId}/search`, request, limit);
