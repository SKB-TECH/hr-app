import { apiRequest } from "@/core/lib/api-client";
import type { CandidateProfile } from "@/core/types/candidate-profile";
import { normalizeCandidateProfile } from "./normalize-candidate-profile";

export const getMyCandidateProfile = () =>
  apiRequest<CandidateProfile>("candidate/profile/info").then((response) =>
    normalizeCandidateProfile(response.data),
  );
