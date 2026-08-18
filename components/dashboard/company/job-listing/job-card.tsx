import { MoreHorizontal } from "lucide-react";
import {
  jobListingStyles,
  jobTypeStyles,
  JobListingTypes,
  TableDataTypes,
} from "@/data/company-job-listing";
import { Link } from "@/i18n/routing";

function JobCard({ job }: { job: TableDataTypes }) {
  const readableDate = new Date(job.date_posted).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link href={`/company/job-listing/${job.id}`} className="group block max-sm:mx-2 border border-[#D6DDEB] p-4 transition-colors hover:border-brand">
      {/* Top row: role + menu */}
      <div className="flex items-start justify-between mb-3">
        <h2 className="pr-2 text-[15px] font-bold leading-snug text-[#25324B] group-hover:text-brand">
          {job.role}
        </h2>
        <span title="Open ATS" className="mt-0.5 shrink-0 text-[#7C8493] transition-colors group-hover:text-brand">
          <MoreHorizontal size={18} />
        </span>
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
      <p className="mt-3 text-right text-xs font-bold text-brand">Open ATS →</p>
    </Link>
  );
}

export default JobCard;
