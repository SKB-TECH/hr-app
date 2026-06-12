"use client";

import { SharedListingHeader } from "@/components/pages/companies/search/SharedListingHeader";
import { availableJobs, sortOptions } from "@/data/companyPageData";
import { useState } from "react";
import { JobsCard } from "./JobsCard";

interface JobsListProps {
  currentPage: number;
  pageSize: number;
}

function JobsList({ currentPage, pageSize }: JobsListProps) {
  const [viewGrid, setViewGrid] = useState(false);

  // Slice jobs based on current page
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedJobs = availableJobs.slice(startIndex, startIndex + pageSize);

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
            ? "grid grid-cols-1 md:grid-cols-2 gap-6 items-start transition-all duration-300 ease-in-out"
            : "flex flex-col gap-6 transition-all duration-300 ease-in-out"
        }
      >
        {paginatedJobs.map((company) => (
          <JobsCard key={company.id} company={company} viewGrid={viewGrid} />
        ))}
      </div>
    </main>
  );
}

export default JobsList;
