"use client";

import { ALL_STAGES } from "@/data/dashboard-applicants";
import { cn } from "@/lib/utils";
import { ApplicationStage, Stage } from "@/types/company-applicants";

function StageButton({
  label,
  isCurrentStage,
}: {
  label: Stage;
  isCurrentStage: boolean;
}) {
  return (
    <button
      className={cn(
        "max-md:h-12 h-14 mx-0 px-8 first:[clip-path:polygon(0%_0%,100%_0%,92%_100%,0%_100%)] [clip-path:polygon(8%_0%,100%_0%,92%_100%,0%_100%)] last:[clip-path:polygon(8%_0%,100%_0%,100%_100%,0%_100%)] text-sm shrink-0 tracking-wide cursor-pointer text-[#26A4FF] last:text-neutral-60 bg-[#e9eafc] transition-colors whitespace-nowrap font-semibold border-border hover:bg-[#26A4FF] hover:text-white",
        {
          "bg-[#26A4FF] text-white": isCurrentStage,
        },
      )}
    >
      {label}
    </button>
  );
}

export function StageStepper({
  applicantStage,
}: {
  applicantStage: ApplicationStage;
}) {
  return (
    <div className="flex items-center  flex-nowrap overflow-x-auto scroll scrollbar-hide">
      {ALL_STAGES.map((stage, index) => (
        <StageButton
          key={stage}
          label={stage}
          isCurrentStage={applicantStage.stage === index + 1}
        />
      ))}
    </div>
  );
}
