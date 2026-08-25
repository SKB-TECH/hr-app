import { apiRequest } from "@/core/lib/api-client";
import type { CompanyJob } from "@/core/types/job";
import { normalizeCompanyJob } from "./normalize-company-job";

export const duplicateCompanyJob = (jobId: string): Promise<CompanyJob> =>
  apiRequest<Record<string, unknown>>(`jobs/${jobId}/duplicate`, { method: "POST" })
    .then((response) => normalizeCompanyJob(response.data));
