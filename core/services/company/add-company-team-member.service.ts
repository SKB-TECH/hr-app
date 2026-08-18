import { apiRequest } from "@/core/lib/api-client";
import type { CompanyTeamMember, CompanyTeamMemberInput } from "@/core/types/company";
export const addCompanyTeamMember = (id: string, input: CompanyTeamMemberInput) => apiRequest<CompanyTeamMember>(`companies/${id}/team`, { method: "POST", body: JSON.stringify(input) }).then((response) => response.data);
