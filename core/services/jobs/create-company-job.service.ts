import { apiRequest } from "@/core/lib/api-client";
import type { CompanyJob, CompanyJobInput } from "@/core/types/job";

export const createCompanyJob = (companyId: string, input: CompanyJobInput) =>
  apiRequest<CompanyJob>(`companies/${companyId}/jobs`, { method: "POST", body: JSON.stringify(input) })
    .then((response) => response.data);
