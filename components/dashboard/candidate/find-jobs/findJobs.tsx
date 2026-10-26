"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import HeroSearchBar from "@/components/platform/jobs/HeroSection/HeroSearchBar";
import AllJobs from "@/components/platform/jobs/jobSection/AllJobs";

export const FindJobs = () => {
  const t = useTranslations("findJobs");
  const searchParams = useSearchParams();
  const search = searchParams.get("q") || "";
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [viewGrid, setViewGrid] = useState(false);
  const pageSize = viewGrid ? 12 : 5; // jobs per page

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 md:px-8">
      {/* Executive Header matching public jobs */}
      <div className="bg-gradient-to-r from-[#0B132B] via-[#132745] to-[#0A1128] border border-[#1E3A66] p-6 md:p-10 mb-8 rounded-none shadow-[0_10px_30px_rgba(11,19,43,0.1)]">
        <div className="max-w-3xl">
          <span className="text-[#26A4FF] text-xs font-bold uppercase tracking-wider">
            Verified Opportunities
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-clash text-white tracking-tight mt-1">
            {t("hero.title")}{" "}
            <span className="text-[#26A4FF]">
              {t("hero.highlight")}
            </span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/80 font-normal">
            {t("hero.subtitle")}
          </p>
        </div>

        <HeroSearchBar popularTags={t.raw("hero.popularTags") as string[]} />
      </div>

      <div className="px-0">
        <AllJobs
          currentPage={currentPage}
          pageSize={pageSize}
          viewGrid={viewGrid}
          setViewGrid={setViewGrid}
          search={search}
          location={location}
          category={category}
          onPageChange={setCurrentPage}
          getApplyLink={(id) => `/candidate/find-jobs/${id}`}
        />
      </div>
    </div>
  );
};

