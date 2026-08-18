import { apiRequest } from "@/core/lib/api-client";
import type { AddCompanyMemberInput, CompanyMember } from "@/core/types/company";
export type UpdateCompanyMemberInput = Partial<Pick<AddCompanyMemberInput, "role" | "title">>;
export const updateCompanyMember = (id: string, memberId: string, input: UpdateCompanyMemberInput) => apiRequest<CompanyMember>(`companies/${id}/members/${memberId}`, { method: "PATCH", body: JSON.stringify(input) }).then((response) => response.data);
