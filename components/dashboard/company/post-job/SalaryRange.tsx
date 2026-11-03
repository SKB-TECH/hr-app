"use client";
import * as Slider from "@radix-ui/react-slider";

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

      <Slider.Root
        value={[minSalary, maxSalary]}
        min={MIN}
        max={MAX}
        step={STEP}
        minStepsBetweenThumbs={1}
        onValueChange={(values) => {
          const [nextMin, nextMax] = values;
          if (nextMin !== undefined && nextMax !== undefined) {
            onChange(nextMin, nextMax);
          }
        }}
        className="relative flex h-5 w-full touch-none select-none items-center"
        aria-label="Salary range"
      >
        <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-200">
          <Slider.Range className="absolute h-full bg-indigo-600" />
        </Slider.Track>
        <Slider.Thumb
          aria-label="Minimum salary"
          className="block h-5 w-5 rounded-full bg-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
        />
        <Slider.Thumb
          aria-label="Maximum salary"
          className="block h-5 w-5 rounded-full bg-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
        />
      </Slider.Root>
    </div>
  );
}
