"use client";

import { useQuery } from "@tanstack/react-query";
import { getApplicationInterviews } from "@/core/services/interviews/get-application-interviews.service";

export const applicationInterviewsKey = (id: string) => ["interviews", "application", id] as const;

export function useApplicationInterviews(applicationId?: string) {
  return useQuery({
    queryKey: applicationInterviewsKey(applicationId || ""),
    queryFn: () => getApplicationInterviews(applicationId!),
    enabled: Boolean(applicationId),
  });
}
