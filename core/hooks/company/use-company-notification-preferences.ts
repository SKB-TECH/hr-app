"use client";
import { useQuery } from "@tanstack/react-query";
import { getCompanyNotificationPreferences } from "@/core/services/company/get-company-notification-preferences.service";
export const companyNotificationPreferencesKey = (companyId: string) => ["companies", companyId, "notification-preferences"] as const;
export function useCompanyNotificationPreferences(companyId: string) { return useQuery({ queryKey: companyNotificationPreferencesKey(companyId), queryFn: () => getCompanyNotificationPreferences(companyId), enabled: Boolean(companyId) }); }
