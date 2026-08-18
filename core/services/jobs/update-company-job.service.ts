import { apiRequest } from "@/core/lib/api-client";
import type { CompanyJob, CompanyJobInput } from "@/core/types/job";

export const updateCompanyJob = (companyId: string, jobId: string, input: Partial<CompanyJobInput>) =>
  apiRequest<CompanyJob>(`companies/${companyId}/jobs/${jobId}`, { method: "PATCH", body: JSON.stringify(input) })
    .then((response) => response.data);
