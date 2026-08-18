"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompanyJob } from "@/core/services/jobs/update-company-job.service";
import type { CompanyJobInput } from "@/core/types/job";
import { jobKeys } from "./job-query-keys";

export function useUpdateCompanyJob(companyId: string) { const client = useQueryClient(); return useMutation({ mutationFn: ({ jobId, input }: { jobId: string; input: Partial<CompanyJobInput> }) => updateCompanyJob(companyId, jobId, input), onSuccess: (_, variables) => { void client.invalidateQueries({ queryKey: jobKeys.company(companyId) }); void client.invalidateQueries({ queryKey: jobKeys.detail(variables.jobId) }); } }); }
