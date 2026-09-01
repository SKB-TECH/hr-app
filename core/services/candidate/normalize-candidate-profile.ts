import { mediaUrl } from "@/core/lib/media-url";
import type { CandidateProfile } from "@/core/types/candidate-profile";

export function normalizeCandidateProfile(raw: CandidateProfile): CandidateProfile {
  return {
    ...raw,
    avatar: raw.avatar ? mediaUrl(raw.avatar) : null,
  };
}
