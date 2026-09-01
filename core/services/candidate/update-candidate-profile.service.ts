import { apiRequest } from "@/core/lib/api-client";
import type { CandidateProfile, CandidateProfileInput } from "@/core/types/candidate-profile";
import { buildCandidateProfileFormData } from "./build-candidate-profile-form-data";
import { normalizeCandidateProfile } from "./normalize-candidate-profile";

export const updateCandidateProfile = (input: CandidateProfileInput) =>
  apiRequest<CandidateProfile>("candidate/profile/update", {
    method: "PATCH",
    body: buildCandidateProfileFormData(input),
  }).then((response) => normalizeCandidateProfile(response.data));
