import { apiRequest } from "@/core/lib/api-client";
import type { CandidateExperience } from "@/core/types/candidate-experience";

export const getCandidateExperiences = () => apiRequest<CandidateExperience[]>("candidate/experience");
