"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/core/services/auth/login.service";
import { sessionKey } from "./use-session";
export function useLogin() {
  const client = useQueryClient();
  return useMutation({ mutationFn: login, onSuccess: (user) => client.setQueryData(sessionKey, user) });
}
