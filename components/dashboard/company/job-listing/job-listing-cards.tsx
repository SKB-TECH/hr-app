"use client";

import { useMemo, useState } from "react";
import { TableDataTypes } from "@/data/company-job-listing";
import TableHeader, { TableHeaderFilters } from "./table-header";
import JobCard from "./job-card";

function JobListingCards({ jobs }: { jobs: TableDataTypes[] }) {
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [jobTypeFilters, setJobTypeFilters] = useState<string[]>([]);

  const handleStatusChange = (value: string, checked: boolean) => {
    setStatusFilters((prev) =>
      checked ? [...prev, value] : prev.filter((s) => s !== value),
    );
  };

  const handleJobTypeChange = (value: string, checked: boolean) => {
    setJobTypeFilters((prev) =>
      checked ? [...prev, value] : prev.filter((t) => t !== value),
    );
  };

  const handleClearFilters = () => {
    setStatusFilters([]);
    setJobTypeFilters([]);
  };

  const filteredData = useMemo(() => {
    return jobs.filter((job) => {
      const statusMatch =
        statusFilters.length === 0 || statusFilters.includes(job.status);
      const typeMatch =
        jobTypeFilters.length === 0 || jobTypeFilters.includes(job.job_type);
      return statusMatch && typeMatch;
    });
  }, [jobs, statusFilters, jobTypeFilters]);

  const filterProps: TableHeaderFilters = {
    statusFilters,
    jobTypeFilters,
    onStatusChange: handleStatusChange,
    onJobTypeChange: handleJobTypeChange,
    onClearFilters: handleClearFilters,
  };

  return (
    <div>
      <TableHeader {...filterProps} />

      <div className="px-4 py-5 pb-3 border-t border-[#D6DDEB]">
        <p className="text-[18px] font-semibold text-neutral-100 font-epilogue">
          All jobs : <span className="font-bold">{filteredData.length}</span>
        </p>
      </div>

      <div className="flex flex-col gap-4 divide-y divide-[#D6DDEB]">
        {filteredData.length > 0 ? (
          filteredData
            .slice(0, 7)
            .map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="text-center text-[#7C8493] py-10 text-sm">
            No jobs match the selected filters.
          </p>
        )}
      </div>
    </div>
  );
}

export default JobListingCards;
