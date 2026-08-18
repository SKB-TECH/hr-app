"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCompanyJob } from "@/core/services/jobs/remove-company-job.service";
import { jobKeys } from "./job-query-keys";

export function useRemoveCompanyJob(companyId: string) { const client = useQueryClient(); return useMutation({ mutationFn: (jobId: string) => removeCompanyJob(companyId, jobId), onSuccess: () => void client.invalidateQueries({ queryKey: jobKeys.company(companyId) }) }); }
