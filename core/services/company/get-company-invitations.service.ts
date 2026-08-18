import { apiRequest } from "@/core/lib/api-client";
import type { CompanyInvitation } from "@/core/types/company";
export const getCompanyInvitations = (id: string) => apiRequest<CompanyInvitation[]>(`companies/${id}/invitations`).then((response) => response.data);
