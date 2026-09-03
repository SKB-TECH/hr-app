import { apiRequest } from "@/core/lib/api-client";

export type GeneratedJobDraft = {
  title: string;
  location: string | null;
  employmentTypes: string[];
  category: string | null;
  salary: { min: number; max: number } | null;
  summary: string;
  responsibilities: string[];
  requiredSkills: string[];
  niceToHaveSkills: string[];
  minimumExperienceYears: number | null;
  education: string[];
  languages: string[];
  keywords: string[];
  benefits: Array<{
    title: string;
    description: string;
    icon: "Healthcare" | "Remote" | "Vacation" | "Gym" | "Learning";
  }>;
};

export const generateJobDraft = (evidence: Record<string, unknown>) =>
  apiRequest<GeneratedJobDraft>("ai/recruiter/jobs/generate", {
    method: "POST",
    headers: { "idempotency-key": crypto.randomUUID() },
    body: JSON.stringify({ evidence }),
  }).then((response) => response.data);
