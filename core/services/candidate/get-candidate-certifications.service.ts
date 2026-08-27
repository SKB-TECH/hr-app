import { apiRequest } from "@/core/lib/api-client";
import type { ApiEnvelope } from "@/core/types/api";
import type { CandidateCertification } from "@/core/types/candidate-certification";
import { normalizeCandidateCertification } from "./normalize-candidate-certification";

export const getCandidateCertifications = () =>
  apiRequest<CandidateCertification[]>("candidates/me/certifications").then(
    (response) =>
      ({
        ...response,
        data: response.data.map(normalizeCandidateCertification),
      }) as ApiEnvelope<CandidateCertification[]>,
  );
