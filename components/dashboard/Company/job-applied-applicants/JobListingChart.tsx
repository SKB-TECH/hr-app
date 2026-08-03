import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomListingToolTip from "./CustomListingToolTip";
import { ChevronDown } from "lucide-react";
import ActionDropDown from "../applicant-profile/ActionDropDown";
import CardWrapper from "./CardWrapper";

import { viewStatsData } from "@/data/company-job-listing";

export default function JobListingChart() {
  return (
    <CardWrapper className="min-h-[400px] md:h-full flex flex-col">
      {/* Header */}
      <div className="mb-8 flex max-md:flex-col items-center justify-between">
        <h2 className="text-2xl self-start font-semibold text-[#25324B] text-ellipsis text-nowrap max-w-fit">
          Job Listing View stats
        </h2>

        <ActionDropDown
          selected="Last 7 days"
          menuItems={["Last 7 days", "Last 30 days", "Last 90 days"]}
          className="text-neutral-100 font-medium text-start border border-brand-light-neutral/40 max-md:justify-start! max-md:mt-4 max-md:flex! max-md:w-full"
        >
          <ChevronDown size={20} />
        </ActionDropDown>
      </div>

      <div className="relative w-full h-[350px] md:flex-1 md:h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={viewStatsData}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="6 6"
              stroke="#D6DDEB"
            />
            <XAxis
              axisLine={false}
              tickLine={false}
              dataKey="date"
              stroke="var(--color-text-3)"
              tick={{
                fill: "#515B6F",
              }}
              tickMargin={18}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={20}
              domain={[0, 1500]}
              ticks={[0, 250, 500, 750, 1000, 1250, 1500]}
              tick={{
                fill: "#515B6F",
              }}
              width={55}
              stroke="var(--color-text-3)"
            />
            <Tooltip
              cursor={{
                stroke: "var(--color-border-2)",
              }}
              content={<CustomListingToolTip active={false} payload={[]} />}
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#56CDAD"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#56CDAD",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardWrapper>
  );
}
