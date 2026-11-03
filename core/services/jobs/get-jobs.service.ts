import { apiRequest, toQueryString } from "@/core/lib/api-client";
import type { PaginatedEnvelope } from "@/core/types/api";
import type { CompanyJob, CompanyJobQuery } from "@/core/types/job";
import {
  FALLBACK_COMPANY_JOBS,
  normalizeCompanyJob,
  sanitizeAndDeduplicateJobs,
} from "./normalize-company-job";

export function filterJobsList(
  jobs: CompanyJob[],
  query: CompanyJobQuery & { q?: string },
): CompanyJob[] {
  const keyword = (query.q ?? query.search ?? "").trim().toLowerCase();
  const location = (query.location ?? "").trim().toLowerCase();
  const category = (query.category ?? "").trim().toLowerCase();

  return jobs.filter((job) => {
    if (query.status && job.status !== query.status) {
      return false;
    }

    if (keyword) {
      const haystack = [
        job.title,
        job.companyName,
        job.description,
        job.category,
        job.location,
        ...job.skills,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(keyword)) {
        return false;
      }
    }

    if (location) {
      const jobLoc = (job.location || "").toLowerCase();
      if (!jobLoc.includes(location)) {
        return false;
      }
    }

    if (category) {
      const jobCat = (job.category || "").toLowerCase();
      const normalizedFilterCat = category.replace(/[_-]+/g, " ");
      const matchesCat =
        jobCat.includes(normalizedFilterCat) ||
        normalizedFilterCat.includes(jobCat) ||
        job.skills.some((s) => s.toLowerCase().includes(normalizedFilterCat));
      if (!matchesCat) {
        return false;
      }
    }

    return true;
  });
}

export const getJobs = async (
  query: CompanyJobQuery & { q?: string } = {},
): Promise<PaginatedEnvelope<CompanyJob>> => {
  const q = query.q ?? query.search;
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.max(1, Number(query.limit) || 10);

  try {
    const response = (await apiRequest<Record<string, unknown>[]>(
      `jobs${toQueryString({
        ...query,
        q: q || undefined,
        keyword: q || undefined,
        search: undefined,
      })}`,
    )) as PaginatedEnvelope<Record<string, unknown>>;

    const normalized = Array.isArray(response.data)
      ? response.data.map((item, idx) => normalizeCompanyJob(item, idx))
      : [];
    const cleaned = sanitizeAndDeduplicateJobs(normalized);
    const filtered = filterJobsList(cleaned, query);
    const totalPages = Math.max(1, Math.ceil(filtered.length / limit));

    return {
      statusCode: response.statusCode ?? 200,
      message: response.message ?? "OK",
      data: filtered,
      meta: response.meta
        ? {
            ...response.meta,
            totalItems: filtered.length,
          }
        : {
            totalItems: filtered.length,
            totalPages,
            currentPage: page,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
          },
    };
  } catch {
    const filtered = filterJobsList(FALLBACK_COMPANY_JOBS, query);
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    const totalPages = Math.max(1, Math.ceil(filtered.length / limit));

    return {
      statusCode: 200,
      message: "OK",
      data: paginated,
      meta: {
        totalItems: filtered.length,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
};
