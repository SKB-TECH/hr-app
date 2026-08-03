import { MoreHorizontal } from "lucide-react";
import {
  jobListingStyles,
  jobTypeStyles,
  JobListingTypes,
  TableDataTypes,
} from "@/data/company-job-listing";

function JobCard({ job }: { job: TableDataTypes }) {
  const readableDate = new Date(job.date_posted).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-sm:mx-2 p-4 border border-[#D6DDEB]">
      {/* Top row: role + menu */}
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-[15px] font-bold text-[#25324B] leading-snug pr-2">
          {job.role}
        </h2>
        <button className="text-[#7C8493] hover:text-neutral-80 transition-colors shrink-0 mt-0.5">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Stats: Date Posted | Applicants | Needs */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div>
          <p className="text-[14px] text-[#7C8493] mb-0.5">Date Posted</p>
          <p className="text-[13px] font-medium text-[#25324B]">
            {readableDate}
          </p>
        </div>
        <div>
          <p className="text-[14px] text-[#7C8493] mb-0.5">Applicants</p>
          <p className="text-[13px] font-medium text-[#25324B]">
            {job.applicants}
          </p>
        </div>
        <div>
          <p className="text-[14px] text-[#7C8493] mb-0.5">Needs</p>
          <p className="text-[13px] font-medium text-[#25324B]">
            <span className="text-[#25324B]">{job.current_applicants}</span>
            <span className="text-[#7C8493]">/{job.max_applicants}</span>
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap border-t border-brand-light-neutral pt-3">
        <span
          className={
            jobListingStyles[job.status as keyof JobListingTypes] +
            " py-1 px-4 rounded-full text-[11px] tracking-wide font-medium"
          }
        >
          {job.status}
        </span>
        <span
          className={
            jobTypeStyles[job.job_type as keyof typeof jobTypeStyles] +
            " py-1 px-3 rounded-full text-[11px] tracking-wide font-medium"
          }
        >
          {job.job_type}
        </span>
      </div>
    </div>
  );
}

export default JobCard;
