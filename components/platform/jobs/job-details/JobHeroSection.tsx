"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Printer, MapPin, Building2, Briefcase, CheckCircle2 } from "lucide-react";
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
  const companyLabel = job.companyName || "Executive Recruiter";
  const jobType = job.employmentTypes[0] ? humanizeEmploymentType(job.employmentTypes[0]) : "Full-Time";

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div
      className={`${className} w-full bg-gradient-to-b from-[#0B132B] via-[#132745] to-[#0A1128] py-8 md:py-12 border-b border-[#1E3A66]`}
    >
      <div className="px-4 md:px-12 w-full max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        {showLinks && (
          <div className="flex items-center text-sm text-white/70 mb-6 overflow-hidden">
            <Link
              href="/jobs"
              className="hover:text-[#26A4FF] transition-colors truncate max-w-[80px] md:max-w-none"
            >
              {t("detail.breadcrumbHome")}
            </Link>

            <span className="mx-2 shrink-0 text-white/40">/</span>

            <span className="text-white font-medium text-nowrap truncate max-w-xs md:max-w-md">
              {job.title}
            </span>
          </div>
        )}

        {/* Hero Card */}
        <div className="w-full bg-white border border-[#D6DDEB] p-6 md:p-8 rounded-none shadow-[0_20px_50px_rgba(11,19,43,0.15)] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 flex-1">
            {/* Logo */}
            <div className="relative w-20 h-20 shrink-0 border border-[#D6DDEB] bg-white p-2 rounded-none flex items-center justify-center">
              <Image
                src={job.companyLogoUrl || "/logo/lgo.png"}
                alt={job.title}
                fill
                quality={100}
                className="object-contain p-1"
              />
            </div>

            {/* Title & Metadata */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-none">
                  <CheckCircle2 size={12} className="text-emerald-600" />
                  Verified Role
                </span>
                {job.category && (
                  <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-[#F8F9FC] text-[#4640DE] border border-[#D6DDEB] rounded-none">
                    {job.category}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-clash text-[#132745] tracking-tight leading-tight">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs sm:text-sm text-[#515B6F]">
                <span className="flex items-center gap-1.5 font-medium text-[#132745]">
                  <Building2 size={15} className="text-[#4640DE]" />
                  {companyLabel}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#A8ADB7]" />
                <span className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-[#7C8493]" />
                  {job.location || t("detail.remoteFallback")}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#A8ADB7]" />
                <span className="flex items-center gap-1.5">
                  <Briefcase size={15} className="text-[#7C8493]" />
                  {jobType}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#D6DDEB]">
            {/* Native window.print() button */}
            <button
              type="button"
              onClick={handlePrint}
              aria-label="Print job specification"
              title="Print or Save as PDF"
              className="inline-flex items-center justify-center w-11 h-11 border border-[#D6DDEB] bg-white text-[#515B6F] hover:text-[#4640DE] hover:border-[#4640DE] rounded-none transition-all cursor-pointer shadow-sm"
            >
              <Printer size={18} />
            </button>

            {/* Share via Web Share API or Clipboard */}
            <ShareJobButton title={job.title} label={t("detail.shareAlt")} />

            <div className="hidden sm:block w-px h-10 bg-[#D6DDEB] mx-1" />

            {/* Apply Button */}
            <TriggerApplicationForm job={job} />
          </div>
        </div>
      </div>
    </div>
  );
}

