"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import ReusableHeroSection from "@/components/platform/jobs/HeroSection/ReusableHeroSection";
import AllJobs from "@/components/platform/jobs/jobSection/AllJobs";

export default function JobsPage() {
  const t = useTranslations("findJobs");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewGrid, setViewGrid] = useState(false);
  const pageSize = viewGrid ? 12 : 5; // jobs per page

  return (
    <div className="">
      <ReusableHeroSection
        title={t("hero.title")}
        highlight={t("hero.highlight")}
        subtitle={t("hero.subtitle")}
        searchEnabled={true}
        popularTags={t.raw("hero.popularTags") as string[]}
      />
      <div className="max-w-7xl mx-auto  md:px-12 md:pt-6">
        <AllJobs
          currentPage={currentPage}
          pageSize={pageSize}
          viewGrid={viewGrid}
          setViewGrid={setViewGrid}
          search=""
          onPageChange={setCurrentPage}
          getApplyLink={(id) => `/jobs/${id}`}
        />
      </div>
    </div>
  );
}
