"use client";
import { useQuery } from "@tanstack/react-query";
import { getJob } from "@/core/services/jobs/get-job.service";

export function useJob(id?: string) {
  return useQuery({
    queryKey: ["jobs", "public", "detail", id],
    queryFn: () => getJob(id as string),
    enabled: Boolean(id),
  });
}
