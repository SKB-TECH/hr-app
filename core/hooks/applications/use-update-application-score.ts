"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApplicationScore } from "@/core/services/applications/update-application-score.service";

export function useUpdateApplicationScore(applicationId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (score: number) => updateApplicationScore(applicationId, score),
    onSuccess: (application) => {
      client.setQueryData(["applications", "detail", applicationId], application);
      void client.invalidateQueries({ queryKey: ["applications", "company"] });
      void client.invalidateQueries({ queryKey: ["applications", "job"] });
    },
  });
}
