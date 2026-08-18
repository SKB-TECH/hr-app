"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/core/services/auth.service";
import { sessionKey } from "./use-session";
export function useLogin() {
  const client = useQueryClient();
  return useMutation({ mutationFn: authService.login, onSuccess: (user) => client.setQueryData(sessionKey, user) });
}
