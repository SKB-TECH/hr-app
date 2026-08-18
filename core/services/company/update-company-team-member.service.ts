import { apiRequest } from "@/core/lib/api-client";
import type { CompanyTeamMember, CompanyTeamMemberInput } from "@/core/types/company";
export const updateCompanyTeamMember = (id: string, teamMemberId: string, input: Partial<CompanyTeamMemberInput>) => apiRequest<CompanyTeamMember>(`companies/${id}/team/${teamMemberId}`, { method: "PATCH", body: JSON.stringify(input) }).then((response) => response.data);
