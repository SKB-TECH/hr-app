import type { ReactNode } from "react";
import CardWrapper from "./CardWrapper";

interface StatCardProps {
  title: string;
  value: string | number;
  percentage: string;
  trend: "up" | "down";
  icon: ReactNode;
  iconBgColor: string;
  trendColorClass: string;
  trendIcon: ReactNode;
}

export default function StatCard({
  title,
  value,
  percentage,
  icon,
  iconBgColor,
  trendColorClass,
  trendIcon,
}: StatCardProps) {
  return (
    <CardWrapper className="flex-1">
      <div className="flex items-center justify-between">
        <h3 className="text-neutral-60 text-lg font-medium tracking-wide">
          {title}
        </h3>
        <span
          className={`text-white rounded-full p-2 inline-flex items-center justify-center ${iconBgColor}`}
        >
          {icon}
        </span>
      </div>
      <div className="mt-2">
        <h1 className="text-[44px] leading-none flex items-center gap-2 text-neutral-100 font-semibold tracking-widest">
          <span className="leading-tight">{value}</span>
          <span
            className={`text-[16px] flex items-center font-semibold tracking-normal ${trendColorClass}`}
          >
            {percentage} {trendIcon}
          </span>
        </h1>
        <p className="text-neutral-60">vs last day</p>
      </div>
    </CardWrapper>
  );
}
