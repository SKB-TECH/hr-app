import { apiRequest } from "@/core/lib/api-client";
import type { CandidateEducation, CandidateEducationInput } from "@/core/types/candidate-education";

export const updateCandidateEducation = (id: string, input: CandidateEducationInput) =>
  apiRequest<CandidateEducation>(`candidate/education/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  }).then((response) => response.data);
