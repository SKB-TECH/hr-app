import { apiRequest } from "@/core/lib/api-client";
import type { CandidateProfile, CandidateProfileBrandingInput } from "@/core/types/candidate-profile";
import { normalizeCandidateProfile } from "./normalize-candidate-profile";

export function updateCandidateProfileBranding(input: CandidateProfileBrandingInput) {
  const body = new FormData();
  if (input.avatarFile) body.append("avatarFile", input.avatarFile);
  if (input.coverFile) body.append("coverFile", input.coverFile);
  return apiRequest<CandidateProfile>("candidates/profile/me/branding", {
    method: "PATCH",
    body,
  }).then((response) => normalizeCandidateProfile(response.data));
}
