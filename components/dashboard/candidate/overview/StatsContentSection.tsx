"use client";

import { StatCard } from "./StatCard";
import { DonutChart } from "./DonutChart";
import { UpcomingInterviews } from "./UpcomingInterview";


export default function StatsContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

      <div className="flex flex-col gap-5">
        <StatCard
          label="Total Jobs Applied"
          value={45}
          icon="/file.png"
        />
        <StatCard
          label="Interviewed"
          value={18}
          icon="/smsa.png"
        />
      </div>
      <DonutChart unsuitable={60} interviewed={40} />

      <UpcomingInterviews />
    </div>
  );
}