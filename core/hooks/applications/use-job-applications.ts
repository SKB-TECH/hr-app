"use client";
import { useQuery } from "@tanstack/react-query";
import { getJobApplications } from "@/core/services/applications/get-job-applications.service";
import type { ApplicationQuery } from "@/core/types/application";

export const useJobApplications = (jobId: string, query: ApplicationQuery = {}) =>
  useQuery({ queryKey: ["applications", "job", jobId, query], queryFn: () => getJobApplications(jobId, query), enabled: Boolean(jobId) });
