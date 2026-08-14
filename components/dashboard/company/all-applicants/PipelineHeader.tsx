import { Applicant } from "@/types/applicant";
import { MoreHorizontal } from "lucide-react";

interface PipelineHeaderProps {
  stage: string;
  stageApplicants: Applicant[];
}

const stageStyles: Record<string, string[]> = {
  Interview: ["border-t-[#2196f3]", "bg-[#2196f3]"],
  Shortlisted: ["border-t-brand", "bg-brand"],
  Hired: ["border-t-accent-green", "bg-accent-green"],
  Declined: ["border-t-accent-red", "bg-accent-red"],
  "In Review": ["border-t-orange-300", "bg-orange-300"],
};

function PipelineHeader({ stage, stageApplicants }: PipelineHeaderProps) {
  return (
    <header
      className={`border-t-4 border border-neutral-20 font-epilogue m-2 px-4 py-3 ${stageStyles[stage][0]}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-epilogue font-medium text-neutral-100">
          <span className={`h-3 w-3 rounded-full  ${stageStyles[stage][1]}`} />
          {stage}
          <span className=" bg-[#e9eafc] p-2 py-1 text-sm text-neutral-100 ">
            {stageApplicants.length}
          </span>
        </div>
        <button
          type="button"
          aria-label={`More ${stage} actions`}
          className="text-neutral-80"
        >
          <MoreHorizontal size={22} />
        </button>
      </div>
    </header>
  );
}

export default PipelineHeader;
