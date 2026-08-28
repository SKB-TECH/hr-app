import { apiRequest } from "@/core/lib/api-client";
import type { CandidateCertification } from "@/core/types/candidate-certification";

export const getCandidateCertifications = () => apiRequest<CandidateCertification[]>("candidate/certifications");
