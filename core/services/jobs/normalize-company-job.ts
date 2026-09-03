import { mediaUrl } from "@/core/lib/media-url";
import type { CompanyJob } from "@/core/types/job";

type ApiJob = Record<string, unknown>;

export function normalizeCompanyJob(value: ApiJob): CompanyJob {
  const company = (value.company || {}) as Record<string, unknown>;
  const companyLogo = company.logoUrl ?? company.logo;

  return {
    id: String(value.id),
    companyId: String(value.companyId ?? company.id ?? ""),
    title: String(value.title || "Untitled job"),
    status: (value.status || "DRAFT") as CompanyJob["status"],
    employmentTypes: Array.isArray(value.employmentTypes)
      ? value.employmentTypes.map(String)
      : value.employmentType
        ? [String(value.employmentType)]
        : [],
    category: value.category ? String(value.category) : null,
    location: value.location ? String(value.location) : null,
    companyName: company.name ? String(company.name) : null,
    companyLogoUrl: companyLogo ? mediaUrl(String(companyLogo)) : null,
    minSalary: numberOrNull(value.salaryMin),
    maxSalary: numberOrNull(value.salaryMax),
    description: value.description ? String(value.description) : null,
    responsibilities: value.responsibilities ? String(value.responsibilities) : null,
    requirements: value.whoYouAre ? String(value.whoYouAre) : null,
    niceToHave: value.niceToHaves ? String(value.niceToHaves) : null,
    skills: Array.isArray(value.skills)
      ? value.skills.map((skill) =>
          typeof skill === "string"
            ? skill
            : String((skill as { skill?: { name?: string } }).skill?.name || ""),
        ).filter(Boolean)
      : [],
    applicantsCount: Number(value.applicationsCount || 0),
    hiredCount: Number(value.hiredCount || 0),
    hiringTarget: Number(value.capacity || 1),
    publishedAt: value.postedAt ? String(value.postedAt) : null,
    closesAt: value.applyBefore ? String(value.applyBefore) : null,
    createdAt: String(value.createdAt),
    updatedAt: String(value.updatedAt),
  };
}

function numberOrNull(value: unknown) {
  return value === null || value === undefined ? null : Number(value);
}
