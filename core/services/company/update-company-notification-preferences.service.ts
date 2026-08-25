import { apiRequest } from "@/core/lib/api-client";
import type { CompanyNotificationPreferences } from "@/core/types/company";
export const updateCompanyNotificationPreferences = (companyId: string, input: Partial<Pick<CompanyNotificationPreferences, "recruiterRelated" | "subscriptionNotifications" | "billingAlerts" | "securityUpdates">>) => apiRequest<CompanyNotificationPreferences>(`companies/${companyId}/notification-preferences`, { method: "PATCH", body: JSON.stringify(input) }).then((response) => response.data);
