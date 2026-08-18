"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInterview, type CreateInterviewInput } from "@/core/services/interviews/create-interview.service";

export function useCreateInterview(companyId: string) {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (input: CreateInterviewInput) => createInterview(input), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["interviews", "company", companyId] }) });
}
