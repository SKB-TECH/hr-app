"use client";

import { useState } from "react";
import ReusableHeroSection from "./HeroSection/ReusableHeroSection";
import AllJobs from "./jobSection/AllJobs";
import Pagination from "./ReusablePagination/ReusablePagination";
import { availableJobs } from "@/data/companyPageData";

export default function JobsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // jobs per page
  const totalPages = Math.ceil(availableJobs.length / pageSize);
  return (
    <div className="">
      <ReusableHeroSection
        title="Find your  "
        highlight=" dream job"
        subtitle="Find your next career at companies like HubSpot, Nike, and Dropbox"
        searchEnabled={true}
        popularTags={["UI Designer", "UX Researcher", "Android", "Admin"]}
      />
      <AllJobs currentPage={currentPage} pageSize={pageSize} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
