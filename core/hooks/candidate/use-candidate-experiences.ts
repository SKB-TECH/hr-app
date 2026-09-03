"use client";

import { useQuery } from "@tanstack/react-query";
import { getCandidateExperiences } from "@/core/services/candidate/get-candidate-experiences.service";
import { candidateExperienceKeys } from "./candidate-experience-query-keys";

export function useCandidateExperiences() {
  return useQuery({
    queryKey: candidateExperienceKeys.mine,
    queryFn: () =>
      getCandidateExperiences().then((response) => {
        // console.log("useCandidateExperiences response:", response);
        return Array.isArray(response.data.experiences)
          ? response.data.experiences
          : [];
      }),
  });
}
