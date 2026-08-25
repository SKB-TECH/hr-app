import { apiRequest } from "@/core/lib/api-client";
import type { CompanyJob } from "@/core/types/job";
import { normalizeCompanyJob } from "./normalize-company-job";

export const reopenCompanyJob = (jobId: string): Promise<CompanyJob> =>
  apiRequest<Record<string, unknown>>(`jobs/${jobId}/reopen`, { method: "POST" })
    .then((response) => normalizeCompanyJob(response.data));
