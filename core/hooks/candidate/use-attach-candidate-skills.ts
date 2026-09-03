"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { attachCandidateSkills } from "@/core/services/candidate/attach-candidate-skills.service";
import { candidateSkillKeys } from "./candidate-skill-query-keys";

export function useAttachCandidateSkills() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: attachCandidateSkills,
    onSuccess: () => void client.invalidateQueries({ queryKey: candidateSkillKeys.mine }),
  });
}
