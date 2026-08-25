import { apiRequest } from "@/core/lib/api-client";
import type { CompanyJob, CompanyJobInput } from "@/core/types/job";
import { normalizeCompanyJob } from "./normalize-company-job";

export const createCompanyJob = async (_companyId: string, input: CompanyJobInput): Promise<CompanyJob> => {
  const { status, requirements, ...fields } = input;
  const created = await apiRequest<Record<string, unknown>>("jobs", {
    method: "POST",
    body: JSON.stringify({ ...fields, whoYouAre: requirements }),
  });
  const job = normalizeCompanyJob(created.data);
  if (status === "LIVE") {
    await apiRequest(`jobs/${job.id}/publish`, { method: "POST" });
    return { ...job, status: "LIVE", publishedAt: new Date().toISOString() };
  }
  return job;
};
