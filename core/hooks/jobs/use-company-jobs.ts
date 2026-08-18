"use client";
import { useQuery } from "@tanstack/react-query";
import { getCompanyJobs } from "@/core/services/jobs/get-company-jobs.service";
import type { CompanyJobQuery } from "@/core/types/job";
import { jobKeys } from "./job-query-keys";

export function useCompanyJobs(companyId?: string, query: CompanyJobQuery = {}) {
  return useQuery({ queryKey: jobKeys.companyList(companyId || "", query), queryFn: () => getCompanyJobs(companyId!, query), enabled: Boolean(companyId) });
}
