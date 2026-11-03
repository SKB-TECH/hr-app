"use client";

import SharedCard from "@/components/common/navbar/SharedCard";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Bookmark } from "lucide-react";
import type { JobsCardProps } from "./JobsCard";
import { humanizeEmploymentType, resolveJobCategory } from "@/core/lib/format";
import { useJobContext } from "@/context/JobContext";

function GridJobCard({ job, applyLink }: JobsCardProps) {
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
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-start justify-between gap-2">
          <Image
            src={job.companyLogoUrl || "/logo/lgo.png"}
            alt={job.companyName || job.title}
            width={48}
            height={48}
            loading="lazy"
            className="w-12 h-12 object-cover shrink-0"
          />
          <div className="flex items-center gap-1.5">
            {job.location && (
              <span className="px-3 py-1 m-1 rounded-full bg-[#56CDAD1A] text-[#56CDAD] inline-flex items-center font-medium whitespace-nowrap text-xs">
                {job.location}
              </span>
            )}
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
              className={`p-2 rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand active:scale-95 ${
                saved
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-neutral-60 border-gray-200 hover:border-brand hover:text-brand"
              }`}
            >
              <Bookmark size={14} className={saved ? "fill-current" : ""} />
            </button>
          </div>
        </div>

        <div>
          <Link
            href={applyLink}
            className="focus-visible:outline-none focus-visible:underline"
          >
            <h2 className="text-xl hover:text-brand font-semibold text-neutral-100">
              {job.title}
            </h2>
          </Link>
          {job.companyName && (
            <p className="text-sm font-medium text-neutral-80">
              {job.companyName}
            </p>
          )}
          {job.description && (
            <p className="text-neutral-60 font-epilogue text-sm mb-3 line-clamp-2">
              {job.description}
            </p>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={`${job.id}-${tag}`}
                className="text-sm px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50 text-brand"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-gray-100 flex flex-col gap-2">
          <p className="text-sm text-neutral-60">
            {t.rich("jobCard.applicantsCount", {
              count: job.applicantsCount,
              bold: (chunks) => (
                <span className="font-semibold text-neutral-100">{chunks}</span>
              ),
            })}
          </p>
        </div>
      </div>
    </SharedCard>
  );
}

export default GridJobCard;
