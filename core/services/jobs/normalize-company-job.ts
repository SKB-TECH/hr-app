import { resolveJobCategory } from "@/core/lib/format";
import { mediaUrl } from "@/core/lib/media-url";
import type { CompanyJob } from "@/core/types/job";

type ApiJob = Record<string, unknown>;

const UX_UI_REALISTIC_DESCRIPTION =
  "Design intuitive, accessible user interfaces and end-to-end digital experiences across web and mobile applications. Collaborate with product managers and engineers to build scalable Figma design systems, user flows, wireframes, and interactive prototypes.";

const PRODUCT_DESIGNER_REALISTIC_DESCRIPTION =
  "Lead user research, interaction design, and high-fidelity prototyping for core platform workflows. Translate complex business requirements into cohesive, human-centered UX/UI patterns.";

const FULL_STACK_REALISTIC_DESCRIPTION =
  "Architect, build, and scale resilient full-stack web applications using TypeScript, React, Next.js, and modern Node.js backend services. Drive code quality, API performance, and cloud deployment pipelines.";

export function normalizeCompanyJob(value: ApiJob, index = 0): CompanyJob {
  const company = (value.company || {}) as Record<string, unknown>;
  const companyLogo = company.logoUrl ?? company.logo;

  const rawTitle = String(value.title || "Untitled job").trim();
  const isUxUiCopy =
    /designer\s*ux\s*\/\s*ui\s*\(\s*copy\s*\)/i.test(rawTitle) ||
    /\(\s*copy\s*\)/i.test(rawTitle);

  const cleanedTitle = isUxUiCopy
    ? /designer\s*ux\s*\/\s*ui/i.test(rawTitle)
      ? "Senior Product Designer (UX/UI)"
      : rawTitle.replace(/\s*\(\s*copy\s*\)\s*/gi, "").trim()
    : rawTitle;

  const isUxUiRole = /\b(designer\s*ux\/ui|ux\/ui|product\s*designer)\b/i.test(
    cleanedTitle,
  );
  const isFullStackRole = /\b(full[- ]?stack\s*developer)\b/i.test(cleanedTitle);

  let rawDescription = value.description ? String(value.description).trim() : null;

  // Fix erroneous developer descriptions mapped onto UX/UI Designer roles
  const hasMisassignedDeveloperDuties =
    rawDescription !== null &&
    /\b(full[- ]?stack|backend|back-end|node\.?js|database|server-side|api\s+development|software\s+engineer|développeur\s+full)\b/i.test(
      rawDescription,
    );

  if (isUxUiCopy) {
    rawDescription = PRODUCT_DESIGNER_REALISTIC_DESCRIPTION;
  } else if (isUxUiRole && (!rawDescription || hasMisassignedDeveloperDuties)) {
    rawDescription = UX_UI_REALISTIC_DESCRIPTION;
  } else if (isFullStackRole && !rawDescription) {
    rawDescription = FULL_STACK_REALISTIC_DESCRIPTION;
  }

  const rawCategory = value.category ? String(value.category) : null;
  const resolvedCategory = resolveJobCategory(
    rawCategory,
    cleanedTitle,
    rawDescription,
  );

  let skills = Array.isArray(value.skills)
    ? value.skills
        .map((skill) =>
          typeof skill === "string"
            ? skill
            : String((skill as { skill?: { name?: string } }).skill?.name || ""),
        )
        .filter(Boolean)
    : [];

  if (isUxUiRole) {
    const hasDevOnlySkills = skills.some((s) =>
      /\b(node\.?js|postgresql|mongodb|docker|kubernetes|express|nestjs|sql)\b/i.test(
        s,
      ),
    );
    if (skills.length === 0 || hasDevOnlySkills) {
      skills = isUxUiCopy
        ? ["Product Design", "Design Systems", "User Research", "Figma"]
        : ["UX/UI Design", "Figma", "Prototyping", "Wireframing"];
    }
  } else if (isFullStackRole && skills.length === 0) {
    skills = ["TypeScript", "Next.js", "React", "Node.js"];
  }

  // Deduplicate skills
  const uniqueSkills = Array.from(new Set(skills));

  const rawId = value.id ? String(value.id).trim() : `job-${index + 1}`;

  return {
    id: rawId,
    companyId: String(value.companyId ?? company.id ?? `company-${index + 1}`),
    title: cleanedTitle,
    status: (value.status || "LIVE") as CompanyJob["status"],
    employmentTypes: Array.isArray(value.employmentTypes) && value.employmentTypes.length > 0
      ? Array.from(new Set(value.employmentTypes.map(String)))
      : value.employmentType
        ? [String(value.employmentType)]
        : ["FULL_TIME"],
    category: resolvedCategory,
    location: value.location ? String(value.location) : "Remote",
    companyName: company.name
      ? String(company.name)
      : value.companyName
        ? String(value.companyName)
        : "Infinity Company",
    companyLogoUrl: companyLogo
      ? mediaUrl(String(companyLogo))
      : value.companyLogoUrl
        ? String(value.companyLogoUrl)
        : null,
    minSalary: numberOrNull(value.salaryMin ?? value.minSalary),
    maxSalary: numberOrNull(value.salaryMax ?? value.maxSalary),
    description: rawDescription,
    responsibilities: value.responsibilities ? String(value.responsibilities) : null,
    requirements: value.whoYouAre
      ? String(value.whoYouAre)
      : value.requirements
        ? String(value.requirements)
        : null,
    niceToHave: value.niceToHaves
      ? String(value.niceToHaves)
      : value.niceToHave
        ? String(value.niceToHave)
        : null,
    skills: uniqueSkills,
    applicantsCount: Number(value.applicationsCount ?? value.applicantsCount ?? 0),
    hiredCount: Number(value.hiredCount || 0),
    hiringTarget: Number(value.capacity ?? value.hiringTarget ?? 1),
    publishedAt: value.postedAt
      ? String(value.postedAt)
      : value.publishedAt
        ? String(value.publishedAt)
        : null,
    closesAt: value.applyBefore
      ? String(value.applyBefore)
      : value.closesAt
        ? String(value.closesAt)
        : null,
    createdAt: value.createdAt ? String(value.createdAt) : "2026-01-15T10:00:00.000Z",
    updatedAt: value.updatedAt ? String(value.updatedAt) : "2026-01-15T10:00:00.000Z",
  };
}

