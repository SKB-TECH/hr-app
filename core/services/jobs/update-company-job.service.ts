import { apiRequest } from "@/core/lib/api-client";
import type { CompanyJobInput } from "@/core/types/job";
import { normalizeCompanyJob } from "./normalize-company-job";

export const updateCompanyJob = async (_companyId: string, jobId: string, input: Partial<CompanyJobInput>) => {
  const { status, requirements, ...fields } = input;
  const response = await apiRequest<{ data: Record<string, unknown> }>(`jobs/${jobId}`, {
    method: "PATCH",
    body: JSON.stringify({ ...fields, ...(requirements !== undefined ? { whoYouAre: requirements } : {}) }),
  });
  if (status === "LIVE") await apiRequest(`jobs/${jobId}/publish`, { method: "POST" });
  if (status === "CLOSED") await apiRequest(`jobs/${jobId}/close`, { method: "POST" });
  return normalizeCompanyJob(response.data.data);
};
