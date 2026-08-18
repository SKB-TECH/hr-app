import { apiRequest } from "@/core/lib/api-client";
export const removeCompanyMember = (id: string, memberId: string) => apiRequest<{ removed: boolean }>(`companies/${id}/members/${memberId}`, { method: "DELETE" }).then((response) => response.data);
