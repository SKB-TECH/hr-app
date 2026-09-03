"use client";

import { format } from "date-fns";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useMyApplications } from "@/core/hooks/applications/use-my-applications";
import { useUpcomingInterviews } from "@/core/hooks/interviews/use-upcoming-interviews";

export function UpcomingInterviews() {
  const { data: applicationsPage } = useMyApplications({ limit: 20 });
  const applicationIds = (applicationsPage?.data ?? []).map((application) => application.id);
  const { data: interviews, isLoading } = useUpcomingInterviews(applicationIds);

  return (
    <div className="border border-gray-200 bg-white flex flex-col">
      {/* Title */}
      <div className="border-b border-b-gray-200 p-4">
        <p className="text-[16px] xl:text-[18px] font-epilogue tracking-wider font-bold text-[#202430]">
          Upcoming Interviews
        </p>
      </div>

      <div className="p-4">
        {isLoading && <p className="text-[13px] text-gray-400">Loading interviews…</p>}

        {!isLoading && interviews.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-brand">
              <CalendarDaysIcon className="h-5 w-5" />
            </span>
            <p className="text-[13px] text-gray-400">No upcoming interviews scheduled.</p>
          </div>
        )}

        {!isLoading && interviews.length > 0 && (
          <div className="flex flex-col gap-2">
            {interviews.map((interview) => (
              <div key={interview.id} className="flex items-center gap-3 bg-[#E9EBFD] px-4 py-3 rounded-md">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand">
                  <CalendarDaysIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-bold text-[#202430]">{interview.title}</p>
                  <p className="truncate text-[11px] text-gray-400">
                    {interview.interviewerName || "Interviewer TBC"}
                  </p>
                </div>
                <p className="ml-auto shrink-0 text-[12px] font-semibold text-[#202430]">
                  {format(new Date(interview.scheduledAt), "MMM d, h:mm a")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
