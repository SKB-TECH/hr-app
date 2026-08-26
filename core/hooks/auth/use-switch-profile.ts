"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enableProfile, switchProfile, type AccountProfile } from "@/core/services/auth/switch-profile.service";
import { sessionKey } from "./use-session";

export function useSwitchProfile() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ profile, enable = false }: { profile: AccountProfile; enable?: boolean }) => {
      if (enable) await enableProfile(profile);
      return switchProfile(profile);
    },
    onSuccess: (user) => {
      client.clear();
      client.setQueryData(sessionKey, user);
    },
  });
}
