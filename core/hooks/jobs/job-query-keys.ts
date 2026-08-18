import type { CompanyJobQuery } from "@/core/types/job";

export const jobKeys = {
  all: ["jobs"] as const,
  company: (companyId: string) => [...jobKeys.all, "company", companyId] as const,
  companyList: (companyId: string, query: CompanyJobQuery) => [...jobKeys.company(companyId), "list", query] as const,
  detail: (jobId: string) => [...jobKeys.all, "detail", jobId] as const,
};
