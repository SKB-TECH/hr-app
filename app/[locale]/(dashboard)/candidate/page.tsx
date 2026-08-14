"use client"

import DashboardHeader from "@/components/dashboard/candidate/overview/GreetingSection";
import StatsContent from "@/components/dashboard/candidate/overview/StatsContentSection";
import RecentApplicationsHistory from "@/components/dashboard/candidate/overview/RecentApplicationHistory";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function DashboardPage() {

const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2021, 6, 19),
    to: new Date(2021, 6, 25),
  });

  return (
    <div className="min-h-screen  py-6 px-4 lg:px-6">
      <DashboardHeader dateRange={dateRange} onDateChange={setDateRange} />
      <div>
        <StatsContent />
      </div>
      <div className="mt-6">
        <RecentApplicationsHistory dateRange={dateRange} />
      </div>
    </div>
  );
}



 
