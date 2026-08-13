import { Applicant } from "@/types/applicant";
import Link from "next/dist/client/link";
import Image from "next/image";
import PipelineStarLogic from "./PipelineStarLogic";

function PipelineProfileInfo({ applicant }: { applicant: Applicant }) {
  return (
    <article
      key={applicant.id}
      className="border border-neutral-20 bg-white p-4 "
    >
      <div className="flex items-start gap-3">
        <Image
          src={applicant.avatar}
          alt={applicant.name}
          width={54}
          height={54}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-semibold text-neutral-100">
            {applicant.name}
          </h3>
          <Link href="#" className="mt-1 text-[13px] font-semibold text-brand">
            View Profile
          </Link>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-[14px]">
        <div>
          <p className="text-neutral-60">Applied on</p>
          <p className="mt-1 font-medium text-neutral-100">
            {applicant.appliedDate}
          </p>
        </div>
        <div>
          <p className="text-neutral-60">Score</p>
          <PipelineStarLogic applicant={applicant} />
        </div>
      </div>
    </article>
  );
}

export default PipelineProfileInfo;
