export const DEFAULT_JOB_CATEGORIES = [
  { id: "DESIGN", code: "DESIGN", name: "Design" },
  { id: "SALES", code: "SALES", name: "Sales" },
  { id: "MARKETING", code: "MARKETING", name: "Marketing" },
  { id: "BUSINESS", code: "BUSINESS", name: "Business" },
  { id: "HUMAN_RESOURCE", code: "HUMAN_RESOURCE", name: "Human Resources" },
  { id: "FINANCE", code: "FINANCE", name: "Finance" },
  { id: "ENGINEERING", code: "ENGINEERING", name: "Engineering" },
  { id: "TECHNOLOGY", code: "TECHNOLOGY", name: "Technology" },
] as const;

export const JOB_CATEGORY_CODES: ReadonlySet<string> = new Set(
  DEFAULT_JOB_CATEGORIES.map((category) => category.code),
);
