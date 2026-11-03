"use client";

import { SectionTitle } from "@/components/ui/Title";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useJobs } from "@/core/hooks/jobs/use-jobs";
import { humanizeEmploymentType, resolveJobCategory } from "@/core/lib/format";
import { sanitizeAndDeduplicateJobs } from "@/core/services/jobs/normalize-company-job";
import { MapPin, Building2, ArrowRight, Bookmark } from "lucide-react";
import { useJobContext } from "@/context/JobContext";

const tagStyles: Record<string, string> = {
  "Full-Time": "text-[#4640DE] bg-[#EEF2FF] border border-[#4640DE]/30",
  Marketing: "text-[#FF6550] bg-[#FFF1F0] border border-[#FF6550]/30",
  Design: "text-[#D97706] bg-[#FFF9EB] border border-[#FFB836]/40",
  Technology: "text-[#2563EB] bg-[#EFF6FF] border border-[#2563EB]/20",
  Engineering: "text-[#2563EB] bg-[#EFF6FF] border border-[#2563EB]/20",
};

export default function LatestJobsOpenSection() {
  const t = useTranslations("landing");
  const jobs = useJobs({ status: "LIVE", limit: 8 });
  const latestJobs = sanitizeAndDeduplicateJobs(jobs.data?.data ?? []);
  const { isJobSaved, toggleSaveJob } = useJobContext();

  return (
    <section className="relative w-full overflow-hidden py-16 bg-[#F8F8FD] border-t border-gray-200/70">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
        <SectionTitle
          title={t("latestJobs.titlePrefix")}
          highlight={t("latestJobs.titleHighlight")}
          showAllText={t("shared.showAllJobs")}
          showAllLink="/jobs"
          isExpanded
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {latestJobs.map((job) => {
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
            const saved = isJobSaved(job.id);

            return (
              <div
                key={job.id}
                className="flex items-start sm:items-center gap-4 sm:gap-5 p-5 sm:p-6 bg-white rounded-none
                           border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)]
                           hover:shadow-[0_12px_30px_rgba(70,64,222,0.08)] hover:border-[#4640DE]
                           hover:-translate-y-0.5 transition-all duration-300 group"
              >
                {/* Company Logo */}
                <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-none bg-gray-50 border border-gray-100 flex items-center justify-center p-2.5 group-hover:scale-105 transition-transform">
                  <Image
                    src={job.companyLogoUrl || "/logo/lgo.png"}
                    alt={`${job.companyName || job.title} logo`}
                    width={52}
                    height={52}
                    loading="lazy"
                    className="object-contain max-h-10 w-auto"
                  />
                </div>

                {/* Job Details */}
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="font-bold text-base sm:text-lg text-[#132745] hover:text-[#4640DE] focus-visible:outline-none focus-visible:underline transition-colors truncate block"
                  >
                    {job.title}
                  </Link>

                  <p className="text-xs sm:text-sm text-[#7C8493] flex items-center gap-2 truncate">
                    <Link
                      href={`/companies/${job.companyId}`}
                      className="truncate hover:text-[#132745] focus-visible:outline-none focus-visible:underline flex items-center gap-1"
                    >
                      <Building2 size={13} className="shrink-0 text-[#4640DE]" />
                      <span>{job.companyName || "—"}</span>
                    </Link>
                    <span className="text-gray-300" aria-hidden="true">
                      •
                    </span>
                    <span className="truncate flex items-center gap-1">
                      <MapPin size={13} className="shrink-0 text-[#FF6550]" />
                      <span>{job.location}</span>
                    </span>
                  </p>

                  {/* Tags row with rounded-none */}
                  <div className="flex items-center gap-2 flex-wrap mt-2">
                    {tags.map((tag) => (
                      <span
                        key={`${job.id}-tag-${tag}`}
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-none ${
                          tagStyles[tag] ??
                          "text-[#7C8493] bg-gray-50 border border-gray-200"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
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
                    className={`w-9 h-9 rounded-none border flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4640DE] active:scale-95 ${
                      saved
                        ? "bg-[#4640DE] text-white border-[#4640DE]"
                        : "bg-white text-[#7C8493] border-gray-200 hover:border-[#4640DE] hover:text-[#4640DE]"
                    }`}
                  >
                    <Bookmark size={16} className={saved ? "fill-current" : ""} />
                  </button>
                  <Link
                    href={`/jobs/${job.id}`}
                    aria-label={`View ${job.title}`}
                    className="hidden sm:flex w-9 h-9 rounded-none bg-gray-50 items-center justify-center text-[#132745] group-hover:bg-[#4640DE] group-hover:text-white hover:bg-[#3730C9] active:bg-[#2E27B3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4640DE] transition-all"
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}

          {!jobs.isPending && latestJobs.length === 0 && (
            <p className="py-8 text-sm text-[#7C8493] col-span-2 text-center">
              Aucune offre publiée pour le moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
