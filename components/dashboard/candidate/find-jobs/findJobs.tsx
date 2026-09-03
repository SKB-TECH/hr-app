"use client";
import PopularTags from "../browse-companies/PopularTags";
import SearchHeader from "../browse-companies/SearchHeader";
import { useState } from "react";
import AllJobs from "@/components/platform/jobs/jobSection/AllJobs";
import { useDebouncedValue } from "@/core/hooks/shared/use-debounced-value";

const tags = ["Tech", "Finance", "Healthcare", "Education", "Retail"];

export const FindJobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewGrid, setViewGrid] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const pageSize = viewGrid ? 12 : 5; // jobs per page

  return (
    <div className="py-4  md:py-8">
      <div className="px-4 md:px-5 pb-5">
        <SearchHeader value={search} onChange={(value) => { setSearch(value); setCurrentPage(1); }} />
        <PopularTags tags={tags} />
      </div>
      <div className="border border-brand-light-neutral mt-10 mb-10 hidden md:block" />
      <div className="px-0 md:px-5">
        <AllJobs
          currentPage={currentPage}
          pageSize={pageSize}
          viewGrid={viewGrid}
          setViewGrid={setViewGrid}
          search={debouncedSearch}
          onPageChange={setCurrentPage}
          getApplyLink={(id) => `/en/candidate/find-jobs/${id}`}
        />
      </div>
    </div>
  );
};
