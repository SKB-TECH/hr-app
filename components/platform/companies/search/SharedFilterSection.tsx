"use client";
import { useState } from "react";
import { FilterTick } from "@/components/ui/FilterTick";
import { SidebarOptions } from "@/types/types";
import { ChevronUp, ChevronDown } from "lucide-react";

interface FilterSectionProps {
  title: string;
  options: SidebarOptions[];
  isCollapsible?: boolean;
  defaultExpanded?: boolean;
}

export function SharedFilterSection({
  title,
  options,
  isCollapsible = false,
  defaultExpanded = true,
}: FilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="mb-8">
      <div
        className={`flex items-center justify-between mb-4 ${
          isCollapsible ? "cursor-pointer select-none" : ""
        }`}
        onClick={() => isCollapsible && setIsExpanded(!isExpanded)}
      >
        <h3 className="font-semibold text-neutral-100 font-clash text-[14px]">
          {title}
        </h3>
        {isCollapsible && (
          isExpanded ? (
            <ChevronUp className="h-5 w-5 text-neutral-100" />
          ) : (
            <ChevronDown className="h-5 w-5 text-neutral-100" />
          )
        )}
      </div>
      
      {(!isCollapsible || isExpanded) && (
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
      )}
    </div>
  );
}
