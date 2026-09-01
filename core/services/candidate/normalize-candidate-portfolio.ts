import { mediaUrl } from "@/core/lib/media-url";
import type { CandidatePortfolio } from "@/core/types/candidate-portfolio";

export function normalizeCandidatePortfolio(raw: CandidatePortfolio): CandidatePortfolio {
  return {
    ...raw,
    thumbnailUrl: raw.thumbnailUrl ? mediaUrl(raw.thumbnailUrl) : null,
  };
}
