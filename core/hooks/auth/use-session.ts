"use client";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "@/core/services/auth/get-session.service";
export const sessionKey = ["auth", "session"] as const;
export function useSession() {
  return useQuery({ queryKey: sessionKey, queryFn: getSession, retry: false });
}
