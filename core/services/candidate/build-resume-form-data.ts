import type { CandidateResumeInput } from "@/core/types/candidate-resume";

export function buildResumeFormData(input: CandidateResumeInput) {
  const body = new FormData();
  body.append("file", input.file);
  return body;
}
