"use client";

import { CalendarDaysIcon } from "lucide-react";
import { format } from "date-fns";
import { useSession } from "@/core/hooks/auth/use-session";

export default function TopHeader() {
  const { data: session } = useSession();
  const firstName = session?.fullName?.trim().split(" ")[0] || "there";

  return (
    <div className="bg-white">
      <div className=" flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3 ">
          <h2 className="text-2xl md:text-2xl font-clash font-bold md:font-semibold text-neutral-100">
            Keep it up, {firstName}
          </h2>
          <p className="text-lg md:text-sm text-neutral-60">Here is your job applications status.</p>
        </div>
        <button className="flex items-center justify-between sm:w-auto  w-full gap-2 border border-gray-200 px-4 py-2.5 text-[13px] text-[#202430] font-medium hover:border-indigo-400 transition-colors whitespace-nowrap self-start sm:self-auto">
          <span>{format(new Date(), "MMM d, yyyy")}</span>
          <CalendarDaysIcon className="w-4 h-4 text-[#4640DE]" />
        </button>
      </div>
    </div>
  );
}
