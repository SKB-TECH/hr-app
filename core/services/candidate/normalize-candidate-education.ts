import { mediaUrl } from "@/core/lib/media-url";
import type { CandidateEducation } from "@/core/types/candidate-education";

export function normalizeCandidateEducation(raw: CandidateEducation): CandidateEducation {
  return {
    ...raw,
    documentFileUrl: raw.documentFileUrl ? mediaUrl(raw.documentFileUrl) : null,
  };
}
