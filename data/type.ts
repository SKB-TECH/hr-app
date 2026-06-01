export type TagVariant = "business" | "tech" | "design" | "education";

export type CategoryIcon = "palette" | "landmark" | "server" | "briefcase" | "code";

export type Company = {
  id: string;
  name: string;
  logo: string;
};

export type RecommendedCompany = Company & {
  tag: string;
  tagVariant: TagVariant;
  jobs: number;
  description: string;
};

export type CategoryCompany = Company & {
  jobs: number;
};

export const categories = [
  "Design",
  "Fintech",
  "Hosting",
  "Business Services",
  "Dev",
] as const;

export type Category = (typeof categories)[number];
