// components/DashboardHeader.tsx
"use client";

import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { DateRangePicker } from "@/components/ui/DateRangePicker";

interface DashboardHeaderProps {
  dateRange?: DateRange;
  onDateChange: (range: DateRange | undefined) => void;
}

export default function DashboardHeader({
  dateRange,
  onDateChange,
}: DashboardHeaderProps) {
  const formattedSubtitle =
    dateRange?.from && dateRange?.to
      ? `from ${format(dateRange.from, "MMM dd")} – ${format(dateRange.to, "MMM dd")}`
      : "select a date range";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      {/* Greeting */}
      <div>
        <h1 className="text-[24px] font-bold text-[#25324B] tracking-tight">
          Good morning, Jake
        </h1>
        <p className="text-[16px] text-[#7C8493] mt-1">
          Here is {`what's`} happening with your job search applications{" "}
          {formattedSubtitle}.
        </p>
      </div>

      {/* Date Picker Component */}
      <DateRangePicker dateRange={dateRange} onDateChange={onDateChange} />
    </div>
  );
}