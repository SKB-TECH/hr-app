// components/ui/DateRangePicker.tsx
"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  dateRange?: DateRange;
  onDateChange: (range: DateRange | undefined) => void;
  className?: string;
}

export function DateRangePicker({
                                  dateRange,
                                  onDateChange,
                                  className,
                                }: DateRangePickerProps) {
  return (
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
                id="date"
                variant="outline"
                className={cn(
                    "flex h-auto w-full items-center justify-between gap-2 whitespace-nowrap rounded-none border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-medium text-[#202430] transition-colors hover:border-indigo-400 sm:w-auto",
                    !dateRange && "text-muted-foreground"
                )}
            >
            <span>
              {dateRange?.from ? (
                  dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd")} –{" "}
                        {format(dateRange.to, "LLL dd, yyyy")}
                      </>
                  ) : (
                      format(dateRange.from, "LLL dd, yyyy")
                  )
              ) : (
                  "Pick a date range"
              )}
            </span>

              <CalendarDaysIcon className="h-4 w-4 shrink-0 text-[#4640DE]" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
              className="w-auto max-w-[calc(100vw-2rem)] overflow-x-auto p-0"
              align="end"
          >
            <Calendar
                autoFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={onDateChange}
                numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
  );
}