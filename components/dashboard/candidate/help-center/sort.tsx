"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchHeaderProps {
  sortOptions: string[];
}

export function Sort({
  sortOptions,
}: SearchHeaderProps) {
  const [selectedSort, setSelectedSort] = useState(sortOptions[0] ?? "Sort");

  return (
    <div className="flex flex-col ">
     
      <div className="flex  flex-row sm:items-center justify-between mb-8">
      

        <div className="flex items-center gap-4 ">
          <div className="  flex items-center gap-2">
            <span className="text-[16px] text-slate-500">
              Sort by:
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-[16px] font-medium text-neutral-100 bg-transparent outline-none border-none cursor-pointer py-0"
                >
                  {selectedSort}
                  <ChevronDown size={16} className="text-slate-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuRadioGroup
                  value={selectedSort}
                  onValueChange={setSelectedSort}
                >
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem key={option} value={option}>
                      {option}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="h-8 w-2px bg-slate-200 mx-1 hidden md:block" />
          <div className="hidden md:flex items-center gap-1 p-1 rounded-lg">
          </div>
        </div>
      </div>
    </div>
  );
}
