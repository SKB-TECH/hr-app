"use client";

import SharedCard from "@/components/common/navbar/SharedCard";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { JobsCardProps } from "./JobsCard";
import { humanizeEmploymentType } from "@/core/lib/format";
import { Building2, MapPin, ArrowRight } from "lucide-react";

function GridJobCard({ job, applyLink }: JobsCardProps) {
  const t = useTranslations("findJobs");
  const tags = [
    ...job.employmentTypes.map(humanizeEmploymentType),
    ...(job.category ? [job.category] : []),
  ];

  const hasSalary = job.minSalary || job.maxSalary;

  return (
    <SharedCard>
      <div className="flex flex-col gap-4 h-full justify-between">
        <div className="space-y-4">
          {/* Header Row: Logo & Location */}
          <div className="flex items-start justify-between gap-3">
            <div className="w-13 h-13 rounded-none bg-gray-50 border border-gray-100 flex items-center justify-center p-2 shrink-0">
              <Image
                src={job.companyLogoUrl || "/logo/lgo.png"}
                alt={job.companyName || job.title}
                width={48}
                height={48}
                className="object-contain max-h-10 w-auto"
              />
            </div>
            {job.location && (
              <span className="px-2.5 py-1 rounded-none bg-gray-50 border border-gray-200 text-[#7C8493] inline-flex items-center gap-1 font-semibold text-xs whitespace-nowrap">
                <MapPin size={12} className="text-[#FF6550]" />
                <span>{job.location}</span>
              </span>
            )}
          </div>

          {/* Title & Company */}
          <div>
            <Link href={applyLink}>
              <h2 className="text-lg font-bold text-[#132745] hover:text-[#4640DE] transition-colors line-clamp-1 block">
                {job.title}
              </h2>
            </Link>
            {job.companyName && (
              <p className="text-xs font-semibold text-[#515B6F] flex items-center gap-1 mt-1">
                <Building2 size={13} className="text-[#4640DE]" />
                <span>{job.companyName}</span>
              </p>
            )}
            {job.description && (
              <p className="text-xs text-[#7C8493] font-normal mt-2 line-clamp-2 leading-relaxed">
                {job.description}
              </p>
            )}
          </div>

          {/* Tags with rounded-none */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="text-xs px-2.5 py-0.5 rounded-none font-semibold border border-[#4640DE]/20 bg-[#EEF2FF] text-[#4640DE]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Row: Salary / Applicants & CTA */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3 mt-auto">
          <div>
            {hasSalary ? (
              <p className="text-xs font-bold text-[#132745]">
                {job.minSalary ? `$${job.minSalary.toLocaleString()}` : ""}
                {job.minSalary && job.maxSalary ? " - " : ""}
                {job.maxSalary ? `$${job.maxSalary.toLocaleString()}` : ""}
              </p>
            ) : (
              <p className="text-xs text-[#7C8493] font-medium">
                {job.applicantsCount} applicants
              </p>
            )}
          </div>

          <Link
            href={applyLink}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#4640DE] hover:text-[#3730C9] group"
          >
            <span>{t("jobCard.apply")}</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </SharedCard>
  );
}

export default GridJobCard;
