import { apiRequest, toQueryString } from "@/core/lib/api-client";
import type { PaginatedEnvelope } from "@/core/types/api";
import type { ApplicationQuery, CompanyApplication } from "@/core/types/application";

export const getCompanyApplications = (companyId: string, query: ApplicationQuery = {}) =>
  apiRequest<CompanyApplication[]>(`applications/company/${companyId}${toQueryString(query)}`) as Promise<PaginatedEnvelope<CompanyApplication>>;
