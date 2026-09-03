"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enableProfile, type AccountProfile } from "@/core/services/auth/switch-profile.service";
import { sessionKey } from "./use-session";

export function useEnableProfile() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (profile: AccountProfile) => enableProfile(profile),
    onSuccess: (user) => client.setQueryData(sessionKey, user),
  });
}
