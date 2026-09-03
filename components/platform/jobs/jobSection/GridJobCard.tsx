import SharedCard from "@/components/common/navbar/SharedCard";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import type { JobsCardProps } from "./JobsCard";
import { humanizeEmploymentType } from "@/core/lib/format";

function GridJobCard({ job, applyLink }: JobsCardProps) {
  const tags = [...job.employmentTypes.map(humanizeEmploymentType), ...(job.category ? [job.category] : [])];

  return (
    <SharedCard>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex  items-start justify-between">
          <Image
            src={job.companyLogoUrl || "/logo/lgo.png"}
            alt={job.companyName || job.title}
            width={48}
            height={48}
            className="w-12 h-12 object-cover shrink-0"
          />
          {job.location && (
            <span className="px-3 py-1 m-1 rounded-full bg-[#56CDAD1A] text-[#56CDAD] inline-flex items-center font-medium whitespace-nowrap text-xs">
              {job.location}
            </span>
          )}
        </div>

        <div>
          <Link href={applyLink}>
            <h2 className="text-xl hover:text-brand font-semibold text-neutral-100">{job.title}</h2>
          </Link>
          {job.companyName && <p className="text-sm font-medium text-neutral-80">{job.companyName}</p>}
          {job.description && (
            <p className="text-neutral-60 font-epilogue text-sm mb-3 line-clamp-2">{job.description}</p>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="text-sm px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50 text-brand">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-gray-100 flex flex-col gap-2">
          <p className="text-sm text-neutral-60">
            <span className="font-semibold text-neutral-100">{job.applicantsCount}</span> applicants
          </p>
        </div>
      </div>
    </SharedCard>
  );
}

export default GridJobCard;
