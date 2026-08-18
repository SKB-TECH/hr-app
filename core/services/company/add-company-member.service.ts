import { apiRequest } from "@/core/lib/api-client";
import type { AddCompanyMemberInput, CompanyInvitation, CompanyMember } from "@/core/types/company";
export const addCompanyMember = (id: string, input: AddCompanyMemberInput) => apiRequest<CompanyMember | CompanyInvitation>(`companies/${id}/members`, { method: "POST", body: JSON.stringify(input) }).then((response) => response.data);
