import { mediaUrl } from "@/core/lib/media-url";
import type { CandidateCertification } from "@/core/types/candidate-certification";

export function normalizeCandidateCertification(raw: CandidateCertification): CandidateCertification {
  return {
    ...raw,
    certificateFileUrl: raw.certificateFileUrl ? mediaUrl(raw.certificateFileUrl) : null,
  };
}
