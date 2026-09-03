import { apiRequest } from "@/core/lib/api-client";
import type { CompanyJob } from "@/core/types/job";
import { normalizeCompanyJob } from "./normalize-company-job";

export const getJob = (id: string) =>
  apiRequest<Record<string, unknown>>(`jobs/${id}`).then((response) => normalizeCompanyJob(response.data));
