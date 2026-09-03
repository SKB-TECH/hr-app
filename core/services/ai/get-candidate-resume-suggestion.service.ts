import { apiRequest } from "@/core/lib/api-client";
import type { CandidateProfileSuggestion } from "@/core/types/ai-candidate";

export const getCandidateResumeSuggestion = (resumeId: string) =>
  apiRequest<CandidateProfileSuggestion>(`ai/candidate/resumes/${resumeId}/suggestion`).then(
    (response) => response.data,
  );
