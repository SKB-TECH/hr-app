"use client";

import { StatCard } from "./StatCard";
import { DonutChart } from "./DonutChart";
import { UpcomingInterviews } from "./UpcomingInterview";
import { useMyApplicationStats } from "@/core/hooks/applications/use-my-application-stats";

export default function StatsContent() {
  const { data: stats } = useMyApplicationStats();

  const totalApplied = stats?.totalApplied ?? 0;
  const interviewed = stats?.interviewed ?? 0;
  const interviewedPercent = totalApplied > 0 ? Math.round((interviewed / totalApplied) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

      <div className="flex flex-col gap-5">
        <StatCard
          label="Total Jobs Applied"
          value={totalApplied}
          icon="/file.png"
        />
        <StatCard
          label="Interviewed"
          value={interviewed}
          icon="/smsa.png"
        />
      </div>
      <DonutChart unsuitable={100 - interviewedPercent} interviewed={interviewedPercent} />

      <UpcomingInterviews />
    </div>
  );
}
