import { apiRequest } from "@/core/lib/api-client";

export const removeCompanyJob = (_companyId: string, jobId: string) =>
  apiRequest<{ jobId: string; status: "CLOSED" }>(`jobs/${jobId}`, { method: "DELETE" })
    .then((response) => response.data);
