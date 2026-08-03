import { MoreHorizontal, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { InterviewSlot } from "@/types/company-applicants";
import Image from "next/image";

export function InterviewCard({ slot }: { slot: InterviewSlot }) {
  return (
    <div className="flex md:items-center gap-3 py-3 font-epilogue">
      <Image
        width={20}
        height={20}
        alt="user image"
        src={slot.profile_image}
        className={cn(
          "w-9 h-9 rounded-full flex items-center justify-center object-cover text-xs font-semibold flex-shrink-0",
        )}
      />

      <div className="flex-1 flex max-sm:flex-col gap-3 ">
        <div className="flex-1   space-y-1 min-w-0">
          <p className="text-[14px] font-semibold text-neutral-100">
            {slot.candidateName}
          </p>
          <p className="text-xs text-neutral-60">{slot.testType}</p>
        </div>

        <div className="text-left md:mr-4  max-sm:border-brand-light-neutral max-sm:border-t pt-3 sm:block">
          <p className="text-sm font-medium text-neutral-100">
            {slot.timeRange}
          </p>
          <p className="text-xs text-neutral-60">{slot.location}</p>
        </div>

        <div className="flex gap-2 flex-1 ">
          <Button
            className="flex-1 px-4 text-[14px] hover:bg-brand-light-neutral/30 cursor-pointer"
            variant="custom-primary"
          >
            <PenLine className="w-3 h-3" />
            Add Feedback
          </Button>

          <button
            className="p-1 rounded hover:bg-muted transition-colors flex-shrink-0"
            aria-label="More options"
          >
            <MoreHorizontal className="w-4 h-4 text-neutral-80 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
}
