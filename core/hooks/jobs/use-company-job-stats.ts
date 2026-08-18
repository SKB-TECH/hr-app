"use client";

import { useQuery } from "@tanstack/react-query";
import { getCompanyJobStats } from "@/core/services/jobs/get-company-job-stats.service";
import { jobKeys } from "./job-query-keys";

export function useCompanyJobStats(enabled = true) {
  return useQuery({
    queryKey: [...jobKeys.all, "company-stats"],
    queryFn: getCompanyJobStats,
    enabled,
  });
}
