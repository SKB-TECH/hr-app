"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reopenCompanyJob } from "@/core/services/jobs/reopen-company-job.service";
import { jobKeys } from "./job-query-keys";

export function useReopenCompanyJob(companyId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: reopenCompanyJob,
    onSuccess: (job) => {
      client.setQueryData(jobKeys.detail(job.id), job);
      void client.invalidateQueries({ queryKey: jobKeys.company(companyId) });
    },
  });
}
