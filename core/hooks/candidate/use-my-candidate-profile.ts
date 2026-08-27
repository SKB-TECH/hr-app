"use client";
import { useQuery } from "@tanstack/react-query";
import { getMyCandidateProfile } from "@/core/services/candidate/get-my-candidate-profile.service";
import { candidateProfileKeys } from "./candidate-profile-query-keys";

export function useMyCandidateProfile() {
  return useQuery({
    queryKey: candidateProfileKeys.mine,
    queryFn: getMyCandidateProfile,
    retry: false,
  });
}
