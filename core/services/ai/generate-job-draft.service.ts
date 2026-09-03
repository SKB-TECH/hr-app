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

function stringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

function normalizeGeneratedJobDraft(value: unknown): GeneratedJobDraft {
  const draft =
    value && typeof value === "object"
      ? (value as Record<string, unknown>)
      : {};
  const salary =
    draft.salary && typeof draft.salary === "object"
      ? (draft.salary as Record<string, unknown>)
      : null;
  const rawBenefits = Array.isArray(draft.benefits) ? draft.benefits : [];

  return {
    title: typeof draft.title === "string" ? draft.title : "",
    location: typeof draft.location === "string" ? draft.location : null,
    employmentTypes: stringList(draft.employmentTypes),
    category: typeof draft.category === "string" ? draft.category : null,
    salary:
      salary && typeof salary.min === "number" && typeof salary.max === "number"
        ? { min: salary.min, max: salary.max }
        : null,
    summary:
      typeof draft.summary === "string"
        ? draft.summary
        : typeof draft.description === "string"
          ? draft.description
          : "",
    responsibilities: stringList(draft.responsibilities),
    requiredSkills: stringList(draft.requiredSkills ?? draft.skills),
    niceToHaveSkills: stringList(
      draft.niceToHaveSkills ?? draft.niceToHave,
    ),
    minimumExperienceYears:
      typeof draft.minimumExperienceYears === "number"
        ? draft.minimumExperienceYears
        : null,
    education: stringList(draft.education),
    languages: stringList(draft.languages),
    keywords: stringList(draft.keywords),
    benefits: rawBenefits.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const benefit = item as Record<string, unknown>;
      if (typeof benefit.title !== "string" || !benefit.title.trim()) return [];
      return [
        {
          title: benefit.title.trim(),
          description:
            typeof benefit.description === "string"
              ? benefit.description
              : "",
          icon:
            typeof benefit.icon === "string"
              ? (benefit.icon as GeneratedJobDraft["benefits"][number]["icon"])
              : "Healthcare",
        },
      ];
    }),
  };
}

export const generateJobDraft = (evidence: Record<string, unknown>) =>
  apiRequest<GeneratedJobDraft>("ai/recruiter/jobs/generate", {
    method: "POST",
    headers: { "idempotency-key": crypto.randomUUID() },
    body: JSON.stringify({ evidence }),
  }).then((response) => normalizeGeneratedJobDraft(response.data));
