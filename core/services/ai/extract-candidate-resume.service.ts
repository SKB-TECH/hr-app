import { apiRequest } from "@/core/lib/api-client";
import type { CandidateProfileSuggestion } from "@/core/types/ai-candidate";

export const extractCandidateResume = (resumeId: string) =>
  apiRequest<CandidateProfileSuggestion>(`ai/candidate/resumes/${resumeId}/extract`, {
    method: "POST",
  }).then((response) => response.data);
