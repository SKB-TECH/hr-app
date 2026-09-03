"use client";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/core/services/jobs/get-jobs.service";
import type { CompanyJobQuery } from "@/core/types/job";

export function useJobs(query: CompanyJobQuery = {}) {
  return useQuery({
    queryKey: ["jobs", "public", query],
    queryFn: () => getJobs(query),
  });
}
