import { apiRequest } from "@/core/lib/api-client";
import { normalizeCandidateResume } from "./normalize-candidate-resume";

export const setDefaultCandidateResume = (resumeId: string) =>
  apiRequest<unknown>(`resumes/default/${resumeId}`, {
    method: "PATCH",
  }).then((response) => normalizeCandidateResume(response.data));
