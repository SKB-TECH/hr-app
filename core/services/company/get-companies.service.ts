import { apiRequest, toQueryString } from "@/core/lib/api-client";
import type { PaginatedEnvelope } from "@/core/types/api";
import type { Company, CompanyQuery } from "@/core/types/company";
export const getCompanies = (query: CompanyQuery = {}) => apiRequest<Company[]>(`companies${toQueryString(query)}`).then((response) => response as PaginatedEnvelope<Company>);
