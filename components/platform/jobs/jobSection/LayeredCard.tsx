"use client";

import SharedCard from "@/components/common/navbar/SharedCard";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import type { JobsCardProps } from "./JobsCard";
import { humanizeEmploymentType } from "@/core/lib/format";
import { Building2, MapPin, ArrowRight, Share2, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

function LayeredCard({ job, applyLink }: JobsCardProps) {
  const t = useTranslations("findJobs");
  const tags = [
    ...job.employmentTypes.map(humanizeEmploymentType),
    ...(job.category ? [job.category] : []),
  ];

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const fullUrl = `${window.location.origin}${applyLink}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl).then(() => {
        toast.success("Job link copied to clipboard!");
      });
    }
  };

  const hasSalary = job.minSalary || job.maxSalary;

  return (
    <SharedCard>
      <div className="flex flex-col justify-between h-full lg:flex-row gap-5 lg:gap-6 items-start lg:items-center">
        {/* Left Column: Logo & Main Details */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 flex-1 min-w-0">
          {/* Company Logo Box with rounded-none */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-none bg-gray-50 border border-gray-100 flex items-center justify-center p-2.5 shrink-0 group-hover:scale-105 transition-transform">
            <Image
              src={job.companyLogoUrl || "/logo/lgo.png"}
              alt={job.companyName || job.title}
              width={64}
              height={64}
              className="object-contain max-h-12 w-auto"
            />
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col gap-1.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={applyLink}
                className="text-lg sm:text-xl font-bold text-[#132745] hover:text-[#4640DE] transition-colors truncate block"
              >
                {job.title}
              </Link>
              {job.status === "LIVE" && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#059669] bg-[#ECFDF5] border border-[#059669]/20 px-2 py-0.5 rounded-none">
                  <Sparkles size={11} />
                  <span>Active</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#7C8493] flex-wrap">
              {job.companyName && (
                <span className="font-medium text-[#25324B] flex items-center gap-1">
                  <Building2 size={14} className="text-[#4640DE]" />
                  <span>{job.companyName}</span>
                </span>
              )}
              {job.location && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1 text-[#7C8493]">
                    <MapPin size={14} className="text-[#FF6550]" />
                    <span>{job.location}</span>
                  </span>
                </>
              )}
            </div>

            {job.description && (
              <p className="text-sm text-[#515B6F] line-clamp-2 mt-1 leading-relaxed">
                {job.description}
              </p>
            )}

            {/* Tags with rounded-none */}
            <div className="flex flex-wrap gap-2 items-center mt-2.5">
              {tags.map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="text-xs px-2.5 py-1 rounded-none font-semibold border border-[#4640DE]/20 bg-[#EEF2FF] text-[#4640DE]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Salary & Actions with rounded-none */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between w-full lg:w-56 shrink-0 gap-3 border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-100">
          {hasSalary ? (
            <div className="flex flex-col lg:text-right">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7C8493]">
                Compensation
              </span>
              <span className="text-base sm:text-lg font-bold text-[#132745]">
                {job.minSalary ? `$${job.minSalary.toLocaleString()}` : ""}
                {job.minSalary && job.maxSalary ? " - " : ""}
                {job.maxSalary ? `$${job.maxSalary.toLocaleString()}` : ""}
              </span>
            </div>
          ) : (
            <span className="text-xs text-[#7C8493] italic">
              Competitive Salary
            </span>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto lg:w-full">
            <button
              onClick={handleShare}
              aria-label="Share Job Link"
              title="Copy share link"
              className="p-3 border border-[#D6DDEB] bg-white text-[#7C8493] hover:text-[#4640DE] hover:border-[#4640DE] rounded-none transition-colors"
            >
              <Share2 size={16} />
            </button>

            <Link
              href={applyLink}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-[#4640DE] hover:bg-[#3730C9] text-white font-bold text-sm rounded-none shadow-sm transition-all duration-300"
            >
              <span>{t("jobCard.apply")}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </SharedCard>
  );
}

export default LayeredCard;
