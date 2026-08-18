import { apiRequest } from "@/core/lib/api-client";
export const removeCompanyTeamMember = (id: string, teamMemberId: string) => apiRequest<{ removed: boolean }>(`companies/${id}/team/${teamMemberId}`, { method: "DELETE" }).then((response) => response.data);
