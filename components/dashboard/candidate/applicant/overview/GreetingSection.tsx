"use client";

import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      {/* Greeting */}
      <div>
        <h1 className="text-[24px] font-bold text-[#25324B] tracking-tight">
          Good morning, Jake
        </h1>
        <p className="text-[16px] text-[#7C8493] mt-1">
          Here is {`what's`} happening with your job search applications from
          July 19 – July 25.
        </p>
      </div>
      {/* Date picker button */}
      <button className="flex items-center justify-between sm:w-auto  w-full gap-2 border border-gray-200 px-4 py-2.5 text-[13px] text-[#202430] font-medium hover:border-indigo-400 transition-colors whitespace-nowrap self-start sm:self-auto">
        <span>Jul 19 – Jul 25</span>
        <CalendarDaysIcon className="w-4 h-4 text-[#4640DE]" />
      </button>
    </div>
  );
}
