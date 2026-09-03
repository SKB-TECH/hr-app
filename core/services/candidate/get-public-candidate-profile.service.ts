import { apiRequest } from "@/core/lib/api-client";
import type { PublicCandidateProfile } from "@/core/types/public-candidate-profile";

export const getPublicCandidateProfile = (profileId: string) =>
  apiRequest<PublicCandidateProfile>(`public/candidates/${profileId}`).then((response) => response.data);
