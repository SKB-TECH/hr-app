import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function DonutChart({
  unsuitable = 60,
  interviewed = 40,
}: {
  unsuitable?: number;
  interviewed?: number;
}) {
  const data = [
    { name: "Unsuitable", value: unsuitable, color: "#4640DE" },
    { name: "Interviewed", value: interviewed, color: "#D6D5F8" },
  ];

  return (
    <div className="border border-gray-200 bg-white p-6 flex flex-col justify-between">
      <p className="text-[16px] xl:text-[18px] font-epilogue tracking-wider font-bold text-[#202430] mb-2">
        Jobs Applied Status
      </p>

      <div className="flex items-center justify-center gap-8 flex-1 py-2">
        {/* Recharts Donut */}
        <div className="w-[152px] h-[152px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={44}
                outerRadius={66}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 rounded-sm flex-shrink-0 bg-[#4640DE]" />
            <div>
              <p className="text-[18px] font-bold text-[#202430] leading-tight">
                {unsuitable}%
              </p>
              <p className="text-[14px] text-gray-400">Unsuitable</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 rounded-sm flex-shrink-0 bg-[#D6D5F8]" />
            <div>
              <p className="text-[18px] font-bold text-[#202430] leading-tight">
                {interviewed}%
              </p>
              <p className="text-[14px] text-gray-400">Interviewed</p>
            </div>
          </div>
        </div>
      </div>

      <Link
        href="/candidate/applications"
        className="flex items-center gap-1.5 text-[13px] font-semibold text-[#4640DE] hover:text-indigo-800 transition-colors mt-4"
      >
        View All Applications
        <ArrowRightIcon className="w-4 h-4" />
      </Link>
    </div>
  );
}
