import { apiRequest } from "@/core/lib/api-client";

export const removeCompanyJob = (companyId: string, jobId: string) =>
  apiRequest<{ removed: boolean }>(`companies/${companyId}/jobs/${jobId}`, { method: "DELETE" })
    .then((response) => response.data);
