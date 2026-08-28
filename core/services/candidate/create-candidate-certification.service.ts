import { apiRequest } from "@/core/lib/api-client";
import type { CandidateCertification, CandidateCertificationInput } from "@/core/types/candidate-certification";

export const createCandidateCertification = (input: CandidateCertificationInput) =>
  apiRequest<CandidateCertification>("candidate/certifications", {
    method: "POST",
    body: JSON.stringify(input),
  }).then((response) => response.data);
