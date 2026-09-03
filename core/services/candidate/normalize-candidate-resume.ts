import { mediaUrl } from "@/core/lib/media-url";
import type { CandidateResume } from "@/core/types/candidate-resume";

export function normalizeCandidateResume(value: unknown): CandidateResume {
  const record = (value || {}) as Record<string, unknown>;
  const rawUrl = record.fileUrl ?? record.url ?? record.path ?? "";
  const rawSize = record.fileSize ?? record.size;

  return {
    id: String(record.id ?? ""),
    fileName: String(record.fileName ?? record.originalName ?? record.name ?? "Resume"),
    fileUrl: mediaUrl(rawUrl ? String(rawUrl) : null, ""),
    fileSize: typeof rawSize === "number" ? rawSize : null,
    isDefault: Boolean(record.isDefault ?? record.default ?? false),
    createdAt: String(record.createdAt ?? new Date().toISOString()),
  };
}
