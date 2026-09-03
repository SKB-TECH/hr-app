"use client";

import SharedCard from "@/components/common/navbar/SharedCard";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import type { JobsCardProps } from "./JobsCard";
import { humanizeEmploymentType } from "@/core/lib/format";

function LayeredCard({ job, applyLink }: JobsCardProps) {
  const t = useTranslations("findJobs");
  const tags = [...job.employmentTypes.map(humanizeEmploymentType), ...(job.category ? [job.category] : [])];

  return (
    <SharedCard>
      <div className="flex flex-col justify-between h-full md:flex-row gap-4 md:gap-5">
        <div className="flex flex-col md:flex-row gap-6 flex-1">
          <Image
            src={job.companyLogoUrl || "/logo/lgo.png"}
            alt={job.companyName || job.title}
            width={80}
            height={80}
            className="max-sm:w-[48px] max-sm:h-[48px] w-20 h-20 object-cover shrink-0"
          />
          <div className="flex flex-col justify-between">
            <div>
              <Link href={applyLink}>
                <h2 className="text-[20px] hover:text-brand font-semibold md:font-bold text-neutral-100 md:my-2 block">
                  {job.title}
                </h2>
              </Link>
              {job.companyName && <p className="text-[15px] font-medium text-neutral-80 mb-1">{job.companyName}</p>}

              {job.description && (
                <p className="text-neutral-60 font-epilogue text-[16px] mb-3 line-clamp-2 md:line-clamp-4">
                  {job.description}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {job.location && (
                <span className="text-[14px] px-4 py-1.5 rounded-full font-medium bg-[#56CDAD1A] text-[#56CDAD]">
                  {job.location}
                </span>
              )}
              {tags.length > 0 && <div className="h-8 w-0.5 bg-gray-200 self-center hidden sm:block" />}
              {tags.map((tag) => (
                <span key={tag} className="text-[14px] px-4 py-1.5 rounded-full font-medium border border-indigo-100 bg-indigo-50 text-brand">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col max-md:space-y-4 max-md:gap-0 gap-3.5 w-full md:w-56 shrink-0">
          <Link
            href={applyLink}
            className="bg-brand hover:bg-indigo-800 duration-300 text-white font-epilogue px-8 py-3 text-center font-semibold block"
          >
            {t("jobCard.apply")}
          </Link>

          {(job.minSalary || job.maxSalary) && (
            <p className="text-sm text-neutral-60">
              <span className="font-semibold text-neutral-100">
                {job.minSalary ?? ""}
                {job.minSalary && job.maxSalary ? " - " : ""}
                {job.maxSalary ?? ""}
              </span>
            </p>
          )}
        </div>
      </div>
    </SharedCard>
  );
}

export default LayeredCard;
