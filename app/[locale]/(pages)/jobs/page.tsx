"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import ReusableHeroSection from "@/components/platform/jobs/HeroSection/ReusableHeroSection";
import AllJobs from "@/components/platform/jobs/jobSection/AllJobs";

export default function JobsPage() {
  const t = useTranslations("findJobs");
  const searchParams = useSearchParams();
  const search = searchParams.get("q") || "";
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [viewGrid, setViewGrid] = useState(false);
  const pageSize = viewGrid ? 12 : 5; // jobs per page

  return (
    <div className="bg-[#F8F9FC] min-h-screen">
      <ReusableHeroSection
        title={t("hero.title")}
        highlight={t("hero.highlight")}
        subtitle={t("hero.subtitle")}
        searchEnabled={true}
        popularTags={t.raw("hero.popularTags") as string[]}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
        <AllJobs
          currentPage={currentPage}
          pageSize={pageSize}
          viewGrid={viewGrid}
          setViewGrid={setViewGrid}
          search={search}
          location={location}
          category={category}
          onPageChange={setCurrentPage}
          getApplyLink={(id) => `/jobs/${id}`}
        />
      </div>
    </div>
  );
}

