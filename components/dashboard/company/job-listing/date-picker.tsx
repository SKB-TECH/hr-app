import { CalendarDaysIcon } from "lucide-react";

function DateRangePicker() {
  return (
    <button className="max-sm:p-2  flex items-center justify-between sm:w-auto  w-full gap-2 border border-brand-light-neutral max-md:py-6 px-4 py-2.5 text-[13px] text-[#202430] font-medium hover:border-indigo-400 transition-colors whitespace-nowrap self-start sm:self-auto">
      <span>Jul 19 – Jul 25</span>
      <CalendarDaysIcon className="w-4 h-4 text-[#4640DE]" />
    </button>
  );
}

export default DateRangePicker;
