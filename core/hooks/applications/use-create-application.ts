"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApplication } from "@/core/services/applications/create-application.service";
import { myApplicationKeys } from "./my-application-query-keys";

export function useCreateApplication() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => void client.invalidateQueries({ queryKey: myApplicationKeys.all }),
  });
}
