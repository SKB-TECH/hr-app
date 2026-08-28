import { apiRequest } from "@/core/lib/api-client";
import type { CandidateEducation } from "@/core/types/candidate-education";

export const getCandidateEducations = () => apiRequest<CandidateEducation[]>("candidate/education");
