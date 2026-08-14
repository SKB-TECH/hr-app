import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

const RWANDA_PUBLIC_HOLIDAYS: Array<{ date: string; label: string }> = [
  { date: "2026-01-01", label: "New Year's Day" },
  { date: "2026-04-07", label: "Genocide Memorial Day" },
  { date: "2026-05-01", label: "Labour Day" },
  { date: "2026-07-01", label: "Independence Day" },
  { date: "2026-08-15", label: "Assumption Day" },
  { date: "2026-11-01", label: "All Saints' Day" },
  { date: "2026-12-25", label: "Christmas Day" },
];

function formatLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getMiniCalDays(year: number, month: number): Array<{ date: Date; isCurrentMonth: boolean }> {
  const first = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const prevDaysInMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
  const cells: Array<{ date: Date; isCurrentMonth: boolean }> = [];

  for (let i = prevDaysInMonth - first + 1; i <= prevDaysInMonth; i++) {
    cells.push({ date: new Date(prevMonthYear, prevMonth, i), isCurrentMonth: false });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), isCurrentMonth: true });
  }

  const nextMonth = month === 11 ? 0 : month + 1;
  const nextMonthYear = month === 11 ? year + 1 : year;
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ date: new Date(nextMonthYear, nextMonth, d), isCurrentMonth: false });
  }

  return cells;
}

export function today() { return new Date(); }

export function toDateStr(d: Date) {
  return formatLocalDate(d);
}

export function isRwandaPublicHoliday(date: Date | string) {
  const dateStr = typeof date === "string" ? date : toDateStr(date);
  return RWANDA_PUBLIC_HOLIDAYS.some((holiday) => holiday.date === dateStr);
}

export function getRwandaHolidayLabel(date: Date | string) {
  const dateStr = typeof date === "string" ? date : toDateStr(date);
  return RWANDA_PUBLIC_HOLIDAYS.find((holiday) => holiday.date === dateStr)?.label ?? "Public Holiday";
}

export function MiniCalendar({
  selected,
  onSelect,
}: {
  selected: Date;
  onSelect: (d: Date) => void;
}) {
  const [viewYear, setViewYear] = useState(selected.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected.getMonth());

  const cells = getMiniCalDays(viewYear, viewMonth);
  const todayS = toDateStr(today());

  function prev() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function next() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MONTHS = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];


  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px] font-bold text-[#202430] uppercase tracking-wide">
          {MONTHS[viewMonth].slice(0,3).toUpperCase()} {viewYear}
        </span>
        <div className="flex gap-1">
          <button onClick={prev} className="p-1 text-indigo-600 hover:text-gray-400 ">
            <ChevronLeftIcon className="w-3.5 h-3.5" />
          </button>
          <button onClick={next} className="p-1 text-indigo-600 hover:text-gray-400 ">
            <ChevronRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_SHORT.map((d) => (
          <div key={d} className="text-center text-[10px] text-gray-400 font-medium py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((cell) => {
          const { date, isCurrentMonth } = cell;
          const ds = toDateStr(date);
          const isToday = ds === todayS;
          const isSel = ds === toDateStr(selected);
          const isPreview = !isCurrentMonth;
          return (
            <button
              key={ds}
              onClick={() => onSelect(date)}
              className={`w-7 h-7 mx-auto flex items-center justify-center text-[12px] rounded-full transition-colors
                ${isToday ? "bg-indigo-600 text-white font-bold" : ""}
                ${isSel && !isToday ? "bg-indigo-100 text-indigo-700 font-bold" : ""}
                ${!isToday && !isSel ? (isPreview ? "text-gray-400 hover:bg-gray-100" : "text-gray-600 hover:bg-gray-100") : ""}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}