import { apiRequest, toQueryString } from "@/core/lib/api-client";
import type { PaginatedEnvelope } from "@/core/types/api";
import type { CompanyJob, CompanyJobQuery } from "@/core/types/job";

export const getCompanyJobs = (companyId: string, query: CompanyJobQuery = {}) =>
  apiRequest<CompanyJob[]>(`companies/${companyId}/jobs${toQueryString(query)}`)
    .then((response) => response as PaginatedEnvelope<CompanyJob>);
