import { apiRequest, toQueryString } from "@/core/lib/api-client";
import type { PaginatedEnvelope } from "@/core/types/api";
import type { CompanyJob, CompanyJobQuery } from "@/core/types/job";
import { normalizeCompanyJob } from "./normalize-company-job";

export const getJobs = (query: CompanyJobQuery = {}) =>
  apiRequest<Record<string, unknown>[]>(
    `jobs${toQueryString({ ...query, keyword: query.search, search: undefined })}`,
  ).then(
    (response) =>
      ({
        ...response,
        data: response.data.map(normalizeCompanyJob),
      }) as PaginatedEnvelope<CompanyJob>,
  );
