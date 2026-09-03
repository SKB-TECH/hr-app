import { apiRequest } from "@/core/lib/api-client";

export const deleteCandidateResumeSuggestion = (resumeId: string) =>
  apiRequest<null>(`ai/candidate/resumes/${resumeId}/suggestion`, {
    method: "DELETE",
  }).then((response) => response.data);
