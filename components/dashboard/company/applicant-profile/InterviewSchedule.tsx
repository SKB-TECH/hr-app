import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INTERVIEW_DAYS } from "@/data/dashboard-applicants";
import { InterviewDayGroup } from "./Interviewdaygroup";

export default function InterviewSchedule() {
  return (
    <div className="space-y-5 my-8 ">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] text-nowrap tracking-wide font-semibold font-epilogue  text-neutral-100">
          Interview List
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-[13px] tracking-wide font-semibold font-epilogue text-brand hover:text-indigo-800 hover:bg-blue-50"
        >
          <Plus className="w-4 h-4" />
          Add Schedule <span className="max-md:hidden">Interview</span>
        </Button>
      </div>

      <div className="space-y-4">
        {INTERVIEW_DAYS.map((day) => (
          <InterviewDayGroup key={day.date} day={day} />
        ))}
      </div>
    </div>
  );
}
