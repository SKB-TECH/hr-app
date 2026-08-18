import { apiRequest } from "@/core/lib/api-client";
import type { CompanyMember } from "@/core/types/company";
export const getCompanyMembers = (id: string) => apiRequest<CompanyMember[]>(`companies/${id}/members`).then((response) => response.data);
