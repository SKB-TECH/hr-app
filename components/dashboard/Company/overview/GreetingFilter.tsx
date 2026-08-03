"use client";

import { CalendarDaysIcon } from "@heroicons/react/24/outline";

interface GreetingFilterProps {
  name?: string;
  dateRange?: string;
}

export default function GreetingFilter({
  name = "Maria",
  dateRange = "Jul 19 - Jul 25",
}: GreetingFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6">
      <div>
        <h1 className="text-[24px] font-bold text-[#25324B] tracking-tight">
          Good morning, {name}
        </h1>
        <p className="text-[16px] text-[#7C8493] mt-1">
          Here is your job listings statistic report from {dateRange.replace(" - ", " - ")}.
        </p>
      </div>

      <button className="flex items-center sm:w-auto w-full gap-2 border border-gray-200 px-4 py-2.5 text-[13px] text-[#202430] font-medium hover:border-indigo-400 transition-colors whitespace-nowrap self-start sm:self-auto">
        <span>{dateRange}</span>
        <CalendarDaysIcon className="w-4 h-4 text-indigo-500" />
      </button>
    </div>
  );
}