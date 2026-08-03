import { InterviewDay } from "@/types/company-applicants";
import { InterviewCard } from "./Interviewcard";

export function InterviewDayGroup({ day }: { day: InterviewDay }) {
  return (
    <div>
      <p className="text-xs font-medium text-neutral-60  mb-2">{day.date}</p>
      <div className="divide-y divide-border border border-brand-light-neutral px-3 py-1">
        {day.slots.map((slot) => (
          <InterviewCard key={slot.id} slot={slot} />
        ))}
      </div>
    </div>
  );
}
