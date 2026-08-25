"use client";

import { useQuery } from "@tanstack/react-query";
import { getApplicationHistory } from "@/core/services/applications/get-application-history.service";

export const applicationHistoryKey = (id: string) => ["applications", "history", id] as const;

export function useApplicationHistory(applicationId?: string) {
  return useQuery({
    queryKey: applicationHistoryKey(applicationId || ""),
    queryFn: () => getApplicationHistory(applicationId!),
    enabled: Boolean(applicationId),
  });
}
