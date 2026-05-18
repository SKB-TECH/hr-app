"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

interface Job {
  id: string;
  ref: string;
  title: string;
  location: string;
  salary: string;
  jobType: string;
  description: string;
}

interface JobListItemProps {
  job: Job;
}

export function JobListItem({ job }: JobListItemProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow gap-4">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#00c896] bg-[#00c896]/10 px-2 py-1 rounded">
            {job.ref}
          </span>
          <h3 className="text-xl font-bold text-[#0D2145]">{job.title}</h3>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-1">
            <span>📍 {job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>💰 {job.salary}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🕒 {job.jobType}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link href={`/jobs/${job.id}`}>
          <Button className="bg-[#0D2145] hover:bg-[#0D2145]/90 text-white font-semibold px-6">
            Apply Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
