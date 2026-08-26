"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { switchProfile, type AccountProfile } from "@/core/services/auth/switch-profile.service";
import { sessionKey } from "./use-session";

export function useSwitchProfile() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ profile }: { profile: AccountProfile }) => switchProfile(profile),
    onSuccess: (user) => {
      client.clear();
      client.setQueryData(sessionKey, user);
    },
  });
}
