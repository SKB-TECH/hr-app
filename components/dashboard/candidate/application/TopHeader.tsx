import { CalendarDaysIcon } from "lucide-react";

export default function TopHeader({
  title = "Keep it up, Jake",
  subtitle = "Here is job applications status from July 19 - July 25.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-white">
      <div className=" flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3 ">
          <h2 className="text-2xl md:text-2xl font-clash font-bold md:font-semibold text-neutral-100">
            {title}
          </h2>
          <p className="text-lg md:text-sm text-neutral-60">{subtitle}</p>
        </div>
        <button className="flex items-center justify-between sm:w-auto  w-full gap-2 border border-gray-200 px-4 py-2.5 text-[13px] text-[#202430] font-medium hover:border-indigo-400 transition-colors whitespace-nowrap self-start sm:self-auto">
          <span>Jul 19 – Jul 25</span>
          <CalendarDaysIcon className="w-4 h-4 text-[#4640DE]" />
        </button>
      </div>
    </div>
  );
}