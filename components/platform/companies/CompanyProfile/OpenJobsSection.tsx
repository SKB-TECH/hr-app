import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import type { Job } from "@/data/jobDetailsData";
import { getTranslations } from "next-intl/server";

interface SimilarJobsSectionProps {
  jobs: Job[];
  showAllHref?: string;
  title?: string;
}

export default async function OpenJobsSection({
  jobs,
  showAllHref = "#",
  title,
}: SimilarJobsSectionProps) {
  const t = await getTranslations("companiesBrowse");
  const resolvedTitle = title ?? t("openJobsSection.title");
  return (
    <div className="relative w-full min-h-[500px] mt-16 overflow-hidden">
      <Image
        src="/background.png"
        alt="Background"
        fill
        quality={100}
        priority
        className="hidden h-auto w-auto md:block absolute max-md:inset-0 inset-0 object-fill bg-no-repeat pointer-events-none"
      />
      <div className="md:hidden absolute max-md:inset-0 inset-0 object-fill bg-no-repeat pointer-events-none bg-[#F8F8FD] " />

      <div className="relative z-10  py-12 px-4 md:px-12   w-full max-w-7xl mx-auto ">
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-[24px] md:text-[32px] text-neutral-100 font-bold font-clash">
            {resolvedTitle}
          </h1>
          <Link
            href={showAllHref}
            className="flex text-brand text-[16px] font-bold items-center gap-1"
          >
            <span>{t("openJobsSection.showAllJobs")}</span>
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, index) => (
              <div
                key={`${job.title}-${job.company}-${index}`}
                className="flex max-sm:flex-col justify-between bg-white hover:shadow-sm transition-shadow p-5 border border-gray-100"
              >
                <div className="relative w-[64px] h-[64px] max-md:w-[48px] max-md:h-[48px] mb-4">
                  <Image
                    src={job.image}
                    alt={job.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="md:ml-4 flex-1">
                  <h4 className="text-[20px] font-bold text-neutral-100 mb-2">
                    {job.title}
                  </h4>
                  <p className="text-neutral-80 text-[16px] mb-1">
                    {job.company} · {job.location}
                  </p>
                  <div className="flex items-center flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center justify-center text-center text-[14px] bg-accent-light-green text-accent-green px-2 py-1 md:px-4 md:py-1.5 rounded-full font-medium">
                      {job.type}
                    </span>
                    <div className="w-px h-4 bg-brand-light-neutral mx-1" />
                    <span className="inline-flex items-center justify-center text-center text-[14px] border border-accent-yellow bg-white text-accent-yellow px-2 py-1 md:px-4 md:py-1.5 rounded-full font-medium">
                      {job.category}
                    </span>
                    <span className="inline-flex items-center justify-center text-center text-[14px] border border-brand bg-white text-brand px-2 py-1 md:px-4 md:py-1.5 rounded-full font-medium">
                      {job.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
