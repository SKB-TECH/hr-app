"use client";
import { useMutation } from "@tanstack/react-query";
import { generateJobDraft } from "@/core/services/ai/generate-job-draft.service";

export const useGenerateJobDraft = () => useMutation({ mutationFn: generateJobDraft });
