"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StageStepper } from "./Stagestepper";
import { StageInfo } from "./Stageinfo";
import { NotesList } from "./Notelist";
import { ChevronDown } from "lucide-react";
import { Applicant } from "@/types/company-applicants";

export default function HiringProcess({
  applicantDetails,
}: {
  applicantDetails: Applicant;
}) {
  return (
    <div className="space-y-6 my-8 ">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-neutral-100">
          Current Stage
        </h3>
        <Button
          variant="custom-primary"
          className="rounded-none text-[16px] font-medium px-4 py-5 hover:bg-brand-light-neutral/30 cursor-pointer"
        >
          <ChevronDown size={14} className="shrink-0 text-brand " />
          <div> Give Rating</div>
        </Button>
      </div>

      <StageStepper applicantStage={applicantDetails.applicationStage} />

      <StageInfo />

      <Button
        variant="custom-secondary"
        disabled
        className="text-[16px] font-epilogue border-2 border-[#CCCCF5] py-6 bg-[#F8F8FD] text-[#b9b9e4] px-6"
      >
        Move To Next Step
      </Button>

      <Separator className="border border-brand-light-neutral" />

      <NotesList />
    </div>
  );
}