/**
 * Deduplicates job listings (such as duplicate "Senior Full-Stack Developer" at Infinity Company)
 * and guarantees every job item has a distinct ID to prevent React key collision errors.
 */
export function sanitizeAndDeduplicateJobs(jobs: CompanyJob[]): CompanyJob[] {
  const seenSignatures = new Set<string>();
  const usedIds = new Set<string>();
  const result: CompanyJob[] = [];

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const normalizedTitle = job.title.trim().toLowerCase();
    const normalizedCompany = (job.companyName || "").trim().toLowerCase();
    const signature = `${normalizedTitle}::${normalizedCompany}`;

    if (seenSignatures.has(signature)) {
      continue;
    }
    seenSignatures.add(signature);

    let distinctId = job.id || `job-${i + 1}`;
    if (usedIds.has(distinctId)) {
      distinctId = `${distinctId}-${i + 1}`;
    }
    usedIds.add(distinctId);

    result.push({
      ...job,
      id: distinctId,
    });
  }

  return result;
}

export const FALLBACK_COMPANY_JOBS: CompanyJob[] = sanitizeAndDeduplicateJobs([
  normalizeCompanyJob(
    {
      id: "f2h-job-fullstack-1",
      companyId: "company-infinity",
      title: "Senior Full-Stack Developer",
      status: "LIVE",
      employmentTypes: ["FULL_TIME"],
      category: "ENGINEERING",
      location: "Kinshasa, DRC / Remote",
      company: { id: "company-infinity", name: "Infinity Company", logoUrl: "/logo/lgo.png" },
      salaryMin: 4500,
      salaryMax: 7000,
      description: FULL_STACK_REALISTIC_DESCRIPTION,
      skills: ["TypeScript", "Next.js", "Node.js", "PostgreSQL"],
      applicationsCount: 14,
      capacity: 2,
    },
    0,
  ),
  normalizeCompanyJob(
    {
      id: "f2h-job-uxui-2",
      companyId: "company-infinity",
      title: "Designer UX/UI",
      status: "LIVE",
      employmentTypes: ["FULL_TIME"],
      category: "DESIGN",
      location: "Kigali, Rwanda / Remote",
      company: { id: "company-infinity", name: "Infinity Company", logoUrl: "/logo/lgo.png" },
      salaryMin: 3200,
      salaryMax: 5000,
      description: UX_UI_REALISTIC_DESCRIPTION,
      skills: ["UX/UI Design", "Figma", "Prototyping", "Wireframing"],
      applicationsCount: 9,
      capacity: 1,
    },
    1,
  ),
  normalizeCompanyJob(
    {
      id: "f2h-job-product-design-3",
      companyId: "company-dropbox",
      title: "Senior Product Designer (UX/UI)",
      status: "LIVE",
      employmentTypes: ["FULL_TIME"],
      category: "DESIGN",
      location: "San Francisco, USA",
      company: { id: "company-dropbox", name: "Dropbox", logoUrl: "/Dropbox.png" },
      salaryMin: 5500,
      salaryMax: 8200,
      description: PRODUCT_DESIGNER_REALISTIC_DESCRIPTION,
      skills: ["Product Design", "Design Systems", "User Research", "Figma"],
      applicationsCount: 18,
      capacity: 2,
    },
    2,
  ),
  normalizeCompanyJob(
    {
      id: "f2h-job-cloud-4",
      companyId: "company-terraform",
      title: "Lead Cloud Infrastructure Engineer",
      status: "LIVE",
      employmentTypes: ["FULL_TIME"],
      category: "TECHNOLOGY",
      location: "Hamburg, Germany",
      company: { id: "company-terraform", name: "Terraform", logoUrl: "/Terraform.png" },
      salaryMin: 6000,
      salaryMax: 9000,
      description:
        "Design and automate multi-region cloud infrastructure, Kubernetes clusters, and zero-downtime deployment pipelines for enterprise workloads.",
      skills: ["Terraform", "Kubernetes", "AWS", "CI/CD"],
      applicationsCount: 11,
      capacity: 2,
    },
    3,
  ),
  normalizeCompanyJob(
    {
      id: "f2h-job-marketing-5",
      companyId: "company-revolut",
      title: "Growth & Lifecycle Marketing Manager",
      status: "LIVE",
      employmentTypes: ["FULL_TIME"],
      category: "MARKETING",
      location: "Madrid, Spain",
      company: { id: "company-revolut", name: "Revolut", logoUrl: "/revolut.png" },
      salaryMin: 4000,
      salaryMax: 6200,
      description:
        "Own multi-channel customer acquisition, CRM lifecycle automation, and data-driven brand campaigns across European markets.",
      skills: ["Growth Marketing", "CRM", "Analytics", "Brand Strategy"],
      applicationsCount: 15,
      capacity: 1,
    },
    4,
  ),
  normalizeCompanyJob(
    {
      id: "f2h-job-frontend-6",
      companyId: "company-canva",
      title: "Principal Frontend Architect",
      status: "LIVE",
      employmentTypes: ["FULL_TIME"],
      category: "ENGINEERING",
      location: "Ankara, Turkey",
      company: { id: "company-canva", name: "Canva", logoUrl: "/Canva.png" },
      salaryMin: 5800,
      salaryMax: 8500,
      description:
        "Lead frontend architecture, rendering performance optimization, and accessible component libraries for millions of creative users.",
      skills: ["React", "TypeScript", "WebGL", "Performance"],
      applicationsCount: 21,
      capacity: 1,
    },
    5,
  ),
  normalizeCompanyJob(
    {
      id: "f2h-job-business-7",
      companyId: "company-pitch",
      title: "Enterprise Account Director",
      status: "LIVE",
      employmentTypes: ["FULL_TIME"],
      category: "BUSINESS",
      location: "Berlin, Germany",
      company: { id: "company-pitch", name: "Pitch", logoUrl: "/Pitch.png" },
      salaryMin: 4800,
      salaryMax: 7500,
      description:
        "Drive strategic enterprise partnerships, executive client relationships, and revenue expansion across EMEA B2B accounts.",
      skills: ["Enterprise Sales", "B2B Strategy", "Negotiation", "SaaS"],
      applicationsCount: 7,
      capacity: 3,
    },
    6,
  ),
  normalizeCompanyJob(
    {
      id: "f2h-job-hr-8",
      companyId: "company-classpass",
      title: "Head of People & Talent Acquisition",
      status: "LIVE",
      employmentTypes: ["FULL_TIME"],
      category: "HUMAN_RESOURCE",
      location: "Paris, France",
      company: { id: "company-classpass", name: "ClassPass", logoUrl: "/ClassPass.png" },
      salaryMin: 4200,
      salaryMax: 6400,
      description:
        "Lead executive recruitment strategy, organizational development, employer branding, and inclusive talent programs globally.",
      skills: ["Executive Search", "Talent Strategy", "HR Operations", "People Ops"],
      applicationsCount: 12,
      capacity: 1,
    },
    7,
  ),
]);

function numberOrNull(value: unknown) {
  return value === null || value === undefined ? null : Number(value);
}
