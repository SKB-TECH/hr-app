import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface QuickStat {
  value: number | string;
  label: string;
  bgColor: string;
}

interface QuickStatsBannerProps {
  stats?: QuickStat[];
}

const defaultStats: QuickStat[] = [
  { value: 76, label: "New candidates to review", bgColor: "#4640DE" },
  { value: 3, label: "Schedule for today", bgColor: "#56CDAD" },
  { value: 24, label: "Messages received", bgColor: "#26A4FF" },
];

export default function QuickStatsBanner({ stats = defaultStats }: QuickStatsBannerProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[25px] ">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center justify-between gap-4 px-6 py-7 "
          style={{ backgroundColor: stat.bgColor }}
        >
          <div className="flex items-center gap-4">
            <span className="text-[48px] font-bold text-white ">{stat.value}</span>
            <span className="text-[18px] text-white/90 ">{stat.label}</span>
          </div>
          <ChevronRightIcon className="w-5 h-5 text-white/80 flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}