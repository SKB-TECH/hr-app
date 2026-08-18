"use client";
import { useQuery } from "@tanstack/react-query";
import { getCompanyJob } from "@/core/services/jobs/get-company-job.service";
import { jobKeys } from "./job-query-keys";

export function useCompanyJob(companyId?: string, jobId?: string) { return useQuery({ queryKey: jobKeys.detail(jobId || ""), queryFn: () => getCompanyJob(companyId!, jobId!), enabled: Boolean(companyId && jobId) }); }
