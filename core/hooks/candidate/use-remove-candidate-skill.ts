"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCandidateSkill } from "@/core/services/candidate/remove-candidate-skill.service";
import { candidateSkillKeys } from "./candidate-skill-query-keys";

export function useRemoveCandidateSkill() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (skillId: string) => removeCandidateSkill(skillId),
    onSuccess: () => void client.invalidateQueries({ queryKey: candidateSkillKeys.mine }),
  });
}
