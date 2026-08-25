"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateCompanyJob } from "@/core/services/jobs/duplicate-company-job.service";
import { jobKeys } from "./job-query-keys";

export function useDuplicateCompanyJob(companyId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: duplicateCompanyJob,
    onSuccess: () => void client.invalidateQueries({ queryKey: jobKeys.company(companyId) }),
  });
}
