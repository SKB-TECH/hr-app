import { availableJobs, sortOptions } from "@/data/companyPageData";
import { JobsCard } from "./JobsCard";
import { SharedListingHeader } from "../../companies/search/SharedListingHeader";

interface JobsListProps {
  currentPage: number;
  pageSize: number;
  viewGrid: boolean;
  setViewGrid: React.Dispatch<React.SetStateAction<boolean>>;
  getApplyLink: (id: string | number) => string;
}

function JobsList({
  currentPage,
  pageSize,
  viewGrid,
  setViewGrid,
  getApplyLink,
}: JobsListProps) {
  // Slice jobs based on current page
  const paginatedJobs = availableJobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  return (
    <main className="flex-1">
      <SharedListingHeader
        totalResults={availableJobs.length}
        sortOptions={sortOptions}
        viewGrid={viewGrid}
        setViewGrid={setViewGrid}
        header="All Jobs"
      />

      <div
        className={
          viewGrid
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start transition-all duration-300 ease-in-out"
            : "flex flex-col gap-6 transition-all duration-300 ease-in-out"
        }
      >
        {paginatedJobs.map((company) => (
          <JobsCard
            key={company.id}
            company={company}
            viewGrid={viewGrid}
            applyLink={getApplyLink(company.id)}
          />
        ))}
      </div>
    </main>
  );
}

export default JobsList;
