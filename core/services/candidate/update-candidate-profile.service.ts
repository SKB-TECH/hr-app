import { apiRequest } from "@/core/lib/api-client";
import type { CandidateProfile, CandidateProfileInput } from "@/core/types/candidate-profile";
import { normalizeCandidateProfile } from "./normalize-candidate-profile";

export const updateCandidateProfile = (input: CandidateProfileInput) =>
  apiRequest<CandidateProfile>("candidates/profile/me", {
    method: "PATCH",
    body: JSON.stringify(input),
  }).then((response) => normalizeCandidateProfile(response.data));
