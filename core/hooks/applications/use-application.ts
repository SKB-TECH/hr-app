"use client";
import { useQuery } from "@tanstack/react-query";
import { getApplication } from "@/core/services/applications/get-application.service";

export const useApplication = (applicationId: string) =>
  useQuery({ queryKey: ["applications", "detail", applicationId], queryFn: () => getApplication(applicationId), enabled: Boolean(applicationId) });
