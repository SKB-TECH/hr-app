import { apiRequest, toQueryString } from "@/core/lib/api-client";
import type { PaginatedEnvelope } from "@/core/types/api";
import type { Company, CompanyQuery } from "@/core/types/company";
import { normalizeCompanyMedia } from "./normalize-company-media";
export const getCompanies = (query: CompanyQuery = {}) => apiRequest<Company[]>(`companies${toQueryString(query)}`).then((response) => ({ ...response, data: response.data.map(normalizeCompanyMedia) }) as PaginatedEnvelope<Company>);
