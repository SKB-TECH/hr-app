import { apiRequest } from "@/core/lib/api-client";
import type { CompanyMember } from "@/core/types/company";
import { normalizeMemberMedia } from "./normalize-company-media";
export const getCompanyMembers = (id: string) => apiRequest<CompanyMember[]>(`companies/${id}/members`).then((response) => response.data.map(normalizeMemberMedia));
