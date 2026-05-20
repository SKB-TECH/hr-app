"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import SearchInput from "../static/SearchInput";
import { JobCard } from "../ui/JobCard";
import { Job } from "../../core/types";
import ReusableHero from "../shared/ReusableHero";

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

function AllJobs({
  jobsList,
  fetchError,
  pagination,
  searchQuery,
}: {
  jobsList: Job[];
  fetchError?: string;
  pagination: PaginationInfo | null;
  searchQuery?: string;
}) {
  const t = useTranslations("jobs");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Simple function to change page
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  // Generate simple page numbers (just 1,2,3,4,5...)
  const getPageNumbers = () => {
    if (!pagination) return [];
    const pages = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Show jobs with pagination
  const pageNumbers = getPageNumbers();
  const startItem = pagination
    ? (pagination.currentPage - 1) * pagination.itemsPerPage + 1
    : 1;
  const endItem = pagination
    ? Math.min(
        pagination.currentPage * pagination.itemsPerPage,
        pagination.totalItems,
      )
    : jobsList.length;

  return (
    <div className="bg-white min-h-screen">
      <ReusableHero>
        <h2 className="font-bold text-4xl leading-tight sm:text-5xl md:text-6xl text-white wrap-break-word">
          {t("title").toUpperCase()}
        </h2>
      </ReusableHero>
      {/* Search Section */}
      <div className="bg-[#fcfcfc] py-16">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <SearchInput />
        </div>
      </div>
      {/* Jobs List */}
      <div className="w-full max-w-7xl mx-auto px-6 py-16 md:px-12">
        {fetchError ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-600 mb-6">{fetchError}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#00c896] text-white rounded-lg hover:bg-[#00a87e] transition-colors"
            >
              {t("tryAgain")}
            </button>
          </div>
        ) : jobsList.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {searchQuery ? `No jobs found for "${searchQuery}"` : t("noJobs")}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {jobsList.map((job: Job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Pagination - only show if there are multiple pages */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-8 border-t mt-8">
                <p className="text-sm text-gray-500">
                  {t("showing")} {startItem} - {endItem} {t("of")}{" "}
                  {pagination.totalItems} {t("entries")}
                </p>

                <div className="flex items-center gap-2 text-sm">
                  {/* Previous Button */}
                  {pagination.currentPage > 1 && (
                    <button
                      onClick={() => goToPage(pagination.currentPage - 1)}
                      className="px-3 py-1 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      ← Previous
                    </button>
                  )}

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {pageNumbers.map((pageNum, index) => (
                      <div key={pageNum} className="flex items-center gap-1">
                        <button
                          onClick={() => goToPage(pageNum)}
                          className={`px-2 py-1 rounded transition-colors cursor-pointer hover:bg-gray-100 ${
                            pageNum === pagination.currentPage
                              ? " text-black font-bold"
                              : "text-gray-600 "
                          }`}
                        >
                          {pageNum}
                        </button>
                        {index < pageNumbers.length - 1 && (
                          <span className="text-gray-300">|</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Next Button */}
                  {pagination.currentPage < pagination.totalPages && (
                    <button
                      onClick={() => goToPage(pagination.currentPage + 1)}
                      className="px-3 py-1 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      Next →
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AllJobs;
