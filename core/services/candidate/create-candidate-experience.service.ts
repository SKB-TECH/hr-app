import { apiRequest } from "@/core/lib/api-client";
import type {
  CandidateExperience,
  CandidateExperienceInput,
} from "@/core/types/candidate-experience";

export const createCandidateExperience = (input: CandidateExperienceInput) =>
  apiRequest<CandidateExperience>("candidate/experience", {
    method: "POST",
    body: JSON.stringify(input),
  }).then((response) => response.data);
