import { mediaUrl } from "@/core/lib/media-url";
import type { MyApplication, PipelineStage } from "@/core/types/application";

export function normalizeMyApplication(value: unknown): MyApplication {
  const record = (value || {}) as Record<string, unknown>;
  const job = (record.job || {}) as Record<string, unknown>;
  const company = (job.company || record.company || {}) as Record<string, unknown>;
  const logo = company.logoUrl ?? company.logo;

  return {
    id: String(record.id ?? ""),
    jobId: String(record.jobId ?? job.id ?? ""),
    job: {
      id: String(job.id ?? record.jobId ?? ""),
      title: String(job.title ?? "Untitled role"),
      companyName: company.name ? String(company.name) : null,
      companyLogoUrl: logo ? mediaUrl(String(logo)) : null,
      location: job.location ? String(job.location) : null,
      employmentTypes: Array.isArray(job.employmentTypes) ? job.employmentTypes.map(String) : [],
    },
    stageId: record.stageId ? String(record.stageId) : null,
    stage: (record.stage as PipelineStage | null) ?? null,
    appliedAt: String(record.appliedAt ?? record.createdAt ?? new Date().toISOString()),
  };
}
