import { apiRequest } from "@/core/lib/api-client";
export const revokeCompanyInvitation = (id: string, invitationId: string) => apiRequest<{ revoked: boolean }>(`companies/${id}/invitations/${invitationId}`, { method: "DELETE" }).then((response) => response.data);
