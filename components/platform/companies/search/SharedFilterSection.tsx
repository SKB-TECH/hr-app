"use client";

import { useState } from "react";
import { FilterTick } from "@/components/ui/FilterTick";
import { SidebarOptions } from "@/types/types";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useJobContext } from "@/context/JobContext";

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
  const { category, handleSearch } = useJobContext();
  const isCategorySection = /categor/i.test(title);

  return (
    <div className="mb-8">
      <button
        type="button"
        aria-expanded={isExpanded}
        className={`w-full flex items-center justify-between mb-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
          isCollapsible ? "cursor-pointer select-none" : ""
        }`}
        onClick={() => isCollapsible && setIsExpanded(!isExpanded)}
      >
        <h3 className="font-semibold text-neutral-100 font-clash text-[14px]">
          {title}
        </h3>
        {isCollapsible &&
          (isExpanded ? (
            <ChevronUp className="h-5 w-5 text-neutral-100" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-5 w-5 text-neutral-100" aria-hidden="true" />
          ))}
      </button>

      {(!isCollapsible || isExpanded) && (
        <div className="space-y-4">
          {options.map((option) => {
            const isChecked = isCategorySection
              ? category.toLowerCase() === option.name.toLowerCase()
              : option.defaultSelected;

            return (
              <div
                key={`${title}-${option.name}`}
                onClick={() => {
                  if (isCategorySection) {
                    const nextCategory =
                      category.toLowerCase() === option.name.toLowerCase()
                        ? ""
                        : option.name;
                    handleSearch({ category: nextCategory });
                  }
                }}
                className="flex items-center text-[14px] lg:text-[16px] justify-start gap-3 cursor-pointer group"
              >
                <FilterTick defaultChecked={isChecked} />
                <div className="flex items-center gap-1 transition-colors group-hover:text-indigo-600">
                  <span className="text-slate-600">{option.name}</span>
                  <span className="text-slate-400">({option.count})</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
