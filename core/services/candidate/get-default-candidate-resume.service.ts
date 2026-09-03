import { apiRequest } from "@/core/lib/api-client";
import { normalizeCandidateResume } from "./normalize-candidate-resume";

export const getDefaultCandidateResume = () =>
  apiRequest<unknown>("resumes/default").then((response) => normalizeCandidateResume(response.data));
