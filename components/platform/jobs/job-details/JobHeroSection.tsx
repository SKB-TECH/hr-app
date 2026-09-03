"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import TriggerApplicationForm from "./job-application-form/TriggerApplicationForm";
import type { CompanyJob } from "@/core/types/job";
import { humanizeEmploymentType } from "@/core/lib/format";
import ShareJobButton from "./ShareJobButton";

interface JobHeroSectionProps {
  job: CompanyJob;
  showLinks?: boolean;
  className?: string;
}

export default function JobHeroSection({
  job,
  showLinks = false,
  className = "",
}: JobHeroSectionProps) {
  const t = useTranslations("findJobs");
  const companyLabel = job.companyName || "—";
  const jobType = job.employmentTypes[0] ? humanizeEmploymentType(job.employmentTypes[0]) : "—";

  return (
    <div
      className={`${className} w-full bg-light-brand-neutral py-8 lg:mt-6 md:py-12`}
      style={{
        backgroundImage: `url(/BG.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className=" px-4 md:px-12   w-full max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        {showLinks && (
          <div className="flex items-center text-sm text-[#7C8493] mb-6 overflow-hidden">
            <Link
              href="/"
              className="hover:text-[#4640DE] transition-colors truncate max-w-[60px] md:max-w-none"
            >
              {t("detail.breadcrumbHome")}
            </Link>

            <span className="mx-2 shrink-0">/</span>

            <span className="text-[#25324B] font-medium text-nowrap">
              {job.title}
            </span>
          </div>
        )}

        {/* Hero Card */}
        <div className="w-full bg-white border border-[#D6DDEB] p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 w-full ">
            <div className="flex  flex-col md:flex-row md:items-center gap-5 flex-1">
              <div className="flex justify-between items-center ">
                <div className="relative w-18 h-18 shrink-0">
                  <Image
                    src={job.companyLogoUrl || "/logo/lgo.png"}
                    alt={job.title}
                    fill
                    quality={100}
                    className="object-cover"
                  />
                </div>
                <ShareJobButton title={job.title} label={t("detail.shareAlt")} className="md:hidden" />
              </div>

              <div className="flex-1">
                <h1 className="text-[32px] leading-[1.05] max-md:text-[28px] tracking-0 font-bold text-[#25324B] tracking-[-0.02em]">
                  {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 text-[14px]  text-[#515B6F]">
                  <span>{companyLabel}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8ADB7]" />
                  <span>{job.location || t("detail.remoteFallback")}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8ADB7]" />
                  <span>{jobType}</span>
                </div>
              </div>
            </div>

            <div className="flex md:flex-row flex-col md:items-center gap-6 md:gap-8">
              <ShareJobButton title={job.title} label={t("detail.shareAlt")} className="hidden md:block" />

              <div className="hidden md:block w-px h-14 bg-[#D6DDEB]" />

              <TriggerApplicationForm job={job} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
