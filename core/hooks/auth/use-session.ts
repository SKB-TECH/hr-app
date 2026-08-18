"use client";
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/core/services/auth.service";
export const sessionKey = ["auth", "session"] as const;
export function useSession() {
  return useQuery({ queryKey: sessionKey, queryFn: authService.me, retry: false });
}
