import { apiRequest } from "@/core/lib/api-client";
import type { CandidateEducation, CandidateEducationInput } from "@/core/types/candidate-education";
import { buildEducationFormData } from "./build-education-form-data";
import { normalizeCandidateEducation } from "./normalize-candidate-education";

export const createCandidateEducation = (input: CandidateEducationInput) =>
  apiRequest<CandidateEducation>("candidates/me/educations", {
    method: "POST",
    body: buildEducationFormData(input),
  }).then((response) => normalizeCandidateEducation(response.data));
