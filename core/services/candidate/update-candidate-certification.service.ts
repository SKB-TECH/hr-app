import { apiRequest } from "@/core/lib/api-client";
import type { CandidateCertification, CandidateCertificationInput } from "@/core/types/candidate-certification";

export const updateCandidateCertification = (id: string, input: CandidateCertificationInput) =>
  apiRequest<CandidateCertification>(`candidate/certifications/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  }).then((response) => response.data);
