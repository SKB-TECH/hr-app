"use client";

import { format, parse, isValid as isValidDate } from "date-fns";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export const DATE_FIELD_FORMAT = "yyyy-MM-dd";

interface DateFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  maxDate?: Date;
  minDate?: Date;
}

export default function DateField({
  id,
  value,
  onChange,
  placeholder,
  error,
  disabled,
  maxDate,
  minDate,
}: DateFieldProps) {
  const t = useTranslations("candidateProfileCore.shared.dateField");
  const resolvedPlaceholder = placeholder ?? t("placeholder");
  const selectedDate = value ? parse(value, DATE_FIELD_FORMAT, new Date()) : undefined;
  const hasValidSelection = Boolean(value) && isValidDate(selectedDate!);

  const disabledMatchers = [
    ...(maxDate ? [{ after: maxDate }] : []),
    ...(minDate ? [{ before: minDate }] : []),
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          disabled={disabled}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`flex h-auto w-full cursor-pointer items-center justify-between gap-2 rounded-none border px-4 py-3 text-left text-[15px] transition disabled:cursor-not-allowed disabled:opacity-50 ${
            error ? "border-red-300" : "border-gray-300 hover:border-brand"
          } ${!hasValidSelection ? "text-gray-400" : "text-[#202430]"}`}
        >
          <span>{hasValidSelection ? format(selectedDate!, "MMMM d, yyyy") : resolvedPlaceholder}</span>
          <CalendarDaysIcon className="h-4 w-4 shrink-0 text-brand" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={hasValidSelection ? selectedDate : undefined}
          onSelect={(date) => date && onChange(format(date, DATE_FIELD_FORMAT))}
          disabled={disabledMatchers.length ? disabledMatchers : undefined}
          defaultMonth={hasValidSelection ? selectedDate : maxDate}
        />
      </PopoverContent>
    </Popover>
  );
}
