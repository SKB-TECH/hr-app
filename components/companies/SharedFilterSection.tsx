import { FilterTick } from "@/components/ui/FilterTick";
import { SidebarOptions } from "@/types/types";

interface FilterSectionProps {
  title: string;
  options: SidebarOptions[];
}

export function SharedFilterSection({ title, options }: FilterSectionProps) {
  return (
    <div className="mb-8">
      <h3 className="font-semibold text-neutral-100 font-clash text-[14px] mb-4">
        {title}
      </h3>
      <div className="space-y-4">
        {options.map((option) => (
          <div
            key={option.name}
            className="flex items-center text-[14px] lg:text-[16px] justify-start gap-3 cursor-pointer group"
          >
            <FilterTick defaultChecked={option.defaultSelected} />
            <div className="flex items-center gap-1 transition-colors group-hover:text-indigo-600">
              <span className="text-slate-600">{option.name}</span>
              <span className="text-slate-400">({option.count})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
