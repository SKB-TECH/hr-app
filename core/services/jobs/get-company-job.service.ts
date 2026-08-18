import { apiRequest } from "@/core/lib/api-client";
import type { CompanyJob } from "@/core/types/job";

export const getCompanyJob = (companyId: string, jobId: string) =>
  apiRequest<CompanyJob>(`companies/${companyId}/jobs/${jobId}`).then((response) => response.data);
