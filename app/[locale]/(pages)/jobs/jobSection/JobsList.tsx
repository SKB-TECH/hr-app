"use client";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { SharedListingHeader } from "@/components/companies/SharedListingHeader";
import { availableJobs, sortOptions } from "@/data/companyPageData";

import { useState } from "react";
import { JobsCard } from "./JobsCard";

function JobsList() {
  const [viewGrid, setViewGrid] = useState(false);

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
          viewGrid === true
            ? "grid grid-cols-1 md:grid-cols-2 gap-6 items-start transition-all duration-300 ease-in-out"
            : "flex flex-col gap-6 transition-all duration-300 ease-in-out"
        }
      >
        {availableJobs.map((company) => (
          <JobsCard key={company.id} company={company} viewGrid={viewGrid} />
        ))}
      </div>
    </main>
  );
}

export default JobsList;
