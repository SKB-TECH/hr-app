import { apiRequest } from "@/core/lib/api-client";
import { normalizeCandidateResume } from "./normalize-candidate-resume";

export const getCandidateResumes = () =>
  apiRequest<unknown[]>("resumes").then((response) => response.data.map(normalizeCandidateResume));
