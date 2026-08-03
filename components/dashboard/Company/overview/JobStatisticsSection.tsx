"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { EyeIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const weekData = [
  { day: "Mon", jobView: 80, jobApplied: 90 },
  { day: "Tue", jobView: 35, jobApplied: 75 },
  { day: "Wed", jobView: 122, jobApplied: 34 },
  { day: "Thu", jobView: 50, jobApplied: 95 },
  { day: "Fri", jobView: 90, jobApplied: 30 },
  { day: "Sat", jobView: 35, jobApplied: 15 },
  { day: "Sun", jobView: 15, jobApplied: 40 },
];

type RangeTab = "Week" | "Month" | "Year";
type ViewTab = "Overview" | "Jobs View" | "Jobs Applied";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number | string }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-[#25324B] text-white px-3 py-2 text-[12px] flex flex-col gap-1 ">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 bg-[#56CDAD]" />
        <span>{payload[0]?.value}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2  bg-[#26A4FF]" />
        <span>{payload[1]?.value}</span>
      </div>
    </div>
  );
}

export default function JobStatisticsSection() {
  const [range, setRange] = useState<RangeTab>("Week");
  const [view, setView] = useState<ViewTab>("Overview");

  return (
    <div className="bg-white border border-gray-200 py-6">
      {/* Header */}
      <div className="flex px-6 items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-[20px] font-bold text-[#25324B]">
            Job statistics
          </h2>
          <p className=" text-[12px] sm:text-[16px] text-gray-400 mt-1">
            Showing Jobstatistic Jul 19-25
          </p>
        </div>

        {/* ── MOBILE: dropdown select ── */}
        <div className="sm:hidden relative ">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as RangeTab)}
            className="w-full appearance-none border border-gray-200 bg-white text-[#202430] font-medium text-[14px] p-2 pr-6   outline-none cursor-pointer"
          >
            <option value="Week">Week</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
          </select>
          <ChevronDownIcon className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="hidden sm:flex items-center border border-gray-200 p-0.5 bg-indigo-50 overflow-hidden">
          {(["Week", "Month", "Year"] as RangeTab[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`text-[13px] font-medium px-4 py-2 ${
                range === r ? "bg-white text-brand font-bold" : "text-brand"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* View tabs */}

      <div className="border-b border-gray-200">
        <div className=" relative flex items-center px-6 gap-4 ">
          {(["Overview", "Jobs View", "Jobs Applied"] as ViewTab[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`pb-3 text-[14px] sm:text-[16px] font-medium   ${
                view === v
                  ? "text-[#202430] "
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {v}
              {view === v && (
                <hr className=" w-14 sm:w-20 h-1 bg-brand absolute bottom-0  " />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chart + side cards */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-[25px] p-6">
        {/* Bar chart */}
        <div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weekData}
                barGap={4}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Bar
                  dataKey="jobView"
                  stackId="a"
                  fill="#F4A33C"
                  maxBarSize={28}
                />
                <Bar
                  dataKey="jobApplied"
                  stackId="a"
                  fill="#7B61FF"
                  maxBarSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-[25px] mt-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3  bg-[#F4A33C]" />
              <span className="text-[13px] text-gray-500">Job View</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3  bg-[#7B61FF]" />
              <span className="text-[13px] text-gray-500">Job Applied</span>
            </div>
          </div>
        </div>

        {/* Side stat cards */}
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[18px] font-semibold text-[#25324B]">
                Job Views
              </p>
              <span className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                <EyeIcon className="w-4 h-4 text-orange-400" />
              </span>
            </div>
            <p className="text-[36px] font-extrabold text-[#25324B] leading-none">
              2,342
            </p>
            <p className="text-[16px] text-gray-400 mt-2">
              This Week{" "}
              <span className="text-teal-500 font-semibold">6.4% ▲</span>
            </p>
          </div>

          <div className="border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[18px] font-semibold text-[#25324B]">
                Job Applied
              </p>
              <span className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                <ClipboardDocumentIcon className="w-4 h-4 text-indigo-500" />
              </span>
            </div>
            <p className="text-[36px] font-extrabold text-[#202430] leading-none">
              654
            </p>
            <p className="text-[16px] text-gray-400 mt-2">
              This Week{" "}
              <span className="text-red-500 font-semibold">0.5% ▼</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
