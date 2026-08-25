import { apiRequest } from "@/core/lib/api-client";
import type { CompanyNotificationPreferences } from "@/core/types/company";
export const getCompanyNotificationPreferences = (companyId: string) => apiRequest<CompanyNotificationPreferences>(`companies/${companyId}/notification-preferences`).then((response) => response.data);
