"use client";

import { ChevronDown, LayoutGrid, StretchHorizontal } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

interface SearchHeaderProps {
  totalResults: number;
  sortOptions: string[];
  viewGrid: boolean;
  setViewGrid: React.Dispatch<React.SetStateAction<boolean>>;
  header: string;
}

export function SharedListingHeader({
  totalResults,
  sortOptions,
  viewGrid,
  setViewGrid,
  header,
}: SearchHeaderProps) {
  const t = useTranslations("companiesBrowse");
  const [selectedSort, setSelectedSort] = useState(sortOptions[0] ?? "Sort");

  return (
    <div className="flex flex-col  ">
      <div className="flex  flex-row sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-semibold font-clash text-neutral-100">
            {header}
          </h1>
          <p className="text-slate-500 text-[16px] ">
            {t("listingHeader.showingResults", { count: totalResults })}
          </p>
        </div>

        <div className="flex items-center gap-4 ">
          <div className="  flex items-center gap-2">
            <span className="text-[16px] text-slate-500 max-sm:hidden">
              {t("listingHeader.sortByLabel")}
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
            <button
              className={`p-1.5 rounded-none transition ${
                viewGrid
                  ? "bg-brand/6 text-brand"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              aria-label={t("listingHeader.gridViewAriaLabel")}
              onClick={() => setViewGrid(true)}
            >
              <LayoutGrid
                fill={viewGrid ? "#4640DE" : "transparent"}
                size={20}
              />
            </button>
            <button
              className={`p-1.5 rounded-none transition ${
                !viewGrid
                  ? "bg-brand/6 text-brand"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              aria-label={t("listingHeader.listViewAriaLabel")}
              onClick={() => setViewGrid(false)}
            >
              <StretchHorizontal
                fill={viewGrid ? "transparent" : "#4640DE"}
                size={20}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
