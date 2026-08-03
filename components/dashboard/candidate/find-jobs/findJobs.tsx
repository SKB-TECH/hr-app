"use client";
import PopularTags from "../browse-companies/PopularTags";
import SearchHeader from "../browse-companies/SearchHeader";
import { useState } from "react";
import { availableJobs } from "@/data/companyPageData";
import AllJobs from "@/components/platform/jobs/jobSection/AllJobs";
import Pagination from "@/components/platform/jobs/ReusablePagination/ReusablePagination";

const tags = ["Tech", "Finance", "Healthcare", "Education", "Retail"];

export const FindJobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewGrid, setViewGrid] = useState(false);
  const pageSize = viewGrid ? 12 : 5; // jobs per page
  const totalPages = Math.ceil(availableJobs.length / pageSize);

  return (
    <div className="py-4  md:py-8">
      <div className="px-4 md:px-5 pb-5">
        <SearchHeader />
        <PopularTags tags={tags} />
      </div>
      <div className="border border-brand-light-neutral mt-10 mb-10 hidden md:block" />
      <div className="px-0 md:px-5">
        <AllJobs
          currentPage={currentPage}
          pageSize={pageSize}
          viewGrid={viewGrid}
          setViewGrid={setViewGrid}
          getApplyLink={(id) => `/en/dashboard/find-jobs/${id}`}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
