import { NextRequest, NextResponse } from "next/server";
import { buildHeaders, buildUpstreamUrl } from "@/core/lib/proxy-handler";
import { filterJobsList } from "@/core/services/jobs/get-jobs.service";
import {
  FALLBACK_COMPANY_JOBS,
  normalizeCompanyJob,
  sanitizeAndDeduplicateJobs,
} from "@/core/services/jobs/normalize-company-job";
import type { CompanyJob, JobStatus } from "@/core/types/job";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const q = (
    searchParams.get("q") ??
    searchParams.get("keyword") ??
    searchParams.get("search") ??
    ""
  ).trim();
  const location = (searchParams.get("location") ?? "").trim();
  const category = (searchParams.get("category") ?? "").trim();
  const statusParam = (searchParams.get("status") ?? "").trim().toUpperCase();
  const status = (
    ["DRAFT", "LIVE", "CLOSED"].includes(statusParam) ? statusParam : undefined
  ) as JobStatus | undefined;

  const parsedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const parsedLimit = Number.parseInt(searchParams.get("limit") ?? "10", 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const limit =
    Number.isFinite(parsedLimit) && parsedLimit > 0
      ? Math.min(parsedLimit, 100)
      : 10;

  let sourceJobs: CompanyJob[] = FALLBACK_COMPANY_JOBS;

  try {
    const upstreamParams = new URLSearchParams();
    if (q) upstreamParams.set("keyword", q);
    if (location) upstreamParams.set("location", location);
    if (category) upstreamParams.set("category", category);
    if (status) upstreamParams.set("status", status);

    const upstreamQuery = upstreamParams.toString()
      ? `?${upstreamParams.toString()}`
      : "";
    const upstreamUrl = buildUpstreamUrl(["jobs"], upstreamQuery);

    if (/^https?:\/\//i.test(upstreamUrl)) {
      const response = await fetch(upstreamUrl, {
        method: "GET",
        headers: buildHeaders(request),
        cache: "no-store",
        signal: AbortSignal.timeout(4000),
      });

      if (response.ok) {
        const payload = (await response.json()) as {
          data?: Record<string, unknown>[];
        };
        if (Array.isArray(payload?.data) && payload.data.length > 0) {
          sourceJobs = sanitizeAndDeduplicateJobs(
            payload.data.map((item, idx) => normalizeCompanyJob(item, idx)),
          );
        }
      }
    }
  } catch {
    // Fallback to clean deduplicated seed dataset when upstream is unreachable
    sourceJobs = FALLBACK_COMPANY_JOBS;
  }

  const filtered = filterJobsList(sourceJobs, {
    q,
    location,
    category,
    status,
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * limit;
  const paginatedData = filtered.slice(startIndex, startIndex + limit);

  return NextResponse.json(
    {
      success: true,
      statusCode: 200,
      timestamp: new Date().toISOString(),
      message: "Jobs retrieved successfully",
      filters: {
        q: q || null,
        location: location || null,
        category: category || null,
        page: safePage,
        limit,
      },
      data: paginatedData,
      meta: {
        totalItems,
        itemCount: paginatedData.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: safePage,
      },
    },
    { status: 200 },
  );
}

