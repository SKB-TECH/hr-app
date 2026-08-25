import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import type { Job } from "@/data/jobDetailsData";

interface SimilarJobsSectionProps {
  jobs: Job[];
  showAllHref?: string;
  title?: string;
}

export default function OpenPositionCard({
  jobs,
  showAllHref = "#",
  title = "Open positions",
}: SimilarJobsSectionProps) {
  return (
    <div className="w-full mt-5 overflow-hidden">
      <div className="flex justify-between items-center gap-4 py-5">
        <h1 className="text-[24px] md:text-[32px] text-neutral-100 font-bold font-clash">
          {title}
        </h1>
        <div className="hidden md:block">
          <Link
            href={showAllHref}
            className="flex text-brand text-[16px] font-bold items-center gap-1 "
          >
            <span>Show all jobs</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        {jobs.slice(0, 4).map((job, index) => (
          <div
            key={`${job.title}-${job.company}-${index}`}
            className="flex p-5 border border-neutral-20"
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
              <h4 className="text-base font-bold text-neutral-100 mb-2">
                {job.title}
              </h4>
              <p className="text-neutral-80 text-sm mb-1">
                {job.company} · {job.location}
              </p>
              <div className="flex items-center flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center justify-center text-center text-[14px] bg-accent-light-green text-accent-green px-2 py-1 md:px-3 md:py-1 rounded-full font-medium">
                  {job.type}
                </span>
                <div className="w-px h-4 bg-brand-light-neutral mx-1" />
                <span className="inline-flex items-center justify-center text-center text-[14px] border border-accent-yellow bg-white text-accent-yellow px-2 py-1 md:px-3 md:py-1 rounded-full font-medium">
                  {job.category}
                </span>
                <span className="inline-flex items-center justify-center text-center text-[14px] border border-brand bg-white text-brand px-2 py-1 md:px-3 md:py-1 rounded-full font-medium">
                  {job.role}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="md:hidden block">
          <Link
            href={showAllHref}
            className="flex text-brand text-[16px] font-semibold items-center gap-1 "
          >
            <span>Show all jobs</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
