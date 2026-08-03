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
    <div className="w-full max-w-xl space-y-8 items-center">
      {/* Salary Inputs */}
      <div className="flex items-center mx-auto gap-5 justify-between">
        <div className="relative">
          <span className="absolute flex left-2 top-1/2 -translate-y-1/2 text-neutral-500">
            $<div className="mx-2  h-5 w-px bg-neutral-300" />
          </span>

          <input
            type="number"
            value={minSalary}
            min={minSalary}
            max={MAX}
            onChange={(e) =>
              onChange(Math.min(Number(e.target.value), maxSalary), maxSalary)
            }
            className="w-full border border-neutral-20 py-3 pl-8 outline-none focus:border-indigo-600"
          />
        </div>
        <h1 className="text-neutral-80">to</h1>
        <div className="relative gap-3 ">
          <span className="absolute flex left-2 top-1/2 -translate-y-1/2  text-neutral-500 focus:border-none justify-between">
            $
            <div className="mx-2  h-5 w-px bg-neutral-300" />
          </span>
          <input
            type="number"
            value={maxSalary}
            min={minSalary}
            max={MAX}
            onChange={(e) =>
              onChange(minSalary, Math.max(Number(e.target.value), minSalary))
            }
            className="w-full border border-neutral-20 py-3 pl-8 outline-none transition focus:border-none"
          />
        </div>
      </div>

      {/* Range Slider */}
      <ReactSlider
        value={[minSalary, maxSalary]}
        min={MIN}
        max={MAX}
        step={STEP}
        pearling
        minDistance={STEP}
        onChange={(values) => onChange(values[0], values[1])}
        className="relative h-2 w-full"
        thumbClassName="h-5 w-5 -top-2 cursor-pointer rounded-full  bg-indigo-600"
        trackClassName="h-2 rounded-full"
        renderTrack={(props, state) => {
          const { key, ...rest } = props;

          return (
            <div
              key={key}
              {...rest}
              className={`h-2 rounded-full ${
                state.index === 1 ? "bg-indigo-600" : "bg-neutral-200"
              }`}
            />
          );
        }}
      />
    </div>
  );
}
