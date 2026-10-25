"use client";

import { SectionTitle } from "@/components/ui/Title";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useJobs } from "@/core/hooks/jobs/use-jobs";
import { humanizeEmploymentType } from "@/core/lib/format";
import { MapPin, Building2, ArrowRight } from "lucide-react";

const tagStyles: Record<string, string> = {
  "Full-Time": "text-[#4640DE] bg-[#EEF2FF] border border-[#4640DE]/30",
  Marketing: "text-[#FF6550] bg-[#FFF1F0] border border-[#FF6550]/30",
  Design: "text-[#D97706] bg-[#FFF9EB] border border-[#FFB836]/40",
};

export default function LatestJobsOpenSection() {
  const t = useTranslations("landing");
  const jobs = useJobs({ status: "LIVE", limit: 8 });
  const latestJobs = jobs.data?.data ?? [];

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
          {latestJobs.map((job, i) => (
            <div
              key={job.id + "-" + i}
              className="flex items-start sm:items-center gap-4 sm:gap-5 p-5 sm:p-6 bg-white rounded-2xl
                         border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)]
                         hover:shadow-[0_12px_30px_rgba(70,64,222,0.08)] hover:border-[#4640DE]
                         hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
            >
              {/* Company Logo */}
              <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center p-2.5 group-hover:scale-105 transition-transform">
                <Image
                  src={job.companyLogoUrl || "/logo/lgo.png"}
                  alt={job.companyName || job.title}
                  width={52}
                  height={52}
                  className="object-contain max-h-10 w-auto"
                />
              </div>

              {/* Job Details */}
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <Link
                  href={`/jobs/${job.id}`}
                  className="font-bold text-base sm:text-lg text-[#132745] hover:text-[#4640DE] transition-colors truncate block"
                >
                  {job.title}
                </Link>

                <p className="text-xs sm:text-sm text-[#7C8493] flex items-center gap-2 truncate">
                  <Link
                    href={`/companies/${job.companyId}`}
                    className="truncate hover:text-[#132745] flex items-center gap-1"
                  >
                    <Building2 size={13} className="shrink-0 text-[#4640DE]" />
                    <span>{job.companyName || "—"}</span>
                  </Link>
                  <span className="text-gray-300">•</span>
                  <span className="truncate flex items-center gap-1">
                    <MapPin size={13} className="shrink-0 text-[#FF6550]" />
                    <span>{job.location}</span>
                  </span>
                </p>

                {/* Tags row */}
                <div className="flex items-center gap-2 flex-wrap mt-2">
                  {[
                    ...job.employmentTypes.map(humanizeEmploymentType),
                    ...(job.category ? [job.category] : []),
                  ].map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        (tag && tagStyles[tag]) ??
                        "text-[#7C8493] bg-gray-50 border border-gray-200"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="hidden sm:flex w-9 h-9 rounded-full bg-gray-50 items-center justify-center text-[#132745] group-hover:bg-[#4640DE] group-hover:text-white transition-all shrink-0">
                <ArrowRight size={16} />
              </div>
            </div>
          ))}

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
