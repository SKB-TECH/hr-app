import { apiRequest } from "@/core/lib/api-client";
import type {
  CandidateExperience,
  CandidateExperienceInput,
} from "@/core/types/candidate-experience";

export const updateCandidateExperience = (
  id: string,
  input: CandidateExperienceInput,
) =>
  apiRequest<CandidateExperience>(`candidate/experience/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  }).then((response) => response.data);
