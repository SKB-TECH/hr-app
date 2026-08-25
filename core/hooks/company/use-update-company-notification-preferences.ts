"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompanyNotificationPreferences } from "@/core/services/company/update-company-notification-preferences.service";
import type { CompanyNotificationPreferences } from "@/core/types/company";
import { companyNotificationPreferencesKey } from "./use-company-notification-preferences";
export function useUpdateCompanyNotificationPreferences(companyId: string) { const client = useQueryClient(); return useMutation({ mutationFn: (input: Partial<Pick<CompanyNotificationPreferences, "recruiterRelated" | "subscriptionNotifications" | "billingAlerts" | "securityUpdates">>) => updateCompanyNotificationPreferences(companyId, input), onSuccess: (data) => client.setQueryData(companyNotificationPreferencesKey(companyId), data) }); }
