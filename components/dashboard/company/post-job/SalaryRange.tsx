"use client";
import ReactSlider from "react-slider";

interface SalaryRangeProps {
  minSalary: number;
  maxSalary: number;
  onChange: (min: number, max: number) => void;
}

export default function SalaryRange({
  minSalary,
  maxSalary,
  onChange,
}: SalaryRangeProps) {
  const MIN = 5000;
  const MAX = 50000;
  const STEP = 500;

  return (
    <div className="w-full max-w-xl space-y-6">
      {/* Salary Inputs */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#7C8493]">
            USD $
          </span>
          <input
            type="number"
            value={minSalary}
            min={MIN}
            max={MAX}
            step={STEP}
            onChange={(e) =>
              onChange(Math.min(Number(e.target.value), maxSalary), maxSalary)
            }
            placeholder="Min Salary"
            className="w-full border border-[#D6DDEB] bg-white rounded-none py-2.5 pl-16 pr-3 text-sm font-semibold text-[#132745] outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE]"
          />
        </div>

        <span className="text-sm font-semibold text-[#7C8493]">to</span>

        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#7C8493]">
            USD $
          </span>
          <input
            type="number"
            value={maxSalary}
            min={minSalary}
            max={MAX}
            step={STEP}
            onChange={(e) =>
              onChange(minSalary, Math.max(Number(e.target.value), minSalary))
            }
            placeholder="Max Salary"
            className="w-full border border-[#D6DDEB] bg-white rounded-none py-2.5 pl-16 pr-3 text-sm font-semibold text-[#132745] outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE]"
          />
        </div>
      </div>

      {/* Range Slider */}
      <div className="px-1 pt-2">
        <ReactSlider
          value={[minSalary, maxSalary]}
          min={MIN}
          max={MAX}
          step={STEP}
          pearling
          minDistance={STEP}
          onChange={(values) => onChange(values[0], values[1])}
          className="relative h-2 w-full"
          thumbClassName="h-5 w-5 -top-1.5 cursor-pointer rounded-none bg-[#4640DE] shadow-md border-2 border-white focus:outline-none"
          trackClassName="h-2 rounded-none"
          renderTrack={(props, state) => {
            const { key, ...rest } = props;

            return (
              <div
                key={key}
                {...rest}
                className={`h-2 rounded-none ${
                  state.index === 1 ? "bg-[#4640DE]" : "bg-[#E4E7EC]"
                }`}
              />
            );
          }}
        />
      </div>
    </div>

  );
}
