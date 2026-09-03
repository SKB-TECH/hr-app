"use client";

import { useState } from "react";

import ReusableHeroSection from "@/components/platform/jobs/HeroSection/ReusableHeroSection";
import AllJobs from "@/components/platform/jobs/jobSection/AllJobs";

export default function JobsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewGrid, setViewGrid] = useState(false);
  const pageSize = viewGrid ? 12 : 5; // jobs per page

  return (
    <div className="">
      <ReusableHeroSection
        title="Find your  "
        highlight=" dream job"
        subtitle="Find your next career at companies like HubSpot, Nike, and Dropbox"
        searchEnabled={true}
        popularTags={["UI Designer", "UX Researcher", "Android", "Admin"]}
      />
      <div className="max-w-7xl mx-auto  md:px-12 md:pt-6">
        <AllJobs
          currentPage={currentPage}
          pageSize={pageSize}
          viewGrid={viewGrid}
          setViewGrid={setViewGrid}
          search=""
          onPageChange={setCurrentPage}
          getApplyLink={(id) => `/en/jobs/${id}`}
        />
      </div>
    </div>
  );
}
