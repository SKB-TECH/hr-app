"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCandidateProfileBranding } from "@/core/services/candidate/update-candidate-profile-branding.service";
import { candidateProfileKeys } from "./candidate-profile-query-keys";

export function useUpdateCandidateProfileBranding() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateCandidateProfileBranding,
    onSuccess: (profile) => client.setQueryData(candidateProfileKeys.mine, profile),
  });
}
