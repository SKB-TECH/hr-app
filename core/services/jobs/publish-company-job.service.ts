import { apiRequest } from "@/core/lib/api-client";

export const publishCompanyJob = (jobId: string) =>
  apiRequest<{ jobId: string; status: "LIVE" }>(`jobs/${jobId}/publish`, {
    method: "POST",
  }).then((response) => response.data);
