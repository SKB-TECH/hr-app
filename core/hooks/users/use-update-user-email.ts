"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserEmail } from "@/core/services/users/update-user-email.service";
import { sessionKey } from "@/core/hooks/auth/use-session";

export function useUpdateUserEmail() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateUserEmail,
    onSuccess: (user) => client.setQueryData(sessionKey, user),
  });
}
