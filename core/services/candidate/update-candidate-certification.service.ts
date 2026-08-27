import { apiRequest } from "@/core/lib/api-client";
import type { CandidateCertification, CandidateCertificationInput } from "@/core/types/candidate-certification";
import { buildCertificationFormData } from "./build-certification-form-data";
import { normalizeCandidateCertification } from "./normalize-candidate-certification";

export const updateCandidateCertification = (id: string, input: CandidateCertificationInput) =>
  apiRequest<CandidateCertification>(`candidates/me/certifications/${id}`, {
    method: "PATCH",
    body: buildCertificationFormData(input),
  }).then((response) => normalizeCandidateCertification(response.data));
