"use client";

import { format, parseISO } from "date-fns";
import { useTranslations } from "next-intl";

import JobDescriptionSection from "./JobDescriptionSection";
import JobHeroSection from "./JobHeroSection";
import JobResponsibilitiesSection from "./JobResponsibilitiesSection";
import JobSidebarSection from "./JobSidebarSection";
import { useJob } from "@/core/hooks/jobs/use-job";
import { humanizeEmploymentType } from "@/core/lib/format";

function splitToBullets(text: string | null): string[] {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

interface JobDetailsViewProps {
  jobId: string;
  showBreadcrumbs?: boolean;
}

export default function JobDetailsView({ jobId, showBreadcrumbs = false }: JobDetailsViewProps) {
  const t = useTranslations("findJobs");
  const { data: job, isLoading, isError } = useJob(jobId);

  function formatSalary(minSalary: number | null, maxSalary: number | null): string {
    if (!minSalary && !maxSalary) return t("detail.salaryNotDisclosed");
    if (minSalary && maxSalary) return `${minSalary.toLocaleString()} - ${maxSalary.toLocaleString()}`;
    return (minSalary ?? maxSalary)!.toLocaleString();
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-[18px]">
        {t("detail.loading")}
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-brand capitalize text-[24px] font-semibold">
        {t("detail.notFound")}
      </div>
    );
  }

  return (
    <section className="w-full bg-[#F8F9FC] min-h-screen">
      <JobHeroSection className="mt-0!" showLinks={showBreadcrumbs} job={job} />

      <div className="px-4 md:px-12 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 py-8 md:py-16">
          <div className="lg:col-span-2 bg-white border border-[#D6DDEB] p-6 md:p-10 rounded-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-8">
            <JobDescriptionSection description={job.description || t("detail.noDescription")} />
            <hr className="border-t border-[#E4E7EC]" />
            <JobResponsibilitiesSection
              responsibilities={splitToBullets(job.responsibilities)}
              whoYouAre={splitToBullets(job.requirements)}
              niceToHaves={splitToBullets(job.niceToHave)}
            />
          </div>

          <div className="lg:col-span-1">
            <JobSidebarSection
              className="space-y-6"
              roleInfo={{
                applyBefore: job.closesAt ? format(parseISO(job.closesAt), "MMM d, yyyy") : t("detail.applyBeforeFallback"),
                jobPostedOn: job.publishedAt ? format(parseISO(job.publishedAt), "MMM d, yyyy") : t("detail.postedOnDraftFallback"),
                jobType: job.employmentTypes.map(humanizeEmploymentType).join(", ") || "—",
                salary: formatSalary(job.minSalary, job.maxSalary),
              }}
              categories={job.category ? [{ id: "category", name: job.category }] : []}
              requiredSkills={job.skills.map((name, index) => ({ id: index, name }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

