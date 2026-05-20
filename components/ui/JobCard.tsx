"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import type { Job } from "@/core/types";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="flex  flex-col md:flex-row border border-[#88888] bg-white hover:shadow-sm transition-shadow duration-300 mb-6 min-h-[220px]">
      {/* Left Section: Job Metadata */}
      <div className="md:w-1/3 flex flex-col justify-center  md:px-8 lg:p-12  p-12 pb-0">
        <p className="text-[11px] font-light text-gray-400 uppercase tracking-widest mb-4">
          Job Ref: {job.ref}
        </p>
        <h2 className="text-2xl text-[#132745]  font-bold leading-tight mb-2">
          {job.title}
        </h2>
        <p className="text-xl text-[#132745]   mb-4">{job.location}</p>
        <p className="text-xl font-light text-[#132745]  tracking-tight">
          {job.salary}
        </p>
      </div>

      {/* Right Section: Description and Action */}
      <div className="flex-1 lg:px-18 flex flex-col relative p-12  pt-6 md:pt-12">
        <div className="flex-1  ">
          <p className="text-[15px] font-light text-[#132745] leading-[1.7] line-clamp-4 md:line-clamp-none">
            {job.description}
          </p>
        </div>

        {/* Detail Button - Fixed bottom right */}
        <div className="absolute bottom-0 right-0">
          <Link
            href={`/jobs/${job.id}`}
            className="flex items-center justify-center w-12 h-12 text-[#132745] transition-all duration-300 hover:brightness-95 bg-brand"
            aria-label={`View ${job.title} details`}
          >
            <ArrowRight size={20} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}
