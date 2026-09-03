"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishCompanyJob } from "@/core/services/jobs/publish-company-job.service";
import { jobKeys } from "./job-query-keys";

export function usePublishCompanyJob(companyId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: publishCompanyJob,
    onSuccess: (_, jobId) => {
      void client.invalidateQueries({ queryKey: jobKeys.company(companyId) });
      void client.invalidateQueries({ queryKey: jobKeys.detail(jobId) });
    },
  });
}
