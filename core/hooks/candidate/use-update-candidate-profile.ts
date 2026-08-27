"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCandidateProfile } from "@/core/services/candidate/update-candidate-profile.service";
import { candidateProfileKeys } from "./candidate-profile-query-keys";

export function useUpdateCandidateProfile() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateCandidateProfile,
    onSuccess: (profile) => client.setQueryData(candidateProfileKeys.mine, profile),
  });
}
