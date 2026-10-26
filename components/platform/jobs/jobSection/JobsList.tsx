"use client";

import { useTranslations } from "next-intl";
import { sortOptions } from "@/data/companyPageData";
import { JobsCard } from "./JobsCard";
import { SharedListingHeader } from "../../companies/search/SharedListingHeader";
import { SectionSkeleton } from "@/components/dashboard/candidate/applicant/profile/shared/Skeleton";
import Pagination from "../ReusablePagination/ReusablePagination";
import { useJobs } from "@/core/hooks/jobs/use-jobs";
import { Briefcase } from "lucide-react";

interface JobsListProps {
  currentPage: number;
  pageSize: number;
  viewGrid: boolean;
  setViewGrid: React.Dispatch<React.SetStateAction<boolean>>;
  search?: string;
  location?: string;
  category?: string;
  onPageChange: (page: number) => void;
  getApplyLink: (id: string | number) => string;
}

function JobsList({
  currentPage,
  pageSize,
  viewGrid,
  setViewGrid,
  search = "",
  location = "",
  category = "",
  onPageChange,
  getApplyLink,
}: JobsListProps) {
  const t = useTranslations("findJobs");
  const { data: jobsPage, isLoading, isError } = useJobs({
    page: currentPage,
    limit: pageSize,
    search: search || undefined,
    location: location || undefined,
    category: category || undefined,
  });
  const jobs = jobsPage?.data ?? [];
  const totalResults = jobsPage?.meta?.totalItems ?? jobs.length;
  const totalPages = jobsPage?.meta?.totalPages ?? 1;

  return (
    <main className="flex-1">
      <SharedListingHeader
        totalResults={totalResults}
        sortOptions={sortOptions}
        viewGrid={viewGrid}
        setViewGrid={setViewGrid}
        header={t("listing.header")}
      />

      {isLoading && <SectionSkeleton rows={4} />}

      {!isLoading && isError && (
        <div className="p-8 border border-red-200 bg-red-50/50 rounded-none text-center">
          <p className="text-[14px] text-red-600 font-medium">
            {t("listing.errorLoading")}
          </p>
        </div>
      )}

      {!isLoading && !isError && jobs.length === 0 && (
        <div className="p-12 border border-[#D6DDEB] bg-white rounded-none text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-[#F8F9FC] border border-[#D6DDEB] flex items-center justify-center text-[#4640DE] mb-4">
            <Briefcase size={24} />
          </div>
          <h3 className="text-lg font-bold text-[#132745] font-clash">
            {t("listing.noResults")}
          </h3>
          <p className="text-sm text-[#7C8493] mt-1 max-w-sm">
            Try adjusting your search keywords, role title, or location filter.
          </p>
        </div>
      )}

      {!isLoading && !isError && jobs.length > 0 && (
        <div
          className={
            viewGrid
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start transition-all duration-300 ease-in-out"
              : "flex flex-col gap-6 transition-all duration-300 ease-in-out"
          }
        >
          {jobs.map((job) => (
            <JobsCard key={job.id} job={job} viewGrid={viewGrid} applyLink={getApplyLink(job.id)} />
          ))}
        </div>
      )}

      {!isLoading && !isError && totalPages > 1 && (
        <div className="mt-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
      )}
    </main>
  );
}

export default JobsList;

