import { apiRequest } from "@/core/lib/api-client";
import type { CandidateResumeInput } from "@/core/types/candidate-resume";
import { buildResumeFormData } from "./build-resume-form-data";
import { normalizeCandidateResume } from "./normalize-candidate-resume";

export const createCandidateResume = (input: CandidateResumeInput) =>
  apiRequest<unknown>("resumes", {
    method: "POST",
    body: buildResumeFormData(input),
  }).then((response) => normalizeCandidateResume(response.data));
