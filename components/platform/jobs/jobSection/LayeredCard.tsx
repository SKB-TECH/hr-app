"use client";

import SharedCard from "@/components/common/navbar/SharedCard";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Bookmark } from "lucide-react";
import type { JobsCardProps } from "./JobsCard";
import { humanizeEmploymentType, resolveJobCategory } from "@/core/lib/format";
import { useJobContext } from "@/context/JobContext";

function LayeredCard({ job, applyLink }: JobsCardProps) {
  const t = useTranslations("findJobs");
  const { isJobSaved, toggleSaveJob } = useJobContext();
  const saved = isJobSaved(job.id);
  const categoryLabel = resolveJobCategory(
    job.category,
    job.title,
    job.description
  );
  const tags = Array.from(
    new Set([
      ...job.employmentTypes.map(humanizeEmploymentType),
      ...(categoryLabel ? [categoryLabel] : []),
    ])
  ).filter(Boolean);

  return (
    <SharedCard>
      <div className="flex flex-col justify-between h-full md:flex-row gap-4 md:gap-5">
        <div className="flex flex-col md:flex-row gap-6 flex-1">
          <Image
            src={job.companyLogoUrl || "/logo/lgo.png"}
            alt={job.companyName || job.title}
            width={80}
            height={80}
            loading="lazy"
            className="max-sm:w-[48px] max-sm:h-[48px] w-20 h-20 object-cover shrink-0"
          />
          <div className="flex flex-col justify-between">
            <div>
              <Link
                href={applyLink}
                className="focus-visible:outline-none focus-visible:underline"
              >
                <h2 className="text-[20px] hover:text-brand font-semibold md:font-bold text-neutral-100 md:my-2 block">
                  {job.title}
                </h2>
              </Link>
              {job.companyName && (
                <p className="text-[15px] font-medium text-neutral-80 mb-1">
                  {job.companyName}
                </p>
              )}

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
              {tags.length > 0 && (
                <div className="h-8 w-0.5 bg-gray-200 self-center hidden sm:block" />
              )}
              {tags.map((tag) => (
                <span
                  key={`${job.id}-${tag}`}
                  className="text-[14px] px-4 py-1.5 rounded-full font-medium border border-indigo-100 bg-indigo-50 text-brand"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col max-md:space-y-4 max-md:gap-0 gap-3.5 w-full md:w-56 shrink-0">
          <div className="flex items-center gap-2">
            <Link
              href={applyLink}
              className="flex-1 bg-brand hover:bg-indigo-800 active:bg-indigo-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand duration-300 text-white font-epilogue px-6 py-3 text-center font-semibold block"
            >
              {t("jobCard.apply")}
            </Link>
            <button
              type="button"
              onClick={() =>
                toggleSaveJob({
                  id: job.id,
                  title: job.title,
                  companyName: job.companyName,
                  location: job.location,
                  category: categoryLabel,
                })
              }
              aria-label={
                saved
                  ? `Remove ${job.title} from saved jobs`
                  : `Save ${job.title}`
              }
              aria-pressed={saved}
              className={`p-3 border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand active:scale-95 ${
                saved
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-neutral-60 border-gray-200 hover:border-brand hover:text-brand"
              }`}
            >
              <Bookmark size={18} className={saved ? "fill-current" : ""} />
            </button>
          </div>

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
