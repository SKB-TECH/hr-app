export const candidateSuggestionKeys = {
  detail: (resumeId: string) => ["candidate-resume-suggestion", resumeId] as const,
};
