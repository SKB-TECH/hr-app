import { apiRequest } from "@/core/lib/api-client";
import type { CandidateCertification, CandidateCertificationInput } from "@/core/types/candidate-certification";
import { buildCertificationFormData } from "./build-certification-form-data";
import { normalizeCandidateCertification } from "./normalize-candidate-certification";

export const createCandidateCertification = (input: CandidateCertificationInput) =>
  apiRequest<CandidateCertification>("candidates/me/certifications", {
    method: "POST",
    body: buildCertificationFormData(input),
  }).then((response) => normalizeCandidateCertification(response.data));
