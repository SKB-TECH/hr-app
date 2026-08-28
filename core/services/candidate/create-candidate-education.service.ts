import { apiRequest } from "@/core/lib/api-client";
import type { CandidateEducation, CandidateEducationInput } from "@/core/types/candidate-education";

export const createCandidateEducation = (input: CandidateEducationInput) =>
  apiRequest<CandidateEducation>("candidate/education", {
    method: "POST",
    body: JSON.stringify(input),
  }).then((response) => response.data);
