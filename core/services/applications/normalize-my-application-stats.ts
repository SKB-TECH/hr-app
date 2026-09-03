import type { MyApplicationStats } from "@/core/types/application";

function numberOr(value: unknown, fallback = 0): number {
  return typeof value === "number" ? value : fallback;
}

export function normalizeMyApplicationStats(value: unknown): MyApplicationStats {
  const record = (value || {}) as Record<string, unknown>;

  return {
    totalApplied: numberOr(record.totalApplied ?? record.total ?? record.totalApplications),
    interviewed: numberOr(record.interviewed ?? record.interviews ?? record.interviewCount),
    shortlisted: numberOr(record.shortlisted ?? record.shortlistedCount),
    hired: numberOr(record.hired ?? record.hiredCount),
    rejected: numberOr(record.rejected ?? record.declined ?? record.unsuitable),
  };
}
