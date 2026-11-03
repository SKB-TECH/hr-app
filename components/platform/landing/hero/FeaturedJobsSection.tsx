"use client";

import { SectionTitle } from "@/components/ui/Title";
import { ArrowRight, MapPin, Building2, Bookmark } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useJobs } from "@/core/hooks/jobs/use-jobs";
import type { CompanyJob } from "@/core/types/job";
import { humanizeEmploymentType, resolveJobCategory } from "@/core/lib/format";
import { sanitizeAndDeduplicateJobs } from "@/core/services/jobs/normalize-company-job";
import { useJobContext } from "@/context/JobContext";

const tagStyles: Record<string, string> = {
  Marketing: "bg-[#FFF1F0] text-[#FF6550] border border-[#FF6550]/30",
  Design: "bg-[#EEF2FF] text-[#4640DE] border border-[#4640DE]/30",
  Business: "bg-[#FFF9EB] text-[#D97706] border border-[#FFB836]/40",
  Technology: "bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20",
  Engineering: "bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20",
};

const defaultTag = "bg-gray-50 text-[#7C8493] border border-gray-200";

function FeaturedJobCard({
  job,
  fullTimeLabel,
}: {
  job: CompanyJob;
  fullTimeLabel: string;
}) {
  const { isJobSaved, toggleSaveJob } = useJobContext();
  const saved = isJobSaved(job.id);
  const categoryLabel = resolveJobCategory(
    job.category,
    job.title,
    job.description
  );
  const tags = Array.from(
    new Set([
      ...(categoryLabel ? [categoryLabel] : []),
      ...job.skills.slice(0, 2),
    ])
  ).filter(Boolean);

  return (
    <article className="bg-white rounded-none border border-gray-200/90 p-5 md:p-6 flex flex-col gap-3.5 hover:border-[#4640DE] hover:shadow-[0_12px_32px_rgba(70,64,222,0.08)] hover:-translate-y-1 transition-all duration-300 flex-none w-[280px] sm:w-[320px] md:w-auto md:flex-[1_1_280px]">
      <div className="flex justify-between items-start gap-4">
        <div className="w-12 h-12 rounded-none bg-gray-50 border border-gray-100 flex items-center justify-center p-2 shrink-0">
          <Image
            src={job.companyLogoUrl || "/logo/lgo.png"}
            alt={`${job.companyName || job.title} logo`}
            width={40}
            height={40}
            loading="lazy"
            className="object-contain max-h-8 w-auto"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#4640DE] bg-[#EEF2FF] border border-[#4640DE]/30 px-3 py-1 rounded-none whitespace-nowrap">
            {job.employmentTypes[0]
              ? humanizeEmploymentType(job.employmentTypes[0])
              : fullTimeLabel}
          </span>
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
            aria-label={saved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`}
            aria-pressed={saved}
            className={`p-1.5 rounded-none border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4640DE] active:scale-95 ${
              saved
                ? "bg-[#4640DE] text-white border-[#4640DE]"
                : "bg-white text-[#7C8493] border-gray-200 hover:border-[#4640DE] hover:text-[#4640DE]"
            }`}
          >
            <Bookmark size={14} className={saved ? "fill-current" : ""} />
          </button>
        </div>
      </div>

      <div>
        <Link
          href={`/jobs/${job.id}`}
          className="font-bold text-[#132745] text-base sm:text-lg hover:text-[#4640DE] focus-visible:outline-none focus-visible:underline transition-colors line-clamp-1"
        >
          {job.title}
        </Link>
        <p className="text-xs sm:text-sm text-[#7C8493] mt-1 flex items-center gap-2">
          <Link
            href={`/companies/${job.companyId}`}
            className="truncate hover:text-[#132745] focus-visible:outline-none focus-visible:underline flex items-center gap-1"
          >
            <Building2 size={13} className="shrink-0 text-[#4640DE]" />
            <span>{job.companyName || "—"}</span>
          </Link>
          <span className="text-gray-300" aria-hidden="true">
            &bull;
          </span>
          <span className="truncate flex items-center gap-1">
            <MapPin size={13} className="shrink-0 text-[#FF6550]" />
            <span>{job.location}</span>
          </span>
        </p>
      </div>

      <p className="text-xs sm:text-sm text-[#7C8493] leading-relaxed line-clamp-2">
        {job.description || "—"}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {tags.map((tag) => (
          <span
            key={`${job.id}-tag-${tag}`}
            className={`inline-flex items-center justify-center text-xs px-2.5 py-1 rounded-none font-medium ${
              tagStyles[tag] ?? defaultTag
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function FeaturedJobsSection() {
  const t = useTranslations("landing");
  const jobs = useJobs({ status: "LIVE", limit: 8 });
  const sourceJobs = sanitizeAndDeduplicateJobs(jobs.data?.data ?? []);
  const fullTimeLabel = t("featuredJobs.fullTimeBadge");

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 w-full max-w-7xl mx-auto">
      <div>
        <SectionTitle
          title={t("featuredJobs.titlePrefix")}
          highlight={t("featuredJobs.titleHighlight")}
          showAllText={t("shared.showAllJobs")}
          showAllLink="/jobs"
          isExpanded
        />

        <div className="mt-8 overflow-x-auto md:overflow-visible max-md:-mx-4 max-md:px-4">
          <div className="max-md:flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:w-auto">
            {sourceJobs.map((job) => (
              <FeaturedJobCard
                key={job.id}
                job={job}
                fullTimeLabel={fullTimeLabel}
              />
            ))}
            {!jobs.isPending && sourceJobs.length === 0 && (
              <p className="py-8 text-sm text-[#7C8493]">
                Aucune offre publiée pour le moment.
              </p>
            )}
          </div>
        </div>

        {/* Show all jobs — mobile only */}
        <div className="md:hidden mt-4 text-center">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4640DE] hover:text-[#3730C9] active:text-[#2E27B3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4640DE]"
          >
            <span>{t("shared.showAllJobs")}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
