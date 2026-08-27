import { apiRequest } from "@/core/lib/api-client";
import type { ApiEnvelope } from "@/core/types/api";
import type { CandidateEducation } from "@/core/types/candidate-education";
import { normalizeCandidateEducation } from "./normalize-candidate-education";

export const getCandidateEducations = () =>
  apiRequest<CandidateEducation[]>("candidates/me/educations").then(
    (response) =>
      ({
        ...response,
        data: response.data.map(normalizeCandidateEducation),
      }) as ApiEnvelope<CandidateEducation[]>,
  );
