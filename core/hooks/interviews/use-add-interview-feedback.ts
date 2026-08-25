"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addInterviewFeedback } from "@/core/services/interviews/add-interview-feedback.service";
import { applicationInterviewsKey } from "./use-application-interviews";

export function useAddInterviewFeedback(applicationId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ interviewId, feedback }: { interviewId: string; feedback: string }) => addInterviewFeedback(interviewId, feedback),
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: applicationInterviewsKey(applicationId) });
      void client.invalidateQueries({ queryKey: ["interviews", "company"] });
    },
  });
}
