"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import type { Job } from "@/core/types";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-200 mb-4'>
      {/* Left info */}
      <div className='sm:w-72 flex-shrink-0 p-6 flex flex-col justify-between'>
        <div>
          <p className='text-xs text-gray-400 mb-3'>Job Ref: {job.ref}</p>
          <h2 className='text-xl font-bold text-gray-900 mb-1'>{job.title}</h2>
          <p className='text-sm text-gray-600 mb-4'>{job.location}</p>
          <p className='text-sm font-medium text-gray-800'>{job.salary}</p>
        </div>
      </div>

      {/* Divider */}

      {/* Right description + arrow */}
      <div className='flex-1 p-6 flex flex-col justify-between'>
        <p className='text-sm text-gray-500 leading-relaxed whitespace-pre-line'>
          {job.description}
        </p>
        <div className='flex justify-end mt-6'>
          <Link
            href={`/jobs/${job.id}`}
            className='flex items-center justify-center w-10 h-10 text-white transition-opacity hover:opacity-80'
            style={{ backgroundColor: "#00c896" }}
            aria-label={`View ${job.title} details`}
          >
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
