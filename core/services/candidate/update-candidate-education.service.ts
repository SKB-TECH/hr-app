import { apiRequest } from "@/core/lib/api-client";
import type { CandidateEducation, CandidateEducationInput } from "@/core/types/candidate-education";
import { buildEducationFormData } from "./build-education-form-data";
import { normalizeCandidateEducation } from "./normalize-candidate-education";

export const updateCandidateEducation = (id: string, input: CandidateEducationInput) =>
  apiRequest<CandidateEducation>(`candidates/me/educations/${id}`, {
    method: "PATCH",
    body: buildEducationFormData(input),
  }).then((response) => normalizeCandidateEducation(response.data));
