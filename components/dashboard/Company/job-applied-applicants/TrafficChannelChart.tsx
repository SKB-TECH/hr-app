import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import CardWrapper from "./CardWrapper";
import { trafficChannelData } from "@/data/company-job-listing";

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: {
    value: string;
  }[];
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="relative rounded bg-[#515B6F] px-6 py-1 text-white shadow-lg">
      <p className="text-md font-semibold">{payload[0].value}</p>

      {/* Arrow */}
      <div className="absolute left-1/2 top-full -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-[#515B6F]" />
    </div>
  );
};

export default function TrafficChannelChart() {
  return (
    <CardWrapper>
      {/* Header */}
      <h2 className=" text-2xl font-semibold text-[#25324B]">
        Traffic channel
      </h2>

      {/* Chart */}
      <div className="h-[270px] ">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={trafficChannelData}
              dataKey="value"
              innerRadius={67}
              outerRadius={100}
              stroke="none"
              paddingAngle={0}
            >
              {trafficChannelData.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} cursor={false} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-1 grid grid-cols-2 gap-y-6">
        {trafficChannelData.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <span
              className="h-4 w-4 rounded-[4px]"
              style={{
                backgroundColor: item.color,
              }}
            />

            <p className="text-md text-[#7C8493]">
              {item.name} :{" "}
              <span className="font-semibold text-[#25324B]">
                {item.value}%
              </span>
            </p>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}
