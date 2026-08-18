"use client";
import { useQuery } from "@tanstack/react-query";
import { getPipelineStages } from "@/core/services/applications/get-pipeline-stages.service";

export const usePipelineStages = (companyId: string) =>
  useQuery({ queryKey: ["pipeline-stages", companyId], queryFn: () => getPipelineStages(companyId), enabled: Boolean(companyId) });
