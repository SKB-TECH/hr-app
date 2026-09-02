import { useMutation } from "@tanstack/react-query";
import { runRecruiterWorkflow, searchAiCandidates } from "@/core/services/ai/recruiter-assistant.service";

export const useRecruiterWorkflow = (jobId: string) =>
  useMutation({ mutationFn: ({ request, limit }: { request: string; limit?: number }) => runRecruiterWorkflow(jobId, request, limit) });

export const useAiCandidateSearch = (jobId: string) =>
  useMutation({ mutationFn: ({ request, limit }: { request: string; limit?: number }) => searchAiCandidates(jobId, request, limit) });
