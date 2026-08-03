import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Job } from "@/data/jobDetailsData";

interface SimilarJobsSectionProps {
  jobs: Job[];
  showAllHref?: string;
  title?: string;
  jobId: string;
}

export default function SimilarJobsSection({
  jobs,
  showAllHref = "#",
  title = "Similar Jobs",
  jobId,
}: SimilarJobsSectionProps) {
  return (
    <div className="relative w-full min-h-[500px] mt-16 overflow-hidden ">
      <Image
        src="/background.png"
        alt="Background"
        fill
        quality={100}
        priority
        className="hidden h-auto w-auto md:block absolute max-md:inset-0 inset-0 object-fill bg-no-repeat pointer-events-none"
      />
      <div
        style={{
          clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 5%)",
        }}
        className="md:hidden py-30 absolute max-md:inset-0 inset-0 object-fill bg-no-repeat pointer-events-none bg-[#F8F8FD] "
      />

      <div className="relative z-10 px-4 md:px-12   w-full max-w-7xl mx-auto py-12">
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-[32px]  text-neutral-100 font-bold font-clash">
            {title}
          </h1>

          <Link
            href={showAllHref}
            className="flex text-brand text-[16px] font-bold items-center gap-1"
          >
            <span>Show all jobs</span>
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
                  <Link href={`/jobs/${jobId}`}>
                    <h4 className="text-[20px] font-bold text-neutral-100 mb-2 hover:text-brand">
                      {job.title}
                    </h4>
                  </Link>
                  <p className="text-neutral-80 text-[16px] mb-1">
                    {job.company} · {job.location}
                  </p>
                  <div className="flex items-center flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center justify-center text-center text-[14px] bg-accent-light-green text-accent-green px-2 py-1 md:px-4 md:py-1.5 rounded-full font-medium">
                      {job.type}
                    </span>
                    <div className="w-px h-[32px] bg-brand-light-neutral mx-1" />
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
