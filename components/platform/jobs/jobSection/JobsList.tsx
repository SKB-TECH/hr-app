import { sortOptions } from "@/data/companyPageData";
import { JobsCard } from "./JobsCard";
import { SharedListingHeader } from "../../companies/search/SharedListingHeader";
import { SectionSkeleton } from "@/components/dashboard/candidate/applicant/profile/shared/Skeleton";
import Pagination from "../ReusablePagination/ReusablePagination";
import { useJobs } from "@/core/hooks/jobs/use-jobs";

interface JobsListProps {
  currentPage: number;
  pageSize: number;
  viewGrid: boolean;
  setViewGrid: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  onPageChange: (page: number) => void;
  getApplyLink: (id: string | number) => string;
}

function JobsList({
  currentPage,
  pageSize,
  viewGrid,
  setViewGrid,
  search,
  onPageChange,
  getApplyLink,
}: JobsListProps) {
  const { data: jobsPage, isLoading, isError } = useJobs({ page: currentPage, limit: pageSize, search });
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
        header="All Jobs"
      />

      {isLoading && <SectionSkeleton rows={4} />}

      {!isLoading && isError && (
        <p className="text-[14px] text-gray-500">
          We couldn&apos;t load jobs right now. Please refresh the page to try again.
        </p>
      )}

      {!isLoading && !isError && jobs.length === 0 && (
        <p className="text-[14px] text-gray-500">No jobs match your search right now.</p>
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
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </main>
  );
}

export default JobsList;
