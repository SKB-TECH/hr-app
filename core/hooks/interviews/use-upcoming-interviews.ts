"use client";
import { useQueries } from "@tanstack/react-query";
import { getApplicationInterviews } from "@/core/services/interviews/get-application-interviews.service";
import { applicationInterviewsKey } from "./use-application-interviews";
import type { Interview } from "@/core/types/application";

export function useUpcomingInterviews(applicationIds: string[], limit = 3) {
  const results = useQueries({
    queries: applicationIds.map((id) => ({
      queryKey: applicationInterviewsKey(id),
      queryFn: () => getApplicationInterviews(id),
      enabled: Boolean(id),
    })),
  });

  const isLoading = applicationIds.length > 0 && results.some((result) => result.isLoading);
  const now = Date.now();

  const upcoming: Interview[] = results
    .flatMap((result) => (result.data as Interview[] | undefined) || [])
    .filter((interview) => new Date(interview.scheduledAt).getTime() >= now)
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, limit);

  return { data: upcoming, isLoading };
}
