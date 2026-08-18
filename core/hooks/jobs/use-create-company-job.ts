"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompanyJob } from "@/core/services/jobs/create-company-job.service";
import type { CompanyJobInput } from "@/core/types/job";
import { jobKeys } from "./job-query-keys";

export function useCreateCompanyJob(companyId: string) {
  const client = useQueryClient();
  return useMutation({ mutationFn: (input: CompanyJobInput) => createCompanyJob(companyId, input), onSuccess: () => void client.invalidateQueries({ queryKey: jobKeys.company(companyId) }) });
}
