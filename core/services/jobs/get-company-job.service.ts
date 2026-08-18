import { apiRequest } from "@/core/lib/api-client";
import { normalizeCompanyJob } from "./normalize-company-job";

export const getCompanyJob = (_companyId: string, jobId: string) =>
  apiRequest<Record<string, unknown>>(`jobs/company/me/${jobId}`)
    .then((response) => normalizeCompanyJob(response.data));
