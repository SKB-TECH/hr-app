"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { closeAccount } from "@/core/services/users/close-account.service";

export function useCloseAccount() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: closeAccount,
    onSuccess: () => client.clear(),
  });
}
