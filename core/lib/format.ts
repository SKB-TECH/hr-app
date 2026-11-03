const CATEGORY_LABELS: Record<string, string> = {
  DESIGN: "Design",
  SALES: "Sales",
  MARKETING: "Marketing",
  BUSINESS: "Business",
  HUMAN_RESOURCE: "Human Resources",
  HUMAN_RESOURCES: "Human Resources",
  FINANCE: "Finance",
  ENGINEERING: "Engineering",
  TECHNOLOGY: "Technology",
};

export function humanizeEmploymentType(value: string): string {
  return value
    .toLowerCase()
    .split(/[_-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function resolveJobCategory(
  rawCategory: string | null | undefined,
  title?: string | null,
  description?: string | null,
): string | null {
  const normalizedTitle = (title || "").toLowerCase();
  const normalizedDesc = (description || "").toLowerCase();

  // Prevent misassigning UX/UI or Design roles to HUMAN_RESOURCE or wrong categories
  if (/\b(ux|ui|designer|product design|graphic|visual design)\b/i.test(normalizedTitle)) {
    return "Design";
  }

  // Prevent misassigning Developer / Engineering roles or duties to HUMAN_RESOURCE
  const isDeveloperTitle =
    /\b(developer|développeur|engineer|ingénieur|full[- ]?stack|frontend|front-end|backend|back-end|devops|architect|software)\b/i.test(
      normalizedTitle,
    );
  const hasDeveloperDuties =
    /\b(full[- ]?stack|react|next\.?js|node\.?js|typescript|api|backend|frontend|database|microservices|software development)\b/i.test(
      normalizedDesc,
    );

  const upperRaw = (rawCategory || "").trim().toUpperCase().replace(/\s+/g, "_");

  if (isDeveloperTitle) {
    if (upperRaw === "TECHNOLOGY") return "Technology";
    return "Engineering";
  }

  if (
    (upperRaw === "HUMAN_RESOURCE" || upperRaw === "HUMAN_RESOURCES") &&
    hasDeveloperDuties &&
    !/\b(hr|human resource|recruiter|talent|people|ressources humaines)\b/i.test(normalizedTitle)
  ) {
    return "Engineering";
  }

  if (!rawCategory || !rawCategory.trim()) {
    return null;
  }

  if (CATEGORY_LABELS[upperRaw]) {
    return CATEGORY_LABELS[upperRaw];
  }

  return rawCategory
    .trim()
    .toLowerCase()
    .split(/[_-\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
