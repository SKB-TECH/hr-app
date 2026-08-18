import { apiRequest } from "@/core/lib/api-client";
export const acceptCompanyInvitation = (token: string) => apiRequest<{ companyId: string; accepted: boolean }>("companies/invitations/accept", { method: "POST", body: JSON.stringify({ token }) }).then((response) => response.data);
