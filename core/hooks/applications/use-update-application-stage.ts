"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApplicationStage } from "@/core/services/applications/update-application-stage.service";

export function useUpdateApplicationStage(jobId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ applicationId, stageId, note }: { applicationId: string; stageId: string; note?: string }) => updateApplicationStage(applicationId, stageId, note),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications", "job", jobId] }),
  });
}
