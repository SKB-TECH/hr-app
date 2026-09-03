export const candidateSkillKeys = {
  all: ["candidate-skills"] as const,
  mine: ["candidate-skills", "mine"] as const,
  categories: ["candidate-skills", "categories"] as const,
  directory: (search: string) => ["candidate-skills", "directory", search] as const,
};
